import type { RegisteredTool } from '../../lib/types';
import { money, num } from '../../lib/types';
import { blank, buildLetter } from './engine';
import type { Slug } from '../security-deposit-refund-calculator/engine';

// 词形承接 R8 族（"security deposit demand letter / return letter / letter template"），
// 法条数据复用 refund-calculator 24 州引擎（534 strict/635 broad，2026-10-09 转正后词簇二期第 2 件；
// 二期 14 州 2026-10-20 逐州 statute 核对，见引擎头注）。
const STATE_NAMES: Record<Slug, string> = {
  CA: 'California', NY: 'New York', TX: 'Texas', FL: 'Florida', WA: 'Washington',
  CO: 'Colorado', AZ: 'Arizona', WI: 'Wisconsin', AL: 'Alabama', PA: 'Pennsylvania',
  IL: 'Illinois', MA: 'Massachusetts', NJ: 'New Jersey', CT: 'Connecticut', OH: 'Ohio',
  MI: 'Michigan', IN: 'Indiana', MO: 'Missouri', GA: 'Georgia', NC: 'North Carolina',
  SC: 'South Carolina', MN: 'Minnesota', MD: 'Maryland', VA: 'Virginia',
  ID: 'Idaho', MT: 'Montana', NE: 'Nebraska', IA: 'Iowa', KS: 'Kansas',
  NV: 'Nevada', UT: 'Utah', OR: 'Oregon', NM: 'New Mexico', ND: 'North Dakota',
  SD: 'South Dakota', OK: 'Oklahoma', AR: 'Arkansas', LA: 'Louisiana', MS: 'Mississippi',
  ME: 'Maine', NH: 'New Hampshire', RI: 'Rhode Island', VT: 'Vermont', DE: 'Delaware',
  WV: 'West Virginia', AK: 'Alaska', HI: 'Hawaii', DC: 'District of Columbia',
};

