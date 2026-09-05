import type { RegisteredTool } from '../../lib/types';
import { calcMenuMatrix } from '../../engines/split';

export default {
  slug: 'menu-engineering-matrix',
  industry: 'restaurant',
  name: 'Menu Engineering Matrix',
  tagline: 'See which dishes carry your menu. No signup.',
  title: 'Menu Engineering Matrix — Free tool for restaurants',
  description: 'Enter your dishes with prices, costs and sales counts to classify every item as a Star, Plowhorse, Puzzle or Dog — and see which dishes deserve a new price. Free, no signup.',
  result: { label: 'Stars on your menu', sub: 'out of {n} dishes analyzed' },
  fields: [],
  rows: {
    id: 'dishes',
    label: 'Your menu',
    hint: 'sales count for a representative week or month',
    columns: [
      { id: 'dish', label: 'Dish', kind: 'text', placeholder: 'e.g. cheeseburger' },
      { id: 'price', label: 'Price', kind: 'money', placeholder: '0.00' },
      { id: 'cost', label: 'Cost', kind: 'money', placeholder: '0.00' },
      { id: 'sold', label: 'Sold', kind: 'number', placeholder: '0' },
    ],
    preset: [
      { dish: 'Classic burger', price: 16, cost: 5.2, sold: 120 },
      { dish: 'Cobb salad', price: 14, cost: 3.8, sold: 55 },
      { dish: 'Ribeye special', price: 32, cost: 14, sold: 40 },
      { dish: 'Veggie pasta', price: 15, cost: 7.5, sold: 18 },
    ],
    addLabel: '+ Add dish',
  },
  params: {
    primaryLabel: 'Stars on your menu',
    copy: {
      ok: '{s} Star dishes carry your menu. Protect them: keep their quality and placement, and test small price increases.',
      warn: 'Plowhorses ({p}) are popular but underpriced — they are your safest reprice candidates. Nudge them $1 at a time.',
      bad: 'Nothing is both profitable and popular yet. Start by repricing Plowhorses and re-positioning Puzzles on the menu.',
      needMore: 'Add at least two dishes (with price, cost and sales count) to classify your menu.',
    },
  },
  compute: (values, rows, p) => calcMenuMatrix(rows, p),
  explain: `
    <p>Menu engineering classifies every dish on two axes: <b>margin</b> (price minus plate cost) and
    <b>popularity</b> (how often it sells). The comparison line is your own menu's average — not an industry
    number — so the verdicts always reflect your actual mix.</p>
    <table>
      <thead><tr><th>Class</th><th>Margin</th><th>Popular</th><th>What to do</th></tr></thead>
      <tbody>
        <tr><td>★ Star</td><td>High</td><td>Yes</td><td>Protect: never drop from the menu, keep quality locked</td></tr>
        <tr><td>🐴 Plowhorse</td><td>Low</td><td>Yes</td><td>Reprice gently, or re-plate with cheaper ingredients</td></tr>
        <tr><td>🧩 Puzzle</td><td>High</td><td>No</td><td>Re-position: better menu placement, server push, better photo</td></tr>
        <tr><td>🐕 Dog</td><td>Low</td><td>No</td><td>Retire it and free up prep time and inventory</td></tr>
      </tbody>
    </table>
    <p>Reclassify once a season, or after any price change — the averages move when the menu moves.</p>`,
  faq: [
    { q: 'What is menu engineering?', a: 'A method from restaurant economics that scores every dish on profitability and popularity, then prescribes an action per class: protect Stars, reprice Plowhorses, reposition Puzzles, retire Dogs.' },
    { q: 'What sales period should I enter?', a: 'Any representative period works — a typical week or a full month. What matters is that every dish uses the same period, because popularity is compared against your own average.' },
    { q: 'A dish is a Plowhorse. Should I just raise the price?', a: 'Usually yes, in small steps. Plowhorses already have proven demand; a modest price increase typically survives. Watch sales for two weeks after the change and stop if volume drops sharply.' },
  ],
  related: ['menu-pricing-calculator', 'food-cost-percentage-calculator', 'prime-cost-calculator', 'profit-margin-calculator'],
} as RegisteredTool;
