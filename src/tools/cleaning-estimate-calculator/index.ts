import type { RegisteredTool } from '../../lib/types';
import { calcCleaningEstimate } from '../../engines/quote';

export default {
  slug: 'cleaning-estimate-calculator',
  industry: 'cleaning',
  name: 'Cleaning Estimate Calculator',
  tagline: 'Quote a clean in 20 seconds. No signup.',
  title: 'Cleaning Estimate Calculator — Free tool for cleaning businesses',
  description: 'Enter the home size, clean type and frequency to price a residential cleaning job with a fair range and time estimate. Free, instant, no signup.',
  result: { label: 'Suggested quote' },
  fields: [
    {
      id: 'type', label: 'Type of clean', kind: 'select', default: 'standard',
      options: [
        { value: 'standard', label: 'Standard clean' },
        { value: 'deep', label: 'Deep clean' },
        { value: 'moveout', label: 'Move-out clean' },
      ],
    },
    { id: 'bedrooms', label: 'Bedrooms', kind: 'number', default: 3 },
    { id: 'bathrooms', label: 'Bathrooms', kind: 'number', default: 2 },
    {
      id: 'freq', label: 'How often', kind: 'select', default: 'onetime',
      options: [
        { value: 'onetime', label: 'One-time' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'biweekly', label: 'Every 2 weeks' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Suggested quote',
    rates: { base: 50, bed: 20, bath: 30 },
    healthyBand: [90, 338] as [number, number],
    copy: {
      info: 'Typical US residential {type} cleans run $90–338 per visit — quote inside that band unless the home is unusual. Recurring {f} clients deserve the loyalty discount built in above.',
    },
  },
  compute: (values, _rows, p) => calcCleaningEstimate(values, p),
  explain: `
    <p>Residential cleaning quotes usually start from the rooms: a per-room base plus extras for bathrooms
    (scrubbing a bathroom is the slowest work in the house), then adjust for the type of clean — deep cleans
    and move-outs run <b>40–50% above</b> a standard maintenance clean.</p>
    <p>Frequency is where recurring income comes from: weekly clients commonly pay <b>15–20% less per visit</b>
    than one-times, and still earn you far more over a year. Quote the per-visit price honestly and let the
    discount reward the commitment.</p>
    <table>
      <thead><tr><th>Clean type</th><th>Typical US range</th></tr></thead>
      <tbody>
        <tr><td>Standard clean</td><td>$90–150</td></tr>
        <tr><td>Deep clean</td><td>$150–250</td></tr>
        <tr><td>Move-out clean</td><td>$180–338</td></tr>
      </tbody>
    </table>
    <p>When the numbers look right, turn the quote into paper with the <a href="/restaurant/tip-out-calculator/">same
    one-page workflow</a> restaurant owners use — or set up your whole price book once with <a href="/services">concierge
    setup</a>.</p>`,
  faq: [
    { q: 'How much should I charge to clean a 3-bed, 2-bath house?', a: 'A standard clean typically lands $110–140 and takes 2.5–4 hours for one cleaner. Deep cleans and first-time cleans run 40–50% higher because of build-up.' },
    { q: 'Should I quote by the hour or by the job?', a: 'Quote by the job. Hourly quotes punish you for getting faster and make the client watch the clock. Price the job from your own hourly floor — this calculator shows both numbers.' },
    { q: 'How much discount for weekly clients?', a: '15–20% per visit is the common band. They skip the build-up work and give you predictable income — the discount pays for itself in reduced scheduling gaps.' },
  ],
  related: ['break-even-calculator', 'labor-cost-calculator', 'markup-vs-margin-calculator'],
} as RegisteredTool;
