import type { RegisteredTool } from '../../lib/types';
import { calcLineDoc } from '../../engines/doc';

export default {
  slug: 'receipt-generator',
  industry: 'salon',
  name: 'Receipt Generator',
  tagline: 'Paid is documented. No signup.',
  title: 'Receipt Generator — Free printable receipts',
  description: 'Generate a clean printable receipt for services rendered — client, services, amounts, total. Print, save as PDF, or hand it over on paper. Free, no signup.',
  result: { label: 'Receipt total' },
  fields: [
    { id: 'client', label: 'Client name', kind: 'text', default: '', placeholder: 'Client name' },
    { id: 'date', label: 'Date', kind: 'text', default: '', placeholder: 'e.g. Sep 12' },
  ],
  rows: {
    id: 'lines',
    label: 'Services paid',
    columns: [
      { id: 'service', label: 'Service', kind: 'text', placeholder: 'Cut & color' },
      { id: 'amount', label: 'Amount', kind: 'money', placeholder: '0.00' },
    ],
    preset: [
      { service: 'Cut & finish', amount: 45 },
      { service: 'Full color', amount: 120 },
    ],
    addLabel: '+ Add service',
  },
  params: {
    primaryLabel: 'Receipt total',
    rowKeys: { name: 'service', amount: 'amount' },
    copy: {
      docTitle: 'Receipt — paid in full',
      info: 'Print on the spot or save as PDF and text it over. A receipt today prevents the "did I pay?" message next month.',
      footnote: 'Paid in full — thank you! This receipt is your proof of payment.',
    },
  },
  compute: (values, rows, p) => calcLineDoc(values, rows, p),
  explain: `
    <p>A receipt is thirty seconds of paperwork that buys you a clean record: it documents the service, the
    amount and the date — protection for both sides, and the professional finish a walk-in client remembers.
    Independent stylists and barbers who take cash especially need the paper trail.</p>
    <p>Print on the spot for walk-ins, or save the PDF and text it for regulars. Same content, whichever way
    the client wants it.</p>`,
  faq: [
    { q: 'Is a handwritten receipt enough?', a: 'Legally yes, practically no — handwritten receipts fade, get lost and invite disputes. A printed one-pager with itemized services takes the same time and looks like a business.' },
    { q: 'Do tips go on the receipt?', a: 'Only if you want them documented. Keep the receipt to service revenue; tips are the client\'s gesture and belong on their card slip, not your service record.' },
  ],
  related: ['service-price-list-builder', 'booth-rent-commission-calculator', 'cleaning-invoice-generator'],
} as RegisteredTool;
