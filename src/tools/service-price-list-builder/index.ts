import type { RegisteredTool } from '../../lib/types';
import { calcPriceList } from '../../engines/doc';

export default {
  slug: 'service-price-list-builder',
  industry: 'salon',
  name: 'Service Price List Builder',
  tagline: 'A typeset price list, not a Word doc. No signup.',
  title: 'Service Price List Builder — Free printable price lists for salons',
  description: 'Build a clean, typeset price list for your salon or barbershop — services with times and prices, ready to print for the front desk or your socials. Free, no signup.',
  result: { label: 'Your price list' },
  fields: [
    { id: 'salonName', label: 'Business name', kind: 'text', default: 'My Salon', placeholder: 'Salon / barbershop name' },
  ],
  rows: {
    id: 'services',
    label: 'Services',
    columns: [
      { id: 'service', label: 'Service', kind: 'text', placeholder: 'Cut & finish' },
      { id: 'duration', label: 'Min', kind: 'number', placeholder: '45' },
      { id: 'price', label: 'Price', kind: 'money', placeholder: '0.00' },
    ],
    preset: [
      { service: 'Cut & finish', duration: 45, price: 45 },
      { service: 'Blow dry', duration: 30, price: 30 },
      { service: 'Full color', duration: 120, price: 120 },
      { service: 'Beard trim', duration: 20, price: 18 },
    ],
    addLabel: '+ Add service',
  },
  params: {
    primaryLabel: 'Services on the list',
    copy: {
      info: 'Print for the front desk, post on your socials, or save as PDF for your booking page.',
      footnote: 'Prices may vary by hair length and density. Ask at consultation.',
    },
  },
  compute: (values, rows, p) => calcPriceList(values, rows, p),
  explain: `
    <p>A typeset price list does quiet work every day: it answers the phone question, sets the anchor before the
    consultation, and quietly says "this is a professional operation". The layout pairs each service with its
    time — clients read time as honesty, and you get shorter consultations.</p>
    <p>Print one for the station mirror and export the same list for your booking page. Reprint whenever you
    change prices — an outdated list is worse than no list.</p>`,
  faq: [
    { q: 'Should I put prices on my website?', a: 'Yes. Hiding prices ("consultations only") filters out price-sensitive clients but also reads as evasive. A published range with "final quote at consultation" converts better than mystery.' },
    { q: 'How do I raise prices without losing clients?', a: 'New list, new season, grandfather nobody silently — announce two weeks ahead, raise the underpriced services most, and keep the increase under 10% per year for loyal regulars.' },
  ],
  related: ['booth-rent-commission-calculator', 'tip-out-calculator', 'labor-cost-calculator'],
} as RegisteredTool;
