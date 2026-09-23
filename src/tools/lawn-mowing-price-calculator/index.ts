import type { RegisteredTool } from '../../lib/types';
import { calcMowingPrice } from '../../engines/quote';

export default {
  slug: 'lawn-mowing-price-calculator',
  industry: 'lawn',
  name: 'Lawn Mowing Cost Calculator',
  tagline: 'Price any lawn by size and terrain — per mow, month and season. No signup.',
  title: 'Lawn Mowing Cost & Estimate Calculator — Free Price Tool | Main Street Toolbox',
  description: 'How much to charge for lawn mowing: enter lot size, terrain and frequency for a per-visit, monthly and season price against 2026 US rates. Free, instant, no signup.',
  result: { label: 'Price per mow' },
  fields: [
    { id: 'lotSize', label: 'Lot size', kind: 'number', default: 6000, hint: 'square feet of grass' },
    {
      id: 'terrain', label: 'Terrain', kind: 'select', default: 'flat',
      options: [
        { value: 'flat', label: 'Flat, open' },
        { value: 'slope', label: 'Some slopes' },
        { value: 'steep', label: 'Steep / obstacles' },
      ],
    },
    {
      id: 'frequency', label: 'Frequency', kind: 'select', default: 'weekly',
      options: [
        { value: 'weekly', label: 'Weekly' },
        { value: 'biweekly', label: 'Every 2 weeks' },
        { value: 'onetime', label: 'One-time' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Price per mow',
    base: 25,
    ratePerSqft: 0.0025,
    benchmarks: { healthy: [30, 85], warnUpTo: 120 },
    copy: {
      ok: '{v} per mow sits inside the typical $30–85 residential band.',
      warnLow: '{v} is below the usual $30–85 band — you may be undercutting your own drive time.',
      warnHigh: '{v} is above the common band — fine for estates, a hard sell for standard lots.',
      info: 'Enter the lot size to price the mow.',
    },
  },
  compute: (values, _rows, p) => calcMowingPrice(values, p),
  explain: `
    <p>Most residential mowing runs <b>$30–85 per visit</b> in 2026, averaging about $50. Under a quarter acre
    typically books <b>$41–65 weekly</b>; a quarter to half acre <b>$49–120</b>; per-acre mowing runs
    <b>$60–100 per acre weekly</b>. Price the mow, then price the month: weekly clients pay 4–5 visits,
    biweekly 2–3 — and biweekly cuts carry a <b>~25% premium per cut</b> because the grass comes heavier.</p>
    <p>Terrain is the second lever after size — slopes, fences and obstacles add 15–30% to the time even on a
    small lot. If your price lands below $30, you are likely paying yourself under minimum wage once drive
    time counts.</p>
    <table>
      <thead><tr><th>Lawn size</th><th>Typical weekly rate (2026)</th></tr></thead>
      <tbody>
        <tr><td>Under ¼ acre (~10,000 sq ft)</td><td>$41–65 per mow</td></tr>
        <tr><td>¼–½ acre (10,900–21,800 sq ft)</td><td>$49–120 per mow</td></tr>
        <tr><td>1 acre+</td><td>$60–100 per acre</td></tr>
        <tr><td>Overgrown / first cut</td><td>add 30–50%</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much should I charge to mow a lawn?', a: 'Most residential mows land between $30 and $85 per visit in 2026, averaging around $50. Small flat lots under 5,000 sq ft can go lower; large or steep properties justify $75 and up.' },
    { q: 'How much is lawn mowing per acre?', a: 'Per-acre mowing runs $60–100 per acre for weekly service and $80–150 per acre biweekly, since each cut comes heavier. Wide-open acreage prices lower per acre than obstacle-filled grounds.' },
    { q: 'Is it better to charge weekly or per cut?', a: 'Sell the season, bill per visit. A weekly agreement at a slightly lower per-cut price beats one-time cuts because the route density pays your drive time.' },
    { q: 'How do I price overgrown lots?', a: 'Treat a first mow on an overgrown lot as a one-time clean: add 30–50% for the extra passes and string-trimming, then quote the regular weekly rate from the second visit.' },
    { q: 'How often should lawns be mowed?', a: 'Weekly in spring, every 1–2 weeks in summer depending on rain and growth, and biweekly in fall. Never cut more than a third of the grass blade in one pass — that rule is what drives the calendar.' },
  ],
  related: ['lawn-care-estimate-generator', 'mulch-calculator', 'contractor-hourly-rate-calculator'],
} as RegisteredTool;
