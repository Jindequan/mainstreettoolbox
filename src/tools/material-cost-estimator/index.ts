import type { RegisteredTool } from '../../lib/types';
import { num, money } from '../../lib/types';

export default {
  slug: 'material-cost-estimator',
  industry: 'construction',
  name: 'Material Cost Estimator',
  tagline: 'Materials with waste, priced right. No signup.',
  title: 'Material Cost Estimator — Free tool with waste factor',
  description: 'List your materials with quantities and unit costs, add a waste factor, and get the true material budget for the job — printable for your records.',
  result: { label: 'Material budget' },
  fields: [
    { id: 'wastePct', label: 'Waste factor', kind: 'slider', default: 10, min: 0, max: 30, step: 1, hint: 'cuts, breaks, mistakes — 10% typical' },
  ],
  rows: {
    id: 'materials',
    label: 'Materials list',
    columns: [
      { id: 'item', label: 'Material', kind: 'text', placeholder: '2×6 pressure treated' },
      { id: 'qty', label: 'Qty', kind: 'number', placeholder: '20' },
      { id: 'unitCost', label: 'Unit $', kind: 'money', placeholder: '8.98' },
    ],
    preset: [
      { item: '2×6 PT boards (12 ft)', qty: 20, unitCost: 8.98 },
      { item: 'Deck screws (5 lb)', qty: 2, unitCost: 39.97 },
      { item: 'Concrete tubes', qty: 6, unitCost: 12.48 },
    ],
    addLabel: '+ Add material',
  },
  params: {
    primaryLabel: 'Material budget',
    copy: {
      info: 'Materials are billed at cost plus your markup — the waste factor is your insurance, priced into the budget before the first cut.',
      footnote: 'Budget includes the waste factor above.',
    },
  },
  compute: (values, rows, p) => {
    const wastePct = num(values.wastePct) / 100;
    const base = rows.reduce((s, r) => s + num(r.qty as string) * num(r.unitCost as string), 0);
    const total = base * (1 + wastePct);
    const copy = p.copy as Record<string, string>;
    return {
      primary: { label: p.primaryLabel as string, value: money(total) },
      secondary: [
        { label: 'Subtotal (no waste)', value: money(base) },
        { label: 'Waste allowance', value: money(total - base) },
        { label: 'Suggested bill (cost +15%)', value: money(total * 1.15) },
      ],
      verdict: { level: 'info', text: copy.info },
    };
  },
  explain: `
    <p>Every trade has a waste rate: deck boards that split, tiles that crack, paint that vanishes. Budgeting
    materials at the exact sum is budgeting to lose money — the standard allowance is <b>10%</b> for lumber and
    paint, up to 15–20% for tile and stone.</p>
    <p>The estimator shows three numbers: the bare sum, the waste allowance, and a suggested bill at cost plus
    15% — because materials sitting on a job site are capital you fronted, and fronting capital is worth a
    markup.</p>`,
  faq: [
    { q: 'How much waste should I budget?', a: 'Lumber and paint: 10%. Tile, stone and anything cut to pattern: 15–20%. Anything with a high failure rate on first fix: more. Track your actuals per job and adjust.' },
    { q: 'Should clients see the waste factor?', a: 'Show the total, not the arithmetic. "Materials including standard waste allowance" is an honest line item; a visible 10% surcharge reads as padding.' },
  ],
  related: ['contractor-hourly-rate-calculator', 'work-order-generator', 'markup-vs-margin-calculator'],
} as RegisteredTool;
