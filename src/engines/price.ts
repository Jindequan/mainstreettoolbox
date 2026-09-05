// E2 定价/成本引擎族 — 覆盖餐饮定价、毛利、损益类工具（docs/工具清单-v1.md §3）
import { clamp, money, num, pct, type EngineResult, type GaugeSpec } from '../lib/types';

interface Benchmarks { healthy: [number, number]; warnUpTo: number }

/** 通用基准标尺判定 */
export function gaugeVerdict(
  value: number,
  b: Benchmarks,
  copy: Record<string, string>,
  fmt: (v: number) => string = (v) => pct(v),
): { level: 'ok' | 'warn' | 'bad'; text: string } {
  const [lo, hi] = b.healthy;
  if (value <= hi) return { level: 'ok', text: copy.ok.replace('{v}', fmt(value)) };
  if (value <= b.warnUpTo) return { level: 'warn', text: copy.warn.replace('{v}', fmt(value)) };
  return { level: 'bad', text: copy.bad.replace('{v}', fmt(value)) };
}

export function makeGauge(value: number, min: number, max: number, healthy: [number, number]): GaugeSpec {
  return { value, min, max, healthy };
}

/** 心理定价：向上取整到 X.95 / X.00 / 原值 */
export function roundPrice(raw: number, style: string): number {
  if (style === 'none') return raw;
  if (style === '95') {
    const f = Math.floor(raw);
    return f + 0.95 >= raw ? f + 0.95 : f + 1.95;
  }
  return Math.ceil(raw);
}

/** T1 menu-pricing-calculator */
export function calcMenuPrice(values: Record<string, string>, rowsTotal: number, params: any): EngineResult {
  const shared = num(values.shared);
  const target = clamp(num(values.targetPct) || 30, 5, 95) / 100;
  const style = values.rounding || '95';
  const cost = rowsTotal + shared;
  const raw = cost / target;
  const price = roundPrice(raw, style);
  const fc = price > 0 ? (cost / price) * 100 : 0;
  const b = params.benchmarks as Benchmarks;
  const v = gaugeVerdict(fc, b, params.copy);
  return {
    primary: { label: params.primaryLabel as string, value: money(price) },
    secondary: [
      { label: 'Plate cost', value: money(cost) },
      { label: 'You keep', value: money(price - cost) + ' a plate' },
    ],
    gauge: makeGauge(fc, 20, 40, b.healthy),
    verdict: v,
  };
}

/** T2 food-cost-percentage-calculator */
export function calcFoodCostPct(values: Record<string, string>, params: any): EngineResult {
  const cost = num(values.dishCost);
  const price = num(values.menuPrice);
  const fc = price > 0 ? (cost / price) * 100 : 0;
  const b = params.benchmarks as Benchmarks;
  const [hi] = b.healthy;
  const fixPrice = cost / (hi / 100);
  const v = gaugeVerdict(fc, b, params.copy);
  return {
    primary: { label: params.primaryLabel as string, value: price > 0 ? pct(fc) : '—' },
    secondary: [
      { label: 'Cost', value: money(cost) },
      { label: price > 0 ? 'Price' : 'Price', value: money(price) },
      { label: 'Price that fixes it', value: money(fixPrice) + ` (at ${hi}%)` },
    ],
    gauge: makeGauge(clamp(fc, 15, 50), 15, 50, b.healthy),
    verdict: price > 0 ? v : { level: 'info', text: 'Enter a menu price to see your food cost percentage.' },
  };
}

/** T7 markup-vs-margin-calculator：markup 与 margin 互算 */
export function calcMarkupMargin(values: Record<string, string>, params: any): EngineResult {
  const cost = num(values.cost);
  const mode = values.mode || 'markup';
  const rate = clamp(num(values.rate), 0, 95) / 100;
  let price: number, markup: number, margin: number;
  if (mode === 'markup') {
    price = cost * (1 + rate);
    markup = rate;
    margin = price > 0 ? (price - cost) / price : 0;
  } else {
    price = cost / (1 - rate);
    margin = rate;
    markup = cost > 0 ? (price - cost) / cost : 0;
  }
  return {
    primary: { label: params.primaryLabel as string, value: money(price) },
    secondary: [
      { label: 'Markup', value: pct(markup * 100) },
      { label: 'Margin', value: pct(margin * 100) },
      { label: 'Profit per sale', value: money(price - cost) },
    ],
    verdict: {
      level: 'info',
      text: (params.copy as Record<string, string>).info
        .replace('{m}', pct(markup * 100))
        .replace('{g}', pct(margin * 100)),
    },
  };
}

