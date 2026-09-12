import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

export default {
  slug: 'pressure-washing-price-calculator',
  industry: 'cleaning',
  name: 'Pressure Washing Price Calculator',
  tagline: 'Price the job by surface, not by guess. No signup.',
  title: 'Pressure Washing Price Calculator — Free tool for pressure washing businesses',
  description: 'Price a pressure washing job in seconds: driveway, house siding, deck or patio by square feet — with a fair quote range, time estimate and per-sqft rate. Free, no signup.',
  result: { label: 'Suggested quote' },
  fields: [
    {
      id: 'surface', label: 'What are you washing?', kind: 'select', default: 'driveway',
      options: [
        { value: 'driveway', label: 'Driveway / concrete' },
        { value: 'siding', label: 'House siding' },
        { value: 'deck', label: 'Wood deck / fence' },
        { value: 'patio', label: 'Patio / pavers' },
      ],
    },
    { id: 'area', label: 'Area', kind: 'number', default: 600, hint: 'square feet' },
    {
      id: 'story', label: 'Stories', kind: 'select', default: '1',
      options: [
        { value: '1', label: 'One story' },
        { value: '2', label: 'Two stories (+25%)' },
      ],
    },
    {
      id: 'freq', label: 'How often', kind: 'select', default: 'onetime',
      options: [
        { value: 'onetime', label: 'One-time' },
        { value: 'annual', label: 'Annual plan (−10%)' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Suggested quote',
    copy: {
      info: 'US pressure washing runs roughly $0.08–0.85 per sq ft depending on surface — flat concrete at the low end, delicate wood at the top. Quote a range, not a single number.',
    },
  },
  compute: (values, _rows, p) => {
    const area = clamp(num(values.area), 50, 100000);
    const story = values.story === '2' ? 1.25 : 1;
    const freq = values.freq === 'annual' ? 0.9 : 1;
    // 行业常见 per-sqft 基准（低-高）与典型工时（每 300 sqft/小时）
    const rates: Record<string, { lo: number; hi: number }> = {
      driveway: { lo: 0.12, hi: 0.25 },
      siding: { lo: 0.3, hi: 0.5 },
      deck: { lo: 0.5, hi: 0.85 },
      patio: { lo: 0.15, hi: 0.35 },
    };
    const r = rates[values.surface] ?? rates.driveway;
    const lo = area * r.lo * story * freq;
    const hi = area * r.hi * story * freq;
    const hours = (area / 300) * (values.surface === 'deck' ? 1.4 : 1) * story;
    const rate = (lo + hi) / 2 / area;
    return {
      primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)}` },
      secondary: [
        { label: 'Estimated time', value: `${hours.toFixed(1)} hrs for a crew of one` },
        { label: 'Rate', value: `$${rate.toFixed(2)} / sq ft` },
      ],
      verdict: { level: 'info', text: (p.copy as Record<string, string>).info },
    };
  },
  explain: `
    <p>Pressure washing is priced by <b>square footage and surface type</b>, because the surface decides the
    machine, the chemicals and the care: flat concrete runs <b>$0.12–0.25/sq ft</b>, house soft-washing runs
    <b>$0.30–0.50</b>, and wood (which rewards patience and punishes shortcuts) runs <b>$0.50–0.85</b>.</p>
    <p>The classic beginner mistake is quoting by the hour and then getting faster — a driveway that took 3
    hours in March takes 90 minutes by June, and your hourly quote just cut your own rate in half. Quote the
    job by surface and area; keep the hourly number private as your floor.</p>
    <p>Two stories add 20–30% (ladder work, slower passes, more setup). Recurring annual plans commonly run
    10% under one-time pricing — the discount buys you a spring job every year without re-selling it.</p>
    <table>
      <thead><tr><th>Surface</th><th>Typical US rate</th></tr></thead>
      <tbody>
        <tr><td>Driveway / concrete</td><td>$0.12–0.25 / sq ft</td></tr>
        <tr><td>Patio / pavers</td><td>$0.15–0.35 / sq ft</td></tr>
        <tr><td>House siding (soft wash)</td><td>$0.30–0.50 / sq ft</td></tr>
        <tr><td>Wood deck / fence</td><td>$0.50–0.85 / sq ft</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much should I charge to pressure wash a driveway?', a: 'Most US operators charge $0.12–0.25 per sq ft, which puts a typical 600 sq ft two-car driveway at $75–150. Add fuel/surface treatment costs and round to a clean quote number.' },
    { q: 'How do I price a house wash?', a: 'Soft-washing siding usually lands $0.30–0.50 per sq ft, with a job minimum of $150–250. Two stories add 20–30%. Walk the house first — heavy organic growth or delicate surfaces justify the top of the range.' },
    { q: 'Should I charge by the hour or by the square foot?', a: 'By the job (square feet × surface rate). Hourly quotes punish you for getting faster, and clients watch the clock. Know your hourly floor, but quote the job.' },
  ],
  related: ['cleaning-estimate-calculator', 'cleaning-invoice-generator', 'lawn-mowing-price-calculator'],
} as RegisteredTool;
