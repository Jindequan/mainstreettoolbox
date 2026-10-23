import type { RegisteredTool } from '../../lib/types';
import { money } from '../../lib/types';

// 基准来源见 docs/benchmarks-garage-door-spring.md（2026-10-24，WebFetch 核源+四源交叉，全部区间 ≥2 源）。
// 口径陷阱（本工具的立足点）：聚合源在「每根弹簧」vs「整套」之间摇摆——模型固定为每根安装价 × 数量。
// Homewyse $327–576/支 基础全国均价口径与 tune-up $120–240 单源 → 不进计算，仅解释区引用。
export default {
  slug: 'garage-door-spring-replacement-cost-calculator',
  industry: 'construction',
  name: 'Garage Door Spring Replacement Cost Calculator',
  tagline: 'The broken-spring quote, checked in 10 seconds — torsion or extension, one spring or both. No signup.',
  title: 'Garage Door Spring Replacement Cost Calculator — Free 2026 Pricing',
  description: 'How much does garage door spring replacement cost? Instant 2026 US price bands for torsion and extension springs — one or both, with the DIY parts-only reality check. Free, no signup.',
  result: { label: 'Fair quote range' },
  fields: [
    {
      id: 'springType', label: 'Spring type', kind: 'select', default: 'torsion',
      options: [
        { value: 'torsion', label: 'Torsion — mounted above the door (most roll-up doors)' },
        { value: 'extension', label: 'Extension — along the tracks (tilt-up / older doors)' },
      ],
    },
    {
      id: 'count', label: 'How many springs?', kind: 'select', default: 'both',
      options: [
        { value: 'both', label: 'Both springs — the normal job: the second one is similarly worn' },
        { value: 'one', label: 'Just the broken one' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Fair quote range',
    copy: {
      info: '2026 US pricing runs $150–350 per torsion spring installed and $100–200 per extension spring (HomeGuide, with Angi/HomeAdvisor floors and DoorServPro ceilings overlapping). Both springs on one visit is the normal job — $300–700 for a standard torsion door.',
    },
  },
  compute: (values, _rows, p) => {
    const perSpring: Record<string, { lo: number; hi: number }> = {
      torsion: { lo: 150, hi: 350 }, // HomeGuide $150–350 ∩ DoorServPro $150–500；Angi/HomeAdvisor $75–150 为轻活下沿
      extension: { lo: 100, hi: 200 }, // HomeGuide $120–200 ∩ TOH 整套折算 ≈$150–200/根
    };
    const partsOnly: Record<string, string> = {
      torsion: '$40 – $120 per spring (ConsumerAffairs two-pack ≈$80 ∩ TOH parts $80–120)',
      extension: '$15 – $60 per spring (ConsumerAffairs two-pack $30–60 ∩ TOH parts $20–60)',
    };

    const type = values.springType === 'extension' ? 'extension' : 'torsion';
    const count = values.count === 'one' ? 1 : 2;
    const b = perSpring[type];
    const lo = b.lo * count;
    const hi = b.hi * count;

    const secondary: { label: string; value: string }[] = [
      { label: 'Per spring, installed', value: `${money(b.lo)} – ${money(b.hi)} (parts + labor)` },
      { label: 'DIY parts only', value: partsOnly[type] },
      { label: 'Labor share of a pro job', value: '$75 – $150 (ConsumerAffairs / Angi)' },
    ];
    if (type === 'extension') {
      secondary.push({ label: 'Converting to torsion instead', value: '$400 – $800 installed (ConsumerAffairs ∩ Angi)' });
    } else if (count === 1) {
      secondary.push({ label: 'Both springs on one visit', value: `${money(b.lo * 2)} – ${money(b.hi * 2)} — the second spring is similarly worn (This Old House)` });
    }

    const verdictText = `A torsion spring is wound to hundreds of pounds of torque — the one part of a garage door DIY really does injure people over. Pro installation is the default, not an upsell. Fair-quote sanity check: service-call, after-hours and weekend fees push quotes up; ConsumerAffairs averages both-spring jobs at $400–500 and Homewyse's baseline national average runs $327–576 per spring — past that, get a second bid.`;

    return {
      primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)} installed` },
      secondary,
      verdict: { level: 'warn', text: verdictText },
    };
  },
  explain: `
    <h3>How much does garage door spring replacement cost?</h3>
    <p>The fair 2026 band is <b>$150–350 per torsion spring installed</b> and <b>$100–200 per extension
    spring</b> — parts and labor in. Most doors carry two springs, so the normal job (both, one visit)
    lands at <b>$300–700</b>: This Old House cites $350–540 for a torsion set and ConsumerAffairs puts
    the top of the both-springs range at $400–500. Parts are the cheap half — $40–120 per torsion spring
    at retail — which is why quotes are mostly labor, truck roll and risk.</p>
    <h3>Torsion or extension — why does the type change the price?</h3>
    <p>Roll-up doors mount a torsion spring on a shaft above the door; tilt-up and older doors run
    extension springs along the tracks (Angi). Torsion costs more upfront because it's the sturdier
    system — <b>8–15 years / ~20,000 cycles</b> vs <b>7–12 years / ~10,000</b> for extension (This Old
    House). Heavy double doors run 300–450 lbs and may need higher-cycle springs, which pushes the top
    of the band. If a quote proposes converting extension hardware to torsion, that's a real option:
    <b>$400–800 installed</b> (ConsumerAffairs and Angi agree).</p>
    <h3>Should you replace both springs at once?</h3>
    <p>Yes — it's the standard recommendation (This Old House), not an upsell. Springs are paired by
    cycle count: when one breaks, the other has the same wear. Doing both in one visit means one truck
    roll and one labor charge instead of two, so the second spring costs far less than the first. A quote
    that prices the second spring at nearly full rate is padding the visit.</p>
    <h3>Why do quotes range from $160 to $1,800?</h3>
    <p>Because the number moves with things that aren't the spring: service-call and diagnostic fees,
    after-hours or weekend surcharges (ConsumerAffairs, This Old House), door weight and spring cycle
    rating, and regional labor. The infamous Reddit threads where a two-spring job quotes at $1,800
    aren't the norm — they're the case where the fair band above is exactly what you need. Homewyse's
    baseline national average of $327–576 per spring marks the legitimate ceiling; beyond that, get
    a second bid.</p>
    <h3>Can you replace a garage door spring yourself?</h3>
    <p>The parts are cheap — two-packs run <b>$30–90</b> at hardware stores (ConsumerAffairs) — but a
    torsion spring is wound to hundreds of pounds of torque, and it's the one garage-door repair that
    regularly sends DIYers to the ER. Winding bars, proper PPE and real procedure matter; extension
    springs are more forgiving but still under tension. Most homeowners are right to pay the $75–150
    labor and stay out of the spring's path.</p>
    <table>
      <thead><tr><th>Job</th><th>Typical US range (2026)</th></tr></thead>
      <tbody>
        <tr><td>Torsion spring, installed, each</td><td>$150 – $350</td></tr>
        <tr><td>Extension spring, installed, each</td><td>$100 – $200</td></tr>
        <tr><td>Both springs, one visit (standard door)</td><td>$300 – $700</td></tr>
        <tr><td>DIY parts only, per spring</td><td>$15 – $120</td></tr>
        <tr><td>Labor share of a pro job</td><td>$75 – $150</td></tr>
        <tr><td>Extension → torsion conversion</td><td>$400 – $800</td></tr>
        <tr><td>Tune-up add-on, same visit</td><td>$120 – $240 (This Old House)</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does it cost to replace a garage door spring?', a: 'In 2026 US data: $150–350 per torsion spring installed, $100–200 per extension spring. Most doors have two springs, so the normal both-springs job lands $300–700 (This Old House cites $350–540 for a torsion set; ConsumerAffairs tops the range at $400–500).' },
    { q: 'Should I replace both garage door springs at the same time?', a: 'Yes. Springs wear at the same rate, so when one breaks the second is close behind. Doing both in one visit means one truck roll and one labor charge — the second spring costs far less than the first. It is the standard recommendation, not an upsell.' },
    { q: 'Why do garage door spring quotes vary so much?', a: 'Service-call and diagnostic fees, after-hours surcharges, door weight, spring cycle rating and regional labor all move the number. The fair band is $150–350 per torsion spring installed; Homewyse\'s baseline national average sits at $327–576 per spring. A two-spring job quoting near $1,800 on a standard door deserves a second bid.' },
    { q: 'Can I replace a garage door spring myself?', a: 'Parts are cheap ($30–90 for a two-pack), but a torsion spring is wound to hundreds of pounds of torque and is the garage-door repair that most often injures DIYers. Extension springs are more forgiving but still under tension. Most homeowners should pay the $75–150 labor instead.' },
  ],
  related: ['contractor-hourly-rate-calculator', 'drywall-repair-cost-calculator', 'work-order-generator'],
} as RegisteredTool;
