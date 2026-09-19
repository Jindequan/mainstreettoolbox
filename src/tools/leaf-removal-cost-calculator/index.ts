import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 闸 3 基准（2026-09-19 研究，每档 ≥2 源，见 keyword-research R3 / 状态机第 12 轮）：
// 整单带 by yard size — LawnStarter 2026 表（1/6 acre $115–185 / 1/4 $160–290 / 1/2 $230–475 / 3/4 $305+ / 1 acre up to $925）；
//   Angi 印证量级：5,000–10,000 sqft yard $200–500 per service。3/4 与 1 acre 高端为同表内插。
// 机组时薪带 — $40–75/hr（Angi ~$60 中值 + LawnStarter $40–75 + Lawn Love 同带）；GreenPal 专家 $75–150 带 2 小时起收费。
// 最低收费 — 小单 $150–200（LawnStarter）；晚季一次性 $250–400（GreenPal）；LawnSite 实战 fall cleanup 起步 $250、均值 ~$300。
const BANDS: Record<string, { lo: number; hi: number; label: string }> = {
  '1/6': { lo: 115, hi: 185, label: '1/6 acre' },
  '1/4': { lo: 160, hi: 290, label: '1/4 acre' },
  '1/2': { lo: 230, hi: 475, label: '1/2 acre' },
  '3/4': { lo: 305, hi: 550, label: '3/4 acre' },
  '1': { lo: 400, hi: 925, label: '1 acre' },
};

