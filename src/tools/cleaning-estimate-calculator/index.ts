import type { RegisteredTool } from '../../lib/types';
import { calcCleaningEstimate } from '../../engines/quote';

export default {
  slug: 'cleaning-estimate-calculator',
  industry: 'cleaning',
  name: 'House Cleaning Cost Calculator',
  tagline: 'Standard, deep or move-out — price the job in 20 seconds. No signup.',
  title: 'House Cleaning Cost Calculator — Free Estimate Tool | Main Street Toolbox',
  description: 'Price a house cleaning job in 20 seconds: standard, deep clean or move-out, by bedrooms and bathrooms. Live range against 2026 US prices, hours and hourly rate. Free, no signup.',
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
    healthyBand: [100, 450] as [number, number],
    copy: {
      info: '2026 US pricing for {type} runs $100–450 per visit — land inside that band unless the home is unusual. The loyalty discount for recurring clients is already built in.',
    },
  },
  compute: (values, _rows, p) => calcCleaningEstimate(values, p),
  explain: `
    <p>Residential cleaning quotes usually start from the rooms: a per-room base plus extras for bathrooms
    (scrubbing a bathroom is the slowest work in the house), then adjust for the type of clean — deep cleans
    and move-outs run <b>about 50% above</b> a standard maintenance clean.</p>
    <p>Frequency is where recurring income comes from: weekly clients commonly pay <b>15–20% less per visit</b>
    than one-times, and still earn you far more over a year. Quote the per-visit price honestly and let the
    discount reward the commitment.</p>
    <table>
      <thead><tr><th>Clean type</th><th>Typical US range (2026)</th></tr></thead>
      <tbody>
        <tr><td>Standard clean</td><td>$120–280 per visit</td></tr>
        <tr><td>Deep clean</td><td>$200–450</td></tr>
        <tr><td>Move-out clean</td><td>$200–600</td></tr>
        <tr><td>Hourly, per cleaner</td><td>$25–80</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does house cleaning cost in 2026?', a: 'A standard clean runs $120–280 per visit for most homes, with one-time cleans averaging $174–256. Hourly rates are $25–80 per cleaner. Deep cleans run $200–450 and move-out cleans $200–600. Coastal metros price 30–50% above the national band.' },
    { q: 'How much should I charge to clean a 3-bed, 2-bath house?', a: 'A standard one-time clean typically lands $150–200 and takes about 5 hours for one cleaner. Deep cleans and first-time cleans run about 50% higher because of build-up.' },
    { q: 'How much should a move-out cleaning cost?', a: 'Move-out cleans run $200–600 for an average home. You are cleaning an empty house, but the checklist is a deep clean plus inside cabinets, closets and appliances — and clients are often recovering part of a $500–1,500 security deposit, so price the value, not just the hours.' },
    { q: 'Should I quote by the hour or by the job?', a: 'Quote by the job. Hourly quotes punish you for getting faster and make the client watch the clock. Price the job from your own hourly floor — this calculator shows both numbers.' },
    { q: 'How much discount for weekly clients?', a: '15–20% per visit is the common band. They skip the build-up work and give you predictable income — the discount pays for itself in reduced scheduling gaps.' },
  ],
  related: ['cleaning-checklist-builder', 'cleaning-invoice-generator', 'break-even-calculator'],
} as RegisteredTool;
