import type { RegisteredTool } from '../../lib/types';
import { calcLineDoc } from '../../engines/doc';

export default {
  slug: 'lawn-care-estimate-generator',
  industry: 'lawn',
  name: 'Lawn Care Estimate Generator',
  tagline: 'A season quote on one page. No signup.',
  title: 'Lawn Care Estimate Generator — Free printable quotes',
  description: 'Build a printable lawn care estimate: mowing, edging, cleanups as line items with a monthly and season total your client can sign. Free, no signup.',
  result: { label: 'Monthly total' },
  fields: [
    { id: 'client', label: 'Client name', kind: 'text', default: '', placeholder: 'Client or property name' },
    { id: 'date', label: 'Date', kind: 'text', default: '', placeholder: 'e.g. Sep 12' },
  ],
  rows: {
    id: 'lines',
    label: 'Services quoted',
    columns: [
      { id: 'service', label: 'Service', kind: 'text', placeholder: 'Weekly mowing' },
      { id: 'detail', label: 'Detail', kind: 'text', placeholder: 'per visit / monthly' },
      { id: 'amount', label: 'Monthly $', kind: 'money', placeholder: '0.00' },
    ],
    preset: [
      { service: 'Weekly mowing', detail: 'per visit $45 × 4.3', amount: 193 },
      { service: 'Edging & string trimming', detail: 'included weekly', amount: 45 },
      { service: 'Shrub trimming', detail: 'monthly', amount: 60 },
    ],
    addLabel: '+ Add service',
  },
  params: {
    primaryLabel: 'Monthly total',
    rowKeys: { name: 'service', detail: 'detail', amount: 'amount' },
    copy: {
      docTitle: 'Lawn care service estimate',
      info: 'Print two copies — one for the client to sign, one for your records. Monthly billing beats per-visit chasing.',
      footnote: 'Estimate valid for 30 days. Season = 8 months, roughly Apr–Nov.',
    },
  },
  compute: (values, rows, p) => calcLineDoc(values, rows, p),
  explain: `
    <p>A lawn care estimate closes easiest when the client sees the <b>monthly number</b>, not a menu of per-visit
    prices — one predictable payment beats four small ones in their head. Quote mowing, edging and extras as
    lines, show the monthly total, and note the season length (April through November in most of the country).</p>
    <p>Print two copies: the client signs one, you keep one. A signed estimate is the cheapest contract you will
    ever hold.</p>`,
  faq: [
    { q: 'Should lawn care be quoted per visit or monthly?', a: 'Monthly. It smooths your income across the 4-visit and 5-visit months and reads as simpler to the client. Keep the per-visit equivalent on the estimate for transparency.' },
    { q: 'How do I price extras like mulch or leaf removal?', a: 'As separate lines on the same estimate — never folded into the mowing price. It keeps the base price clean and makes upsells visible.' },
  ],
  related: ['lawn-mowing-price-calculator', 'contractor-hourly-rate-calculator', 'cleaning-invoice-generator'],
} as RegisteredTool;
