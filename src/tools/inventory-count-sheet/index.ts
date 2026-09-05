import type { RegisteredTool } from '../../lib/types';
import { calcInventory } from '../../engines/doc';

export default {
  slug: 'inventory-count-sheet',
  industry: 'retail',
  name: 'Inventory Count Sheet',
  tagline: 'Know what the shelf is worth. No signup.',
  title: 'Inventory Count Sheet — Free printable stock counter',
  description: 'Count your stock with prices attached: every item × quantity × unit cost totals live, and the whole sheet prints for the stockroom. Free, no signup.',
  result: { label: 'Inventory value' },
  fields: [
    { id: 'location', label: 'Location / section', kind: 'text', default: 'Front of store', placeholder: 'e.g. Back room' },
  ],
  rows: {
    id: 'items',
    label: 'Items counted',
    columns: [
      { id: 'item', label: 'Item', kind: 'text', placeholder: 'Scented candle' },
      { id: 'qty', label: 'Qty', kind: 'number', placeholder: '12' },
      { id: 'unitCost', label: 'Unit cost', kind: 'money', placeholder: '0.00' },
    ],
    preset: [
      { item: 'Scented candle', qty: 12, unitCost: 6.5 },
      { item: 'Ceramic mug', qty: 24, unitCost: 4.2 },
      { item: 'Gift wrap roll', qty: 8, unitCost: 3.1 },
    ],
    addLabel: '+ Add item',
  },
  params: {
    primaryLabel: 'Inventory value',
    copy: {
      info: 'Count at cost, not shelf price — this is the number that belongs on your books and in your insurance file.',
      footnote: 'Counted by: ________________  Date: ________',
    },
  },
  compute: (values, rows, p) => calcInventory(values, rows, p),
  explain: `
    <p>An inventory count is how a small shop finds its leaks: shrinkage, theft, supplier shortfalls and the
    "borrowed" stock nobody returned. Count at <b>cost</b>, not shelf price — the total is an asset on your
    books and the basis of any insurance claim.</p>
    <p>Print the sheet, walk the floor, write the numbers, then enter them here — the total updates live and
    the dated printout becomes your baseline for the next count. Monthly counts on high-theft categories,
    quarterly for the rest.</p>`,
  faq: [
    { q: 'Count at cost or retail price?', a: 'Cost. Your books and insurance both value inventory at what you paid. Shelf price tells you potential revenue but overstates the asset by the margin you haven\'t earned yet.' },
    { q: 'How often should a small shop count inventory?', a: 'Full count quarterly; cycle counts (one category per week) monthly. Shrinkage found in a quarterly count is recoverable; found at year-end, it\'s a year of leaks.' },
  ],
  related: ['retail-markup-calculator', 'markup-vs-margin-calculator', 'profit-margin-calculator'],
} as RegisteredTool;
