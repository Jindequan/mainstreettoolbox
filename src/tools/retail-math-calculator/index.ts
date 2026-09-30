import type { RegisteredTool } from '../../lib/types';
import { money, num } from '../../lib/types';

export default {
  slug: 'retail-math-calculator',
  industry: 'retail',
  name: 'Retail Math Calculator',
  tagline: 'Every formula the shop runs on, live — with a cheat sheet to print. No signup.',
  title: 'Retail Math Calculator — Price, Margin & Markup Cheat Sheet | Main Street Toolbox',
  description: 'Retail math, live: price from cost, markup ⇄ margin, markdown check, sell-through and break-even — plus a printable one-page cheat sheet. Free, no signup.',
  result: { label: 'Shelf price' },
  fields: [
    { id: 'cost', label: 'What you pay wholesale', kind: 'money', default: 10 },
    { id: 'markup', label: 'Markup %', kind: 'number', default: 100 },
  ],
  params: {},
  // 配置演示用 compute(bespoke 页面不经过它;hub 卡与注册表只读声明字段)
  compute: (values) => {
    const cost = num(values.cost) || 10;
    const markup = num(values.markup) || 100;
    const price = cost * (1 + markup / 100);
    return {
      primary: { label: 'Shelf price', value: money(price) },
      secondary: [
        { label: 'Profit per unit', value: money(price - cost) },
        { label: 'Margin', value: `${((markup / (100 + markup)) * 100).toFixed(1)}%` },
      ],
      verdict: { level: 'info', text: 'Keystone demo — cost doubled is a 100% markup and a 50% margin.' },
    };
  },
  explain: `
    <h3>What is retail math?</h3>
    <p>Retail math is four numbers and the conversions between them: <b>cost, price, markup and margin</b>,
    plus the stock numbers that tell you whether the shelf is working — <b>markdown, sell-through, turnover
    and break-even</b>. This page keeps every formula live: type what you know, read what you need, and print
    the cheat sheet for the stockroom wall.</p>
    <h3>How do you convert between markup and margin?</h3>
    <p>The two describe the same profit from different bases, so the conversion is arithmetic, not opinion:
    <b>margin = markup ÷ (1 + markup)</b>, and back the other way, <b>markup = margin ÷ (1 − margin)</b>.
    A $10 cost at a 100% markup prices at $20 — a 50% margin. Ask for the price you can defend, then read
    the other number off it.</p>
    <h3>Which retail ratios matter most?</h3>
    <p>Price sets the margin; stock decides whether you keep it. The three checks that catch trouble early:
    the <b>markdown check</b> (what a planned discount demands in volume), <b>sell-through</b> (is the buy
    moving at the depth you bought), and <b>break-even</b> (the sales the fixed costs demand). Run them
    before the money is committed — the Markup vs Margin and Discount Profit calculators cover the first
    two in depth.</p>`,
  faq: [
    { q: 'What is retail math?', a: 'The set of formulas retailers use to price and buy: cost-to-price conversions (markup and margin), markdown math, sell-through, inventory turnover, GMROI and break-even. It is arithmetic, but the ratios — not the adding — are what decide whether a shop makes money.' },
    { q: 'What is the difference between retail math and basic math?', a: 'Basic math is the arithmetic itself; retail math is the specific ratios retailers run constantly — markup vs margin, units vs dollars, stock vs sales. Two people can both do basic math and still price a $10 cost at $12 thinking it is a "20% margin" when it is a 20% markup and a 16.7% margin.' },
    { q: 'How do I calculate retail price from cost?', a: 'From a markup: price = cost × (1 + markup). From a margin: price = cost ÷ (1 − margin). A $10 item at a 100% markup and at a 50% margin both land at $20. The Retail Markup Calculator works this problem in depth.' },
    { q: 'What is a good sell-through rate?', a: 'For seasonal goods, roughly 40–60% by mid-season and 70–80%+ by season end is the usual target — enough to exit the season without heavy markdowns. Below that, the buy was too deep; far above, you likely sold out early and left sales on the table.' },
    { q: 'What is GMROI?', a: 'Gross Margin Return on Inventory Investment: gross margin dollars ÷ average inventory cost. It answers "how many dollars of margin does each inventory dollar earn per year" — many independent shops aim for roughly $2.50–$3.00 or better, but the number only means something against your own trend and category.' },
    { q: 'How deep can I discount and still profit?', a: 'A 50%-margin item survives a 20% discount only if unit volume rises about 67%. The Markdown module above shows the lift your own margin needs — check it before the sale, not during it.' },
  ],
  related: ['retail-markup-calculator', 'markup-vs-margin-calculator', 'discount-profit-calculator', 'profit-margin-calculator', 'break-even-calculator'],
} as RegisteredTool;
