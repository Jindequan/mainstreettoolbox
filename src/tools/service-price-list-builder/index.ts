import type { RegisteredTool } from '../../lib/types';
import { calcPriceList } from '../../engines/doc';

export default {
  slug: 'service-price-list-builder',
  industry: 'salon',
  name: 'Service Price List Builder',
  tagline: 'A typeset price list, not a Word doc. No signup.',
  title: 'Free Price List Template — Printable Generator for Any Service Business',
  description: 'Free printable price list template for any service business — auto detailing, dog grooming, handyman, salon, cleaning or lawn care. Services, times and prices, ready to print. No signup.',
  result: { label: 'Your price list' },
  fields: [
    { id: 'salonName', label: 'Business name', kind: 'text', default: 'My Business', placeholder: 'Your business name' },
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
    presets: {
      // 价格锚点来源（2026-09-19 研究见 keyword-research R3）：detailing = HomeGuide/BGI/Thumbtack/Yelp/Jobber；grooming = HomeGuide/Adopt-a-Pet/QC Pet Studies/Petco/PetSmart/Bark
      detailing: [
        { service: 'Exterior wash & wax', duration: 60, price: 120 },
        { service: 'Interior deep clean', duration: 90, price: 150 },
        { service: 'Full detail (in + out)', duration: 180, price: 225 },
        { service: 'Wax & seal', duration: 90, price: 130 },
        { service: 'Headlight restoration (pair)', duration: 45, price: 130 },
        { service: 'Pet hair removal', duration: 30, price: 50 },
        { service: 'Engine bay clean', duration: 30, price: 80 },
      ],
      grooming: [
        { service: 'Bath & brush (small dog)', duration: 60, price: 45 },
        { service: 'Full groom — small dog', duration: 90, price: 55 },
        { service: 'Full groom — large dog', duration: 120, price: 100 },
        { service: 'De-shedding treatment', duration: 45, price: 30 },
        { service: 'Nail trim', duration: 15, price: 15 },
        { service: 'Flea & tick treatment', duration: 30, price: 30 },
        { service: 'Teeth brushing', duration: 15, price: 12 },
      ],
      handyman: [
        { service: 'TV mounting', duration: 60, price: 100 },
        { service: 'Faucet replacement', duration: 60, price: 135 },
        { service: 'Furniture assembly (per item)', duration: 45, price: 80 },
        { service: 'Drywall patch', duration: 90, price: 110 },
        { service: 'Gutter clearing', duration: 120, price: 170 },
      ],
    },
    addLabel: '+ Add service',
  },
  params: {
    primaryLabel: 'Services on the list',
    copy: {
      info: 'Print for the front desk, post on your socials, or save as PDF for your booking page.',
      footnote: 'Prices may vary by job size and complexity. Ask for a final quote.',
    },
  },
  compute: (values, rows, p) => calcPriceList(values, rows, p),
  explain: `
    <p>A typeset price list does quiet work every day: it answers the phone question, sets the anchor before the
    consultation, and quietly says "this is a professional operation". The layout pairs each service with its
    time — clients read time as honesty, and you get shorter consultations.</p>
    <p>The same builder works for any service trade — swap the preset rows for your own services and print.
    Any business that quotes by the job instead of by the hour gets the same benefit: prices that are seen
    before they are discussed.</p>
    <p><b>Start from a trade preset</b> (rows, times and typical 2026 US prices already filled in):</p>
    <ul>
      <li><a href="/salon/service-price-list-builder/?trade=detailing">Auto detailing price list template</a> — exterior, interior, full detail, wax, headlight restore (HomeGuide; BGI; Thumbtack)</li>
      <li><a href="/salon/service-price-list-builder/?trade=grooming">Dog grooming price list template</a> — by dog size, de-shedding, nail trim (HomeGuide; Adopt-a-Pet; QC Pet Studies)</li>
      <li><a href="/salon/service-price-list-builder/?trade=handyman">Handyman price list template</a> — job bundles, not hours</li>
      <li>Salon &amp; barbershop (this page's default preset) — cut, color, beard, blow-dry</li>
    </ul>
    <p>Print one for the front desk and export the same list for your booking page. Reprint whenever you
    change prices — an outdated list is worse than no list.</p>`,
  faq: [
    { q: 'Should I put prices on my website?', a: 'Yes. Hiding prices ("consultations only") filters out price-sensitive clients but also reads as evasive. A published range with "final quote at consultation" converts better than mystery.' },
    { q: 'Can I use this as a handyman price list template?', a: 'Yes — open the handyman preset: TV mounting $100, faucet replacement $135, furniture assembly $80 per item, drywall patch $110, gutter clearing $170 (2026 US job-bundle rates). Think in job bundles rather than hours — a printable one-page handyman price list filters the "how much for a quick job" calls before they reach your phone.' },
    { q: 'Can I use this for auto detailing or dog grooming?', a: 'Yes — both have ready presets with 2026 US rates: detailing from exterior wash ($120) to full detail ($225) (HomeGuide; BGI; Thumbtack), grooming from bath & brush ($45 small dog) to full groom large ($100) (HomeGuide; Adopt-a-Pet; QC Pet Studies). Swap rows for your own menu and print.' },
    { q: 'How do I raise prices without losing clients?', a: 'New list, new season, grandfather nobody silently — announce two weeks ahead, raise the underpriced services most, and keep the increase under 10% per year for loyal regulars.' },
  ],
  related: ['booth-rent-commission-calculator', 'tip-out-calculator', 'labor-cost-calculator'],
} as RegisteredTool;
