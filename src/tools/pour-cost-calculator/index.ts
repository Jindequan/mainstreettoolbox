import type { RegisteredTool } from '../../lib/types';
import { num } from '../../lib/types';

// 基准（候选池闸 3 已核，2026-09-15 R2 研究轮）：
// 总体 18–24%（Backbar + DoorDash）；>25% 红线；分品类 spirits 15–22% / draft 20–28% / wine 28–40%（MAJC + Bevspot）。
const BANDS: Record<string, { lo: number; hi: number; target: number }> = {
  spirits: { lo: 15, hi: 22, target: 18 },
  draft: { lo: 20, hi: 28, target: 24 },
  wine: { lo: 28, hi: 40, target: 34 },
};

export default {
  slug: 'pour-cost-calculator',
  industry: 'restaurant',
  name: 'Pour Cost Calculator',
  tagline: 'Know what every pour really costs you. No signup.',
  title: 'Pour Cost Calculator — Free Bar & Beverage Cost Tool',
  description: 'Check any drink against its category band: spirits 15–22%, draft beer 20–28%, wine 28–40% — with the menu price that fixes a high pour cost. Free bar calculator, no signup.',
  result: { label: 'Pour cost' },
  fields: [
    {
      id: 'category', label: 'Drink category', kind: 'select', default: 'spirits',
      options: [
        { value: 'spirits', label: 'Spirits / cocktails' },
        { value: 'draft', label: 'Draft beer' },
        { value: 'wine', label: 'Wine' },
      ],
    },
    { id: 'drinkCost', label: 'Pour costs you', kind: 'money', default: 2.15, hint: 'the alcohol in the glass' },
    { id: 'menuPrice', label: 'Menu price', kind: 'money', default: 12.0 },
  ],
  params: {
    primaryLabel: 'Pour cost',
    copy: {
      ok: '{v} pour cost — inside the {band} band for {cat}.',
      warn: '{v} is above the {hi}% ceiling for {cat} — reprice the drink before pouring more.',
      bad: '{v} is far above the band — this pour is drinking your margin.',
      low: '{v} is below the {band} band for {cat}. Either a generous pour or a strong price — make sure it is on purpose.',
    },
  },
  compute: (values, _rows, p) => {
    const cat = (values.category as string) in BANDS ? (values.category as string) : 'spirits';
    const band = BANDS[cat];
    const cost = num(values.drinkCost as number);
    const price = num(values.menuPrice as number);
    const pct = price > 0 ? (cost / price) * 100 : 0;
    const catNames: Record<string, string> = { spirits: 'spirits', draft: 'draft beer', wine: 'wine' };

    let level: 'ok' | 'warn' | 'bad' | 'info';
    let tmpl: string;
    if (price <= 0 || cost <= 0) {
      level = 'info'; tmpl = 'Enter the pour cost and the menu price.';
    } else if (pct < band.lo) {
      level = 'ok'; tmpl = (p.copy as Record<string, string>).low;
    } else if (pct <= band.hi) {
      level = 'ok'; tmpl = (p.copy as Record<string, string>).ok;
    } else if (pct <= band.hi + 5) {
      level = 'warn'; tmpl = (p.copy as Record<string, string>).warn;
    } else {
      level = 'bad'; tmpl = (p.copy as Record<string, string>).bad;
    }
    const text = tmpl
      .replace('{v}', pct.toFixed(1) + '%')
      .replace('{band}', `${band.lo}–${band.hi}%`)
      .replace('{hi}', String(band.hi))
      .replace('{cat}', catNames[cat]);

    const fixPrice = cost > 0 ? cost / (band.target / 100) : 0;
    return {
      primary: { label: p.primaryLabel as string, value: price > 0 ? pct.toFixed(1) + '%' : '—' },
      secondary: [
        { label: `Menu price at ${band.target}% target`, value: fixPrice > 0 ? '$' + fixPrice.toFixed(2) : '—' },
        { label: 'Category band', value: `${band.lo}–${band.hi}%` },
      ],
      gauge: {
        value: pct, min: 0, max: 60,
        healthy: [band.lo, band.hi], unit: '%',
      },
      verdict: { level, text },
    };
  },
  explain: `
    <h3>What is pour cost?</h3>
    <p>Pour cost is the beverage version of food cost: <b>what the alcohol in the glass costs you, divided by
    what the drink sells for</b>. A cocktail built on $2.15 of gin that sells for $12 runs a 17.9% pour cost.
    Across the whole bar program, most operators target <b>18–24% overall</b> (Backbar and DoorDash industry
    data) — above 25% and the bar is subsidizing the room.</p>
    <h3>What is a good pour cost by category?</h3>
    <p>Bands differ by category because the products work differently: spirits pour high margins on small
    quantities, draft beer loses head to line waste, and wine is priced to sell the bottle. The commonly used
    US bands (MAJC and Bevspot benchmarks):</p>
    <table>
      <thead><tr><th>Category</th><th>Healthy band</th><th>Typical target</th></tr></thead>
      <tbody>
        <tr><td>Spirits / cocktails</td><td>15–22%</td><td>~18%</td></tr>
        <tr><td>Draft beer</td><td>20–28%</td><td>~24%</td></tr>
        <tr><td>Wine (by the glass)</td><td>28–40%</td><td>~34%</td></tr>
        <tr><td>Whole bar program</td><td>18–24%</td><td>~20%</td></tr>
      </tbody>
    </table>
    <h3>How do I fix a drink that pours high?</h3>
    <p>Price beats portion. The result card shows the menu price that brings the drink back to its category
    target — raise that number before you shrink the pour, because guests notice a short cocktail faster than
    a dollar on the price. If the price can't move, the recipe can: a cheaper pour grade or a shorter build
    fixes the math without touching the menu.</p>`,
  faq: [
    { q: 'What is a good pour cost percentage?', a: 'Most US bars target 18–24% overall, per Backbar and DoorDash industry data. By category: spirits run 15–22%, draft beer 20–28%, and wine by the glass 28–40% (MAJC and Bevspot benchmarks). Sustained above 25% overall, the bar is losing money on every round.' },
    { q: 'How do I calculate pour cost per drink?', a: 'Divide what the alcohol in the glass costs you by the menu price, times 100. A pour costing $2.15 sold at $12 runs 17.9%. Cost the poured amount — the 2 oz of gin, not the bottle.' },
    { q: 'Why is wine pour cost higher than spirits?', a: 'Wine programs accept 28–40% because a by-the-glass list must sell through open bottles quickly; the margin is made on volume and bottle sales. Spirits concentrate margin in small pours, which is why 15–22% is normal there.' },
    { q: 'How do I control draft beer pour cost?', a: 'The 20–28% draft band assumes honest lines. Foam waste, over-pours and uncalibrated taps are the usual culprits when draft runs hot — check line temperature and glassware before touching the price.' },
  ],
  related: ['food-cost-percentage-calculator', 'recipe-cost-calculator', 'menu-engineering-matrix', 'prime-cost-calculator'],
} as RegisteredTool;
