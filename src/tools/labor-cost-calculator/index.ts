import type { RegisteredTool } from '../../lib/types';
import { calcLaborCost } from '../../engines/price';

export default {
  slug: 'labor-cost-calculator',
  industry: 'restaurant',
  name: 'Labor Cost Calculator',
  tagline: 'What an employee really costs you. No signup.',
  title: 'Labor Cost Calculator — Free tool for restaurants',
  description: 'See the fully loaded cost of an employee — wage plus payroll taxes and benefits — and labor cost as a percentage of revenue. Free, instant, no signup.',
  result: { label: 'Loaded cost / hour' },
  fields: [
    { id: 'wage', label: 'Hourly wage', kind: 'money', default: 18 },
    { id: 'hoursPerWeek', label: 'Hours / week', kind: 'number', default: 40 },
    { id: 'taxPct', label: 'Payroll taxes', kind: 'slider', default: 18, min: 8, max: 30, step: 1, hint: 'FICA, unemployment, workers’ comp' },
    { id: 'benefits', label: 'Benefits / month', kind: 'money', default: 0, hint: 'health cover, meals, phone' },
    { id: 'monthlyRevenue', label: 'Monthly revenue', kind: 'money', default: '', hint: 'optional — to see labor %' },
  ],
  params: {
    primaryLabel: 'Loaded cost / hour',
    benchmarks: { healthy: [25, 35], warnUpTo: 42 },
    copy: {
      ok: 'Labor runs {v} of revenue — inside the healthy 25–35% band for full-service restaurants.',
      warn: 'Labor runs {v} of revenue — above the 35% band. Watch overtime and cross-train shifts.',
      bad: 'Labor runs {v} of revenue — in the danger zone. Scheduling, not wages, is usually the first fix.',
      info: 'Add optional monthly revenue to see labor as a percentage of sales — the number restaurant owners actually manage against.',
    },
  },
  compute: (values, _rows, p) => calcLaborCost(values, p),
  explain: `
    <p>A $18/hour employee does not cost $18. Add employer payroll taxes (FICA, federal and state unemployment,
    workers' compensation — typically <b>15–22%</b> on top of wages) and any benefits, and the true figure is a
    <b>fully loaded cost</b> that can run 20–35% higher than the sticker wage.</p>
    <p>Once you add monthly revenue, the calculator shows labor as a percentage of sales — the number managers
    actually steer by. Full-service restaurants target <b>25–35%</b>; quick service runs lower. The percentage,
    not the paycheck, is what tells you whether you can afford the next hire.</p>`,
  faq: [
    { q: 'What is fully loaded labor cost?', a: 'Wages plus every employer-paid cost attached to them: payroll taxes (FICA, FUTA/SUTA), workers’ compensation, benefits, and meals on shift. It typically runs 20–35% above base wages.' },
    { q: 'What percentage of revenue should labor be?', a: 'Full-service restaurants usually target 25–35%; quick-service 20–30%. Prime cost (food plus labor) under 60% is the broader health check.' },
    { q: 'How do I lower labor percentage without cutting hours?', a: 'Raise average ticket (attach rate on sides and drinks), tighten the schedule against your sales curve, and reduce overtime. Cutting hours is the last lever — it costs service quality.' },
  ],
  related: ['prime-cost-calculator', 'break-even-calculator', 'tip-out-calculator', 'profit-margin-calculator'],
} as RegisteredTool;