export default {
  slug: 'leaf-removal-cost-calculator',
  industry: 'lawn',
  name: 'Leaf Removal Cost Calculator',
  tagline: 'Flat quote vs crew hours — both in one pass. No signup.',
  title: 'Leaf Removal Cost Calculator — Free Fall Cleanup Pricing Tool',
  description: 'Price leaf removal and fall cleanup by yard size — 1/6 acre $115–185 up to 1 acre $400–925 — cross-checked against your crew hours and rate. Free, instant, no signup.',
  result: { label: 'Suggested flat quote' },
  fields: [
    {
      id: 'yardSize', label: 'Yard size', kind: 'select', default: '1/4',
      options: [
        { value: '1/6', label: '1/6 acre (~7,000 sq ft lot)' },
        { value: '1/4', label: '1/4 acre (~10,000 sq ft lot)' },
        { value: '1/2', label: '1/2 acre' },
        { value: '3/4', label: '3/4 acre' },
        { value: '1', label: '1 acre' },
      ],
    },
    { id: 'crewSize', label: 'Crew size', kind: 'number', default: 2, hint: 'workers' },
    { id: 'hours', label: 'Estimated hours on site', kind: 'number', default: 3 },
    { id: 'rate', label: 'Crew rate per hour', kind: 'money', default: 60 },
  ],
  params: {
    primaryLabel: 'Suggested flat quote',
    copy: {
      info: 'US 2026: leaf cleanup runs $40–75 per crew-hour (Angi; LawnStarter), with whole-job flat quotes by yard size below. Small jobs carry a $150–200 minimum; late-season one-offs $250–400 (GreenPal).',
      low: 'Your crew rate is below the $40–75/hour US band. Raise the rate or enforce a 2-hour minimum (GreenPal) — cheap hours do not win autumn routes, they fill them with losses.',
      high: 'Crew rates to $150/hour exist with 2-hour minimums (GreenPal). If you charge above the band, lead with the flat quote and let the rate stay internal.',
    },
  },
  compute: (values, _rows, p) => {
    const band = BANDS[values.yardSize as string] ?? BANDS['1/4'];
    const crew = clamp(num(values.crewSize) || 1, 1, 10);
    const hours = clamp(num(values.hours) || 1, 0.5, 24);
    const rate = clamp(num(values.rate) || 0, 0, 400);
    const mid = (band.lo + band.hi) / 2;
    const crewEst = crew * hours * rate;
    const copy = p.copy as Record<string, string>;
    const level = rate < 40 ? 'warn' : rate > 75 ? 'info' : 'ok';
    const text = rate < 40 ? copy.low : rate > 75 ? copy.high : copy.info;
    // flat quote 落在最低收费保护内
    const flat = Math.max(mid, band.label === '1/6 acre' ? 150 : band.label === '1/4 acre' ? 150 : 0);
    return {
      primary: { label: p.primaryLabel as string, value: money(flat) },
      secondary: [
        { label: 'Market range', value: `${money(band.lo)} – ${money(band.hi)}` },
        { label: 'Crew estimate', value: `${crew} × ${hours} hrs × ${money(rate)} = ${money(crewEst)}` },
      ],
      verdict: { level, text },
    };
  },
  explain: `
    <h3>Two ways to price the same pile of leaves</h3>
    <p>The trade quotes fall cleanup two ways, and the pros cross-check both before naming a number
    (ECHO's pricing guide walks exactly this method): estimate your crew hours and multiply by your
    hourly rate, <i>then</i> compare it against the whole-job band for that yard size. If the crew math
    lands far below the yard-size band, your hours estimate is wrong; if it lands far above, your rate
    is the problem.</p>
    <p><b>By yard size (2026 US, LawnStarter):</b> 1/6 acre $115–185, 1/4 acre $160–290, 1/2 acre
    $230–475, 3/4 acre $305–550, a full acre up to $925. Angi's independent read of 5,000–10,000 sq ft
    yards — $200–500 per service — sits inside the same arithmetic.</p>
    <p><b>By crew time:</b> $40–75 per crew-hour is the 2026 US band (Angi; LawnStarter; Lawn Love),
    with a ~$60 midpoint. GreenPal's operator guidance puts experienced crews at $75–150 with a
    <b>2-hour minimum</b> — the minimum is what makes small lots worth the truck roll.</p>
    <p><b>Minimums are not optional in the fall.</b> Small jobs carry a $150–200 floor, mid-size
    $250–300, and late-season one-time jobs (the "everything is down and matted" calls) justify
    $250–400 (LawnStarter; GreenPal). LawnSite operators report fall cleanups starting at $250 and
    averaging about $300.</p>
    <p>What moves you inside the band: leaf volume (mature oaks vs one maple), whether disposal is
    curbside or haul-away, and terrain. A season plan smooths all of it — three scheduled visits priced
    below three one-offs still beats the one-offs, because the truck roll is already paid for.</p>
    <table>
      <thead><tr><th>Yard size</th><th>Whole-job flat band (2026 US)</th></tr></thead>
      <tbody>
        <tr><td>1/6 acre</td><td>$115 – $185</td></tr>
        <tr><td>1/4 acre</td><td>$160 – $290</td></tr>
        <tr><td>1/2 acre</td><td>$230 – $475</td></tr>
        <tr><td>3/4 acre</td><td>$305 – $550</td></tr>
        <tr><td>1 acre</td><td>$400 – $925</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does leaf removal cost in 2026?', a: 'By yard size: 1/6 acre $115–185, 1/4 acre $160–290, 1/2 acre $230–475, 3/4 acre $305–550 and up to $925 for a full acre (LawnStarter). By crew time: $40–75 per hour (Angi; LawnStarter), with small-job minimums of $150–200.' },
    { q: 'Should I charge by the hour or a flat rate for fall cleanup?', a: 'Do the crew math first (hours × your rate), then check it against the yard-size band and quote the flat number — ECHO\'s pricing guide recommends exactly this, and customers prefer a fixed price. Protect it with a 2-hour minimum (GreenPal).' },
    { q: 'What is a fair minimum charge for leaf cleanup?', a: 'Small jobs $150–200, mid-size $250–300, and large or high-cost-market properties $300–500 (LawnStarter). Late-season one-time cleanups justify $250–400 (GreenPal) — the leaves are matted, wet and twice the work.' },
    { q: 'How many visits does a fall cleanup plan include?', a: 'Most properties sit at 2–3 scheduled visits across the season. Price each visit below the one-off rate but above your crew cost — the route is already paid for, so the discount buys density, not losses. One-time late-season callers pay the highest minimums.' },
  ],
  related: ['snow-removal-pricing-calculator', 'aeration-and-overseeding-calculator', 'lawn-care-estimate-generator', 'lawn-mowing-price-calculator'],
} as RegisteredTool;
