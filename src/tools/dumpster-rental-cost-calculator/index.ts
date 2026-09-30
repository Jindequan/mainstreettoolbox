import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 基准来源见 docs/benchmarks-dumpster-rental.md（2026-09-29，Angi/HomeGuide/Rapid Haul/RolloffOps 交叉，
// 词族量级经 Bing WMT Keyword Research 官方 Impressions 验证：价格子族 951+741+505+261+191/3M）。
// 街道许可费、重型垃圾专箱溢价单源/口径混 → 不进计算（FAQ 定性提及）。
export default {
  slug: 'dumpster-rental-cost-calculator',
  industry: 'construction',
  name: 'Dumpster Rental Cost Calculator',
  tagline: 'Size the box, count the days, weigh the debris — see the full 2026 rental cost before you call a hauler. No signup.',
  title: 'Dumpster Rental Cost Calculator — 2026 Prices by Size | Main Street Toolbox',
  description: 'How much does it cost to rent a dumpster? 2026 US prices by size (10–40 yard), extra days and tonnage overage — free calculator, no signup.',
  result: { label: 'Estimated rental cost' },
  fields: [
    {
      id: 'size', label: 'Dumpster size', kind: 'select', default: '20',
      options: [
        { value: '10', label: '10 yard — small remodel, garage cleanout' },
        { value: '20', label: '20 yard — most common: kitchen, flooring, deck' },
        { value: '30', label: '30 yard — whole-home cleanout, new construction' },
        { value: '40', label: '40 yard — demolition, major renovation' },
      ],
    },
    {
      id: 'days', label: 'Rental length', kind: 'select', default: '7',
      options: [
        { value: '3', label: '1–3 days (quick weekend cleanout)' },
        { value: '7', label: '1 week (standard window)' },
        { value: '10', label: '10 days' },
        { value: '14', label: '2 weeks' },
      ],
    },
    {
      id: 'weight', label: 'Debris weight (tons)', kind: 'number', default: 2,
      hint: '1 ton ≈ a full-size pickup loaded 3 times. A 20-yard box of household junk runs 2–3 tons.',
    },
    {
      id: 'debris', label: 'Debris type', kind: 'select', default: 'household',
      options: [
        { value: 'household', label: 'Household / general junk, wood, drywall' },
        { value: 'heavy', label: 'Heavy: concrete, dirt, brick, shingles' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Estimated rental cost',
    copy: {
      info: '2026 US flat-rate pricing for a 7-day rental with drop-off and one haul included: 10-yard $300–500, 20-yard $400–600, 30-yard $500–700, 40-yard $600–800. Overage runs $50–110 per extra ton and $10–30 per day past the 7-day window. Local quotes vary with landfill fees — get two.',
    },
  },
  compute: (values, _rows, p) => {
    // 档位来源见 benchmarks 文档（Angi 区间；HomeGuide/Rapid Haul 锚点全部落在区间内）
    const band: Record<string, { lo: number; hi: number }> = {
      '10': { lo: 300, hi: 500 },
      '20': { lo: 400, hi: 600 },
      '30': { lo: 500, hi: 700 },
      '40': { lo: 600, hi: 800 },
    };
    const includedTons: Record<string, number> = { '10': 1, '20': 2, '30': 3, '40': 4 };
    const overage = { lo: 50, hi: 110 }; // per extra ton（多源一致）
    const extraDay = { lo: 10, hi: 30 }; // per day past 7

    const size = clamp(num(values.size), 10, 40).toString();
    const b = band[size] ?? band['20'];
    const included = includedTons[size] ?? 2;
    const days = clamp(num(values.days), 1, 30);
    const weight = clamp(num(values.weight), 0, 40);

    // 短租折扣 −8%（RolloffOps 20yd $435/$475，单源，benchmarks 已标注）
    const shortFactor = days <= 3 ? 0.92 : 1;
    const baseLo = b.lo * shortFactor;
    const baseHi = b.hi * shortFactor;

    const extraDays = Math.max(0, days - 7);
    const extraLo = extraDays * extraDay.lo;
    const extraHi = extraDays * extraDay.hi;

    const overTons = Math.max(0, weight - included);
    const overLo = overTons * overage.lo;
    const overHi = overTons * overage.hi;

    const lo = Math.round(baseLo + extraLo + overLo);
    const hi = Math.round(baseHi + extraHi + overHi);

    const secondary: { label: string; value: string }[] = [
      { label: 'Base rental (7-day flat rate)', value: `${money(baseLo)} – ${money(baseHi)}` },
    ];
    if (extraDays > 0) secondary.push({ label: `Extra days (×${extraDays})`, value: `${money(extraLo)} – ${money(extraHi)}` });
    if (overTons > 0) secondary.push({ label: `Tonnage overage (${overTons.toFixed(1)} t over)`, value: `${money(overLo)} – ${money(overHi)}` });
    if (size !== '20') secondary.push({ label: 'For comparison, 20-yard', value: `${money(band['20'].lo)} – ${money(band['20'].hi)} — the most-rented size` });

    const heavy = values.debris === 'heavy';
    const verdictText = heavy
      ? 'Heavy debris: concrete, dirt and shingles blow past weight caps fast — many haulers require a dedicated heavy-debris box or price them per load, so expect the high end and confirm the material when you book.'
      : (p.copy as Record<string, string>).info;

    return {
      primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)} for a ${size}-yard box, ${days} day${days > 1 ? 's' : ''}` },
      secondary,
      verdict: { level: heavy ? 'warn' : 'info', text: verdictText },
    };
  },
  explain: `
    <h3>How much does it cost to rent a dumpster?</h3>
    <p>The 2026 US national average sits at <b>$294–480</b> (Rapid Haul; DropCurb, April 2026), and the size
    you book moves the number more than anything else: <b>$300–500 for a 10-yard</b>, <b>$400–600 for a
    20-yard</b> (the most-rented size), <b>$500–700 for a 30-yard</b> and <b>$600–800 for a 40-yard</b>
    (Angi's size table; HomeGuide's ~$350/week for 10-yard and Rapid Haul's $545/30-yard, $695/40-yard all
    land inside those bands). Flat rates include drop-off, one haul and a 7-day window.</p>
    <h3>Why are "near me" prices so different from city to city?</h3>
    <p>Because the dump, not the truck, sets the floor: local landfill tip fees, fuel and permit rules vary
    by county, so the same 20-yard box can swing $150+ between markets. "Dumpster rentals near me prices"
    searches feel noisy for exactly this reason — the honest move is two or three local quotes on the same
    size and term, compared line by line.</p>
    <h3>How do I get the cheapest dumpster rental?</h3>
    <p>Right-size the box (a 20-yard beats an overfed 10-yard once overage fees land), finish inside the
    7-day window, load level to the fill line, and keep heavy material out of a mixed box. Compare
    <b>flat-rate vs variable</b> quotes: flat rates bundle the first dump, which is where variable quotes
    hide their margin.</p>
    <h3>What happens if I go over the weight limit?</h3>
    <p>Overage bills at <b>$50–110 per additional ton</b>, prorated from the included allowance (typically
    1 ton per 10 yards — Rapid Haul ships 30-yard boxes with 3 tons and 40-yard with 4). Concrete, dirt,
    brick and shingles blow past caps faster than anything else; most haulers want them in a dedicated
    heavy-debris box, priced per load.</p>
    <h3>If you're the one renting boxes out</h3>
    <p>Small hauling operators price against the same table: the flat-rate band is your ceiling for
    one-haul jobs, and the overage rate ($50–110/t) is how you protect margin when a customer's "few
    things" turns into three tons of shingles. Put the weight allowance and overage rate in writing on
    every booking.</p>
    <table>
      <thead><tr><th>Size</th><th>Typical 7-day flat rate (2026)</th><th>Typical included weight</th></tr></thead>
      <tbody>
        <tr><td>10 yard</td><td>$300 – $500</td><td>~1 ton</td></tr>
        <tr><td>20 yard</td><td>$400 – $600</td><td>~2 tons</td></tr>
        <tr><td>30 yard</td><td>$500 – $700</td><td>3 tons (Rapid Haul)</td></tr>
        <tr><td>40 yard</td><td>$600 – $800</td><td>4 tons (Rapid Haul)</td></tr>
        <tr><td>Overage</td><td colspan="2">$50 – $110 per extra ton · $10 – $30 per day past 7 days</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does it cost to rent a dumpster?', a: 'In 2026 US data: $300–500 for a 10-yard, $400–600 for a 20-yard (the most common rental), $500–700 for a 30-yard and $600–800 for a 40-yard, flat rate for about a week with drop-off and one haul included. The national average booking lands at $294–480.' },
    { q: 'Why do dumpster rental prices near me differ so much?', a: 'Local landfill tip fees, fuel and permit rules set most of the price, so the same 20-yard box can vary $150+ between counties. The fix is comparing two or three local quotes on the identical size and rental term.' },
    { q: 'What is the cheapest dumpster rental size?', a: 'The 20-yard is usually the cheapest per project: at $400–600 it holds roughly twice a 10-yard box, and the price difference is smaller than one overage invoice. Overflowing a too-small 10-yard into a second rental costs more than booking the 20 up front.' },
    { q: 'What are dumpster rental overage fees?', a: 'Weight over the included allowance bills at $50–110 per ton, and days past the standard 7-day window add $10–30 per day. A typical 30-yard includes 3 tons and a 40-yard includes 4 (Rapid Haul); smaller boxes often include 1–2.' },
    { q: 'Can I put concrete or dirt in a rented dumpster?', a: 'Usually not in a standard mixed-waste box — heavy debris is either banned or requires a dedicated heavy-debris box priced per load, because it maxes out weight caps fast. Tell the hauler the material when booking; mixing it in anyway is how $50–110/ton overage bills happen.' },
    { q: 'Do I need a permit for a dumpster?', a: 'On your own driveway or jobsite, usually no. Placed on a public street, most cities require a right-of-way permit — check your city’s site before delivery day, since fines land on the customer, not the hauler.' },
  ],
  related: ['junk-removal-estimator', 'drywall-repair-cost-calculator', 'material-cost-estimator'],
} as RegisteredTool;
