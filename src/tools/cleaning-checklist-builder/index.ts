import type { RegisteredTool } from '../../lib/types';
import { calcChecklist } from '../../engines/doc';

export default {
  slug: 'cleaning-checklist-builder',
  industry: 'cleaning',
  name: 'Deep Cleaning Checklist Generator',
  tagline: 'By room, printable, ready for your crew. No signup.',
  title: 'Deep Cleaning Checklist Generator — By Room, Printable & Free',
  description: 'Build a printable deep cleaning checklist by room — kitchen, bathrooms, bedrooms and whole-home tasks — or switch the preset to a move-out checklist. Free, no signup, nothing stored.',
  result: { label: 'Your checklist' },
  fields: [
    {
      id: 'homeType', label: 'Property', kind: 'select', default: 'House',
      options: [{ value: 'House', label: 'House' }, { value: 'Apartment', label: 'Apartment' }, { value: 'Condo', label: 'Condo' }],
    },
    {
      id: 'cleanType', label: 'Type of clean', kind: 'select', default: 'Deep',
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
      { room: 'Kitchen', task: 'Inside & outside of all cabinets' },
      { room: 'Kitchen', task: 'Inside oven, fridge & microwave' },
      { room: 'Kitchen', task: 'Degrease stovetop & range hood' },
      { room: 'Kitchen', task: 'Sink, faucet & garbage disposal' },
      { room: 'Kitchen', task: 'Counters, backsplash & countertops sealed' },
      { room: 'Bathrooms', task: 'Descale shower heads, tub & tile grout' },
      { room: 'Bathrooms', task: 'Inside & outside of toilet' },
      { room: 'Bathrooms', task: 'Exhaust fan cover & vents dusted' },
      { room: 'Bedrooms', task: 'Baseboards, door frames & switch plates' },
      { room: 'Bedrooms', task: 'Windows, sills & tracks' },
      { room: 'Living areas', task: 'Light fixtures & ceiling fan blades' },
      { room: 'Whole home', task: 'Air vents, under furniture & final walk-through' },
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
    <p>The preset above is a <b>deep clean organized by room</b> — the format that works, because dust and
    grime don't spread evenly: kitchens and baths carry most of the work, and a room-by-room list stops the
    crew from "finishing" the easy rooms first. A standard maintenance clean is a shorter list — delete the
    inside-appliance and descale lines and you have it.</p>
    <p>A <b>move-out checklist</b> swaps the occupant for the next one: everything in the deep list, plus the
    things tenants get charged for at inspection — inside every cabinet and closet, appliance interiors,
    walls spot-cleaned, and the spaces furniture hid for years. If you clean for tenants, price it from the
    checklist, not from the square footage: the list is the scope, and the scope is the price.</p>`,
  faq: [
    { q: 'How many tasks should a deep cleaning checklist have?', a: 'Twenty-five or more, organized by room. The printable list starts at twelve deep-clean tasks — add the property-specific lines (pets, appliances, high dusting) until it matches the job you actually quoted.' },
    { q: "What's the difference between a deep clean and a move-out checklist?", a: 'Move-out adds the inspection items: inside cabinets and closets, appliance interiors, wall spot-cleaning and everything furniture concealed. Deep clean is about grime; move-out is about the next occupant and the security deposit.' },
    { q: 'Should the client see the checklist?', a: 'Yes — and they should initial it. A printed, signed checklist shows exactly what the price covers, prevents scope creep in both directions, and ends most "you missed a spot" conversations before they start.' },
  ],
  related: ['cleaning-estimate-calculator', 'labor-cost-calculator'],
} as RegisteredTool;
