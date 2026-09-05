import type { RegisteredTool } from '../../lib/types';
import { calcMenuPrice } from '../../engines/price';
import { num } from '../../lib/types';

const params = {
  primaryLabel: 'Suggested menu price',
  benchmarks: { healthy: [28, 35], warnUpTo: 40 },
  copy: {
    ok: '{v} food cost at this price — inside the healthy 28–35% band for full-service restaurants.',
    warn: '{v} food cost is above the 35% ceiling — nudge the price up or trim the plate.',
    bad: '{v} food cost is in the danger zone — this dish loses money at scale. Reprice now.',
  },
};

const compute: Compute = (values, rows, p) => {
  const total = rows.reduce((s, r) => s + num(r.cost as string), 0);
  return calcMenuPrice(values, total, p);
};

export default {
  slug: 'menu-pricing-calculator',
  industry: 'restaurant',
  name: 'Menu Pricing Calculator',
  tagline: 'Price your dish in 30 seconds. No signup.',
  title: 'Menu Pricing Calculator — Free tool for restaurants',
  description: 'Enter your ingredient costs and target food cost percentage to get a menu price that protects your margin. Free, instant, no signup.',
  result: { label: 'Suggested menu price', sub: 'Plate cost {cost} · You keep {keep} a plate' },
  fields: [
    { id: 'targetPct', label: 'Target food cost %', kind: 'slider', default: 30, min: 15, max: 45, step: 0.5, hint: 'typical is 28–35%' },
    { id: 'shared', label: 'Sides & garnish share', kind: 'money', default: 0.5, hint: 'plate cost carried by sides' },
    {
      id: 'rounding', label: 'Rounding style', kind: 'select', default: '95',
      options: [
        { value: '95', label: 'Charm pricing — $X.95' },
        { value: '00', label: 'Whole dollars — $X.00' },
        { value: 'none', label: 'Exact — no rounding' },
      ],
    },
  ],
  rows: {
    id: 'ingredients',
    label: 'Ingredients & costs',
    hint: 'wholesale cost per dish',
    columns: [
      { id: 'name', label: 'Ingredient', kind: 'text', placeholder: 'e.g. burger patty' },
      { id: 'cost', label: 'Cost', kind: 'money', placeholder: '0.00' },
    ],
    preset: [
      { name: 'Burger patty, 8 oz', cost: 2.4 },
      { name: 'Brioche bun', cost: 0.65 },
      { name: 'Cheddar, sauce & toppings', cost: 1.35 },
    ],
    addLabel: '+ Add ingredient',
  },
  params,
  compute,
  explain: `
    <p>Food cost is the share of the menu price that goes to ingredients. At <b>30%</b>, a dish that costs you
    $4.90 to plate should sell for about $16.95 — for every dollar a guest pays, roughly 30¢ covers the food and
    the rest covers labor, rent and (hopefully) profit.</p>
    <p>The calculator rounds up to a "charm price" ($X.95) because guests read $14.95 as meaningfully cheaper
    than $15 — while your food cost percentage barely moves.</p>
    <table>
      <thead><tr><th>Food cost %</th><th>What it usually means</th></tr></thead>
      <tbody>
        <tr><td>Under 28%</td><td>Healthy — room to invest in quality or portion size</td></tr>
        <tr><td>28–35%</td><td>Typical for full-service restaurants</td></tr>
        <tr><td>35–40%</td><td>Tight — reprice your top sellers before cutting quality</td></tr>
        <tr><td>Over 40%</td><td>Danger — reprice now or the dish loses money at scale</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'What is a good food cost percentage?', a: 'Most full-service restaurants run 28–35%. Quick-service spots usually sit lower, around 25–30%. What matters more is the trend: a menu creeping from 31% to 36% is a price rise or a supplier problem waiting to be found.' },
    { q: 'Should I price at $X.95 or a whole dollar?', a: 'Charm pricing ($14.95) is the safe default for casual dining. Whole-dollar pricing reads as premium and speeds up payment — some upscale rooms use it deliberately. Test one menu section at a time.' },
    { q: 'Does this include labor and overhead?', a: 'No — this prices by plate cost only. To see whether the price actually pays the bills, run the Break-Even Calculator with your monthly fixed costs.' },
  ],
  related: ['food-cost-percentage-calculator', 'menu-engineering-matrix', 'break-even-calculator', 'prime-cost-calculator'],
} as RegisteredTool;
