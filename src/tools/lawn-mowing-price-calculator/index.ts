import type { RegisteredTool } from '../../lib/types';
import { calcMowingPrice } from '../../engines/quote';

export default {
  slug: 'lawn-mowing-price-calculator',
  industry: 'lawn',
  name: 'Lawn Mowing Price Calculator',
  tagline: 'Price any lawn by size and terrain. No signup.',
  title: 'Lawn Mowing Price Calculator — Free tool for lawn care businesses',
  description: 'Enter lot size, terrain and frequency to price a mowing job per visit, per month and per season — against typical US rates. Free, instant, no signup.',
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
    ratePerSqft: 0.012,
    benchmarks: { healthy: [30, 70], warnUpTo: 110 },
    copy: {
      ok: '{v} per mow sits inside the typical $30–70 residential band.',
      warnLow: '{v} is below the usual $30–70 band — you may be undercutting your own drive time.',
      warnHigh: '{v} is above the common band — fine for estates, a hard sell for standard lots.',
      info: 'Enter the lot size to price the mow.',
    },
  },
  compute: (values, _rows, p) => calcMowingPrice(values, p),
  explain: `
    <p>Most residential mowing runs <b>$30–70 per visit</b>, or roughly <b>1–6¢ per square foot</b> depending on
    region and terrain. Price the mow, then price the month: weekly clients pay 4–5 visits, biweekly 2–3, and
    biweekly cuts usually carry a small premium per cut because the grass comes heavier.</p>
    <p>Terrain is the second lever after size — slopes, fences and obstacles can add 15–30% to the time even on
    a small lot. If your price lands below $30, you are likely paying yourself under minimum wage once drive
    time counts.</p>`,
  faq: [
    { q: 'How much should I charge to mow a lawn?', a: 'Most residential mows land between $30 and $70 per visit. Small flat lots under 5,000 sq ft can go lower; large or steep properties justify $75 and up.' },
    { q: 'Is it better to charge weekly or per cut?', a: 'Sell the season, bill per visit. A weekly agreement at a slightly lower per-cut price beats one-time cuts because the route density pays your drive time.' },
    { q: 'How do I price overgrown lots?', a: 'Treat a first mow on an overgrown lot as a one-time clean: add 30–50% for the extra passes and string-trimming, then quote the regular weekly rate from the second visit.' },
  ],
  related: ['cleaning-estimate-calculator', 'markup-vs-margin-calculator', 'labor-cost-calculator'],
} as RegisteredTool;
