import type { RegisteredTool } from '../../lib/types';
import { calcDiscountVolume } from '../../engines/doc';

export default {
  slug: 'discount-profit-calculator',
  industry: 'retail',
  name: 'Discount Profit Calculator',
  tagline: 'Before you slash the price, do the math. No signup.',
  title: 'Discount Profit Calculator — How much more must you sell?',
  description: "Enter your margin and the discount you're planning — see exactly how much more you must sell just to break even. The math that stops bad sales. Free, no signup.",
  result: { label: 'Extra sales needed' },
  fields: [
    { id: 'margin', label: 'Your margin', kind: 'slider', default: 40, min: 5, max: 80, step: 1, hint: '% of price that is profit' },
    { id: 'discount', label: 'Discount you plan', kind: 'slider', default: 15, min: 1, max: 60, step: 1, hint: '% off the shelf price' },
  ],
  params: {
    primaryLabel: 'More sales needed',
    copy: {
      text: 'A {d}% discount only pays off if you sell <b>{l}% more units</b> — same margin dollars, more work. At thin margins that number is a fantasy; at 60%+ margins sales can survive it.',
      info: 'Enter your margin and planned discount.',
    },
  },
  compute: (values, _rows, p) => calcDiscountVolume(values, p),
  explain: `
    <p>The discount trap: on a 40% margin, a 15%-off sale needs <b>60% more unit sales</b> just to make the same
    profit — and at a 20% margin it needs infinite (you'd be selling at cost). Discounts don't create profit;
    they trade it for volume, and the exchange rate is brutal at thin margins.</p>
    <p>That doesn't mean never discount — it means knowing the price of the party before you throw it. Run the
    number first; if the required lift looks impossible, try a bundled offer or a minimum-spend threshold
    instead, which move volume without cutting the margin on every unit.</p>`,
  faq: [
    { q: 'How much more do I need to sell at 20% off?', a: 'On a 40% margin: +100% — double. On a 50% margin: +67%. On a 20% margin: mathematically impossible (you\'d be selling below cost). The thinner the margin, the deadlier the discount.' },
    { q: 'Are sales and discounts always bad?', a: 'No — they\'re fine for moving dead stock at cost, winning a new client whose repeat business is worth the give-up, or matching a competitor once. Bad is running them by habit without running this math.' },
  ],
  related: ['retail-markup-calculator', 'markup-vs-margin-calculator', 'profit-margin-calculator'],
} as RegisteredTool;
