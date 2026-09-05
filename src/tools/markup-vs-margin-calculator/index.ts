import type { RegisteredTool } from '../../lib/types';
import { calcMarkupMargin } from '../../engines/price';

export default {
  slug: 'markup-vs-margin-calculator',
  industry: 'restaurant',
  name: 'Markup vs Margin Calculator',
  tagline: 'The classic mix-up, solved. No signup.',
  title: 'Markup vs Margin Calculator — Free tool',
  description: 'Convert between markup and margin and see the menu price each one produces — the classic small-business pricing mix-up, solved instantly. Free, no signup.',
  result: { label: 'Menu price' },
  fields: [
    { id: 'cost', label: 'Your cost', kind: 'money', default: 10 },
    {
      id: 'mode', label: 'I know the…', kind: 'select', default: 'markup',
      options: [
        { value: 'markup', label: 'Markup % I want' },
        { value: 'margin', label: 'Margin % I want' },
      ],
    },
    { id: 'rate', label: 'Percentage', kind: 'slider', default: 50, min: 5, max: 90, step: 1 },
  ],
  params: {
    primaryLabel: 'Price',
    copy: {
      info: 'A {m} markup is a {g} margin — same dish, two vocabularies. Make sure your staff and your accountant speak the same one.',
    },
  },
  compute: (values, _rows, p) => calcMarkupMargin(values, p),
  explain: `
    <p>Markup and margin describe the same money from two directions. <b>Markup</b> is profit compared to
    <em>cost</em>; <b>margin</b> is profit compared to <em>price</em>. A 50% markup on a $10 dish is a $15 price —
    but that same dish only has a <b>33.3% margin</b>, because $5 of profit is a third of $15.</p>
    <p>The mix-up is expensive: a owner who asks for "50% margin" but prices with a 50% markup pockets a third,
    not a half. Whichever number your bookkeeper reports, make sure the kitchen and the spreadsheet mean the
    same thing.</p>
    <table>
      <thead><tr><th>Markup</th><th>Margin</th><th>Price on a $10 cost</th></tr></thead>
      <tbody>
        <tr><td>25%</td><td>20%</td><td>$12.50</td></tr>
        <tr><td>50%</td><td>33.3%</td><td>$15.00</td></tr>
        <tr><td>75%</td><td>42.9%</td><td>$17.50</td></tr>
        <tr><td>100%</td><td>50%</td><td>$20.00</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'Which should I use — markup or margin?', a: 'Use whichever your trade speaks. Restaurants and bars usually talk food cost percentage, which is margin language (food cost % = 1 − margin). Suppliers quote markup. Know both, price once.' },
    { q: 'Why does 100% markup equal 50% margin?', a: 'Doubling your cost adds a profit equal to the cost (100% markup), but that profit is half of the final price, because price = cost + profit. Margin is always smaller than markup for the same sale.' },
    { q: 'What margin do restaurants aim for?', a: 'On individual dishes, margins of 65–72% (a 28–35% food cost) are typical. Net profit for the whole restaurant is far thinner — usually 3–9% — after labor, rent and overhead.' },
  ],
  related: ['menu-pricing-calculator', 'food-cost-percentage-calculator', 'profit-margin-calculator', 'break-even-calculator'],
} as RegisteredTool;
