import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 基准（2026-09-17 验证，见状态机候选池+本轮搜索交叉）：
// 仅通气 $15–30/千sqft（LawnSite 承包商 $15–20 + HomeGuide/Angi 整单区间换算）；
// 通气+补播组合 $35–80/千sqft（Reddit 从业者 $35–40 低端 + Green Lawn Fertilizing ~$85/千sqft 上界 + Homewyse 全服务口径）；
// 整单参考：Angi 平均住宅通气球 $75–206；HomeGuide 3–5k 草坪 $120–175。
const RATES: Record<string, { lo: number; hi: number }> = {
  aeration: { lo: 15, hi: 30 },
  combo: { lo: 35, hi: 80 },
};

export default {
  slug: 'aeration-and-overseeding-calculator',
  industry: 'lawn',
  name: 'Aeration and Overseeding Calculator',
  tagline: 'Price the fall job before the season does. No signup.',
  title: 'Aeration and Overseeding Calculator — Free 2026 Pricing Tool',
  description: 'Price lawn aeration and overseeding by lawn size: aeration alone $15–30 per 1,000 sq ft, the combination $35–80 — with the fair quote range and typical whole-lawn jobs. Free, no signup.',
  result: { label: 'Suggested quote' },
  fields: [
    {
      id: 'service', label: 'What are you quoting?', kind: 'select', default: 'combo',
      options: [
        { value: 'aeration', label: 'Aeration only' },
        { value: 'combo', label: 'Aeration + overseeding' },
      ],
    },
    { id: 'area', label: 'Lawn size', kind: 'number', default: 5000, hint: 'square feet' },
    { id: 'doublePass', label: 'Double-pass aeration', kind: 'select', default: 'no',
      options: [
        { value: 'no', label: 'No — single pass' },
        { value: 'yes', label: 'Yes — heavy clay / compacted (+50%)' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Suggested quote',
    copy: {
      info: 'US 2026 rates: aeration alone runs $15–30 per 1,000 sq ft; aeration plus overseeding $35–80. Quote the range and walk the lawn first.',
    },
  },
  compute: (values, _rows, p) => {
    const area = clamp(num(values.area), 500, 435600); // 最多一英亩以上
    const ksqft = area / 1000;
    const r = RATES[values.service as string] ?? RATES.combo;
    const pass = values.doublePass === 'yes' ? 1.5 : 1;
    const lo = r.lo * ksqft * pass;
    const hi = r.hi * ksqft * pass;
    const rate = `$${r.lo}–${r.hi} / 1,000 sq ft`;
    const typical5k = values.service === 'aeration'
      ? '$75–150 for a typical 5,000 sq ft lawn'
      : '$175–400 for a typical 5,000 sq ft lawn';
    return {
      primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)}` },
      secondary: [
        { label: 'Rate', value: rate },
        { label: 'Reference', value: typical5k },
      ],
      verdict: { level: 'info', text: (p.copy as Record<string, string>).info },
    };
  },
  explain: `
    <h3>How much should I charge for aeration?</h3>
    <p>By lawn size. Aeration alone runs <b>$15–30 per 1,000 sq ft</b> — contractors on LawnSite report
    $15–20, and the HomeGuide and Angi 2026 tables (typical residential jobs $75–206) land in the same
    arithmetic for a normal yard. Most operators add a stop fee of <b>$40–135</b> for travel outside
    their route.</p>
    <h3>What about aeration plus overseeding?</h3>
    <p>The combination runs <b>$35–80 per 1,000 sq ft</b>. Working operators on Reddit quote $35–40 at
    standard seed rates (about 3 lb per 1,000 sq ft); full-service programs with premium seed run to $85
    (Green Lawn Fertilizing prices a 5,000 sq ft lawn near $425). Seed cost is the swing — price the
    seed you actually spread.</p>
    <h3>When does the double pass earn its money?</h3>
    <p>Heavily compacted or clay soil justifies a second aeration pass at roughly half again the price.
    Walk the lawn first: if the cores are shallow or sparse, the double pass is the honest quote — and
    the visible result sells next year's contract.</p>
    <table>
      <thead><tr><th>Service</th><th>Typical US rate (2026)</th></tr></thead>
      <tbody>
        <tr><td>Aeration only</td><td>$15 – $30 / 1,000 sq ft</td></tr>
        <tr><td>Aeration + overseeding</td><td>$35 – $80 / 1,000 sq ft</td></tr>
        <tr><td>Typical residential job (aeration)</td><td>$75 – $206 whole lawn</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does lawn aeration cost?', a: 'Across 2026 US data, $15–30 per 1,000 sq ft, which puts a typical residential lawn at $75–206 whole-job (Angi average). Contractors on LawnSite report $15–20 per 1,000 sq ft with $40–135 stop fees for out-of-route travel.' },
    { q: 'How much should I charge for aeration and overseeding together?', a: 'The combination typically runs $35–80 per 1,000 sq ft. Working operators quote $35–40 at standard seed rates (about 3 lb per 1,000 sq ft); premium seed and full-service programs run toward the top of the band.' },
    { q: 'Why do pros push aeration and overseeding in the fall?', a: 'Cool-season grasses (fescue, bluegrass, rye) germinate best in cooling soil, and the aeration holes give seed contact with soil instead of thatch. Fall jobs also pre-sell next spring: the lawn that came in thick keeps the customer.' },
    { q: 'Should I charge a travel or stop fee?', a: 'Most operators do — $40–135 depending on distance, per LawnSite contractor reports. Bundle neighbors on the same street into one route day and the fee becomes margin instead of friction.' },
  ],
  related: ['lawn-mowing-price-calculator', 'lawn-care-estimate-generator', 'mulch-calculator', 'snow-removal-pricing-calculator'],
} as RegisteredTool;
