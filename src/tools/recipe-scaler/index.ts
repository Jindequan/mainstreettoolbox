import type { RegisteredTool } from '../../lib/types';
import { calcScaler } from '../../engines/split';

export default {
  slug: 'recipe-scaler',
  industry: 'restaurant',
  name: 'Recipe Scaler & Batch Calculator',
  tagline: 'Scale any recipe, keep the taste. No signup.',
  title: 'Recipe Scaler — Free batch & catering calculator',
  description: 'Scale a recipe from any number of servings to any other — every ingredient rescaled instantly, ready to print for a catering prep list. Free, no signup.',
  result: { label: 'Scale factor' },
  fields: [
    { id: 'servings', label: 'Recipe serves', kind: 'number', default: 4 },
    { id: 'scaleTo', label: 'Scale to servings', kind: 'number', default: 6 },
  ],
  rows: {
    id: 'ingredients',
    label: 'Ingredients (per recipe)',
    hint: 'quantities as written in the original recipe',
    columns: [
      { id: 'ing', label: 'Ingredient', kind: 'text', placeholder: 'e.g. flour' },
      { id: 'qty', label: 'Amount', kind: 'number', placeholder: '300' },
      { id: 'unit', label: 'Unit', kind: 'text', placeholder: 'g / oz / cups' },
    ],
    preset: [
      { ing: 'All-purpose flour', qty: 300, unit: 'g' },
      { ing: 'Whole milk', qty: 240, unit: 'ml' },
      { ing: 'Butter', qty: 60, unit: 'g' },
    ],
    addLabel: '+ Add ingredient',
  },
  params: {
    primaryLabel: 'Scale factor',
    copy: {
      info: 'Multiply the quantities below into your prep list. Spices and salt rarely scale linearly — season to taste and adjust in the pan.',
    },
  },
  compute: (values, rows, p) => calcScaler(values, rows, p),
  explain: `
    <p>Scaling a recipe is multiplication — but cooking is not. Ingredients that carry structure (flour, stock,
    vegetables) scale linearly and happily. Ingredients that carry <b>flavor</b> — salt, spices, chilies,
    alcohol — do not: a 3× batch usually needs only about 2× the salt, added gradually.</p>
    <p>Practical catering wisdom: scale the recipe, then taste the batch before service. Evaporation, pan
    surface area and hold time all shift as volumes grow, so liquids may reduce differently than your
    multiplication predicts.</p>
    <p>Printing this as a prep list keeps the batch consistent between cooks — the scale factor and every
    scaled quantity go on one clean page.</p>`,
  faq: [
    { q: 'Does every ingredient scale linearly?', a: 'Structure ingredients do — flour, stock, vegetables. Aromatics and seasoning (salt, garlic, spices, chili, alcohol) scale sub-linearly: scale them at about two-thirds of the factor and adjust to taste.' },
    { q: 'How do I convert cups to grams when scaling?', a: 'Weigh one serving of the original recipe first, then scale by weight. Weight scales perfectly; cup measurements compress error, especially for flour where packing varies.' },
    { q: 'Can I scale baking recipes reliably?', a: 'Bread and doughs scale well by weight. Cakes and custards are more sensitive — scale by weight, keep pan depth similar, and expect bake time, not temperature, to change.' },
  ],
  related: ['menu-pricing-calculator', 'food-cost-percentage-calculator', 'prime-cost-calculator', 'tip-out-calculator'],
} as RegisteredTool;
