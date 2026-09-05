import type { RegisteredTool } from '../../lib/types';
import { num } from '../../lib/types';
import { calcContractorRate } from '../../engines/quote';

export default {
  slug: 'mulch-calculator',
  industry: 'lawn',
  name: 'Mulch Calculator',
  tagline: 'Right amount, one trip. No signup.',
  title: 'Mulch Calculator — Bags & cubic yards, free',
  description: 'Enter the bed area and depth to get cubic yards of mulch needed and the exact number of bags to buy — with delivery vs bags math. Free, no signup.',
  result: { label: 'Mulch needed' },
  fields: [
    { id: 'area', label: 'Bed area', kind: 'number', default: 200, hint: 'square feet' },
    { id: 'depth', label: 'Depth', kind: 'slider', default: 3, min: 1, max: 6, step: 0.5, hint: 'inches — 3" is standard' },
    {
      id: 'bagSize', label: 'Bag size', kind: 'select', default: '2',
      options: [
        { value: '2', label: '2 cu ft bag' },
        { value: '3', label: '3 cu ft bag' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Cubic yards',
    copy: {
      info: 'Bags are rounded up to whole bags. Delivery (bulk) usually beats bags above 3 cubic yards — price both before you decide.',
    },
  },
  compute: (values, _rows, p) => {
    const area = Math.max(1, num(values.area));
    const depth = Math.max(1, num(values.depth));
    const bag = num(values.bagSize) || 2;
    const cubicFeet = (area * depth) / 12;
    const yards = cubicFeet / 27;
    const bags = Math.ceil(cubicFeet / bag);
    const copy = p.copy as Record<string, string>;
    return {
      primary: { label: p.primaryLabel as string, value: yards.toFixed(1) + ' yd³' },
      secondary: [
        { label: 'Bags to buy', value: `${bags} × ${bag} cu ft` },
        { label: 'Cubic feet', value: cubicFeet.toFixed(0) + ' ft³' },
      ],
      verdict: { level: 'info', text: copy.info },
    };
  },
  explain: `
    <p>Mulch math is volume: area × depth, converted to <b>cubic yards</b> (the unit bulk delivery is sold in).
    Standard depth is <b>3 inches</b> — enough to hold moisture and block weeds without suffocating roots.
    Refresh beds every spring with about half that on top.</p>
    <p>Bags make sense under ~3 cubic yards; beyond that, bulk delivery by the yard is cheaper and easier on
    your back. The calculator shows both so you can price the job either way — and bill materials with a
    markup, not at cost.</p>`,
  faq: [
    { q: 'How deep should mulch be?', a: 'Three inches on bare soil, two on refresh. More than four inches suffocates roots and invites fungus — "mulch volcanoes" against tree trunks are the classic mistake.' },
    { q: 'How many bags is a cubic yard?', a: 'Thirteen to fourteen 2-cu-ft bags, or nine 3-cu-ft bags. Bulk delivery by the cubic yard almost always wins on price past three yards.' },
  ],
  related: ['lawn-mowing-price-calculator', 'lawn-care-estimate-generator', 'contractor-hourly-rate-calculator'],
} as RegisteredTool;
