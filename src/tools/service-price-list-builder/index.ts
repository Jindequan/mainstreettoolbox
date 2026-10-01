import type { RegisteredTool } from '../../lib/types';
import { calcPriceList } from '../../engines/doc';

export default {
  slug: 'service-price-list-builder',
  industry: 'salon',
  name: 'Service Price List Builder',
  tagline: 'A typeset price list, not a Word doc. No signup.',
  title: 'Free Price List Template — Printable Generator for Any Service Business',
  description: 'Free printable price list template for any service business — auto detailing, dog grooming, handyman, tutoring, clothing alterations, salon, cleaning or lawn care. Services, times and prices, ready to print. No signup.',
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
      // tutoring 来源（2026-09-20）：TutorCruncher（NYC 数学 $55–65 / LA $50–60）+ Tutorbase 2026 全国 $40–80 + wise.live/Legacy（SAT/ACT $50–100+）
      tutoring: [
        { service: 'Math tutoring (per hour)', duration: 60, price: 55 },
        { service: 'Reading & writing (per hour)', duration: 60, price: 45 },
        { service: 'SAT / ACT test prep (per hour)', duration: 60, price: 75 },
      ],
      // tailoring 来源（2026-09-29 R4）：Thumbtack 显式价（hem skirt/dress $10–14、take-in $15 unlined/$20 lined、jacket shoulders $35）+ FB 市场帖（simple hem $10–15、jean original hem $20–50）+ 指南聚合（zipper $20–75、pants hem $15–35）
      tailoring: [
        { service: 'Hem pants (per pair)', duration: 20, price: 15 },
        { service: 'Hem jeans — keep original hem', duration: 30, price: 30 },
        { service: 'Hem skirt or dress', duration: 25, price: 12 },
        { service: 'Take in / let out pants', duration: 30, price: 15 },
        { service: 'Take in dress sides', duration: 45, price: 25 },
        { service: 'Replace pants or skirt zipper', duration: 30, price: 25 },
        { service: 'Adjust jacket shoulders', duration: 45, price: 35 },
      ],
      // taxprep 来源（2026-09-30 R5-T1）：AccWire CPA 费率（simple 1040 ~$220 起、business $1,500+）+ Relay/Fincent/QuickBooks（outsourced bookkeeping $150–400 小微 / $300–1,200 常规；itemized $300–500、Schedule C $250–2,500）
      taxprep: [
        { service: 'Simple 1040 (standard deduction)', duration: 60, price: 220 },
        { service: 'Itemized 1040', duration: 90, price: 350 },
        { service: 'Schedule C — sole proprietor', duration: 120, price: 450 },
        { service: 'S-corp / partnership return', duration: 240, price: 900 },
        { service: 'Monthly bookkeeping (small biz)', duration: 120, price: 350 },
        { service: 'Catch-up / cleanup bookkeeping (per month)', duration: 180, price: 400 },
      ],
      // eventplanner 来源（2026-09-30 R5-T1）：WeddingWire（day-of 起点 $800、高端 $1,250–3,395）+ The Knot（month-of ~$2,400）+ Zola（partial ~$3,200、full 均值 $4,047）
      eventplanner: [
        { service: 'Day-of coordination (up to 8 hours)', duration: 480, price: 1200 },
        { service: 'Month-of coordination', duration: 1200, price: 2400 },
        { service: 'Partial planning', duration: 2400, price: 3200 },
        { service: 'Full-service planning', duration: 3600, price: 4000 },
      ],
      // lash 来源（2026-09-30 R5-T1）：LalaLash Atlanta（classic full ~$160/1.3h、volume ~$230）+ PMUHub/HeyMeLashes（classic $150–165、refill ~$71、volume refill $75–120）
      lash: [
        { service: 'Classic full set', duration: 90, price: 150 },
        { service: 'Volume full set', duration: 120, price: 230 },
        { service: 'Classic refill (2–3 weeks)', duration: 60, price: 70 },
        { service: 'Volume refill (2–3 weeks)', duration: 75, price: 100 },
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
    <h3>Why does a service business need a price list?</h3>
    <p>A typeset price list does quiet work every day: it answers the phone question, sets the anchor before the
    consultation, and quietly says "this is a professional operation". The layout pairs each service with its
    time — clients read time as honesty, and you get shorter consultations.</p>
    <p>The same builder works for any service trade — swap the preset rows for your own services and print.
    Any business that quotes by the job instead of by the hour gets the same benefit: prices that are seen
    before they are discussed.</p>
    <h3>Which price list templates can you start from?</h3>
    <p><b>Start from a trade preset</b> (rows, times and typical 2026 US prices already filled in):</p>
    <ul>
      <li><a href="/salon/service-price-list-builder/?trade=detailing">Auto detailing price list template</a> — exterior, interior, full detail, wax, headlight restore (HomeGuide; BGI; Thumbtack)</li>
      <li><a href="/salon/service-price-list-builder/?trade=grooming">Dog grooming price list template</a> — by dog size, de-shedding, nail trim (HomeGuide; Adopt-a-Pet; QC Pet Studies)</li>
      <li><a href="/salon/service-price-list-builder/?trade=handyman">Handyman price list template</a> — job bundles, not hours</li>
      <li><a href="/salon/service-price-list-builder/?trade=tutoring">Tutoring price list template</a> — per-hour rates by subject (TutorCruncher; Tutorbase; wise.live)</li>
      <li><a href="/salon/service-price-list-builder/?trade=tailoring">Alterations price list template</a> — hems, take-in, zippers (Thumbtack; shop price lists)</li>
      <li><a href="/salon/service-price-list-builder/?trade=taxprep">Tax preparer price list template</a> — 1040 tiers, Schedule C, S-corp, monthly bookkeeping (AccWire; Relay; QuickBooks)</li>
      <li><a href="/salon/service-price-list-builder/?trade=eventplanner">Event planning price list template</a> — day-of, month-of, partial and full-service packages (WeddingWire; The Knot; Zola)</li>
      <li><a href="/salon/service-price-list-builder/?trade=lash">Lash extension price list template</a> — classic and volume sets, refills (LalaLash; PMUHub)</li>
      <li>Salon &amp; barbershop (this page's default preset) — cut, color, beard, blow-dry</li>
    </ul>
    <p>Print one for the front desk and export the same list for your booking page. Reprint whenever you
    change prices — an outdated list is worse than no list.</p>`,
  faq: [
    { q: 'Should I put prices on my website?', a: 'Yes. Hiding prices ("consultations only") filters out price-sensitive clients but also reads as evasive. A published range with "final quote at consultation" converts better than mystery.' },
    { q: 'Can I use this as a handyman price list template?', a: 'Yes — open the handyman preset: TV mounting $100, faucet replacement $135, furniture assembly $80 per item, drywall patch $110, gutter clearing $170 (2026 US job-bundle rates). Think in job bundles rather than hours — a printable one-page handyman price list filters the "how much for a quick job" calls before they reach your phone.' },
    { q: 'Can I use this for auto detailing, dog grooming or tutoring?', a: 'Yes — all three have ready presets with 2026 US rates: detailing from exterior wash ($120) to full detail ($225) (HomeGuide; BGI; Thumbtack), grooming from bath & brush ($45 small dog) to full groom large ($100) (HomeGuide; Adopt-a-Pet; QC Pet Studies), and tutoring from math ($55/hour) to SAT prep ($75/hour) (TutorCruncher; Tutorbase). Swap rows for your own menu and print.' },
    { q: 'Can I use this as an alterations price list?', a: 'Yes — open the tailoring preset: pants hem $15, original-hem jeans $30, skirt or dress hem $12, take-in $15–25, zipper replacement $25, jacket shoulders $35 (Thumbtack 2026 data; shop price lists). A printed alterations price list answers the two questions every walk-in asks — what and how much — before you pick up the garment.' },
    { q: 'Can I use this as a tax preparer or bookkeeper price list?', a: 'Yes — the taxprep preset is filled with 2026 US rates: simple 1040 $220, itemized $350, Schedule C $450, S-corp/partnership $900, monthly bookkeeping $350 (AccWire CPA fee data; Relay; QuickBooks). Per-return pricing beats hourly for tax season — clients can budget, and you stop discounting "quick ones".' },
    { q: 'Can I use this as an event planner or lash tech price list?', a: 'Both are ready presets. Event planning: day-of coordination $1,200, month-of $2,400, partial $3,200, full-service $4,000 (WeddingWire; The Knot; Zola 2026 averages). Lash extensions: classic set $150, volume set $230, refills $70–100 (LalaLash; PMUHub). Packages published as a menu convert better than quote-only inquiries for both.' },
    { q: 'How do I raise prices without losing clients?', a: 'New list, new season, grandfather nobody silently — announce two weeks ahead, raise the underpriced services most, and keep the increase under 10% per year for loyal regulars.' },
  ],
  related: ['booth-rent-commission-calculator', 'tip-out-calculator', 'labor-cost-calculator'],
} as RegisteredTool;
