// E-Doc 文档型工具引擎——清单 / 发票 / 工单 / 收据 / 价目表 / 盘点 / 折扣算术
import { money, num, type EngineResult, type Row } from '../lib/types';

const docTotal = (rows: Row[], costKey: string, qtyKey?: string) => {
  let sum = 0;
  for (const r of rows) {
    const q = qtyKey ? num(r[qtyKey] as string) : 1;
    sum += num(r[costKey] as string) * (qtyKey ? q : 1);
  }
  return sum;
};

/** Cleaning Checklist Builder */
export function calcChecklist(values: Record<string, string>, rows: Row[], params: any): EngineResult {
  const tasks = rows.filter((r) => String(r.task ?? '').trim() !== '');
  const copy = params.copy as Record<string, string>;
  return {
    primary: { label: params.primaryLabel as string, value: `${tasks.length} tasks` },
    doc: {
      title: `${values.cleanType ?? 'Standard'} cleaning checklist — ${values.homeType ?? 'Home'}`,
      rows: tasks.map((r) => ({ name: `☐  ${String(r.task)}`, value: r.room ? String(r.room) : '' })),
      footnote: copy.footnote,
    },
    verdict: { level: 'info', text: copy.info },
  };
}

/** 通用行项目文档：invoice / work order / receipt */
export function calcLineDoc(values: Record<string, string>, rows: Row[], params: any): EngineResult {
  const nameKey = params.rowKeys.name as string;
  const detailKey = params.rowKeys.detail as string | undefined;
  const amountKey = params.rowKeys.amount as string;
  const docRows = rows
    .filter((r) => String(r[nameKey] ?? '').trim() !== '' && num(r[amountKey] as string) > 0)
    .map((r) => ({
      name: String(r[nameKey]),
      detail: detailKey ? String(r[detailKey] ?? '') : undefined,
      value: money(num(r[amountKey] as string)),
    }));
  let total = 0;
  for (const r of rows) total += num(r[amountKey] as string);
  const copy = params.copy as Record<string, string>;
  return {
    primary: { label: params.primaryLabel as string, value: money(total) },
    doc: {
      title: copy.docTitle,
      fields: [
        { label: 'Prepared for', value: values.client || '—' },
        ...(values.date ? [{ label: 'Date', value: values.date }] : []),
      ],
      rows: docRows,
      total: { label: 'Total', value: money(total) },
      footnote: copy.footnote,
    },
    verdict: { level: 'info', text: copy.info },
  };
}

/** Service Price List Builder */
export function calcPriceList(values: Record<string, string>, rows: Row[], params: any): EngineResult {
  const items = rows.filter((r) => String(r.service ?? '').trim() !== '' && num(r.price as string) > 0);
  const copy = params.copy as Record<string, string>;
  return {
    primary: { label: params.primaryLabel as string, value: `${items.length} services` },
    doc: {
      title: `${values.salonName || 'Service menu'} — price list`,
      rows: items.map((r) => ({ name: String(r.service), detail: r.duration ? `${r.duration} min` : undefined, value: money(num(r.price as string)) })),
      footnote: copy.footnote,
    },
    verdict: { level: 'info', text: copy.info },
  };
}

/** Inventory Count Sheet */
export function calcInventory(values: Record<string, string>, rows: Row[], params: any): EngineResult {
  const rowsV = rows.map((r) => ({ ...r, value: num(r.qty as string) * num(r.unitCost as string) }));
  const total = rowsV.reduce((s, r) => s + r.value, 0);
  const copy = params.copy as Record<string, string>;
  return {
    primary: { label: params.primaryLabel as string, value: money(total) },
    doc: {
      title: 'Inventory count',
      rows: rowsV.filter((r) => String(r.item ?? '').trim() !== '').map((r) => ({
        name: String(r.item), detail: `${num(r.qty)} × ${money(num(r.unitCost))}`, value: money(r.value),
      })),
      total: { label: 'Total inventory value', value: money(total) },
      footnote: copy.footnote,
    },
    verdict: { level: 'info', text: copy.info },
  };
}

/** Discount Profit — 打折后需要多少销量增幅才保住利润 */
export function calcDiscountVolume(values: Record<string, string>, params: any): EngineResult {
  const margin = clampNum(num(values.margin), 1, 99);
  const discount = clampNum(num(values.discount), 0, margin);
  const lift = margin - discount > 0 ? (discount / (margin - discount)) * 100 : Infinity;
  const copy = params.copy as Record<string, string>;
  const level = lift > 100 ? 'bad' : lift > 40 ? 'warn' : 'ok';
  const text = lift > 0 && Number.isFinite(lift)
    ? copy.text.replace('{l}', lift.toFixed(0)).replace('{d}', discount.toString())
    : copy.info;
  return {
    primary: { label: params.primaryLabel as string, value: Number.isFinite(lift) ? `+${lift.toFixed(0)}%` : '—' },
    secondary: [
      { label: 'New price on a $100 item', value: money(100 - discount) },
      { label: 'Profit per unit after discount', value: money(margin - discount) },
    ],
    verdict: { level, text },
  };
}
function clampNum(v: number, lo: number, hi: number) { return Math.min(hi, Math.max(lo, v)); }
