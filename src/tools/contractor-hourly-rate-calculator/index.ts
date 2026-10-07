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
    <h3>How much should a contractor charge per hour?</h3>
    <p>The mistake almost every solo tradesman makes: charging <b>40 hours of rate</b> when only 20–25 hours are
    actually billable. The rest disappears into quotes, supply runs, driving and callbacks — but payroll taxes
    and overhead still come due.</p>
    <p>So the rate is worked backwards: take-home you want, grossed up for taxes, plus twelve months of
    overhead (insurance, truck, tools, licenses), divided by <b>real billable hours</b>. A $60,000 target with
    25 billable hours and $800 of overhead needs about <b>$69 an hour</b> — not $30.</p>
    <p>That rate is the floor for every bid. Jobs below it are you paying for the privilege of working.</p>
    <h3>How much do handymen charge per hour?</h3>
    <p><b>Handymen, read this twice:</b> the same math decides handyman rates, and the US market runs
    <b>$50–85/hour</b> in most metros (California and coastal cities higher, rural lower) — but self-employed
    handymen carry their own payroll taxes, insurance and tool wear, so the sticker rate is not take-home.
    Small-job specialists can charge above the band because nobody else wants a two-hour job; that
    inconvenience premium is real pricing power. Run your own numbers below — the honest hourly rate is
    usually 30–50% higher than what neighbors charge.</p>
    <h3>How much should an electrician charge per hour?</h3>
    <p><b>Electricians, same math, higher band:</b> licensing and insurance push the rate up — US
    residential electricians bill <b>$50–100/hour</b> in most markets (HomeGuide's electrical work pricing
    guide runs $40–100, national survey averages reach $130 for licensed masters in coastal metros), and a
    <b>$75–125 service-call fee</b> — usually applied as the first hour — is standard practice: it prices
    the truck roll before any work starts. Emergency and after-hours calls run $150–250 (Angi). If your
    napkin rate lands under $50, you're pricing like a handyman while carrying an electrician's insurance
    and license bill.</p>`,
  faq: [
    { q: 'How many billable hours does a solo contractor really get?', a: 'Twenty to twenty-five is realistic for most trades — the rest of a 40-hour week goes to quotes, supply runs, site cleanup and driving. Anyone budgeting 40 billable hours is planning to work for free half the time.' },
    { q: 'What counts as overhead?', a: 'Everything that bills whether or not you worked: insurance, truck payment and fuel, tool replacement, licenses and permits, accounting, phone. Monthly it, and the calculator spreads it across your billable hours.' },
    { q: 'Why is my material markup not in here?', a: 'Materials should be passed through at cost plus a separate markup — mixing them into your labor rate makes bids hard to compare. Price the labor here, mark materials up separately on the quote.' },
    { q: 'How much should an electrician charge per hour?', a: 'Most residential electricians bill $50–100 per hour, with licensed masters in high-cost metros up to $130 (HomeGuide\'s electrical work pricing guide; national survey data). Charge a $75–125 service-call fee on top — typically applied as the first hour — so the truck roll is covered before work begins. Emergency calls run $150–250/hour (Angi).' },
  ],
  related: ['labor-cost-calculator', 'painting-estimate-calculator', 'break-even-calculator', 'markup-vs-margin-calculator', 'profit-margin-calculator'],
} as RegisteredTool;
