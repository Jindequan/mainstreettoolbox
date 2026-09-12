import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

export default {
  slug: 'junk-removal-estimator',
  industry: 'cleaning',
  name: 'Junk Removal Cost Estimator',
  tagline: 'Quote by truck space, not by gut feel. No signup.',
  title: 'Junk Removal Cost Estimator — Free pricing tool for junk removal businesses',
  description: 'Price a junk removal job by truck load: estimate volume, item type and labor stairs — get a fair quote range, the industry minimum, and per-load math. Free, no signup.',
  result: { label: 'Suggested quote' },
  fields: [
    {
      id: 'load', label: 'How much junk?', kind: 'select', default: 'half',
      hint: 'standard dump truck ≈ 12 yd³',
      options: [
        { value: 'eighth', label: '⅛ truck (~1.5 yd³ — a few items)' },
        { value: 'quarter', label: '¼ truck (~3 yd³ — room corner)' },
        { value: 'half', label: '½ truck (~6 yd³ — garage bay)' },
        { value: 'threequarter', label: '¾ truck (~9 yd³ — full garage)' },
        { value: 'full', label: 'Full truck (~12 yd³ — estate cleanout)' },
      ],
    },
    {
      id: 'type', label: 'What kind', kind: 'select', default: 'mixed',
      options: [
        { value: 'mixed', label: 'Mixed household' },
        { value: 'heavy', label: 'Heavy debris (concrete, dirt — +40%)' },
        { value: 'single', label: 'Single bulky item' },
      ],
    },
    {
      id: 'stairs', label: 'Access', kind: 'select', default: 'ground',
      options: [
        { value: 'ground', label: 'Ground floor / garage' },
        { value: 'stairs', label: 'Stairs / elevator (+15%)' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Suggested quote',
    copy: {
      info: 'The industry prices junk removal in fractions of a truck, not cubic yards: ¼ load $150–250, ½ load $250–420, full load $500–800, with a $100–150 job minimum. Quote the fraction, confirm it on site before loading.',
    },
  },
  compute: (values, _rows, p) => {
    const loads: Record<string, number> = { eighth: 0.125, quarter: 0.25, half: 0.5, threequarter: 0.75, full: 1 };
    const frac = loads[values.load] ?? 0.5;
    const typeMult: Record<string, number> = { mixed: 1, heavy: 1.4, single: 1.2 };
    const stairMult = values.stairs === 'stairs' ? 1.15 : 1;
    const base = 640; // 满载中值
    const mid = base * frac * (typeMult[values.type] ?? 1) * stairMult;
    const lo = Math.max(100, mid * 0.85);
    const hi = Math.max(150, mid * 1.15);
    const perYd = mid / (frac * 12 || 1);
    const hours = 1 + frac * 2 + (values.stairs === 'stairs' ? 0.5 : 0);
    return {
      primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)}` },
      secondary: [
        { label: 'Per yard', value: `$${perYd.toFixed(0)} / yd³` },
        { label: 'Estimated time', value: `${hours.toFixed(1)} hrs with 2 workers` },
      ],
      verdict: { level: 'info', text: (p.copy as Record<string, string>).info },
    };
  },
  explain: `
    <p>Junk removal prices in <b>fractions of a truck</b>, not hours: customers understand "a quarter truck"
    better than cubic yards, and your costs (dump fee + drive + crew time) scale with load fraction. Typical
    US ranges: <b>⅛ load $100–180 · ¼ load $150–250 · ½ load $250–420 · full load $500–800</b>, with a
    $100–150 job minimum.</p>
    <p>Two adjustments that protect margin: <b>heavy debris</b> (concrete, dirt, shingle) weighs out long
    before it fills the truck — dump fees are by weight, so quote it 30–50% above mixed loads or decline it;
    <b>stairs and distance</b> (long carries from back yards, elevators that need padding) quietly double
    labor time, so price access, not just volume.</p>
    <p>The profit lever customers never see: <b>donation and recycling diversion</b>. Metals, working appliances
    and re-sellable furniture offset dump fees — a hauler who sorts well keeps 10–20% more per load at the
    same customer price.</p>
    <table>
      <thead><tr><th>Load</th><th>Volume</th><th>Typical US range</th></tr></thead>
      <tbody>
        <tr><td>⅛ truck</td><td>~1.5 yd³</td><td>$100–180</td></tr>
        <tr><td>¼ truck</td><td>~3 yd³</td><td>$150–250</td></tr>
        <tr><td>½ truck</td><td>~6 yd³</td><td>$250–420</td></tr>
        <tr><td>Full truck</td><td>~12 yd³</td><td>$500–800</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does junk removal typically cost?', a: 'A quarter truck runs $150–250, half a truck $250–420, and a full 12-yard load $500–800 in most US markets. Single items land at the $100–150 minimum.' },
    { q: 'How do I price junk removal jobs?', a: 'Train your eye to load fractions, quote from the fraction × your per-truck rate, then adjust for weight (heavy debris +30–50%) and access (stairs/long carry +15%). Always confirm the fraction on site before loading — quotes move if the volume does.' },
    { q: 'Should I charge by weight or by volume?', a: 'Volume, for customers — they understand truck space. But know your weights: dump fees hit you by the ton, so heavy loads need the surcharge even when they look half empty.' },
  ],
  related: ['pressure-washing-price-calculator', 'cleaning-invoice-generator', 'contractor-hourly-rate-calculator'],
} as RegisteredTool;
