import type { RegisteredTool } from '../../lib/types';
import { calcPrimeCost } from '../../engines/price';

export default {
  slug: 'prime-cost-calculator',
  industry: 'restaurant',
  name: 'Prime Cost Calculator',
  tagline: 'The number that decides your survival. No signup.',
  title: 'Prime Cost Calculator — Free tool for restaurants',
  description: 'Combine your food cost and labor cost to get your restaurant\'s prime cost percentage — the number operators watch first. Free, instant, no signup.',
  result: { label: 'Prime cost' },
  fields: [
    { id: 'cogs', label: 'Cost of goods sold / month', kind: 'money', default: 12000, hint: 'food & beverage purchases' },
    { id: 'labor', label: 'Labor cost / month', kind: 'money', default: 14000, hint: 'wages, payroll taxes, benefits' },
    { id: 'revenue', label: 'Revenue / month', kind: 'money', default: 45000 },
  ],
  params: {
    primaryLabel: 'Prime cost',
    benchmarks: { healthy: [50, 60], warnUpTo: 65 },
    copy: {
      ok: '{v} prime cost — at or under the 60% line. This is where restaurants that survive live.',
      warn: '{v} prime cost is above 60% and eating your rent. Portioning and scheduling are the two levers.',
      bad: '{v} prime cost is past 65% — the restaurant is working for suppliers and payroll, not for you. Act this week.',
      info: 'Enter your monthly costs and revenue to see prime cost.',
    },
  },
  compute: (values, _rows, p) => calcPrimeCost(values, p),
  explain: `
    <p>Prime cost is <b>cost of goods sold plus labor</b> — the two costs you can actually move week to week.
    It is the first number a serious operator looks at, because rent is fixed, but prime cost answers to
    portioning, scheduling and pricing.</p>
    <p>The industry line is <b>60%</b>: prime cost at or under 60% of sales leaves enough gross profit to pay
    rent, utilities and still keep 10–15% for the owner. Between 60–65% is a warning zone — fixable with
    tighter prep lists and schedules. Past 65%, the restaurant is one slow month from trouble.</p>`,
  faq: [
    { q: 'What is prime cost in a restaurant?', a: 'Cost of goods sold (food and beverage purchases) plus total labor cost (wages, payroll taxes, benefits). It is the controllable heart of a restaurant\'s P&L and typically should sit at or below 60% of sales.' },
    { q: 'Why 60%?', a: 'Because everything else — rent, utilities, insurance, marketing, profit — has to fit in the remaining 40%. When prime cost creeps past 65%, almost no rent bill works anymore.' },
    { q: 'My prime cost is 68%. Where do I start?', a: 'Two levers, two weeks each: (1) food cost — weigh portions, count waste, reprice the five worst cost-performers; (2) labor — rebuild the schedule against your actual sales curve and cut overtime. Do both before touching prices.' },
  ],
  related: ['food-cost-percentage-calculator', 'labor-cost-calculator', 'profit-margin-calculator', 'break-even-calculator'],
} as RegisteredTool;
