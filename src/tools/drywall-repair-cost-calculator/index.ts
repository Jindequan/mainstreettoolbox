import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 基准来源见 docs/benchmarks-drywall-repair.md（2026-09-29，SERP 直接核查，全部区间 ≥2 源交叉）。
// 高规格 finish、mold remediation、paint 单源/口径混 → 不进计算（FAQ 带出处提及）。
export default {
  slug: 'drywall-repair-cost-calculator',
  industry: 'construction',
  name: 'Drywall Repair Cost Calculator',
  tagline: 'Holes, ceilings, water damage or new hang — price the patch before you quote the paint. No signup.',
  title: 'Drywall Repair Cost Calculator — Free 2026 Repair & Install Pricing',
  description: 'Price a drywall job in seconds: small holes, average repairs, ceiling and water damage, or new hang-and-finish per square foot — with fair 2026 US ranges. Free, no signup.',
  result: { label: 'Suggested quote' },
  fields: [
    {
      id: 'mode', label: 'What kind of job?', kind: 'select', default: 'small',
      options: [
        { value: 'small', label: 'Small hole or dent (doorknob size)' },
        { value: 'average', label: 'Average repair job (medium holes, patches)' },
        { value: 'ceiling', label: 'Ceiling repair' },
        { value: 'water', label: 'Water damage' },
        { value: 'install', label: 'New install & finish (per sq ft)' },
      ],
    },
    { id: 'sqft', label: 'Square feet to hang and finish', kind: 'number', default: 200, hint: 'install mode only' },
  ],
  params: {
    primaryLabel: 'Suggested quote',
    copy: {
      info: '2026 US drywall pricing: $50–150 for a small hole, $200–750 for an average repair, $450–1,400 for ceilings, $500–2,500 for water damage, and $1.50–3.50 per sq ft for new hang-and-finish. Paint and texture bill separately.',
    },
  },
  compute: (values, _rows, p) => {
    // 档位来源见 benchmarks 文档（Coastal/Nedes/HomeGuide/Angi 交叉）
    const band: Record<string, { lo: number; hi: number }> = {
      small: { lo: 50, hi: 150 },
      average: { lo: 200, hi: 750 },
      ceiling: { lo: 450, hi: 1400 },
      water: { lo: 500, hi: 2500 },
    };
    const install = { lo: 1.5, hi: 3.5 }; // per sqft（Nedes/Mr. Handyman/Projul 三源）
    const hour = { lo: 60, hi: 90 }; // Angi + labor guides

    const mode = values.mode;
    const sqft = clamp(num(values.sqft), 10, 5000);

    let lo: number, hi: number, unit: string;
    if (mode === 'install') { lo = sqft * install.lo; hi = sqft * install.hi; unit = `for ${sqft} sq ft hung and finished`; }
    else { const b = band[mode] ?? band.small; lo = b.lo; hi = b.hi; unit = 'per repair'; }

    const others = [
      mode !== 'install' && { label: 'New install instead', value: `${money(sqft * install.lo)} – ${money(sqft * install.hi)} for ${sqft} sq ft` },
      mode !== 'small' && { label: 'Small hole instead', value: `${money(band.small.lo)} – ${money(band.small.hi)}` },
      { label: 'If it turns hourly', value: `${money(hour.lo)} – ${money(hour.hi)} per hour` },
    ].filter(Boolean) as { label: string; value: string }[];

    return {
      primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)} ${unit}` },
      secondary: others,
      verdict: { level: 'info', text: (p.copy as Record<string, string>).info },
    };
  },
  explain: `
    <h3>What should I charge for a small drywall repair?</h3>
    <p><b>$50–150 for a doorknob-size hole or single dent</b> — the floor most shops set (Coastal Drywall
    Repair's damage-type table matches Nedes Estimating's $50–150 starting band). Small jobs are about the
    truck roll: under roughly 10 sq ft, the effective rate works out to $75–100 per square foot (Angi),
    which is why per-square-foot quoting breaks down on patches. Set a minimum that respects the drive.</p>
    <h3>What does an average repair job run?</h3>
    <p>HomeGuide puts the average drywall repair at <b>$200–750</b>, and Angi's typical project lands at
    <b>$296–929</b> — overlapping bands, same story. When a "small patch" turns into three rooms of nail pops and
    corner-bead fixes, quote it as an average job at <b>$60–90 per hour</b> (Angi) with a written scope,
    not as a patch price.</p>
    <h3>How do ceiling and water-damage quotes differ?</h3>
    <p>Ceilings cost more because of the staging: Angi's ceiling-repair data averages about <b>$1,080 with
    a typical range of $438–1,724</b>, and Coastal Drywall's ceiling work runs $250–1,400 — overlap them and
    <b>$450–1,400 is the defensible band</b>. Water damage starts at <b>$500 and clears $2,500</b> once
    moisture testing, insulation or repainting join the job. Two rules: the leak's source (roof or plumbing)
    is someone else's line item, and mold remediation can add $1,500–4,500+ (Angi) — scope it before you quote.</p>
    <h3>What about new hang and finish?</h3>
    <p><b>$1.50–3.50 per square foot installed and finished</b> is the consistent national band for
    residential drywall (Nedes Estimating, Mr. Handyman and Projul all land there); specialty level-5 or
    curved work runs $4–6 (Projul). That price is drywall only — texture and paint bill separately, and
    saying so in the quote is what keeps the margin.</p>
    <table>
      <thead><tr><th>Quote model</th><th>Typical US range (2026)</th></tr></thead>
      <tbody>
        <tr><td>Small hole / dent</td><td>$50 – $150</td></tr>
        <tr><td>Average repair job</td><td>$200 – $750</td></tr>
        <tr><td>Ceiling repair</td><td>$450 – $1,400</td></tr>
        <tr><td>Water damage</td><td>$500 – $2,500+</td></tr>
        <tr><td>New install &amp; finish</td><td>$1.50 – $3.50 / sq ft</td></tr>
        <tr><td>Hourly fallback</td><td>$60 – $90 / hr</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does drywall repair cost?', a: 'In 2026 US data: $50–150 for a small hole, $200–750 for an average repair job (HomeGuide; Angi lands typical projects at $296–929), $450–1,400 for ceiling work, and $500–2,500+ for water damage. Hourly fallback is $60–90.' },
    { q: 'How much should I charge per square foot for drywall?', a: '$1.50–3.50 per square foot for new hang-and-finish (Nedes Estimating, Mr. Handyman and Projul all agree). But effective per-square-foot pricing on small patches runs $75–100 (Angi) — under about 10 sq ft, quote a minimum service call instead.' },
    { q: 'How much is ceiling drywall repair?', a: 'Angi averages ceiling repair near $1,080 with a typical range of $438–1,724; Coastal Drywall books ceiling jobs at $250–1,400. The defensible quote band is $450–1,400, more if texture matching or water damage is involved.' },
    { q: 'Should paint and texture be included in a drywall quote?', a: 'No — the $1.50–3.50 per square foot national band is drywall only. Bill texture, paint and primer as separate lines. And if the damage is water-related, scope mold remediation first: it can add $1,500–4,500+ (Angi) and it changes the whole job.' },
  ],
  related: ['painting-estimate-calculator', 'contractor-hourly-rate-calculator', 'material-cost-estimator'],
} as RegisteredTool;
