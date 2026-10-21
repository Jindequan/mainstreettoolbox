import type { RegisteredTool } from '../../lib/types';
import { computeDeadline, type DepositInput, type Slug } from './engine';

// Bespoke 页（src/pages/landlord/security-deposit-refund-calculator.astro）内联同一引擎；
// 此处 compute 保持同款数学供注册表一致性（engine.test.ts 覆盖两种路径共用逻辑）。
const config = {
  slug: 'security-deposit-refund-calculator',
  industry: 'landlord',
  name: 'Security Deposit Refund Calculator',
  tagline: 'Pick your state, enter your dates — see the exact legal deadline and what happens if it slips. No signup.',
  title: 'Security Deposit Refund Calculator — Legal Deadline by State',
  description: 'Enter your move-out and lease-termination dates to get the legal security-deposit refund deadline for your state, the itemized-statement requirement, and the penalty for missing it — sourced from each state\'s current statute.',
  result: { label: 'Refund deadline' },
  fields: [
    { id: 'state', label: 'State', kind: 'select', default: 'CA', options: ['CA', 'NY', 'TX', 'FL', 'WA', 'CO', 'AZ', 'WI', 'AL', 'PA', 'IL', 'MA', 'NJ', 'CT', 'OH', 'MI', 'IN', 'MO', 'GA', 'NC', 'SC', 'MN', 'MD', 'VA'] },
    { id: 'vacate', label: 'Move-out (vacate) date', kind: 'text', default: '2026-07-01' },
    { id: 'termination', label: 'Lease termination date (if different)', kind: 'text', default: '', hint: 'WA / CO / AL / PA / OH / IN / GA / SC take the later of the two' },
    { id: 'demand', label: 'Tenant written demand date (Arizona / South Carolina)', kind: 'text', default: '' },
  ],
  params: {},
  compute: (values) => {
    const v = values as Record<string, unknown>;
    const r = computeDeadline(v.state as Slug, {
      vacate: String(v.vacate ?? ''),
      termination: (v.termination as string) || undefined,
      demand: (v.demand as string) || undefined,
    } satisfies DepositInput);
    return { primary: r.deadline, sub: r.daysRule, result: r };
  },
  explain: `
    <p>Every state sets its own clock for returning a residential security deposit after move-out —
    and the clocks start on different events, count different kinds of days, and carry very different
    penalties. This calculator reads the current statute for 48 verified states plus the District of
    Columbia (every state except Kentucky, Tennessee and Wyoming, which set no statutory return deadline —
    the lease governs there), each reviewed against the official statute text with the citation and
    review date shown on the result.</p>
    <p>Two things the engine deliberately does not do: it does not guess deadlines for states still on
    our verification roadmap (an unverified deadline is worse than none), and it does not compute
    interest — only a handful of states require it and the rules are conditional (Florida's applies
    only to bond or interest accounts, Pennsylvania's starts in year three, Maryland's and Minnesota's
    ride on the deposit while held). Those show as notes, not math.</p>
  `,
  faq: [
    { q: 'What happens if my landlord misses the deadline?', a: 'It depends on the state, and the stakes differ sharply: in Florida and New York the landlord forfeits the right to keep any part of the deposit; in Texas missing the 30-day window is presumptively bad faith ($100 plus 3× the wrongfully withheld amount plus attorney\'s fees); Colorado awards 3× the wrongfully withheld portion for willful retention; Alabama awards 2× the entire deposit; Washington forfeits the withholding right and adds up to 2× for willful refusal; Massachusetts and Maryland reach 3× the withheld amount; Missouri and Connecticut award 2×. The result card shows the exact rule with the statute citation.' },
    { q: 'Does the day I move out count as day one?', a: 'No. The clock runs from the trigger event — vacating, surrender, lease termination, or (in Arizona and South Carolina) the tenant\'s written demand — and the deadline is the stated number of days after that day. Several states (Washington, Colorado, Alabama, Pennsylvania, Ohio, Indiana, Georgia, South Carolina) start the clock on the later of two events. Arizona is the one verified state that counts business days, excluding Saturdays, Sundays, and legal holidays.' },
    { q: 'What can a landlord deduct from a security deposit?', a: 'Unpaid rent, damage beyond normal wear and tear, and cleaning to return the unit to its move-in condition — with the itemized statement and any required receipts due with the refund. Several verified states go further: Washington bans carpet-cleaning charges unless there is damage beyond ordinary wear and bars deductions for anything missing from the move-in checklist; Wisconsin limits deductions to six statutory categories unless the lease signed nonstandard rental provisions.' },
    { q: 'My state isn\'t on the list. Why not?', a: 'We only publish deadlines we have verified against the current statute text — several popular guides still cite outdated rules (Washington\'s 21 days became 30 in 2023; Illinois\'s 30 became 45 in 2024; Connecticut\'s 30 became 21; Alabama is 60 days, not the 35 many sites still print). More states are on the verification roadmap. Until then, HUD\'s tenant-rights page links each state\'s official resources.' },
  ],
  related: ['cleaning-estimate-calculator', 'work-order-generator', 'service-price-list-builder'],
} satisfies RegisteredTool;

export default config;
