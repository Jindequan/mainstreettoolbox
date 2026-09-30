import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 闸 3 来源（2026-10-01，≥2 源交叉）：
// per vent $25–50 — 多源共识（Angi/行业 guides）；整单最低消费 $300–450 basic / $450–600 deep+sanitize — CostEstimatePro ∩ Angi($270–490 ducts alone)
// 按面积档：≤1,500 sqft $400–450 / 1,500–2,500 $450–550 / 大宅多系统 $700–1,000+ — 行业 guides 多源
// 打包 dryer vent $340–800 — Angi
// "$99 全屋"诱饵陷阱 — 多源共识 → verdict 警告（与 dryer-vent 页同款打假角度，互链成对）
// 验证层：duct cleaning cost 367 strict + duct cleaning services 568（57 词清欠轮）
export default {
  slug: 'air-duct-cleaning-cost-calculator',
  industry: 'cleaning',
  name: 'Air Duct Cleaning Cost Calculator',
  tagline: 'Per-vent pricing with the minimum enforced — before the $99 whole-house ad does its thing. No signup.',
  title: 'Air Duct Cleaning Cost Calculator — Free 2026 Price per Vent & Home Size',
  description: 'Air duct cleaning costs $25–50 per vent with a $300–450 minimum — price by vent count and sanitizing add-on, with whole-home tiers for any house size. Free, instant, no signup.',
  result: { label: 'Suggested quote' },
  fields: [
    { id: 'vents', label: 'Supply + return vents', kind: 'number', default: 12, hint: 'walk the house and count them' },
    { id: 'systems', label: 'HVAC systems', kind: 'select', default: '1',
      options: [
        { value: '1', label: 'One system (most homes)' },
        { value: '2', label: 'Two or more / zoned' },
      ],
    },
    {
      id: 'sanitize', label: 'Sanitizing add-on', kind: 'select', default: 'no',
      options: [
        { value: 'no', label: 'Standard clean' },
        { value: 'yes', label: 'Deep clean + sanitizing' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Suggested quote',
    copy: {
      info: 'US 2026: duct cleaning runs $25–50 per vent with a $300–450 whole-home minimum (Angi: $270–490 typical). A 1,500–2,500 sq ft home lands around $450–550; larger or two-system homes reach $700–1,000+. Any "$99 whole house" ad is bait — the minimum exists because the truck roll does.',
      sanitize: 'Deep clean with sanitizing runs $450–600 on the same vent count (CostEstimatePro; Angi). Sell it on smell and allergy complaints, not fear — and put the EPA line in writing: duct cleaning is only recommended when there is visible mold, debris or vermin in the ducts.',
    },
  },
  compute: (values, _rows, p) => {
    const vents = clamp(num(values.vents) || 12, 4, 60);
    const twoSystems = values.systems === '2';
    const sanitize = values.sanitize === 'yes';
    const perVent: [number, number] = [25, 50];
    const minimum: [number, number] = sanitize ? [450, 600] : [300, 450];
    const sysF = twoSystems ? 1.6 : 1;
    let lo = Math.max(vents * perVent[0], minimum[0]) * sysF;
    let hi = Math.max(vents * perVent[1], minimum[1]) * sysF;
    if (sanitize) { lo *= 1.2; hi *= 1.25; }
    const copy = p.copy as Record<string, string>;
    const minApplied = vents * perVent[0] < minimum[0];
    return {
      primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)} · ${vents} vents${twoSystems ? ', 2 systems' : ''}${sanitize ? ', sanitized' : ''}` },
      secondary: [
        { label: 'Per vent', value: `$25 – $50 × ${vents}` },
        { label: minApplied ? 'Minimum enforced' : 'Minimum', value: `${money(minimum[0] * sysF)} – ${money(minimum[1] * sysF)} (truck roll + main trunk line)` },
        { label: 'Bundle with dryer vent', value: '$340 – $800 for both (Angi) — same-truck discount' },
      ],
      verdict: { level: 'info', text: sanitize ? copy.sanitize : copy.info },
    };
  },
  explain: `
    <h3>How much does air duct cleaning cost?</h3>
    <p><b>$25–50 per vent is the per-opening rate</b>, and every legitimate job carries a
    <b>$300–450 whole-home minimum</b> (Angi books typical duct jobs at $270–490). By home size:
    up to 1,500 sq ft lands at $400–450, 1,500–2,500 sq ft at $450–550, and larger or two-system homes
    run $700–1,000+. Deep cleaning with sanitizing adds $150 or so on the same vent count.</p>
    <h3>Why does a $99 whole-house ad cost $400 in the end?</h3>
    <p>The same bait-and-switch pattern as dryer vent specials: the teaser price cannot pay for the truck,
    the vacuum rig and two techs, so the on-site "finding" (mold! debris! blocked lines!) makes up the gap.
    The honest quote structure is per-vent rate with the minimum stated up front — which is exactly what
    this calculator reproduces.</p>
    <h3>When is duct cleaning actually recommended?</h3>
    <p>The EPA's line, which the credible operators quote verbatim: clean ducts <b>when there is visible
    mold growth, debris or vermin in the ductwork</b>, not on a calendar. Selling calendar-based cleaning
    to a clean system is why the trade has a reputation problem — and why documenting the findings with a
    camera wins the upsell honestly.</p>
    <h3>Should duct cleaning be bundled with dryer vent cleaning?</h3>
    <p>Yes when the truck is already there: <b>$340–800 covers both</b> (Angi) against $300–450 + $100–350
    booked separately. The <a href="/cleaning/dryer-vent-cleaning-cost-calculator/">Dryer Vent Cleaning Cost
    Calculator</a> prices the second line — quote the bundle as one visit with two line items.</p>
    <table>
      <thead><tr><th>Job</th><th>Typical US range (2026)</th></tr></thead>
      <tbody>
        <tr><td>Per vent / opening</td><td>$25 – $50</td></tr>
        <tr><td>Whole-home minimum</td><td>$300 – $450</td></tr>
        <tr><td>Deep clean + sanitizing</td><td>$450 – $600</td></tr>
        <tr><td>1,500–2,500 sq ft home</td><td>$450 – $550</td></tr>
        <tr><td>Large / two-system homes</td><td>$700 – $1,000+</td></tr>
        <tr><td>Bundle: ducts + dryer vent</td><td>$340 – $800</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does air duct cleaning cost?', a: 'In 2026 US data: $25–50 per vent with a $300–450 whole-home minimum (Angi typical $270–490). Whole-home pricing by size: $400–450 up to 1,500 sq ft, $450–550 for 1,500–2,500 sq ft, and $700–1,000+ for larger or multi-system homes. Sanitizing adds roughly $150.' },
    { q: 'Is air duct cleaning worth the money?', a: 'When the ducts have visible mold, debris or vermin — the EPA\'s actual recommendation — yes; it also helps after renovation or for allergy complaints. Calendar-based cleaning of a clean system has no evidence behind it, which is why the per-vent quote should always come with camera documentation.' },
    { q: 'Why is there a minimum charge for duct cleaning?', a: 'The minimum ($300–450) covers the truck-mounted vacuum, the trunk line and the techs\' time — the same fixed cost whether the house has 6 vents or 16. Per-vent pricing applies above the minimum.' },
    { q: 'How much does it cost to clean ducts and dryer vent together?', a: '$340–800 for the bundle (Angi) versus $400–800 booked separately — the same-truck discount is real. Quote it as one visit with two line items; the dryer vent side is priced by the vent\'s location, not the count.' },
  ],
  related: ['dryer-vent-cleaning-cost-calculator', 'gutter-cleaning-price-calculator', 'mold-remediation-cost-calculator', 'cleaning-estimate-calculator'],
} as RegisteredTool;