export default {
  slug: 'security-deposit-demand-letter',
  industry: 'landlord',
  name: 'Security Deposit Demand Letter Generator',
  tagline: 'A formal, printable demand letter with your state\'s legal deadline and statute citation filled in. No signup.',
  title: 'Security Deposit Demand Letter Template — Free Generator (State Deadlines Included)',
  description: 'Generate a security deposit demand letter with your state\'s legal refund deadline and statute citation built in — 48 states verified against current statutes. Free, printable, no signup.',
  result: { label: 'Amount to demand' },
  fields: [
    {
      id: 'state', label: 'State', kind: 'select', default: 'CA',
      options: (Object.keys(STATE_NAMES) as Slug[]).map((s) => ({ value: s, label: STATE_NAMES[s] })),
    },
    { id: 'vacate', label: 'Move-out date', kind: 'text', default: '2026-07-01', hint: 'YYYY-MM-DD — every state\'s clock starts here' },
    { id: 'termination', label: 'Lease termination date (if different)', kind: 'text', default: '', hint: 'WA / CO / AL / PA / OH / IN / GA / SC take the later of the two' },
    { id: 'demand', label: 'Your written demand date (Arizona / South Carolina)', kind: 'text', default: '', hint: 'These states\' clocks won\'t start until this' },
    { id: 'letterDate', label: 'Letter date', kind: 'text', default: '2026-07-15' },
    { id: 'tenantName', label: 'Your name', kind: 'text', default: '', placeholder: 'Left blank prints a fill-in line' },
    { id: 'forwarding', label: 'Your forwarding address', kind: 'text', default: '', hint: 'Where the check must go — Texas ties the clock to it' },
    { id: 'landlordName', label: 'Landlord / property manager', kind: 'text', default: '' },
    { id: 'property', label: 'Rental property address', kind: 'text', default: '' },
    { id: 'deposit', label: 'Deposit amount', kind: 'money', default: 1800 },
    {
      id: 'statementReceived', label: 'What have you received?', kind: 'select', default: 'none',
      options: [
        { value: 'none', label: 'Nothing — no refund, no itemized statement' },
        { value: 'statement', label: 'An itemized statement with deductions' },
      ],
    },
    { id: 'deductionAmount', label: 'Deductions claimed in that statement', kind: 'money', default: 600 },
  ],
  params: {},
  compute: (values) => {
    const v = values as Record<string, string>;
    const r = buildLetter({
      state: (v.state as Slug) || 'CA',
      vacate: v.vacate ?? '',
      termination: v.termination || undefined,
      demand: v.demand || undefined,
      letterDate: v.letterDate ?? '',
      deposit: num(v.deposit),
      statementReceived: v.statementReceived === 'statement' ? 'statement' : 'none',
      deductionAmount: num(v.deductionAmount),
    });
    if ('error' in r) {
      return {
        primary: { label: 'Amount to demand', value: '—' },
        verdict: { level: 'bad' as const, text: 'Enter your move-out date (YYYY-MM-DD) — every state\'s deadline clock starts there.' },
      };
    }

    const d = r.deadline;
    const statusValue = r.escalate
      ? `Overdue by ${r.overdueDays} day${r.overdueDays === 1 ? '' : 's'}`
      : `${r.daysLeft} day${r.daysLeft === 1 ? '' : 's'} before the deadline`;

    return {
      primary: { label: 'Amount to demand', value: `${money(r.demanded)} by ${d.deadline}` },
      secondary: [
        { label: 'State rule', value: `${d.state}: ${d.daysRule}` },
        { label: 'Clock started', value: `${d.triggerDate} — ${d.triggerRule}` },
        { label: 'Letter status', value: statusValue },
        { label: 'How to send', value: 'Certified mail, return receipt requested — keep the receipt with your copy' },
      ],
      verdict: {
        level: r.escalate ? ('warn' as const) : ('info' as const),
        text: r.escalate
          ? `The ${d.state} deadline passed ${r.overdueDays} day${r.overdueDays === 1 ? '' : 's'} ago — say so in the letter and name the consequence: ${d.penalty}`
          : `Your ${d.state} window is open — the legal deadline is ${d.deadline} (${d.statuteCite}). Sending before it keeps the tone civil and keeps every statutory penalty available if the deadline slips anyway.`,
      },
      doc: {
        title: 'SECURITY DEPOSIT DEMAND LETTER',
        fields: [
          { label: 'Date', value: blank(v.letterDate) },
          { label: 'From', value: `${blank(v.tenantName)} · forwarding: ${blank(v.forwarding)}` },
          { label: 'To', value: blank(v.landlordName) },
          { label: 'Re', value: `${blank(v.property)} — residential security deposit` },
          { label: 'Deposit held', value: money(num(v.deposit)) },
          { label: 'Statutory deadline', value: `${d.deadline} — ${d.statuteCite}` },
          {
            label: 'Notice',
            value: v.statementReceived === 'statement'
              ? `Your itemized statement claimed ${money(num(v.deductionAmount))}; the balance of ${money(r.demanded)} remains due.`
              : 'As of this letter, no refund and no itemized statement of deductions has been received.',
          },
        ],
        total: { label: 'Demand', value: `${money(r.demanded)} by ${d.deadline}` },
        footnote: `Send by certified mail, return receipt requested, and keep a copy. Deadline per ${d.statuteCite}. Template with verified statute data — not legal advice.`,
      },
    };
  },
  explain: `
    <h3>What is a security deposit demand letter?</h3>
    <p>A demand letter is the formal step between "asking nicely" and "small-claims court": a dated, written
    request that names the deposit amount, the statutory deadline your state's landlord-tenant law sets for
    returning it, and the consequence for missing that deadline. Judges and clerks treat it as evidence that
    you tried to resolve the dispute before suing — and in several states the statute itself awards attorney's
    fees, which makes a documented demand letter the cheapest leverage a tenant holds.</p>
    <h3>When should you send it?</h3>
    <p>Send it the day the legal deadline passes — or a few days before it, if you want the polite version to
    do the work. The clocks below come from each state's current statute, verified line-by-line (the same data
    that drives our <a href="/landlord/security-deposit-refund-calculator/">refund deadline calculator</a>):</p>
    <table>
      <thead><tr><th>State</th><th>Deadline</th><th>If the landlord misses it</th></tr></thead>
      <tbody>
        <tr><td>California</td><td>21 days after move-out</td><td>Up to 2× the deposit in statutory damages</td></tr>
        <tr><td>New York</td><td>14 days</td><td>Forfeits the right to keep any part of the deposit</td></tr>
        <tr><td>Texas</td><td>30 days</td><td>Presumptive bad faith: $100 + 3× the withheld amount + attorney's fees</td></tr>
        <tr><td>Florida</td><td>15 days (30 if deductions are claimed)</td><td>Forfeits the right to impose any claim</td></tr>
        <tr><td>Washington</td><td>30 days (was 21 before 2023)</td><td>Forfeits withholding; up to 2× for willful refusal</td></tr>
        <tr><td>Colorado</td><td>1 calendar month (60-day lease cap)</td><td>3× the wrongfully withheld portion</td></tr>
        <tr><td>Arizona</td><td>14 business days from written demand</td><td>2× the wrongfully withheld portion</td></tr>
        <tr><td>Wisconsin</td><td>21 days</td><td>No statutory penalty — small-claims 2× awards are common</td></tr>
        <tr><td>Alabama</td><td>60 days (not the 35 older guides print)</td><td>2× the entire deposit</td></tr>
        <tr><td>Pennsylvania</td><td>30 days</td><td>Forfeits withholding; 2× the wrongfully withheld amount</td></tr>
        <tr><td>Illinois</td><td>45 days (30 before the 2024 amendment — statement due in 30)</td><td>2× the deposit plus fees</td></tr>
        <tr><td>Massachusetts</td><td>30 days</td><td>3× damages plus fees — the harshest in the country</td></tr>
        <tr><td>New Jersey</td><td>30 days</td><td>Court shall add 2× punitive damages plus costs</td></tr>
        <tr><td>Connecticut</td><td>21 days (30 before the 2023 reform — or 15 days after your forwarding address, whichever is later)</td><td>2× the deposit plus fees</td></tr>
        <tr><td>Ohio</td><td>30 days from termination and possession</td><td>The withheld amount plus an equal penalty plus fees</td></tr>
        <tr><td>Michigan</td><td>30 days (dispute any itemized list within 7 days)</td><td>2× the deposit</td></tr>
        <tr><td>Indiana</td><td>45 days from termination and possession</td><td>Full deposit plus attorney's fees</td></tr>
        <tr><td>Missouri</td><td>30 days (deposit capped at 2 months' rent)</td><td>2× the amount withheld</td></tr>
        <tr><td>Georgia</td><td>30 days from termination and possession</td><td>No statutory multiplier — but escrow and inspection rules are strictly enforced</td></tr>
        <tr><td>North Carolina</td><td>30 days</td><td>Recovery of the wrongfully held deposit under the Tenant Security Deposit Act</td></tr>
        <tr><td>South Carolina</td><td>30 days from the latest of termination, possession, or your written demand</td><td>Up to 3× the amount withheld plus fees</td></tr>
        <tr><td>Minnesota</td><td>21 days after the tenancy ends and your forwarding address arrives</td><td>Interest keeps accruing while held</td></tr>
        <tr><td>Maryland</td><td>45 days plus accrued interest</td><td>Up to 3× the amount withheld plus fees</td></tr>
        <tr><td>Virginia</td><td>45 days (never longer, even by lease)</td><td>Willful withholding: actual damages or up to 2× the deposit</td></tr>
        <tr><td>Idaho</td><td>21 days (lease may set longer, never past 30)</td><td>No statutory multiplier</td></tr>
        <tr><td>Montana</td><td>30 days (10 days when nothing is deducted)</td><td>Treble damages for bad-faith retention</td></tr>
        <tr><td>Nebraska</td><td>14 days</td><td>Additional damages for bad-faith retention</td></tr>
        <tr><td>Iowa</td><td>30 days</td><td>Punitive damages up to 2× the monthly rent</td></tr>
        <tr><td>Kansas</td><td>14 days after deductions are set — never past 30 days</td><td>No statutory multiplier</td></tr>
        <tr><td>Nevada</td><td>30 days</td><td>Deposit plus damages</td></tr>
        <tr><td>Utah</td><td>30 days (or 15 days after your forwarding address, whichever is later)</td><td>Entire deposit plus statutory penalties</td></tr>
        <tr><td>Oregon</td><td>31 days</td><td>No statutory multiplier</td></tr>
        <tr><td>New Mexico</td><td>30 days</td><td>Forfeits withholding plus a $250 civil penalty for bad faith</td></tr>
        <tr><td>North Dakota</td><td>30 days</td><td>No statutory multiplier</td></tr>
        <tr><td>South Dakota</td><td>14 days (45 days when repair estimates are needed)</td><td>No statutory multiplier</td></tr>
        <tr><td>Oklahoma</td><td>45 days for deposits over $125 (30 days at or under $125); request within 6 months</td><td>No statutory multiplier</td></tr>
        <tr><td>Arkansas</td><td>60 days (statewide statute only since 2021)</td><td>No statutory multiplier</td></tr>
        <tr><td>Louisiana</td><td>One calendar month</td><td>No statutory multiplier</td></tr>
        <tr><td>Mississippi</td><td>45 days</td><td>No statutory multiplier</td></tr>
        <tr><td>Maine</td><td>21 days for tenancies at will (written leases set their own)</td><td>No statutory multiplier</td></tr>
        <tr><td>New Hampshire</td><td>30 days plus interest</td><td>Willful failure: 2× the deposit or $1,000, whichever is less</td></tr>
        <tr><td>Rhode Island</td><td>20 days from the latest of termination, possession, or your forwarding address</td><td>No statutory multiplier</td></tr>
        <tr><td>Vermont</td><td>14 days from when the landlord learns you left</td><td>Up to 2× the wrongfully withheld amount</td></tr>
        <tr><td>Delaware</td><td>20 days</td><td>No statutory multiplier</td></tr>
        <tr><td>West Virginia</td><td>60 days (45 without a forwarding address)</td><td>No statutory multiplier</td></tr>
        <tr><td>Alaska</td><td>14 days (30 when deductions are claimed)</td><td>No statutory multiplier</td></tr>
        <tr><td>Hawaii</td><td>14 days</td><td>No statutory multiplier</td></tr>
        <tr><td>District of Columbia</td><td>45 days plus interest</td><td>Withholding without written itemization is forfeited</td></tr>
      </tbody>
    </table>
    <h3>What to put in the letter</h3>
    <p>Seven elements, all of which the generator fills in: the date; your name and <b>forwarding address</b>
    (Texas ties the refund clock to it — omit it and you've handed the landlord an excuse); the landlord or
    property manager's name; the property address; the deposit amount; the statutory deadline with its citation;
    and the demand itself — the exact dollar amount and the date it must arrive. If an itemized statement
    arrived with deductions, dispute the specific line items and demand the balance, not the whole deposit.</p>
    <h3>What if the landlord ignores it?</h3>
    <p>Small-claims court is the next step, and the letter is your opening exhibit. Filing fees run $30–100
    and most filings don't require a lawyer. The penalties in the table above are what you plead: Texas and
    Colorado multiply the wrongful withholding, Alabama doubles the entire deposit, and New York, Florida,
    Washington, and Pennsylvania strip the landlord's right to keep <i>anything</i> once the deadline blows.
    A tenant who shows the court a dated, certified-mailed letter that quoted the statute rarely has to
    argue past that exhibit.</p>
    <h3>Worked example</h3>
    <p>Move-out July 1 in California: the statute gives the landlord until <b>July 22</b> (Cal. Civ. Code
    §1950.5, 21 days). Nothing arrives by July 23 — the letter goes out the same week, certified mail, demanding
    the full deposit and citing the deadline. If a statement had arrived claiming $600 of a $1,800 deposit,
    the letter demands the <b>$1,200 balance</b> and disputes the line items instead.</p>`,
  faq: [
    { q: 'What is a security deposit demand letter?', a: 'A dated written demand that names the deposit, your state\'s legal return deadline with its statute citation, and the exact amount you require. It is the standard evidence step before small-claims court, and in several states the statutes behind it carry attorney\'s-fee awards that make the letter real leverage.' },
    { q: 'When should I send a security deposit demand letter?', a: 'The day after your state\'s deadline passes — 14 days after move-out in New York, 21 in California and Wisconsin, 30 in Texas, Washington and Pennsylvania, 60 in Alabama, with Florida at 15 days (30 when deductions are claimed), Colorado at one calendar month, and Arizona at 14 business days that only start when you demand the deposit in writing. Sending a polite version a few days before the deadline also works and sometimes gets the check moving without any escalation.' },
    { q: 'What happens if my landlord ignores the demand letter?', a: 'You file in small-claims court with the letter as your first exhibit. The statutory penalties are the claim: Texas adds $100 plus 3× the wrongfully withheld amount plus attorney\'s fees, Colorado awards 3× the wrongfully withheld portion, Alabama 2× the entire deposit, and New York, Florida, Washington and Pennsylvania strip the landlord\'s right to withhold any of it once the deadline is missed.' },
    { q: 'Does a security deposit demand letter have to be sent by certified mail?', a: 'No statute requires it, but certified mail with return receipt is the cheap way to prove when the letter arrived — and in states like Texas where obligations hinge on the tenant\'s forwarding address, proof of delivery ends the "never got it" defense. Email a copy as a backup and keep the green card with your file copy.' },
    { q: 'My state isn\'t listed — can I still use this?', a: 'Possibly — 48 states plus the District of Columbia are in the generator, verified against current statute text (an unverified deadline is worse than none — Washington\'s window changed from 21 to 30 days in 2023, Connecticut\'s from 30 to 21 days in 2024, and Alabama is 60, not the 35 many sites still print). Only Kentucky, Tennessee and Wyoming have no statutory return deadline — there the lease terms govern, and HUD\'s tenant-rights page links each state\'s official resources; the letter structure stays the same.' },
  ],
  related: ['security-deposit-refund-calculator', 'cleaning-estimate-calculator', 'work-order-generator'],
} satisfies RegisteredTool;
