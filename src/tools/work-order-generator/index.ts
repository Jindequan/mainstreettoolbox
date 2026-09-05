import type { RegisteredTool } from '../../lib/types';
import { calcLineDoc } from '../../engines/doc';

export default {
  slug: 'work-order-generator',
  industry: 'construction',
  name: 'Work Order Generator',
  tagline: 'Scope it, sign it, work it. No signup.',
  title: 'Work Order Generator — Free printable work orders',
  description: 'Create a printable work order with tasks, hours and labor cost — the one-page agreement that stops scope creep before the hammer swings. Free, no signup.',
  result: { label: 'Labor total' },
  fields: [
    { id: 'client', label: 'Client name', kind: 'text', default: '', placeholder: 'Client name' },
    { id: 'date', label: 'Date', kind: 'text', default: '', placeholder: 'e.g. Sep 12' },
    { id: 'laborRate', label: 'Labor rate / hour', kind: 'money', default: 75 },
  ],
  rows: {
    id: 'tasks',
    label: 'Tasks & hours',
    columns: [
      { id: 'service', label: 'Task', kind: 'text', placeholder: 'Replace faucet & supply lines' },
      { id: 'hours', label: 'Hours', kind: 'number', placeholder: '2' },
      { id: 'amount', label: 'Cost', kind: 'money', placeholder: '0.00' },
    ],
    preset: [
      { service: 'Replace faucet & supply lines', hours: 2, amount: 150 },
      { service: 'Install customer-supplied fan', hours: 3, amount: 225 },
    ],
    addLabel: '+ Add task',
  },
  params: {
    primaryLabel: 'Labor total',
    rowKeys: { name: 'service', detail: 'hours', amount: 'amount' },
    copy: {
      docTitle: 'Work order',
      info: 'Materials are billed separately at cost + markup. Both parties initial the scope — anything not on this sheet is a change order.',
      footnote: 'Client signature: ________________  Date: ________   ·   Materials billed separately at cost + 15%.',
    },
  },
  compute: (values, rows, p) => calcLineDoc(values, rows, p),
  explain: `
    <p>The work order is the tradesman's contract: <b>what's in scope, how many hours, what it costs</b>. Every
    "while you're here" that isn't on this sheet is a change order — same sheet, new line, new number. It is not
    bureaucracy; it is the difference between a paid afternoon and a free one.</p>
    <p>Keep the hours column honest — it's what you're actually selling. Print two copies, both parties initial,
    and materials ride on top at cost plus markup.</p>`,
  faq: [
    { q: 'Work order vs estimate — which one?', a: 'Estimate first to win the job, work order to define it. The estimate is negotiable; the work order is the scope you both initial.' },
    { q: 'What if the job runs long?', a: 'Change order: add a line with the extra task and hours, both initial it before continuing. Ten seconds of paperwork saves the argument at pickup.' },
  ],
  related: ['contractor-hourly-rate-calculator', 'cleaning-invoice-generator', 'break-even-calculator'],
} as RegisteredTool;
