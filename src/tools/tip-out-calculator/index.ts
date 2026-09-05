import type { RegisteredTool } from '../../lib/types';
import { calcTipOut } from '../../engines/split';

export default {
  slug: 'tip-out-calculator',
  industry: 'restaurant',
  name: 'Tip Out Calculator',
  tagline: 'Split tips fairly in 30 seconds. No signup.',
  title: 'Tip Out Calculator — Free tool for restaurants & bars',
  description: 'Split tips across servers, bussers and bar staff by percentage and headcount. Instant per-person amounts you can copy or print. Free, no signup.',
  result: { label: 'Tips to distribute' },
  fields: [
    { id: 'totalTips', label: 'Total tips', kind: 'money', default: 847, hint: 'for the shift or period' },
  ],
  rows: {
    id: 'roles',
    label: 'Roles & split',
    hint: 'percentages should add to 100',
    columns: [
      { id: 'label', label: 'Role', kind: 'text', placeholder: 'e.g. Servers' },
      { id: 'pct', label: 'Share %', kind: 'number', placeholder: '70' },
      { id: 'people', label: 'People', kind: 'number', placeholder: '3' },
    ],
    preset: [
      { label: 'Servers', pct: 70, people: 3 },
      { label: 'Bussers', pct: 20, people: 2 },
      { label: 'Bar', pct: 10, people: 1 },
    ],
    addLabel: '+ Add role',
  },
  params: {
    primaryLabel: 'Tips to distribute',
    copy: {
      ok: 'Your split adds to exactly 100% — every dollar is accounted for.',
      under: 'Your split adds to less than 100% — {p}% of tips would go unclaimed. Adjust the shares.',
      over: 'Your split adds to more than 100% — you would be paying out {p}% more than the tips collected.',
      info: 'Enter total tips and at least one role to see the split.',
    },
  },
  compute: (values, rows, p) => calcTipOut(values, rows, p),
  explain: `
    <p>Tip out (tip pooling) is how front-of-house shares tips with the people who don't collect them — bussers,
    barbacks, runners and hosts. The common full-service split lands around <b>70% servers / 20% bussers /
    10% bar</b>, but the right split is whatever matches your team's actual workload.</p>
    <p>Two rules keep tip out fair and legal-shaped: decide the split <b>before</b> the shift, not after; and
    write it down in your house policy so every new hire hears the same rules. The calculator shows each role's
    pool and the per-person amount — screenshot it for the shift close-out.</p>`,
  faq: [
    { q: 'What is a typical tip out percentage?', a: 'For full-service dining, servers commonly keep 70–80% of tips and pass 20–30% to support staff. Busy bar programs often tip out 5–10% of alcohol sales to the bar instead of a share of tips.' },
    { q: 'Should tip out be based on tips or on sales?', a: 'Tips-based splits divide what was actually collected — simplest and most transparent. Sales-based splits (e.g. 3% of the server’s sales) push risk onto servers but guarantee support staff earn on busy and slow days alike.' },
    { q: 'Can managers be part of a tip pool?', a: 'In the US, federal law bars employers — including managers and supervisors — from keeping a share of a mandatory tip pool under the FLSA. Always check current federal and state rules for your exact setup.' },
  ],
  related: ['menu-pricing-calculator', 'labor-cost-calculator', 'break-even-calculator', 'menu-engineering-matrix'],
} as RegisteredTool;
