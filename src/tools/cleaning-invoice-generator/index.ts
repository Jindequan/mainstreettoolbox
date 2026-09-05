import type { RegisteredTool } from '../../lib/types';
import { calcLineDoc } from '../../engines/doc';

export default {
  slug: 'cleaning-invoice-generator',
  industry: 'cleaning',
  name: 'Cleaning Invoice Generator',
  tagline: 'A clean invoice for a clean job. No signup.',
  title: 'Cleaning Invoice Generator — Free printable invoices',
  description: 'Create a printable cleaning invoice with your services and totals — professional one-page PDF your client can pay from. Free, no signup, no watermark.',
  result: { label: 'Invoice total' },
  fields: [
    { id: 'client', label: 'Client name', kind: 'text', default: '', placeholder: 'Client or business name' },
    { id: 'date', label: 'Date', kind: 'text', default: '', placeholder: 'e.g. Sep 12' },
  ],
  rows: {
    id: 'lines',
    label: 'Services billed',
    columns: [
      { id: 'service', label: 'Service', kind: 'text', placeholder: 'Deep clean — 2bd/2ba' },
      { id: 'amount', label: 'Amount', kind: 'money', placeholder: '0.00' },
    ],
    preset: [
      { service: 'Deep clean — 2bd/2ba', amount: 185 },
      { service: 'Inside oven & fridge', amount: 40 },
    ],
    addLabel: '+ Add line',
  },
  params: {
    primaryLabel: 'Invoice total',
    rowKeys: { name: 'service', amount: 'amount' },
    copy: {
      docTitle: 'Cleaning services invoice',
      info: 'Print it or save as PDF — payment due on receipt is the norm for residential cleans.',
      footnote: 'Thank you for your business. Payment due on receipt.',
    },
  },
  compute: (values, rows, p) => calcLineDoc(values, rows, p),
  explain: `
    <p>An invoice does two jobs: it asks for the money and it documents the work. Keep both — a one-page invoice
    with the services itemized (not "cleaning — $200") prevents scope arguments and makes repeat clients trust
    the number.</p>
    <p>For recurring clients, send the same invoice template with the date changed; the itemized lines stay as
    your service record.</p>`,
  faq: [
    { q: 'What should a cleaning invoice include?', a: 'Your business name, the client, the date, each service as its own line with a price, and the total with payment terms ("due on receipt" or net-15). One page is enough.' },
    { q: 'Should I invoice before or after the clean?', a: 'First-time and one-time cleans: invoice on completion. Recurring clients: invoice on a fixed schedule (first of the month) for the visits that month.' },
  ],
  related: ['cleaning-estimate-calculator', 'cleaning-checklist-builder', 'break-even-calculator'],
} as RegisteredTool;
