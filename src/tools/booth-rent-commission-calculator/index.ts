import type { RegisteredTool } from '../../lib/types';
import { calcBoothVsCommission } from '../../engines/split';

export default {
  slug: 'booth-rent-commission-calculator',
  industry: 'salon',
  name: 'Booth Rent vs Commission Calculator',
  tagline: 'Which way you get paid more. No signup.',
  title: 'Booth Rent vs Commission Calculator — Free tool for stylists & barbers',
  description: 'Enter your weekly sales, the salon\'s commission split and the booth rent quote to see which pay structure leaves more in your pocket each month. Free, no signup.',
  result: { label: 'Better for you' },
  fields: [
    { id: 'weeklySales', label: 'Your weekly sales', kind: 'money', default: 2000, hint: 'services only, before tips' },
    { id: 'commissionPct', label: 'Salon commission keeps', kind: 'slider', default: 45, min: 25, max: 70, step: 1, hint: 'typical is 40–60%' },
    { id: 'boothRent', label: 'Booth rent / month', kind: 'money', default: 1200 },
  ],
  params: {
    primaryLabel: 'Better for you',
    copy: {
      ok: '{w} leaves about {d} more in your pocket each month at these numbers. Re-run it whenever your book grows — the answer flips at your breakeven.',
      rentHigh: 'Rent would eat {s}% of your sales — above the 15–25% guideline. Negotiate the rent, build the book first, or stay on commission.',
      info: 'Enter weekly sales, the commission split and the rent quote to compare.',
    },
  },
  compute: (values, _rows, p) => calcBoothVsCommission(values, p),
  explain: `
    <p>Booth rent means you keep every dollar of service revenue and pay a flat rent; commission means the salon
    keeps a split (typically <b>40–60%</b>) and covers most of the overhead. The honest comparison is monthly:
    commission take-home is your sales times your split, booth take-home is sales minus rent — and the salon
    supplies, laundry and front-desk work you now do yourself.</p>
    <p>The classic guideline: <b>rent should run 15–25% of revenue</b>. Above that, only a very loyal book makes
    it work. The 50/50 rule of thumb — if half your sales would cover the rent, renting wins — is what this
    calculator checks with your real numbers.</p>
    <p>Remember the hidden costs of renting: self-employment tax, your own supplies, and no paycheck in a slow
    week. A book that is 80% rebooked is the real qualification for going independent.</p>`,
  faq: [
    { q: 'How much should booth rent be?', a: 'The working guideline is 15–25% of your service revenue. Check the rent quote against your last three months of sales before signing — $1,200 a month needs roughly $5,000–8,000 in monthly services to stay sane.' },
    { q: 'What commission split do salons usually offer?', a: 'New stylists often start at 40–50%, moving toward 60% with a book. Suites and booth rentals are the other path: flat rent, you keep everything, you buy your own supplies.' },
    { q: 'Does this include tips and product sales?', a: 'No — keep it to service revenue for a clean comparison. Tips follow you either way; retail commissions differ by salon and belong in the negotiation, not the model.' },
  ],
  related: ['tip-out-calculator', 'labor-cost-calculator', 'break-even-calculator', 'profit-margin-calculator'],
} as RegisteredTool;
