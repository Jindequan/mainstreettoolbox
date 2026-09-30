import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 闸 3 来源（2026-09-30，六源交叉，见 docs/benchmarks-dryer-vent-cleaning.md）：
// 标准单次 $100–350，中位 ~$150 — Angi(~$140) · Homewyse($171–392) · Thumbtack($186–510, 均 $307) · TopAir($75–340, 均 $145) · Gage($100–300) · Brown Chimney(平价 $249)
// 二楼 vent $110–185 — Angi；屋顶 vent $150–250 — Angi（并入 Homewyse 上带 → 屋顶档 $150–350）
// 复杂工况上限 $510 — Thumbtack 上带
// $49 特价陷阱（引流到店加价）— TopAir/多源共识 → verdict 警告
// 家族层：dryer vent cleaning 5,573 strict/90d + near me 2,217（Bing API 批验，SERP 计算器真空）
const BANDS: Record<string, { lo: number; hi: number; label: string }> = {
  ground: { lo: 100, hi: 250, label: 'Ground-level vent' },
  second: { lo: 130, hi: 300, label: 'Second-floor vent' },
  roof: { lo: 150, hi: 350, label: 'Through-the-roof vent' },
};

export default {
  slug: 'dryer-vent-cleaning-cost-calculator',
  industry: 'cleaning',
  name: 'Dryer Vent Cleaning Cost Calculator',
  tagline: 'Price per vent by location, before the $49 special turns into a $300 upsell. No signup.',
  title: 'Dryer Vent Cleaning Cost Calculator — Free 2026 Price per Vent',
  description: 'Dryer vent cleaning costs $100–350 per vent in 2026 — price by location (ground $100–250, second floor $130–300, roof $150–350) and vent count. Free, instant, no signup.',
  result: { label: 'Suggested quote' },
  fields: [
    { id: 'vents', label: 'How many dryer vents', kind: 'number', default: 1, hint: 'most homes: 1' },
    {
      id: 'location', label: 'Vent location', kind: 'select', default: 'ground',
      options: [
        { value: 'ground', label: 'Ground level (wall or basement exit)' },
        { value: 'second', label: 'Second floor' },
        { value: 'roof', label: 'Through the roof' },
      ],
    },
    {
      id: 'service', label: 'Service level', kind: 'select', default: 'standard',
      options: [
        { value: 'standard', label: 'Standard clean (vent line + booster check)' },
        { value: 'deep', label: 'Deep clean (long run / heavy lint, add snaking)' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Suggested quote',
    copy: {
      info: 'US 2026: dryer vent cleaning runs $100–350 per vent, typically ~$150 (Angi; Homewyse; Thumbtack). Roof vents run $150–250 and second-floor $110–185 (Angi). A $49 door-hanger special rarely stays $49 — the upsell is the business model.',
      deep: 'Long or lint-packed runs price above the standard band — Thumbtack\'s upper range reaches $510. Quote the snake work explicitly, not as a surprise.',
    },
  },
  compute: (values, _rows, p) => {
    const band = BANDS[values.location as string] ?? BANDS.ground;
    const vents = clamp(num(values.vents) || 1, 1, 20);
    const deep = values.service === 'deep';
    const f = deep ? 1.35 : 1; // deep clean 档：长管/重 lint，按 Thumbtack 上带方向收紧（单源系数，标注于 explain）
    const lo = band.lo * f, hi = band.hi * f;
    const jobLo = vents * lo, jobHi = vents * hi;
    const copy = p.copy as Record<string, string>;
    const perVent = vents > 1
      ? `${money(lo * 0.95)} – ${money(hi * 0.95)} per extra vent (route discount)`
      : `${money(lo)} – ${money(hi)} per vent`;
    return {
      primary: { label: p.primaryLabel as string, value: `${money(jobLo)} – ${money(jobHi)} · ${vents} vent${vents > 1 ? 's' : ''}, ${band.label.toLowerCase()}` },
      secondary: [
        { label: 'Per vent', value: perVent },
        { label: 'Whole-home bundle note', value: 'Many companies quote $150–250 flat for a standard 1-vent visit' },
        { label: 'Add duct cleaning instead', value: '$350 – $1,000 whole system (compare before bundling)' },
      ],
      verdict: {
        level: 'info',
        text: deep ? copy.deep : copy.info,
      },
    };
  },
  explain: `
    <h3>How much does dryer vent cleaning cost?</h3>
    <p><b>$100–350 per vent is the 2026 US band</b>, with about $150 the typical stop (Angi averages ~$140,
    Homewyse books $171–392, Thumbtack's national average lands at $307 with most pays near $200). Location
    moves the number: <b>second-floor vents run $110–185 and roof vents $150–250</b> (Angi) because of the
    lift and ladder time.</p>
    <h3>Why is the $49 special a trap?</h3>
    <p>The $99-or-less door-hanger price is a loss leader: the tech arrives, finds a "code violation" or a
    packed line, and the real invoice lands at $300+ (TopAir and several consumer guides document the pattern).
    Legitimate ops quote the band above up front. If a price sounds too cheap to pay for a truck roll, it is.</p>
    <h3>What makes a job price above the band?</h3>
    <p>Run length and lint load. A 20-foot run to a roof cap with a decade of compaction needs snaking, not a
    leaf blower — Thumbtack's upper range reaches <b>$510</b>. Quote the snake work as its own line so the
    customer sees why. Whole-system <b>duct cleaning is a different job</b> ($350–1,000) — sell it as an
    upsell, never as the same service.</p>
    <h3>How often should a dryer vent be cleaned?</h3>
    <p>Once a year for most households; every 6 months for large families, pets with hair, or long vertical
    runs. The telling symptom is cycle time: if towels need two cycles, the vent is paying for it in energy —
    cleaning pays itself back before the fire risk even enters the pitch.</p>
    <table>
      <thead><tr><th>Job</th><th>Typical US range (2026)</th></tr></thead>
      <tbody>
        <tr><td>Ground-level vent</td><td>$100 – $250</td></tr>
        <tr><td>Second-floor vent</td><td>$130 – $300</td></tr>
        <tr><td>Through-the-roof vent</td><td>$150 – $350</td></tr>
        <tr><td>Deep clean (long/heavy run)</td><td>×1.35 on band, to ~$510</td></tr>
        <tr><td>Whole-system duct cleaning</td><td>$350 – $1,000</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does dryer vent cleaning cost?', a: 'In 2026 US data: $100–350 per vent with ~$150 typical (Angi ~$140, Homewyse $171–392, Thumbtack average $307). Second-floor vents run $110–185 and roof vents $150–250 (Angi); heavy lint or long runs price to ~$510.' },
    { q: 'Is professional dryer vent cleaning worth it?', a: 'Yes on cycle time alone: a clogged vent makes every load run longer, and the energy waste typically pays back the ~$150 cleaning within a year. The fire-risk reduction (lint is the leading cause of dryer fires) comes on top.' },
    { q: 'Why are $49 dryer vent cleaning specials a trap?', a: 'The advertised price rarely covers the truck roll. The pattern (documented by consumer guides and operators) is a low teaser price, an on-site "code violation" finding, and a final invoice of $300+. Reputable companies quote within the $100–350 band before starting.' },
    { q: 'How often should the dryer vent be cleaned?', a: 'Annually for most homes; every 6 months for large households, homes with shedding pets, or long/vertical vent runs. Longer dryer cycles are the early-warning sign that the line is packing.' },
  ],
  related: ['gutter-cleaning-price-calculator', 'cleaning-estimate-calculator', 'pressure-washing-price-calculator', 'window-cleaning-price-calculator'],
} as RegisteredTool;