/** T5 break-even-calculator */
export function calcBreakEven(values: Record<string, string>, params: any): EngineResult {
  const fixed = num(values.fixedCosts);
  const ticket = num(values.avgTicket);
  const varPct = clamp(num(values.variablePct) || 60, 1, 99);
  const cm = 100 - varPct; // contribution margin %
  const revenue = cm > 0 ? fixed / (cm / 100) : 0;
  const coversPerDay = ticket > 0 ? revenue / ticket / 30.4 : 0;
  const b = params.benchmarks as { coversOk: number; coversWarn: number };
  const copy = params.copy as Record<string, string>;
  let verdict = { level: 'ok', text: copy.ok.replace('{c}', Math.ceil(coversPerDay).toString()) };
  if (coversPerDay > b.coversWarn) verdict = { level: 'bad', text: copy.bad.replace('{c}', Math.ceil(coversPerDay).toString()) };
  else if (coversPerDay > b.coversOk) verdict = { level: 'warn', text: copy.warn.replace('{c}', Math.ceil(coversPerDay).toString()) };
  return {
    primary: { label: params.primaryLabel as string, value: coversPerDay > 0 ? Math.ceil(coversPerDay).toString() : '—' },
    secondary: [
      { label: 'Revenue needed / month', value: money(revenue) },
      { label: 'Revenue needed / day', value: money(revenue / 30.4) },
      { label: 'Contribution margin', value: pct(cm) },
    ],
    gauge: makeGauge(cm, 30, 80, params.healthyCm as [number, number]),
    verdict,
  };
}

/** T6 labor-cost-calculator：fully loaded 人力成本 */
export function calcLaborCost(values: Record<string, string>, params: any): EngineResult {
  const wage = num(values.wage);
  const hours = num(values.hoursPerWeek) || 0;
  const tax = clamp(num(values.taxPct), 0, 40) / 100;
  const benefits = num(values.benefits);
  const weeks = 4.33;
  const monthly = wage * hours * weeks * (1 + tax) + benefits;
  const hourly = hours > 0 ? monthly / (hours * weeks) : 0;
  const revenue = num(values.monthlyRevenue);
  const sharePct = revenue > 0 ? (monthly / revenue) * 100 : -1;
  const b = params.benchmarks as Benchmarks;
  const copy = params.copy as Record<string, string>;
  if (revenue <= 0) {
    return {
      primary: { label: params.primaryLabel as string, value: money(hourly) },
      secondary: [
        { label: 'Loaded cost / month', value: money(monthly) },
        { label: 'Payroll taxes & benefits', value: money(monthly - wage * hours * weeks) },
      ],
      verdict: { level: 'info', text: copy.info },
    };
  }
  const v = gaugeVerdict(sharePct, b, copy);
  return {
    primary: { label: params.primaryLabel as string, value: money(hourly) },
    secondary: [
      { label: 'Loaded cost / month', value: money(monthly) },
      { label: 'Labor as % of revenue', value: pct(sharePct) },
    ],
    gauge: makeGauge(clamp(sharePct, 15, 55), 15, 55, b.healthy),
    verdict: v,
  };
}

/** T9 prime-cost-calculator */
export function calcPrimeCost(values: Record<string, string>, params: any): EngineResult {
  const cogs = num(values.cogs);
  const labor = num(values.labor);
  const revenue = num(values.revenue);
  const prime = cogs + labor;
  const primePct = revenue > 0 ? (prime / revenue) * 100 : 0;
  const b = params.benchmarks as Benchmarks;
  const v = gaugeVerdict(primePct, b, params.copy as Record<string, string>);
  return {
    primary: { label: params.primaryLabel as string, value: revenue > 0 ? pct(primePct) : '—' },
    secondary: [
      { label: 'Prime cost', value: money(prime) },
      { label: 'Every $1 of sales', value: revenue > 0 ? `${(prime / revenue).toFixed(2)}¢ goes to food & labor` : '—' },
    ],
    gauge: makeGauge(clamp(primePct, 30, 80), 30, 80, b.healthy),
    verdict: revenue > 0 ? v : { level: 'info', text: 'Enter monthly revenue to see your prime cost percentage.' },
  };
}

/** T10 profit-margin-calculator */
export function calcProfitMargin(values: Record<string, string>, params: any): EngineResult {
  const revenue = num(values.revenue);
  const costs = ['cogs', 'labor', 'rent', 'other'].reduce((s, k) => s + num(values[k]), 0);
  const net = revenue - costs;
  const margin = revenue > 0 ? (net / revenue) * 100 : 0;
  const b = params.benchmarks as { healthy: [number, number]; warnUpTo: number; warnLow: number };
  const copy = params.copy as Record<string, string>;
  let level: 'ok' | 'warn' | 'bad';
  let text: string;
  if (revenue <= 0) { level = 'info'; text = copy.info; }
  else if (net < 0) { level = 'bad'; text = copy.bad.replace('{v}', money(net)); }
  else if (margin >= b.healthy[0] && margin <= b.healthy[1]) { level = 'ok'; text = copy.ok.replace('{v}', pct(margin)); }
  else { level = 'warn'; text = copy.warn.replace('{v}', pct(margin)); }
  return {
    primary: { label: params.primaryLabel as string, value: revenue > 0 ? money(net) : '—' },
    secondary: [
      { label: 'Net margin', value: revenue > 0 ? pct(margin) : '—' },
      { label: 'Total costs', value: money(costs) },
      { label: 'Annualized profit', value: revenue > 0 ? money(net * 12) : '—' },
    ],
    gauge: makeGauge(clamp(margin, -5, 25), -5, 25, b.healthy),
    verdict: { level, text },
  };
}
