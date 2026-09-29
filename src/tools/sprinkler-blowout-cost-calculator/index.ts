import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 基准来源见 docs/benchmarks-sprinkler-blowout.md（2026-09-29，SERP 直接核查）。
// 只用 ≥2 一致来源的区间；backflow 附加费与冻结损失数字仅 FAQ 带出处提及，不进计算。
export default {
  slug: 'sprinkler-blowout-cost-calculator',
  industry: 'lawn',
  name: 'Sprinkler Blowout Cost Calculator',
  tagline: 'Flat per visit or per zone — price winterization before the first freeze. No signup.',
  title: 'Sprinkler Blowout Cost Calculator — Free 2026 Winterization Pricing',
  description: 'Price a sprinkler blowout in seconds: flat per-visit or per-zone winterization rates, with fair 2026 US ranges from Angi and working operators. Free, no signup.',
  result: { label: 'Suggested quote' },
  fields: [
    {
      id: 'mode', label: 'How do you charge?', kind: 'select', default: 'flat',
      options: [
        { value: 'flat', label: 'Flat per visit (whole system)' },
        { value: 'zone', label: 'Per zone' },
      ],
    },
    { id: 'zones', label: 'Zones in the system', kind: 'number', default: 5, hint: 'per-zone mode only' },
  ],
  params: {
    primaryLabel: 'Suggested quote',
    copy: {
      info: '2026 US sprinkler blowouts run $60–150 per visit flat (average about $85), or $5–10 per zone. A skipped blowout costs clients $170–420 in average freeze repairs — your best season-end upsell line.',
    },
  },
  compute: (values, _rows, p) => {
    // 整单 flat（Angi avg $85 × Beeline 操作商 $75-93 交叉）；per zone（运营商实操 $5-10）
    const flat = { lo: 60, hi: 150 };
    const perZone = { lo: 5, hi: 10 };
    const zones = clamp(Math.round(num(values.zones)), 1, 16);
    const mode = values.mode;

    let lo: number, hi: number, unit: string;
    if (mode === 'zone') { lo = zones * perZone.lo; hi = zones * perZone.hi; unit = `for ${zones} zone${zones === 1 ? '' : 's'}`; }
    else { lo = flat.lo; hi = flat.hi; unit = 'per visit, whole system'; }

    const others = [
      mode !== 'flat' && { label: 'Flat instead', value: `${money(flat.lo)} – ${money(flat.hi)} per visit` },
      mode !== 'zone' && { label: 'Per zone instead', value: `${money(zones * perZone.lo)} – ${money(zones * perZone.hi)} for ${zones} zones` },
      { label: 'Market average', value: 'about $85 per visit (Angi 2025)' },
    ].filter(Boolean) as { label: string; value: string }[];

    return {
      primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)} ${unit}` },
      secondary: others,
      verdict: { level: 'info', text: (p.copy as Record<string, string>).info },
    };
  },
  explain: `
    <h3>How much should I charge for a sprinkler blowout?</h3>
    <p><b>$60–150 per visit flat, averaging about $85</b> for a typical residential system (Angi 2025 data;
    working operators like Beeline Sprinkler Repair in Idaho book typical homes at $75–93). The common
    alternative is <b>$5–10 per zone</b> — a four-zone job lands near $75, right where the flat averages sit.
    Charge what your market bears, but the compressor and the drive time are your real costs, not the zone count.</p>
    <h3>Flat or per zone — which quote fits?</h3>
    <p>Flat per visit is the residential default: one price, no counting zones, and it prices in the trip.
    Per-zone defends you on big properties — an eight-zone estate at $5–10 a zone bills $40–80 for the same
    truck time as a four-zone bungalow. If acreage means real drive time, price the drive: national cost
    guides span $28–608 mostly because of compressor cost and travel, not zones (Landscapey's guide aggregate).</p>
    <h3>Why does the price swing so much by market?</h3>
    <p>Because winterization is a two-week season and a truck roll. Denver operators book residential
    winterizations around <b>$175 flat</b> in the high-end front-range market; Columbus, Ohio averages $73
    ($51–96). In Canada, comparable blowouts start near $100. Know your metro before the season starts —
    mid-October is panic season on both sides of the quote.</p>
    <h3>What's the freeze-damage argument worth to you?</h3>
    <p>This is your best season-end upsell line, with numbers: skipped winterizations lead to freeze
    damage that <b>averages $170–420 to repair, with severe cases at $425–1,200</b> (Angi). Against an
    $85 blowout, the math sells itself — put it in the reminder email you send in September.</p>
    <table>
      <thead><tr><th>Quote model</th><th>Typical US range (2026)</th></tr></thead>
      <tbody>
        <tr><td>Flat per visit (whole system)</td><td>$60 – $150</td></tr>
        <tr><td>Per zone</td><td>$5 – $10 / zone</td></tr>
        <tr><td>Market average (flat)</td><td>≈ $85</td></tr>
        <tr><td>High-cost metro example (Denver)</td><td>≈ $175 flat</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does a sprinkler blowout cost?', a: 'Most US residential blowouts run $60–150 per visit, averaging about $85 (Angi 2025). Working operators report typical homes at $75–93. Larger estates and high-cost metros book higher.' },
    { q: 'What is a fair price per zone for winterization?', a: '$5–10 per zone is the common operator practice; a typical four-zone system lands around $75, which matches the national flat-rate average. Per-zone pricing mainly helps on large multi-zone properties.' },
    { q: 'Should I charge extra for backflow devices?', a: 'Many operators do — Angi reports roughly $50 per additional backflow device, since each needs its own isolation and blowout. List it as a line item in written quotes rather than absorbing the extra time.' },
    { q: 'Why do prices vary so much between companies?', a: 'The work is minutes per zone; the cost is the compressor and the drive. That is why national guides span $28–608 (Landscapey aggregate) and why a Denver winterization books at $175 while Columbus averages $73. Price your travel, not just the zones.' },
  ],
  related: ['snow-removal-pricing-calculator', 'christmas-light-pricing-calculator', 'lawn-care-estimate-generator'],
} as RegisteredTool;
