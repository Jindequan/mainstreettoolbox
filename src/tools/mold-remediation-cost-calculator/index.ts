import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 闸 3 来源（2026-09-30 清欠轮 + 10-01 补源，见 docs/benchmarks-mold-remediation.md）：
// per sqft $10–25 — This Old House ∩ MyQuoteIQ（∩ SERP 共识 RestorationCalcs/Mold-Compass）
// 典型整单 $1,200–3,750 — MyQuoteIQ ∩ SERVPRO($1,223–3,753) ∩ Palm ∩ Angi 口径(~$2,369 均值)
// 小型补丁 $500–1,500 — This Old House ∩ HelperTools（10-01 补第 2 源）
// 全屋/严重 $10,000–30,000 — TOH 上带 + SERP 共识佐证（口径杂，explain 标注上限带）
// 仅表面清洁（非 remediation）$2.34–2.85/sqft — Homewyse（口径不同，仅对比行）
// EPA 指引：>10 sqft 通常需专业处理（RestorationCalcs 转 EPA）→ FAQ
// 家族层：mold remediation cost 764 strict/90d（Bing API 批验）+ mold removal 2,497 + near me 1,405
const RATE = { lo: 10, hi: 25 };
const MIN_JOB = { lo: 500, hi: 1500 };   // 动员/围挡最低收费（小补丁）
const TYPICAL = { lo: 1200, hi: 3750 };  // 典型整单带（三源同带）

