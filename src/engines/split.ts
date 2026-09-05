// E4 分账引擎 — tip-out / booth-rent / consignment 等"按规则分钱"类工具
import { clamp, money, num, type EngineResult, type Row } from '../lib/types';
import { makeGauge2 } from './quote';

export interface SplitRole { label: string; pct: number; people: number }

export function parseRoles(rows: Row[]): SplitRole[] {
  return rows
    .map((r) => ({ label: String(r.label ?? ''), pct: num(r.pct as string), people: Math.max(0, Math.round(num(r.people as string))) }))
    .filter((r) => r.label !== '');
}

/** T4 tip-out-calculator */
export function calcTipOut(values: Record<string, string>, rows: Row[], params: any): EngineResult {
  const tips = num(values.totalTips);
  const roles = parseRoles(rows);
  const totalPct = roles.reduce((s, r) => s + r.pct, 0);
  const copy = params.copy as Record<string, string>;

  const lines = roles
    .filter((r) => r.pct > 0)
    .map((r) => {
      const amount = (tips * r.pct) / 100;
      const each = r.people > 0 ? amount / r.people : amount;
      return {
        label: `${r.label || 'Role'} (${r.people || 0} ${r.people === 1 ? 'person' : 'people'})`,
        value: `${money(amount)} → ${money(each)} each`,
      };
    });

  let level: 'ok' | 'warn' | 'bad' | 'info' = 'info';
  let text = copy.info;
  if (tips > 0 && roles.length > 0) {
    if (Math.abs(totalPct - 100) < 0.01) { level = 'ok'; text = copy.ok; }
    else if (totalPct < 100) { level = 'warn'; text = copy.under.replace('{p}', (100 - totalPct).toFixed(0)); }
    else { level = 'bad'; text = copy.over.replace('{p}', (totalPct - 100).toFixed(0)); }
  }

  return {
    primary: { label: params.primaryLabel as string, value: money(tips) },
    secondary: lines,
    verdict: { level, text },
  };
}

/** T3 menu-engineering-matrix — 四象限分类（全班平均线法） */
export function calcMenuMatrix(rows: Row[], params: any): EngineResult {
  const copy = params.copy as Record<string, string>;
  const items = rows
    .map((r) => ({
      name: String(r.dish ?? ''),
      price: num(r.price as string),
      cost: num(r.cost as string),
      sold: num(r.sold as string),
    }))
    .filter((i) => i.name !== '' && i.price > 0);

  if (items.length < 2) {
    return {
      primary: { label: params.primaryLabel as string, value: '—' },
      secondary: [],
      verdict: { level: 'info', text: copy.needMore },
    };
  }

  const margins = items.map((i) => i.price - i.cost);
  const avgMargin = margins.reduce((a, b) => a + b, 0) / margins.length;
  const avgPop = items.reduce((s, i) => s + i.sold, 0) / items.length;

  const counts = { star: 0, plowhorse: 0, puzzle: 0, dog: 0 };
  for (const i of items) {
    const m = i.price - i.cost;
    if (m >= avgMargin && i.sold >= avgPop) counts.star++;
    else if (m < avgMargin && i.sold >= avgPop) counts.plowhorse++;
    else if (m >= avgMargin && i.sold < avgPop) counts.puzzle++;
    else counts.dog++;
  }

  const secondary = [
    { label: `Stars (high margin, popular)`, value: counts.star.toString() },
    { label: `Plowhorses (low margin, popular)`, value: counts.plowhorse.toString() },
    { label: `Puzzles (high margin, slow)`, value: counts.puzzle.toString() },
    { label: `Dogs (low margin, slow)`, value: counts.dog.toString() },
  ];

  let level: 'ok' | 'warn' | 'bad' = 'ok';
  let text = copy.ok.replace('{s}', counts.star.toString());
  if (counts.dog + counts.plowhorse === items.length && items.length > 0) {
    level = 'bad';
    text = copy.bad;
  } else if (counts.plowhorse > counts.star) {
    level = 'warn';
    text = copy.warn.replace('{p}', counts.plowhorse.toString());
  }

  return {
    primary: { label: params.primaryLabel as string, value: `${counts.star} / ${items.length}` },
    secondary,
    verdict: { level, text },
  };
}

/** T8 recipe-scaler — 配料批量换算 */
export function calcScaler(values: Record<string, string>, rows: Row[], params: any): EngineResult {
  const from = Math.max(1, num(values.servings));
  const to = Math.max(1, num(values.scaleTo));
  const factor = to / from;
  const copy = params.copy as Record<string, string>;

  const lines = rows
    .filter((r) => String(r.ing ?? '').trim() !== '' && num(r.qty as string) > 0)
    .slice(0, 8)
    .map((r) => {
      const q = num(r.qty as string);
      return { label: String(r.ing), value: `${q} → ${Math.round(q * factor * 100) / 100} ${r.unit ?? ''}`.trim() };
    });

  return {
    primary: { label: params.primaryLabel as string, value: `×${Math.round(factor * 100) / 100}` },
    secondary: lines,
    verdict: { level: 'info', text: copy.info },
  };
}

/** Booth Rent vs Commission — 美业两种从业模式的月度净收入对比 */
export function calcBoothVsCommission(values: Record<string, string>, params: any): EngineResult {
  const weeklySales = num(values.weeklySales);
  const commPct = clamp(num(values.commissionPct), 10, 80) / 100;
  const rent = num(values.boothRent);
  const monthlySales = weeklySales * 4.33;
  const commNet = monthlySales * commPct;
  const rentNet = monthlySales - rent;
  const rentShare = monthlySales > 0 ? (rent / monthlySales) * 100 : 0;
  const copy = params.copy as Record<string, string>;

  const better = rentNet > commNet ? 'Booth rent' : 'Commission';
  const diff = Math.abs(rentNet - commNet);
  let level: 'ok' | 'warn' | 'bad' | 'info' = 'info';
  let text = copy.info;
  if (weeklySales > 0) {
    if (rentShare > 25) { level = 'warn'; text = copy.rentHigh.replace('{s}', rentShare.toFixed(0)); }
    else { level = 'ok'; text = copy.ok.replace('{w}', better).replace('{d}', money(diff)); }
  }
  return {
    primary: { label: params.primaryLabel as string, value: `${better === 'Booth rent' ? 'Booth' : 'Commission'}` },
    secondary: [
      { label: 'Booth rent nets', value: money(rentNet) + '/mo' },
      { label: 'Commission nets', value: money(commNet) + '/mo' },
      { label: 'Rent as % of sales', value: rentShare.toFixed(0) + '% (guideline 15–25%)' },
    ],
    gauge: makeGauge2(clamp(rentShare, 0, 60), 0, 60, [15, 25]),
    verdict: { level, text },
  };
}
