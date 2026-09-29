import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 基准来源见 docs/benchmarks-sod-hydroseeding.md（2026-09-29，SERP 直接核查）。
// 只用 ≥2 一致来源的区间；旧草坪处理/整地加价、bare seed 单源口径，不进计算（FAQ 提及）。
export default {
  slug: 'sod-hydroseeding-cost-calculator',
  industry: 'lawn',
  name: 'Sod & Hydroseeding Cost Calculator',
  tagline: 'New-lawn quotes both ways — instant sod or sprayed lawn, priced per square foot. No signup.',
  title: 'Sod Installation Cost Calculator — Free 2026 Sod & Hydroseeding Pricing',
  description: 'Price a new lawn in seconds: sod installation cost per square foot and hydroseeding per acre or sq ft, with fair 2026 US ranges. Free, no signup.',
  result: { label: 'Suggested quote' },
  fields: [
    {
      id: 'mode', label: 'Which method are you quoting?', kind: 'select', default: 'sod',
      options: [
        { value: 'sod', label: 'Sod installation (instant lawn)' },
        { value: 'hydro', label: 'Hydroseeding (grown from spray)' },
      ],
    },
    { id: 'area', label: 'Area to cover (sq ft)', kind: 'number', default: 5000, hint: '1 acre = 43,560 sq ft' },
  ],
  params: {
    primaryLabel: 'Suggested quote',
    copy: {
      info: '2026 US new-lawn pricing: sod installs at $0.90–1.80 per sq ft (Angi average project $2,063); hydroseeding runs $0.06–0.20 per sq ft, or $2,000–4,000 per acre — a fraction of sod for clients who can wait a few weeks.',
    },
  },
  compute: (values, _rows, p) => {
    // sod installed 带（HomeGuide $0.87-1.76 × 引用 Angi/LawnStarter 的 $1.00-2.20 重叠）；hydro 带（HomeGuide $0.06-0.20；acre=$2k-4k FinnCorp×LawnStarter）
    const sod = { lo: 0.9, hi: 1.8 };
    const hydro = { lo: 0.06, hi: 0.2 };
    const area = clamp(num(values.area), 250, 200000);
    const mode = values.mode;

    let lo: number, hi: number, unit: string;
    if (mode === 'hydro') { lo = area * hydro.lo; hi = area * hydro.hi; unit = `for ${area.toLocaleString('en-US')} sq ft sprayed`; }
    else { lo = area * sod.lo; hi = area * sod.hi; unit = `for ${area.toLocaleString('en-US')} sq ft installed`; }

    const acres = area / 43560;
    const others = [
      mode !== 'sod' && { label: 'Sod instead', value: `${money(area * sod.lo)} – ${money(area * sod.hi)}` },
      mode !== 'hydro' && { label: 'Hydroseed instead', value: `${money(area * hydro.lo)} – ${money(area * hydro.hi)}` },
      mode === 'hydro' && { label: 'Per-acre basis', value: acres >= 0.5 ? `${money(acres * 2000)} – ${money(acres * 4000)} at ${acres.toFixed(2)} acres` : 'per-acre rates favor ½ acre+' },
      mode === 'sod' && { label: 'Typical project range', value: '$1,079 – $3,059 (Angi average $2,063)' },
    ].filter(Boolean) as { label: string; value: string }[];

    return {
      primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)} ${unit}` },
      secondary: others,
      verdict: { level: 'info', text: (p.copy as Record<string, string>).info },
    };
  },
  explain: `
    <h3>How much should I charge to install sod?</h3>
    <p><b>$0.90–1.80 per square foot installed</b> is the defensible 2026 band — HomeGuide's installer data
    runs $0.87–1.76 and guides citing Angi and LawnStarter land $1.00–2.20 with a national average near
    $1.65. Typical whole projects run <b>$1,079–3,059, averaging $2,063</b> (Angi). The inside of that
    number: materials move at $0.30–0.90 per sq ft, so labor, prep and old-lawn removal carry $0.70–1.70 —
    which is why a "just roll it out" job quoted like a materials delivery loses money.</p>
    <h3>How much is hydroseeding per acre?</h3>
    <p><b>$2,000–4,000 per acre</b> is the working range (FinnCorp's hydroseeding calculator; LawnStarter
    cites $2,136–4,897 on larger or tougher sites). Half-acre jobs book near $1,000–2,000, and per-square-foot
    rates run <b>$0.06–0.20</b> (HomeGuide) — the rate slides down as the acreage climbs, so quote small
    lawns per sq ft and acreage per acre.</p>
    <h3>Sod or hydroseed — how do I quote the choice?</h3>
    <p>When a client wavers, quote both and let the calendar decide. On a 5,000 sq ft lawn hydroseeding
    lands <b>$300–1,000 against $4,300–8,800 for sod</b> — but sod is a lawn the day you drive away, and
    hydroseed needs three to four weeks of dedicated watering before it looks like anything. Budget clients
    take the spray; clients with a graduation party in three weeks take the roll. Either way, the quote is
    in writing before the first pallet or the first tank mix.</p>
    <h3>What else goes into the quote?</h3>
    <p>Old-lawn kill and removal, rough grading, starter fertilizer and the watering schedule are the four
    add-ons that turn a profitable job into a favor — there's no reliable national adder for any of them,
    so list each as its own line item instead of absorbing it. For hydroseed jobs, hand over watering
    instructions in writing; a sprayed lawn that dries out in week one is a callback you priced for zero.</p>
    <table>
      <thead><tr><th>Quote model</th><th>Typical US range (2026)</th></tr></thead>
      <tbody>
        <tr><td>Sod installed</td><td>$0.90 – $1.80 / sq ft</td></tr>
        <tr><td>Sod typical project (Angi)</td><td>$1,079 – $3,059</td></tr>
        <tr><td>Sod materials only</td><td>$0.30 – $0.90 / sq ft</td></tr>
        <tr><td>Hydroseeding</td><td>$0.06 – $0.20 / sq ft</td></tr>
        <tr><td>Hydroseeding per acre</td><td>$2,000 – $4,000</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does sod installation cost?', a: 'About $0.90–1.80 per square foot installed in 2026 (HomeGuide runs $0.87–1.76; guides citing Angi and LawnStarter land $1.00–2.20 with a $1.65 average). A typical project totals $1,079–3,059, averaging $2,063 (Angi).' },
    { q: 'How much should I charge for sod installation?', a: 'Work from the band: sod materials run $0.30–0.90 per sq ft, so $0.90–1.80 installed leaves $0.70–1.70 for prep, labor and old-lawn removal. Quote per square foot with site prep as its own line — flat "per pallet" pricing is how prep time disappears.' },
    { q: 'What does hydroseeding cost per acre?', a: 'Roughly $2,000–4,000 per acre (FinnCorp\'s calculator; LawnStarter cites $2,136–4,897 on harder sites), which works out to $0.06–0.20 per sq ft. Half-acre jobs typically book at $1,000–2,000, and the per-unit rate drops as acreage grows.' },
    { q: 'Should my client choose sod or hydroseed?', a: 'Sod costs several times more but is an instant lawn; hydroseed establishes over three to four weeks of careful watering at a fraction of the price (a 5,000 sq ft lawn: $300–1,000 sprayed vs $4,300–8,800 rolled). Quote both with the timeline in writing and let the client\'s calendar pick.' },
  ],
  related: ['lawn-care-estimate-generator', 'aeration-and-overseeding-calculator', 'lawn-mowing-price-calculator', 'mulch-calculator'],
} as RegisteredTool;
