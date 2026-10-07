import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 闸 3 来源（2026-10-01，每档 ≥2 源，见 docs/benchmarks-windshield-replacement.md）：
// 标准更换 $200–500 — Apex Auto Glass ∩ Glass.net(均 $273) ∩ AAA(均 $390, $50–550)
// chip 修补 $60–150 — ERP SoCal ∩ 行业 guides($50–150)
// ADAS 重校准加项 $150–600（均 ~$300）— Glass & Auto guide ∩ AAA(~$360, 占单 ~25%) ∩ Safelite 实单 ~$300+
// ADAS 车型整单 $1,000–1,800 — Subaru Eyesight 级（上限单源标注）
// SUV/卡车/夹层玻璃 $300–400+ — Spirit Auto Glass ∩ ERP SoCal
// 零自付额玻璃险州 FL/KY/SC — 保险事实，FAQ
// 验证层：R7 新词市场轮，windshield replacement cost 1,415 strict/90d（全项目第二大头词）
// 闸 2：SERP 报价工具全是卖联系方式的铅页聚合器（Glass.net/Safelite）→ 匿名价格带=MST DNA 空白点
export default {
  slug: 'windshield-replacement-cost-calculator',
  industry: 'auto',
  name: 'Windshield Replacement Cost Calculator',
  tagline: 'Know the band before Safelite quotes you — ADAS line item included. No signup, no phone number.',
  title: 'Windshield Replacement Cost Calculator — Free 2026 Pricing with ADAS',
  description: 'Windshield replacement runs $200–500 standard, $1,000–1,800 with ADAS recalibration. Chip repair $60–150. Price it anonymously before you hand over your keys — free, no signup.',
  result: { label: 'Estimated cost' },
  fields: [
    {
      id: 'service', label: 'What does the glass need?', kind: 'select', default: 'replace',
      options: [
        { value: 'replace', label: 'Full windshield replacement' },
        { value: 'chip', label: 'Chip / short crack repair' },
      ],
    },
    { id: 'chips', label: 'How many chips', kind: 'number', default: 1, hint: 'chip repair only' },
    {
      id: 'vehicle', label: 'Vehicle', kind: 'select', default: 'standard',
      options: [
        { value: 'standard', label: 'Standard car' },
        { value: 'large', label: 'SUV / truck / laminated glass' },
      ],
    },
    {
      id: 'adas', label: 'Camera / sensor on the glass?', kind: 'select', default: 'no',
      options: [
        { value: 'no', label: 'No (or not sure yet)' },
        { value: 'yes', label: 'Yes — ADAS recalibration needed' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Estimated cost',
    copy: {
      info: 'US 2026: standard windshield replacement runs $200–500 (AAA averages $390; Glass.net $273). Chip repair is $60–150. SUVs, trucks and laminated-glass vehicles price at $300–400+. If your car has a camera behind the glass, recalibration adds $150–600 — it is not optional, it is the law of how the system works.',
      adas: 'ADAS-equipped cars run $1,000–1,800 all-in once recalibration is included (Subaru Eyesight class). Two checks before paying: does the quote include recalibration in writing, and is your comprehensive coverage picking it up — glass is zero-deductible in FL, KY and SC.',
      chip: 'Chip repair is the trade\'s best deal: $60–150 and often free under comprehensive coverage. Repair early — a chip becomes a replacement the moment it spreads, and the price multiplies tenfold.',
    },
  },
  compute: (values, _rows, p) => {
    const service = values.service as string;
    const adas = values.adas === 'yes';
    const vehicle = values.vehicle as string;
    const chips = clamp(num(values.chips) || 1, 1, 10);
    const copy = p.copy as Record<string, string>;

    if (service === 'chip') {
      const lo = chips * 60, hi = chips * 150;
      return {
        primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)} · ${chips} chip${chips > 1 ? 's' : ''} repaired` },
        secondary: [
          { label: 'Per chip', value: '$60 – $150' },
          { label: 'Free under coverage?', value: 'Many comprehensive policies waive glass entirely — call before paying' },
          { label: 'If it spreads', value: `${money(vehicle === 'large' ? 350 : 200)} – ${money(vehicle === 'large' ? 700 : 500)} replacement (act early)` },
        ],
        verdict: { level: 'info', text: copy.chip },
      };
    }

    const base = vehicle === 'large' ? { lo: 350, hi: 700 } : { lo: 200, hi: 500 };
    const adasAdd = adas ? { lo: 150, hi: 600 } : { lo: 0, hi: 0 };
    const lo = base.lo + adasAdd.lo, hi = base.hi + adasAdd.hi;
    const secondary = [
      { label: 'Glass + install', value: `${money(base.lo)} – ${money(base.hi)}` },
      adas && { label: 'ADAS recalibration add-on', value: '$150 – $600 (avg ~$300; AAA books ~$360)' },
      { label: 'OEM vs aftermarket glass', value: 'Ask which — OEM can add 20–60% and insurers default to aftermarket' },
      { label: 'Zero-deductible glass states', value: 'FL, KY, SC — comprehensive often costs you $0' },
    ].filter(Boolean) as { label: string; value: string }[];
    return {
      primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)} · ${vehicle === 'large' ? 'SUV/truck' : 'standard'}${adas ? ' + ADAS recalibration' : ''}` },
      secondary,
      verdict: {
        level: adas ? 'warn' : 'info',
        text: adas ? copy.adas : copy.info,
      },
    };
  },
  explain: `
    <h3>How much does windshield replacement cost?</h3>
    <p><b>$200–500 for a standard car</b> is the 2026 band — AAA's national average sits at $390 and
    Glass.net's book averages $273, with most quotes between $50 and $550. SUVs, trucks and vehicles with
    laminated glass run $300–400 and up. That is the glass and the install; everything electronic on top
    is a separate line.</p>
    <h3>Why do some windshields cost $1,000+?</h3>
    <p>Because the windshield is now a camera mount. If your car has adaptive cruise, lane-keep or automatic
    braking, the glass carries a sensor that must be <b>recalibrated after every replacement — $150–600,
    averaging ~$300</b> (AAA books it at ~$360, roughly a quarter of the total bill). Camera-equipped cars
    land at <b>$1,000–1,800 all-in</b> (Subaru Eyesight class). A quote that skips recalibration is not a
    discount; it is a car that brake-late. Get it in writing.</p>
    <h3>Should you repair the chip or replace the glass?</h3>
    <p>Repair if it is a chip or short crack under about a dollar bill in length, out of the driver's sight
    line: <b>$60–150, takes 30 minutes, keeps the factory seal</b> — and it is often $0 under comprehensive
    coverage. Replace the moment it spreads, hits the edge, or blocks the camera's view. The chip's whole
    business model is becoming a $400 replacement; repair early.</p>
    <h3>Is windshield replacement covered by insurance?</h3>
    <p>Comprehensive coverage usually covers glass, and <b>Florida, Kentucky and South Carolina are
    zero-deductible glass states</b> — the replacement costs you nothing there. Elsewhere, your deductible
    decides: under ~$500, pay cash and keep the claim off the record. And before any of it, compare the
    quote against the band above — the aggregate quote sites (Glass.net and friends) sell your number to
    three shops; the band costs nothing and belongs to you.</p>
    <h3>What does a realistic quote look like?</h3>
    <p>Two examples from the bands above. A camera-free sedan lands inside <b>$200–500</b> — a
    mid-band $350 invoice for OEM-equivalent glass in a mid-size city is normal (illustrative).
    A camera-equipped SUV bills in two lines: <b>$300–500</b> glass plus <b>$150–600</b> ADAS
    recalibration, landing at <b>$450–1,100</b> — and $1,000–1,800 on premium trims. Always two
    lines: glass, and calibration. A quote missing the second line on a camera car is not cheaper;
    it is incomplete.</p>
    <table>
      <thead><tr><th>Job</th><th>Typical US range (2026)</th></tr></thead>
      <tbody>
        <tr><td>Chip repair, per chip</td><td>$60 – $150</td></tr>
        <tr><td>Replacement, standard car</td><td>$200 – $500</td></tr>
        <tr><td>Replacement, SUV / truck / laminated</td><td>$300 – $700+</td></tr>
        <tr><td>ADAS recalibration add-on</td><td>$150 – $600</td></tr>
        <tr><td>ADAS-equipped car, total</td><td>$1,000 – $1,800</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does windshield replacement cost?', a: 'In 2026 US data: $200–500 for a standard car (AAA averages $390), $300–700+ for SUVs, trucks and laminated glass, and $1,000–1,800 total for ADAS-equipped cars once camera recalibration ($150–600, avg ~$300) is included.' },
    { q: 'Why is ADAS recalibration required after windshield replacement?', a: 'On cars with adaptive cruise, lane-keep or automatic braking, the camera mounts to the glass. Replacing the glass changes the camera\'s angle, and the system must re-learn its aim — $150–600 on top of the glass. Skipping it leaves safety systems aiming wrong.' },
    { q: 'Is it worth repairing a windshield chip?', a: 'Yes — $60–150 versus a $200–500 replacement, 30 minutes, and the factory seal stays intact. Many comprehensive policies cover it free. Repair before it spreads: chips at the edge or in the camera\'s view still need full replacement.' },
    { q: 'What should a windshield replacement quote include?', a: 'Two lines: the glass itself ($200–500 for a standard car, $300–700+ for SUV, truck or laminated glass) and — on cars with adaptive cruise, lane-keep or automatic braking — ADAS recalibration at $150–600, averaging about $300. On a camera-equipped car, a quote without the calibration line is incomplete, not inexpensive.' },
    { q: 'Does insurance cover windshield replacement?', a: 'Comprehensive coverage usually does, and Florida, Kentucky and South Carolina are zero-deductible glass states — replacement costs $0 there. Elsewhere your deductible applies, so under ~$500 it is usually cheaper to pay cash. Aggregator quote sites sell your details to three shops; the published band is free.' },
  ],
  related: [],
} as RegisteredTool;
