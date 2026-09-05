import type { RegisteredTool } from '../../lib/types';
import { calcProfitMargin } from '../../engines/price';

export default {
  slug: 'profit-margin-calculator',
  industry: 'restaurant',
  name: 'Restaurant Profit Margin Calculator',
  tagline: 'Where did the money actually go. No signup.',
  title: 'Restaurant Profit Margin Calculator — Free tool',
  description: 'Enter monthly revenue and costs to see your restaurant\'s true net profit, margin percentage and annualized profit. Free, instant, no signup.',
  result: { label: 'Net profit / month' },
  fields: [
    { id: 'revenue', label: 'Revenue / month', kind: 'money', default: 45000 },
    { id: 'cogs', label: 'Food & beverage cost', kind: 'money', default: 12000 },
    { id: 'labor', label: 'Labor cost', kind: 'money', default: 14000 },
    { id: 'rent', label: 'Rent & occupancy', kind: 'money', default: 8000 },
    { id: 'other', label: 'Other costs', kind: 'money', default: 6500, hint: 'utilities, marketing, software, repairs' },
  ],
  params: {
    primaryLabel: 'Net profit / month',
    benchmarks: { healthy: [3, 9], warnUpTo: 20, warnLow: 3 },
    copy: {
      info: 'Enter your monthly numbers to see where the money goes.',
      ok: '{v} net margin — healthy for a full-service restaurant, where the typical band is 3–9%.',
      warn: '{v} net margin is outside the comfortable 3–9% band — one slow season could erase it. Run the Prime Cost Calculator to find the leak.',
      bad: '{v} — the restaurant is losing money at this run rate. Prime cost and break-even are the two numbers to attack first.',
    },
  },
  compute: (values, _rows, p) => calcProfitMargin(values, p),
  explain: `
    <p>Restaurant revenue is loud; restaurant profit is quiet. Full-service restaurants typically keep
    <b>3–9%</b> of sales after everything — a good month on $45,000 of sales is $1,400–$4,000 to the owner.
    That thinness is normal, and it is exactly why small cost leaks matter so much.</p>
    <p>The calculator splits your month into the five buckets that matter: food and beverage, labor, occupancy,
    and everything else. If the result is red or thin, the order of attack is prime cost first (food + labor),
    then the lease conversation — in that order, because prime cost moves in weeks, not lease cycles.</p>`,
  faq: [
    { q: 'What is a good profit margin for a restaurant?', a: 'Full-service restaurants typically net 3–9%; quick-service can run 6–15%. Independent operators often land under 5%. Margins above 12% put you in the top tier of the trade.' },
    { q: 'Why is my profit margin so thin?', a: 'The cost stack is heavy by nature: roughly 30% food, 30% labor, 15–20% occupancy, 10% overhead. What separates survivors is prime cost discipline, not a magic revenue number.' },
    { q: 'Should I look at profit per month or per year?', a: 'Both — monthly for steering, annually for truth. Restaurants are seasonal: a strong June can hide a losing January. The calculator annualizes your current run rate as a rough reality check.' },
  ],
  related: ['break-even-calculator', 'prime-cost-calculator', 'food-cost-percentage-calculator', 'labor-cost-calculator'],
} as RegisteredTool;
