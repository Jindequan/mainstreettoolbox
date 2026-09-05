import type { RegisteredTool } from '../../lib/types';
import { calcFoodCostPct } from '../../engines/price';

export default {
  slug: 'food-cost-percentage-calculator',
  industry: 'restaurant',
  name: 'Food Cost Percentage Calculator',
  tagline: 'Check any dish in 15 seconds. No signup.',
  title: 'Food Cost Percentage Calculator — Free restaurant tool',
  description: 'Enter what a dish costs you and what you charge to see your food cost percentage, with the healthy range for restaurants and the price that fixes it. Free, no signup.',
  result: { label: 'Food cost percentage' },
  fields: [
    { id: 'dishCost', label: 'Plate cost', kind: 'money', default: 4.9, hint: 'all ingredients on the plate' },
    { id: 'menuPrice', label: 'Menu price', kind: 'money', default: 16.95 },
  ],
  params: {
    primaryLabel: 'Food cost',
    benchmarks: { healthy: [28, 35], warnUpTo: 40 },
    copy: {
      ok: '{v} food cost — inside the healthy 28–35% band for full-service restaurants.',
      warn: '{v} food cost is above the 35% ceiling — reprice your top sellers before cutting quality.',
      bad: '{v} food cost is in the danger zone — the dish barely pays for its own ingredients.',
    },
  },
  compute: (values, _rows, p) => calcFoodCostPct(values, p),
  explain: `
    <p>Food cost percentage is the single most-watched number in restaurant accounting: for every dollar a guest
    pays, this is the share that goes straight to ingredients. Most full-service restaurants run
    <b>28–35%</b>; quick-service kitchens typically sit a few points lower.</p>
    <p>If your number is high, the fastest fix is usually price, not portion. The result card shows the menu price
    that brings this dish back inside the healthy band — before you touch a single recipe.</p>`,
  faq: [
    { q: 'How do I calculate food cost percentage?', a: 'Divide what the plate costs you by what you charge, times 100. A dish costing $4.90 that sells for $16.95 has a food cost of about 29%.' },
    { q: 'Is lower food cost always better?', a: 'Not always. Chasing 20% by shrinking portions can hurt reviews and repeat visits. A stable 30% with strong sales beats a wobbly 24% with unhappy guests.' },
    { q: 'Should I use weekly COGS instead of a single dish?', a: 'Both views matter. Single-dish checks catch recipe problems; a weekly COGS-to-sales percentage catches theft, waste and supplier creep. This calculator handles the dish view.' },
  ],
  related: ['menu-pricing-calculator', 'menu-engineering-matrix', 'prime-cost-calculator', 'profit-margin-calculator'],
} as RegisteredTool;
