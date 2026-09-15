import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 模型：行成本 = 数量 × 单位成本；单份成本 = 总成本 ÷ 份数；建议售价 = 单份成本 ÷ 目标食材成本率。
// 该工具为 BESPOKE 页（src/pages/restaurant/recipe-cost-calculator.astro），此处 compute 保持同款数学供注册表一致性。
export default {
  slug: 'recipe-cost-calculator',
  industry: 'restaurant',
  name: 'Recipe Cost Calculator',
  tagline: 'Cost the plate before you price it. No signup.',
  title: 'Recipe Cost Calculator — Free Tool with Cost per Serving',
  description: 'Enter ingredients with quantities and unit costs to get total recipe cost, cost per serving and the menu price for your target food cost percentage — a free recipe costing template in your browser. No signup.',
  result: { label: 'Cost per serving' },
  fields: [
    { id: 'servings', label: 'Servings (yield)', kind: 'number', default: 1 },
    { id: 'target', label: 'Target food cost %', kind: 'number', default: 30, hint: '25–35 is the usual band' },
  ],
  rows: {
    id: 'ingredients',
    label: 'Ingredients',
    columns: [
      { id: 'ingredient', label: 'Ingredient', kind: 'text', placeholder: 'Burger patty, 8 oz' },
      { id: 'qty', label: 'Qty', kind: 'number', placeholder: '1' },
      { id: 'unit', label: 'Unit', kind: 'text', placeholder: 'each' },
      { id: 'unitCost', label: 'Cost per unit', kind: 'money', placeholder: '2.40' },
    ],
    preset: [
      { ingredient: 'Burger patty, 8 oz', qty: 1, unit: 'each', unitCost: 2.4 },
      { ingredient: 'Brioche bun', qty: 1, unit: 'each', unitCost: 0.65 },
      { ingredient: 'Cheddar, sauce & toppings', qty: 1, unit: 'each', unitCost: 1.35 },
      { ingredient: 'Potatoes & fryer oil', qty: 1, unit: 'each', unitCost: 0.9 },
    ],
    addLabel: '+ Add ingredient',
  },
  params: {
    primaryLabel: 'Cost per serving',
    copy: {
      ok: 'Inside the 28–35% band most full-service restaurants run at.',
      warn: 'Above the 35% ceiling — reprice this dish before cutting quality.',
    },
  },
  compute: (values, rows, p) => {
    const ingredients = rows ?? [];
    const total = ingredients.reduce((s, r) => s + num(r.qty as number) * num(r.unitCost as number), 0);
    const servings = clamp(num((values as Record<string, unknown>).servings), 1, 500);
    const target = clamp(num((values as Record<string, unknown>).target), 5, 90) / 100;
    const perServing = total / servings;
    const price = target > 0 ? perServing / target : 0;
    return {
      primary: { label: p.primaryLabel as string, value: money(perServing) },
      secondary: [
        { label: 'Total recipe cost', value: money(total) },
        { label: `Menu price at ${Math.round(target * 100)}% food cost`, value: money(price) },
      ],
      verdict: { level: 'info', text: 'Price = cost per serving ÷ target food cost percentage. Most full-service restaurants run 28–35%.' },
    };
  },
  explain: `
    <p>Recipe costing is the arithmetic behind every profitable menu: each ingredient line costs
    <b>quantity × unit cost</b>, the recipe total is the sum, and dividing by the yield gives
    <b>cost per serving</b> — the number that decides the menu price.</p>
    <p>From cost to price in one step: <b>menu price = cost per serving ÷ target food cost percentage</b>.
    A plate that costs $5.30 at a 30% target needs a $17.65 menu price. Most full-service restaurants
    run 28–35% food cost; the food cost percentage checker on this site shows how a single dish lands
    against that band.</p>`,
  faq: [
    { q: 'How do I calculate the cost of a recipe?', a: 'Multiply each ingredient line by the quantity used and its unit cost, sum the lines, then divide by the number of servings the recipe yields. That is your cost per serving — the plate cost behind the menu price.' },
    { q: 'Is there a free recipe cost calculator app?', a: 'This calculator runs in any phone or tablet browser — nothing to download, no account, no subscription. Your recipe saves on this device and the cost card prints or saves to PDF from the browser.' },
    { q: 'What is the difference between recipe cost and food cost percentage?', a: 'Recipe cost is the dollars on the plate; food cost percentage is that cost divided by the menu price. Costing tells you what a dish costs to make — the percentage tells you whether the price protects it.' },
    { q: 'Should I pad the recipe cost for waste?', a: 'Yes — most operators add a few percent for trim loss, spillage and comps, or cost prepped weights instead of purchased weights. A slightly padded cost is a safer price than an optimistic one.' },
  ],
  related: ['menu-pricing-calculator', 'food-cost-percentage-calculator', 'menu-engineering-matrix', 'recipe-scaler'],
} as RegisteredTool;
