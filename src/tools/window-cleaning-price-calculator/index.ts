import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

export default {
  slug: 'window-cleaning-price-calculator',
  industry: 'cleaning',
  name: 'Window Cleaning Price Calculator',
  tagline: 'Per-pane pricing, done right. No signup.',
  title: 'Window Cleaning Price Calculator — Free tool for window cleaning businesses',
  description: 'Price a window cleaning job per pane: count, in/out, stories and frequency — get a quote range, time estimate and per-window rate. Free, instant, no signup.',
  result: { label: 'Suggested quote' },
  fields: [
    { id: 'panes', label: 'Number of windows', kind: 'number', default: 20, hint: 'panes to clean' },
    {
      id: 'scope', label: 'Scope', kind: 'select', default: 'inout',
      options: [
        { value: 'out', label: 'Outside only' },
        { value: 'inout', label: 'Inside + outside' },
      ],
    },
    {
      id: 'story', label: 'Stories', kind: 'select', default: '1',
      options: [
        { value: '1', label: 'One story' },
        { value: '2', label: 'Two stories (+20%)' },
      ],
    },
    {
      id: 'freq', label: 'How often', kind: 'select', default: 'onetime',
      options: [
        { value: 'onetime', label: 'One-time' },
        { value: 'biannual', label: 'Twice a year (−10%)' },
        { value: 'quarterly', label: 'Quarterly (−15%)' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Suggested quote',
    copy: {
      info: 'US residential window cleaning runs $4–8 per pane outside-only, $8–12 inside+out, with most companies charging a $150–200 job minimum. Screens and tracks are common add-ons.',
    },
  },
  compute: (values, _rows, p) => {
    const panes = clamp(num(values.panes), 1, 2000);
    const scope = values.scope === 'inout' ? 10 : 6; // 中值 $/pane
    const story = values.story === '2' ? 1.2 : 1;
    const freqMult: Record<string, number> = { onetime: 1, biannual: 0.9, quarterly: 0.85 };
    const freq = freqMult[values.freq] ?? 1;
    const perPane = scope * story * freq;
    const est = panes * perPane;
    // $150 job minimum 落地：小单拉到最低价
    const total = Math.max(est, 150);
    const hours = panes * (values.scope === 'inout' ? 0.1 : 0.06) * story;
    return {
      primary: { label: p.primaryLabel as string, value: money(total) },
      secondary: [
        { label: 'Per window', value: money(perPane) },
        { label: 'Estimated time', value: `${hours.toFixed(1)} hrs solo` },
      ],
      verdict: { level: 'info', text: (p.copy as Record<string, string>).info },
    };
  },
  explain: `
    <p>Window cleaning prices by the <b>pane</b>: outside-only typically runs <b>$4–8 per window</b>,
    inside+outside <b>$8–12</b>. The per-pane number is your vocabulary; the quote is panes × rate, floored at
    a job minimum (<b>$150–200</b> is standard) so small jobs still pay for the drive and setup.</p>
    <p>The recurring money is in frequency plans: twice-a-year customers commonly pay ~10% under one-time
    rates, quarterly ~15% under. A route of quarterly commercial storefronts is the backbone of most
    full-time window cleaning businesses — one-time residential fills the gaps.</p>
    <p>Screens ($1–3 each), tracks ($2–5 per window), and hard-water stain removal (quoted separately, priced
    high — it is chemistry work, not washing) are where the average ticket grows. Show them as add-on lines,
    not buried in the per-pane rate.</p>
    <table>
      <thead><tr><th>Scope</th><th>Typical US rate</th></tr></thead>
      <tbody>
        <tr><td>Outside only</td><td>$4–8 per pane</td></tr>
        <tr><td>Inside + outside</td><td>$8–12 per pane</td></tr>
        <tr><td>Screens</td><td>$1–3 each</td></tr>
        <tr><td>Tracks</td><td>$2–5 per window</td></tr>
        <tr><td>Job minimum</td><td>$150–200</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How do window cleaners charge?', a: 'Per pane, with a job minimum. Count panes (each glass section), multiply by your rate — $4–8 outside-only, $8–12 in-and-out — and apply the $150–200 minimum so small jobs still pay for the trip.' },
    { q: 'How much should I charge for a 20-window house?', a: 'A 20-pane in-and-out clean at typical rates lands $160–240 — most quotes land near $200. One-story outside-only on the same house would run $80–160 and often hits the job minimum instead.' },
    { q: 'How do I get recurring window cleaning clients?', a: 'Sell the frequency plan at the first quote: twice-a-year at ~10% off or quarterly at ~15% off, scheduled before you leave the property. Routes beat one-offs — the discount is cheaper than finding a new customer every job.' },
  ],
  related: ['pressure-washing-price-calculator', 'cleaning-estimate-calculator', 'cleaning-invoice-generator'],
} as RegisteredTool;
