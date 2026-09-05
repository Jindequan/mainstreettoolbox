import type { RegisteredTool } from '../../lib/types';
import { calcMarkupMargin } from '../../engines/price';

export default {
  slug: 'retail-markup-calculator',
  industry: 'retail',
  name: 'Retail Markup Calculator',
  tagline: 'Price the shelf, protect the margin. No signup.',
  title: 'Retail Markup Calculator — Free tool for small shops',
  description: 'From wholesale cost to shelf price: convert between markup and margin, see profit per unit and protect your margin before a discount. Free, no signup.',
  result: { label: 'Shelf price' },
  fields: [
    { id: 'cost', label: 'What you pay wholesale', kind: 'money', default: 10 },
    {
      id: 'mode', label: 'I know the…', kind: 'select', default: 'markup',
      options: [
        { value: 'markup', label: 'Markup % I want' },
        { value: 'margin', label: 'Margin % I need' },
      ],
    },
    { id: 'rate', label: 'Percentage', kind: 'slider', default: 100, min: 5, max: 300, step: 5 },
  ],
  params: {
    primaryLabel: 'Shelf price',
    copy: {
      info: 'A {m} markup is a {g} margin. Retail keystone (doubling cost) is a 100% markup — but only a 50% margin, because rent and payroll come out of the other half.',
    },
  },
  compute: (values, _rows, p) => calcMarkupMargin(values, p),
  explain: `
    <p>Retail lives on markup — but survives on margin. <b>Keystone pricing</b> (doubling wholesale cost) is the
    traditional floor for independent shops: a 100% markup, which is a 50% margin before rent. Gift and
    specialty often run higher; groceries and hardware run far lower and make it up in turns.</p>
    <p>The number that matters after the price is set is the <b>markdown math</b>: a 20%-off sale needs roughly
    1.5× the units to hold profit. Price the shelf so that the discount you'll eventually run still pays the
    rent.</p>
    <table>
      <thead><tr><th>Wholesale</th><th>Keystone price</th><th>Margin</th></tr></thead>
      <tbody>
        <tr><td>$5</td><td>$10</td><td>50%</td></tr>
        <tr><td>$12</td><td>$24</td><td>50%</td></tr>
        <tr><td>$25</td><td>$50</td><td>50%</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'What markup should a small retailer use?', a: 'Keystone (100% markup, 50% margin) is the traditional starting point for gifts, décor and apparel. Convenience and grocery categories run 15–35% margins and survive on volume — know your category before you set the percentage.' },
    { q: 'Why is my margin half my markup?', a: 'Because margin compares profit to the price, not the cost. Doubling a $10 cost makes $10 profit on a $20 price — 100% markup, 50% margin. Every percentage point of margin needs more than two points of markup as costs rise.' },
    { q: 'How deep can I discount and still profit?', a: 'A 50%-margin item survives a 20% discount only if volume rises about 67%. Check the margin first, the volume second — most clearance loses money twice: once on the discount, once on the space it holds.' },
  ],
  related: ['food-cost-percentage-calculator', 'profit-margin-calculator', 'break-even-calculator', 'menu-pricing-calculator'],
} as RegisteredTool;
