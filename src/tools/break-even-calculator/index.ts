import type { RegisteredTool } from '../../lib/types';
import { calcBreakEven } from '../../engines/price';

export default {
  slug: 'break-even-calculator',
  industry: 'restaurant',
  name: 'Restaurant Break-Even Calculator',
  tagline: 'Know your nightly number. No signup.',
  title: 'Restaurant Break-Even Calculator — Free tool',
  description: 'Enter monthly fixed costs, average ticket and variable cost percentage to see how many covers you need per night to break even. Free, instant, no signup.',
  result: { label: 'Covers needed per day' },
  fields: [
    { id: 'fixedCosts', label: 'Fixed costs / month', kind: 'money', default: 12000, hint: 'rent, insurance, salaries, loans' },
    { id: 'avgTicket', label: 'Average ticket', kind: 'money', default: 32, hint: 'total sales ÷ number of checks' },
    { id: 'variablePct', label: 'Variable costs', kind: 'slider', default: 60, min: 30, max: 85, step: 1, hint: 'food + hourly labor as % of sales' },
  ],
  params: {
    primaryLabel: 'Covers needed per day',
    benchmarks: { coversOk: 40, coversWarn: 70 },
    healthyCm: [55, 75] as [number, number],
    copy: {
      ok: '{c} covers a day breaks you even — achievable for most neighborhoods. Every cover after this is profit.',
      warn: '{c} covers a day is a stretch. Lock in weekday traffic (specials, events) before you open or renew a lease.',
      bad: '{c} covers a day is unrealistic for most rooms. The price, the variable costs or the fixed costs have to move.',
      info: 'Enter your costs to find your break-even point.',
    },
  },
  compute: (values, _rows, p) => calcBreakEven(values, p),
  explain: `
    <p>Break-even is the sales level where the restaurant stops losing money: fixed costs (rent, insurance,
    salaried staff, loan payments) ÷ contribution margin from each sales dollar. With a 60% variable cost
    (food plus hourly labor), every dollar of sales leaves 40¢ to pay fixed costs.</p>
    <p>Translating that into <b>covers per day</b> makes it real: it becomes a number you can compare against
    your Tuesday reality. If the required covers feel out of reach, the levers are — in order of speed —
    average ticket (sell more per check), variable costs (portion and waste), then fixed costs (the lease).</p>`,
  faq: [
    { q: 'What counts as a fixed cost?', a: 'Costs that do not move with sales volume: rent, insurance, loan payments, salaried admin staff, licenses. Hourly kitchen and serving wages move with volume, so they belong in the variable percentage.' },
    { q: 'What is a good contribution margin for a restaurant?', a: 'After food (28–35%) and hourly labor (25–35%), a healthy restaurant keeps 30–45% of each sales dollar to cover fixed costs and profit. Below 40% contribution makes break-even very hard.' },
    { q: 'How many covers can a small restaurant serve per day?', a: 'It depends on seats and turns — a 40-seat room turning twice at dinner is roughly 80 covers on a strong night. Compare your break-even covers against your slowest weekday, not your best Saturday.' },
  ],
  related: ['profit-margin-calculator', 'prime-cost-calculator', 'labor-cost-calculator', 'menu-pricing-calculator'],
} as RegisteredTool;
