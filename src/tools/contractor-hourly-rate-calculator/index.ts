import type { RegisteredTool } from '../../lib/types';
import { calcContractorRate } from '../../engines/quote';

export default {
  slug: 'contractor-hourly-rate-calculator',
  industry: 'construction',
  name: 'Contractor Hourly Rate Calculator',
  tagline: 'What your hour has to sell for. No signup.',
  title: 'Contractor Hourly Rate Calculator — Free tool for trades',
  description: 'Work backwards from the take-home you need: target income, billable hours, overhead and taxes produce the hourly rate your bids must carry. Free, no signup.',
  result: { label: 'Your rate' },
  fields: [
    { id: 'targetIncome', label: 'Take-home you want / year', kind: 'money', default: 60000 },
    { id: 'billableHours', label: 'Billable hours / week', kind: 'number', default: 25, hint: 'not 40 — quotes, driving, supply runs' },
    { id: 'overhead', label: 'Overhead / month', kind: 'money', default: 800, hint: 'insurance, truck, tools, licenses' },
    { id: 'taxPct', label: 'Taxes', kind: 'slider', default: 25, min: 10, max: 45, step: 1, hint: 'self-employment + income' },
  ],
  params: {
    primaryLabel: 'Billable rate',
    benchmarks: { healthy: [50, 90], warnUpTo: 125 },
    copy: {
      ok: '{v} an hour clears your target after taxes and overhead — inside the typical $50–90 band for solo trades.',
      warnLow: '{v} an hour will not clear your target. Either raise the rate, add billable hours, or trim overhead — usually in that order.',
      warnHigh: '{v} an hour is above the common $50–90 band — it can work for specialist work, but bids will need to sell quality, not price.',
      info: 'Enter your target income and costs to find the rate.',
    },
  },
  compute: (values, _rows, p) => calcContractorRate(values, p),
  explain: `
    <p>The mistake almost every solo tradesman makes: charging <b>40 hours of rate</b> when only 20–25 hours are
    actually billable. The rest disappears into quotes, supply runs, driving and callbacks — but payroll taxes
    and overhead still come due.</p>
    <p>So the rate is worked backwards: take-home you want, grossed up for taxes, plus twelve months of
    overhead (insurance, truck, tools, licenses), divided by <b>real billable hours</b>. A $60,000 target with
    25 billable hours and $800 of overhead needs about <b>$69 an hour</b> — not $30.</p>
    <p>That rate is the floor for every bid. Jobs below it are you paying for the privilege of working.</p>`,
  faq: [
    { q: 'How many billable hours does a solo contractor really get?', a: 'Twenty to twenty-five is realistic for most trades — the rest of a 40-hour week goes to quotes, supply runs, site cleanup and driving. Anyone budgeting 40 billable hours is planning to work for free half the time.' },
    { q: 'What counts as overhead?', a: 'Everything that bills whether or not you worked: insurance, truck payment and fuel, tool replacement, licenses and permits, accounting, phone. Monthly it, and the calculator spreads it across your billable hours.' },
    { q: 'Why is my material markup not in here?', a: 'Materials should be passed through at cost plus a separate markup — mixing them into your labor rate makes bids hard to compare. Price the labor here, mark materials up separately on the quote.' },
  ],
  related: ['labor-cost-calculator', 'break-even-calculator', 'markup-vs-margin-calculator', 'profit-margin-calculator'],
} as RegisteredTool;
