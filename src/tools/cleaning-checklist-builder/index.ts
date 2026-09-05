import type { RegisteredTool } from '../../lib/types';
import { calcChecklist } from '../../engines/doc';

export default {
  slug: 'cleaning-checklist-builder',
  industry: 'cleaning',
  name: 'Cleaning Checklist Builder',
  tagline: 'A printable checklist for every job. No signup.',
  title: 'Cleaning Checklist Builder — Free printable checklists',
  description: 'Build a printable cleaning checklist by home type and clean type — standard, deep or move-out tasks, ready to print for your crew or client. Free, no signup.',
  result: { label: 'Your checklist' },
  fields: [
    {
      id: 'homeType', label: 'Property', kind: 'select', default: 'House',
      options: [{ value: 'House', label: 'House' }, { value: 'Apartment', label: 'Apartment' }, { value: 'Condo', label: 'Condo' }],
    },
    {
      id: 'cleanType', label: 'Type of clean', kind: 'select', default: 'Standard',
      options: [{ value: 'Standard', label: 'Standard' }, { value: 'Deep', label: 'Deep clean' }, { value: 'Move-out', label: 'Move-out' }],
    },
  ],
  rows: {
    id: 'tasks',
    label: 'Tasks on the list',
    hint: 'edit freely — presets match the clean type',
    columns: [
      { id: 'room', label: 'Area', kind: 'text', placeholder: 'Kitchen' },
      { id: 'task', label: 'Task', kind: 'text', placeholder: 'Wipe counters' },
    ],
    preset: [
      { room: 'Kitchen', task: 'Wipe counters & backsplash' },
      { room: 'Kitchen', task: 'Clean sink & faucet' },
      { room: 'Kitchen', task: 'Appliance exteriors' },
      { room: 'Bathrooms', task: 'Scrub toilet, tub & shower' },
      { room: 'Bathrooms', task: 'Mirrors & fixtures' },
      { room: 'Bedrooms', task: 'Dust surfaces & sills' },
      { room: 'Bedrooms', task: 'Vacuum floors' },
      { room: 'Whole home', task: 'Trash & final walk-through' },
    ],
    addLabel: '+ Add task',
  },
  params: {
    primaryLabel: 'Tasks on the list',
    copy: {
      info: 'Print it or screenshot it — hand a copy to your crew before they start and tick it on site.',
      footnote: 'Initial here when complete: ______',
    },
  },
  compute: (values, rows, p) => calcChecklist(values, rows, p),
  explain: `
    <p>A written checklist is the cheapest professionalism a cleaning business can buy: it sets expectations with
    the client, keeps every visit consistent, and settles "you didn't do X" disputes in seconds. Build the list
    once per property type, print it, and initial it on site.</p>
    <p>Deep cleans and move-outs deserve longer lists — add the inside-fridge, inside-oven, cabinet-wipe and
    baseboard tasks before you print.</p>`,
  faq: [
    { q: 'How many tasks should a standard checklist have?', a: 'Eight to fifteen for a standard clean; deep cleans run 25+. Long enough to be credible, short enough that the crew actually uses it.' },
    { q: 'Can my client see the checklist?', a: 'Yes — and they should. Leaving a printed copy after the first clean shows exactly what the price covers and prevents scope creep both ways.' },
  ],
  related: ['cleaning-estimate-calculator', 'labor-cost-calculator'],
} as RegisteredTool;
