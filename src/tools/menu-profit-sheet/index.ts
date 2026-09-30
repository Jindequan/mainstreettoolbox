import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 模型：单菜成本率 = 板成本 ÷ 售价；菜单均值 = 各菜成本率的算术平均；贡献毛利 = 售价 − 板成本；
// 旗标 = 售价、成本率各自对菜单均值的二维落位（Star/Volume/Premium/Watch）。
// 该工具为 BESPOKE 页（src/pages/restaurant/menu-profit-sheet.astro），此处 compute 保持同款数学供注册表一致性。
export default {
  slug: 'menu-profit-sheet',
  industry: 'restaurant',
  name: 'Menu Profit Sheet',
  tagline: 'The whole menu on one page — costs, margins, what to fix first. No signup.',
  title: 'Menu Profit Sheet — Free Menu-Level Cost & Pricing Summary',
  description: 'Roll your costed dishes into one menu-level profit sheet: food cost % and contribution margin per dish, four pricing flags against menu averages, printable as one page. Free, no signup.',
  result: { label: 'Menu average food cost' },
  fields: [
    { id: 'target', label: 'Target food cost %', kind: 'number', default: 30, hint: '25–35 is the usual band' },
  ],
  rows: {
    id: 'dishes',
    label: 'Dishes',
    columns: [
      { id: 'dish', label: 'Dish', kind: 'text', placeholder: 'House burger & fries' },
      { id: 'price', label: 'Menu price', kind: 'money', placeholder: '16.50' },
      { id: 'cost', label: 'Plate cost', kind: 'money', placeholder: '5.30' },
    ],
    preset: [
      { dish: 'House burger & fries', price: 16.5, cost: 5.3 },
      { dish: 'Caesar salad', price: 13, cost: 2.95 },
      { dish: 'Ribeye steak', price: 30, cost: 12.4 },
      { dish: 'Smoked brisket plate', price: 21, cost: 5.85 },
    ],
    addLabel: '+ Add dish',
  },
  params: {
    primaryLabel: 'Menu average food cost',
    copy: {
      ok: 'Inside the 28–35% band most full-service kitchens run at.',
      warn: 'Above the 35% ceiling — the menu is priced too light for the plates it serves.',
    },
  },
  compute: (values, rows, p) => {
    const target = clamp(num((values as Record<string, unknown>).target), 5, 90) / 100;
    const dishes = (rows ?? []).map((r) => {
      const price = num(r.price as number), cost = num(r.cost as number);
      return { name: String(r.dish ?? ''), price, cost, pct: price > 0 && cost > 0 ? (cost / price) * 100 : null, margin: price > 0 ? price - cost : null };
    });
    const withPct = dishes.filter((d) => d.pct !== null);
    const avgPct = withPct.length ? withPct.reduce((s, d) => s + (d.pct as number), 0) / withPct.length : 0;
    const priced = dishes.filter((d) => d.price > 0);
    const avgPrice = priced.length ? priced.reduce((s, d) => s + d.price, 0) / priced.length : 0;
    const flag = (d: (typeof dishes)[number]) => {
      if (d.pct === null) return '—';
      const hiPrice = d.price >= avgPrice, lean = (d.pct as number) <= avgPct;
      if (hiPrice && lean) return '★ Star';
      if (!hiPrice && lean) return 'Volume';
      return hiPrice ? 'Premium' : 'Watch';
    };
    const margins = dishes.filter((d) => d.margin !== null);
    const avgMargin = margins.length ? margins.reduce((s, d) => s + (d.margin as number), 0) / margins.length : null;
    const over = withPct.filter((d) => (d.pct as number) > target * 100);
    const lines = dishes.map((d) => ({
      label: `${d.name || 'Unnamed'} · ${flag(d)}`,
      value: d.pct !== null ? `${money(d.price)} → ${pctOf(d.pct)} · margin ${d.margin !== null ? money(d.margin) : '—'}` : `${money(d.cost)} plate, unpriced`,
    }));

    return {
      primary: { label: p.primaryLabel as string, value: avgPct > 0 ? pctOf(avgPct) : '—' },
      secondary: [
        ...lines,
        { label: 'Average contribution margin', value: avgMargin !== null ? money(avgMargin) : '—' },
        { label: `Priced above your ${Math.round(target * 100)}% target`, value: `${over.length} dish${over.length === 1 ? '' : 'es'}` },
      ],
      verdict: {
        level: avgPct > 35 ? 'warn' : 'info',
        text: over.length > 0
          ? `${over.map((d) => d.name || 'Unnamed dish').join(', ')} run over your ${Math.round(target * 100)}% target — reprice or recost them first.`
          : 'Price = plate cost ÷ food cost %. Most full-service kitchens run 28–35% food cost.',
      },
    };
  },
  explain: `
    <h3>How do I build a menu profit sheet?</h3>
    <p>Each dish needs two numbers: menu price and plate cost. <b>Food cost % = plate cost ÷ price</b> and
    <b>contribution margin = price − plate cost</b> — the dollars a dish throws off toward rent and labor every
    time it sells. The menu average is the mean of the per-dish percentages.</p>
    <h3>What do the four flags mean?</h3>
    <p>Dishes are placed against the menu's own averages. <b>★ Star</b> = higher price, leaner cost — protect it.
    <b>Volume</b> = cheaper to make, priced to move — a small price test adds pure margin. <b>Premium</b> = priced
    high but food-heavy — check the plate for portion creep. <b>Watch</b> = cheap seat, heavy plate — reprice,
    recost or replace. The <a href="/restaurant/menu-engineering-matrix/">Menu Engineering Matrix</a> adds
    sales-mix data when you have POS counts.</p>
    <h3>What should the whole menu run?</h3>
    <p>Most full-service kitchens run <b>28–35%</b> food cost. Fix dishes one at a time — a single 45% plate among
    30% neighbors drags the average while burning margin on every order.</p>`,
  faq: [
    { q: 'How do I calculate food cost percentage for my whole menu?', a: 'Divide each dish\'s plate cost by its menu price for per-dish food cost %, then take the mean as the menu average. Compare it to your target — usually 28–35% for full service — and fix the dishes that run over one at a time.' },
    { q: 'What is contribution margin on a menu?', a: 'Menu price minus plate cost — the dollars each sale contributes toward labor, rent and profit. A $16.50 burger with a $5.30 plate contributes $11.20 per sale.' },
    { q: 'Is there a free alternative to paid menu costing reports?', a: 'For menu-level cost summaries, yes — this sheet totals your costed dishes, flags pricing risks against menu averages and prints a one-page report, free and without an account. It does not do inventory depletion or purchase tracking.' },
  ],
  related: ['recipe-cost-calculator', 'menu-pricing-calculator', 'menu-engineering-matrix', 'food-cost-percentage-calculator'],
} as RegisteredTool;

function pctOf(n: number): string {
  return (Math.round(n * 10) / 10).toFixed(1) + '%';
}
