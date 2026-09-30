import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 基准来源见 docs/benchmarks-popcorn-ceiling.md（2026-09-30，Angi $1–3 + CalcBuilt $1.25–3.60 交叉，
// 采信合并带 $1.25–3.25/sqft；漆面 ×1.5–2 单源 CalcBuilt 已标注）。
// 石棉 abatement $5–15+/sqft 口径混 → 不进计算，verdict+FAQ 警告（1980 前先检测）。
export default {
  slug: 'popcorn-ceiling-removal-cost-calculator',
  industry: 'construction',
  name: 'Popcorn Ceiling Removal Cost Calculator',
  tagline: 'Price the scrape before anyone sets foot on a ladder — per-sqft bands for painted and unpainted texture, asbestos caveat included. No signup.',
  title: 'Popcorn Ceiling Removal Cost Calculator — 2026 Per Sq Ft Pricing',
  description: 'How much does popcorn ceiling removal cost? 2026 US rates per square foot for painted and unpainted texture, with the asbestos rule. Free, no signup.',
  result: { label: 'Estimated removal cost' },
  fields: [
    { id: 'sqft', label: 'Ceiling area (sq ft)', kind: 'number', default: 800, hint: 'Room length × width, summed over rooms. An 800 sq ft ceiling is a typical mid-size home job.' },
    {
      id: 'texture', label: 'Texture', kind: 'select', default: 'unpainted',
      options: [
        { value: 'unpainted', label: 'Unpainted popcorn (scrapes off wet)' },
        { value: 'painted', label: 'Painted popcorn (1.5–2× — needs heavier wet-scrape + skim)' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Estimated removal cost',
    copy: {
      info: '2026 US pricing runs $1.25–3.25 per sq ft for unpainted texture (scrape, skim and masking included — Angi and CalcBuilt overlap there). Painted texture runs 1.5–2× that. Homes built before 1980: asbestos test first, always.',
    },
  },
  compute: (values, _rows, p) => {
    const perSqft = { lo: 1.25, hi: 3.25 }; // Angi $1–3 ∩ CalcBuilt $1.25–3.60 合并带
    const paintedMult = { lo: 1.5, hi: 2 }; // CalcBuilt 单源，benchmarks 已标注

    const sqft = clamp(num(values.sqft), 50, 20000);
    const painted = values.texture === 'painted';

    const loRate = perSqft.lo * (painted ? paintedMult.lo : 1);
    const hiRate = perSqft.hi * (painted ? paintedMult.hi : 1);
    const lo = Math.round((sqft * loRate) / 10) * 10;
    const hi = Math.round((sqft * hiRate) / 10) * 10;

    const secondary: { label: string; value: string }[] = [
      { label: 'Per sq ft rate', value: `${money(loRate)} – ${money(hiRate)} (scrape + skim + masking)` },
      { label: 'For comparison, 800 sq ft', value: `${money(Math.round(800 * loRate / 10) * 10)} – ${money(Math.round(800 * hiRate / 10) * 10)}` },
      { label: 'If repainting after', value: 'Bill paint separately — see the painting calculator; fresh bare drywall drinks primer' },
    ];

    const verdictText = painted
      ? 'Painted texture is the 1.5–2× case: paint seals the texture so it must be wet-scraped harder and usually re-skimmed. Get the per-sqft rate and the skim-coat scope in writing before work starts.'
      : (p.copy as Record<string, string>).info;

    return {
      primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)} for ${sqft.toLocaleString()} sq ft` },
      secondary,
      verdict: { level: 'warn', text: `Pre-1980 home? Test for asbestos before anyone scrapes — a test runs $50–150 and positive results mean professional abatement ($5–15+/sq ft), not a scrape. ` + verdictText },
    };
  },
  explain: `
    <h3>How much does popcorn ceiling removal cost?</h3>
    <p>The consistent 2026 band is <b>$1.25–3.25 per square foot</b> for unpainted texture, scraped,
    skim-coated smooth, with masking and cleanup included — Angi's $1–3 removal range and CalcBuilt's
    $1.25–3.60 scrape-and-skim range overlap almost exactly there. A typical 800 sq ft ceiling lands at
    <b>$1,000–2,900</b>. Whole-home jobs in the 1,500–2,500 sq ft range are a four-figure project either way.</p>
    <h3>Why painted popcorn costs 1.5–2×</h3>
    <p>Paint glues the texture down. Unpainted popcorn softens with a sprayer and scrapes off in ribbons;
    painted texture needs heavier wet-scraping and usually a full skim coat to look flat again — that is
    the 1.5–2× multiplier (CalcBuilt). If a quote treats painted and unpainted identically, that is the
    corner being cut.</p>
    <h3>The asbestos rule (pre-1980 homes)</h3>
    <p>Popcorn texture applied before about 1980 can contain asbestos, and scraping launches it airborne.
    A lab test costs <b>$50–150</b> and takes a few days. Positive results change the job entirely:
    professional abatement runs <b>$5–15+ per sq ft</b> with containment and disposal protocols — a
    different quote, a different crew, and not a DIY situation. Test first; it is the cheapest line item
    on the whole project.</p>
    <h3>What moves the number besides texture</h3>
    <p>Ceiling height (vaulted or above-normal walls add staging time), furniture masking, whether you
    want a level-5 skim or a light texture re-spray, and local labor rates. Debris adds up too — a
    scraped ceiling fills a 10–20 yard box fast, so price the haul alongside the scrape with the
    dumpster rental calculator.</p>
    <table>
      <thead><tr><th>Job</th><th>Typical US range (2026)</th></tr></thead>
      <tbody>
        <tr><td>Unpainted texture, per sq ft</td><td>$1.25 – $3.25</td></tr>
        <tr><td>Painted texture, per sq ft</td><td>$1.90 – $6.50 (×1.5–2)</td></tr>
        <tr><td>800 sq ft ceiling, unpainted</td><td>$1,000 – $2,600</td></tr>
        <tr><td>Asbestos test</td><td>$50 – $150</td></tr>
        <tr><td>Abatement if positive</td><td>$5 – $15+ / sq ft</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does popcorn ceiling removal cost per square foot?', a: 'In 2026 US data: $1.25–3.25 per sq ft for unpainted texture with scraping, skim coat and masking included (Angi and CalcBuilt ranges overlap there). Painted texture runs 1.5–2× more because it must be wet-scraped harder and re-skimmed.' },
    { q: 'How much does it cost to remove a popcorn ceiling from an 800 sq ft room?', a: 'Roughly $1,000–2,900 for unpainted texture (CalcBuilt example lands right there; the $1.25–3.25/sq ft band gives $1,000–2,600). Painted texture on the same area runs about $1,500–5,200.' },
    { q: 'Do I need an asbestos test before removing popcorn ceiling?', a: 'If the texture was sprayed before about 1980, yes. A lab test costs $50–150; positive results mean professional abatement at $5–15+ per sq ft with containment, not a standard scrape. Never dry-scrape suspected material.' },
    { q: 'Is it cheaper to DIY popcorn ceiling removal?', a: 'For unpainted texture in a small room, DIY scraping is genuinely doable — sprayer, scraper, drop cloths and patience. The costs that surprise people are skim-coating to look flat, disposal volume, and the asbestos risk in older homes. Whole-home or painted jobs are where contractors earn the rate.' },
  ],
  related: ['dumpster-rental-cost-calculator', 'drywall-repair-cost-calculator', 'painting-estimate-calculator'],
} as RegisteredTool;