export default {
  slug: 'mold-remediation-cost-calculator',
  industry: 'cleaning',
  name: 'Mold Remediation Cost Calculator',
  tagline: 'Price by affected area and how deep the mold runs — before the "emergency" markup lands. No signup.',
  title: 'Mold Remediation Cost Calculator — Free 2026 Price per Sq Ft',
  description: 'Mold remediation costs $10–25 per sq ft, with a typical job at $1,200–3,750. Price mold removal after water damage or leaks by area and scope (surface, wall cavity, whole home). Free, instant, no signup.',
  result: { label: 'Expected quote' },
  fields: [
    {
      id: 'area', label: 'Affected area (sq ft)', kind: 'number', default: 120,
      hint: '10×12 room ≈ 120 · add a 2 ft buffer around visible growth',
    },
    {
      id: 'scope', label: 'How deep does it run', kind: 'select', default: 'cavity',
      options: [
        { value: 'surface', label: 'Surface growth only (no demo expected)' },
        { value: 'cavity', label: 'Behind walls / under flooring (opening required)' },
        { value: 'severe', label: 'Whole home, or the HVAC system is involved' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Expected quote',
    copy: {
      surface: 'Surface-scoped jobs still bill the mobilization minimum: containment, HEPA air scrubbers and disposal are set up before anyone wipes a wall — that is why a 20 sq ft patch quotes near $500, not $200. Compare at least three on-site bids; price dispersion in this trade is the widest of any home service.',
      cavity: 'Most real orders land in the $1,200–3,750 band (SERVPRO; MyQuoteIQ; Angi ~$2,369 average) because opening the wall is where demo, bagging and HEPA hours pile up. Get three written on-site quotes — phone estimates in this trade run wide of the mark.',
      severe: 'Whole-home or HVAC involvement runs $10,000–30,000 at the top of the market (This Old House upper band). At this level split the roles: an independent industrial hygienist writes the protocol and the clearance test — never let the remediation firm grade its own homework.',
    },
  },
  compute: (values, _rows, p) => {
    const area = clamp(num(values.area) || 120, 5, 5000);
    const scope = values.scope as string;
    const copy = p.copy as Record<string, string>;
    const rawLo = area * RATE.lo, rawHi = area * RATE.hi;
    let lo: number, hi: number;
    if (scope === 'severe') {
      lo = 10000; hi = 30000;
    } else {
      const floor = scope === 'cavity' ? TYPICAL : MIN_JOB;
      lo = Math.max(rawLo, floor.lo);
      hi = Math.max(rawHi, floor.hi);
    }
    const scopeLabel = scope === 'severe'
      ? 'whole-home / HVAC scope'
      : scope === 'cavity'
        ? `${area} sq ft, wall/floor opening`
        : `${area} sq ft, surface scope`;
    return {
      primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)} · ${scopeLabel}` },
      secondary: [
        { label: 'Remediation rate', value: `${money(RATE.lo)} – ${money(RATE.hi)} per sq ft (This Old House; MyQuoteIQ)` },
        { label: 'Small-patch reality check', value: 'Isolated patches under ~30 sq ft still bill $500 – $1,500 (mobilization minimum)' },
        { label: 'Surface-clean only (no demo)', value: '$2.34 – $2.85 per sq ft (Homewyse) — a different, lighter job' },
      ],
      verdict: {
        level: scope === 'severe' ? 'warn' : 'info',
        text: copy[scope] ?? copy.cavity,
      },
    };
  },
  explain: `
    <h3>How much does mold remediation cost?</h3>
    <p><b>The 2026 US band is $10–25 per sq ft</b> (This Old House; MyQuoteIQ), and most complete jobs
    land between <b>$1,200 and $3,750</b> — SERVPRO books $1,223–3,753 with a national average near
    $2,368, and Angi-derived data lands in the same corridor. A small isolated patch does not scale down
    linearly: mobilization, containment and HEPA setup give even minor jobs a <b>$500–1,500 floor</b>
    (This Old House; HelperTools). Whole-home or structural jobs reach <b>$10,000–30,000</b> at the top
    of the market.</p>
    <h3>What should a mold remediation quote include?</h3>
    <p>Insist on line items: containment barriers and negative-air setup, HEPA air scrubbing, removal and
    bagging of affected material, antimicrobial treatment of framing, and a clearance verification step.
    <b>Clearance testing is usually billed separately — commonly quoted $200–600, but the number varies
    wildly by market</b>, so treat it as a negotiation, and prefer an independent tester over the
    remediation firm checking its own work. HVAC ducts with mold growth are a separate protocol and a
    separate quote — never let it ride as a line item on the wall job.</p>
    <h3>Mold removal vs. mold remediation — what's the difference?</h3>
    <p>"Mold removal" is the homeowner word; "remediation" is the trade word, and the distinction matters
    for your wallet: <b>spores are never fully "removed" from a home</b> — remediation means bringing
    mold back to normal, natural levels and fixing the moisture source that fed it. A quote promising to
    "eliminate all mold forever" is a sales line, not a scope. The EPA's rule of thumb: growth larger
    than about <b>10 square feet usually calls for a professional</b>.</p>
    <h3>Does insurance cover mold removal?</h3>
    <p>Often, partially. Sudden events — a burst pipe, a storm breach — are commonly covered up to a
    sub-limit, while <b>long-term leaks, humidity and neglected maintenance usually are not</b>. Document
    everything with photos before demo starts, and ask the remediation company for a moisture-map report:
    insurers pay faster when the cause is dated and diagrammed.</p>
    <table>
      <thead><tr><th>Job</th><th>Typical US range (2026)</th></tr></thead>
      <tbody>
        <tr><td>Small isolated patch (under ~30 sq ft)</td><td>$500 – $1,500</td></tr>
        <tr><td>Typical single-room job</td><td>$1,200 – $3,750</td></tr>
        <tr><td>Large / multi-room remediation</td><td>$10 – $25 per sq ft of affected area</td></tr>
        <tr><td>Whole home or HVAC involved</td><td>$10,000 – $30,000</td></tr>
        <tr><td>Surface cleaning only (no demo)</td><td>$2.34 – $2.85 per sq ft</td></tr>
        <tr><td>Clearance testing (often separate)</td><td>varies, commonly $200 – $600</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does mold remediation cost?', a: 'In 2026 US data: $10–25 per sq ft (This Old House; MyQuoteIQ), with most complete jobs between $1,200 and $3,750 (SERVPRO average ~$2,368). Small patches carry a $500–1,500 mobilization floor; whole-home or HVAC jobs run $10,000–30,000.' },
    { q: 'Can I remove mold myself instead of paying for remediation?', a: 'For surface growth under about 10 square feet, EPA guidance says DIY with detergent and proper drying is reasonable. Beyond that, containment and HEPA filtration matter — disturbing a large colony without them spreads spores through the house.' },
    { q: 'Does homeowners insurance cover mold removal?', a: 'Partially, and only when the cause is sudden: burst pipes and storm breaches are commonly covered up to a sub-limit, while long-term leaks, humidity and deferred maintenance usually are denied. A dated moisture report from the contractor speeds the claim.' },
    { q: 'What is the difference between mold removal and mold remediation?', a: 'Removal is the consumer term; remediation is the professional scope: containment, HEPA air scrubbing, removal of colonized material, antimicrobial treatment and a clearance check. Spores can never be fully eliminated — the goal is normal levels plus a fixed moisture source.' },
  ],
  related: ['cleaning-estimate-calculator', 'drywall-repair-cost-calculator', 'dumpster-rental-cost-calculator', 'dryer-vent-cleaning-cost-calculator'],
} as RegisteredTool;
