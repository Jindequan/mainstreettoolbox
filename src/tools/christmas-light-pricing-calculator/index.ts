import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 基准来源见 docs/benchmarks-christmas-lights.md（2026-09-29，SERP 直接核查）。
// 只用 ≥2 一致来源的区间；供灯加价、takedown、timer、最低出车费无一致来源，不进计算（FAQ 提及）。
export default {
  slug: 'christmas-light-pricing-calculator',
  industry: 'lawn',
  name: 'Christmas Light Pricing Calculator',
  tagline: 'Per foot by story and complexity, plus tree wraps — quote it before the season books up. No signup.',
  title: 'Christmas Light Pricing Calculator — Free 2026 Cost per Foot Tool',
  description: 'Price a Christmas light installation in seconds: per linear foot by story and complexity, tree wrapping included — with fair 2026 US ranges. Free, no signup.',
  result: { label: 'Suggested quote' },
  fields: [
    {
      id: 'roofline', label: 'What kind of roofline?', kind: 'select', default: 'simple',
      options: [
        { value: 'simple', label: 'Single story, simple run' },
        { value: 'complex', label: 'Single story with peaks, or two story' },
        { value: 'hard', label: 'Two to three stories, difficult access' },
      ],
    },
    { id: 'feet', label: 'Linear feet of roofline', kind: 'number', default: 120, hint: 'typical single-story home: 100–150 ft' },
    { id: 'trees', label: 'Trees to wrap', kind: 'number', default: 0, hint: '0 if roofline only' },
    {
      id: 'treeSize', label: 'Tree size', kind: 'select', default: 'small',
      options: [
        { value: 'small', label: 'Small (up to ~15 ft)' },
        { value: 'large', label: 'Large (tall canopy)' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Suggested quote',
    copy: {
      info: '2026 US installers charge $2–6.50 per linear foot of roofline labor by story and complexity, and $50–1,200 per tree wrapped. Most finished jobs land between $219 and $673.',
    },
  },
  compute: (values, _rows, p) => {
    // 屋檐三档（Strandr 2026 分层 × christmaslights.io $2-6 带交叉）
    const roof: Record<string, { lo: number; hi: number }> = {
      simple: { lo: 2.0, hi: 3.5 },
      complex: { lo: 3.5, hi: 5.0 },
      hard: { lo: 4.0, hi: 6.5 },
    };
    // 树包（MyQuoteIQ/Nextdoor/Thumbtack 交叉；大树取 Thumbtack×christmaslights.io 交叉带）
    const tree: Record<string, { lo: number; hi: number }> = {
      small: { lo: 50, hi: 200 },
      large: { lo: 400, hi: 1200 },
    };

    const tier = roof[values.roofline] ?? roof.simple;
    const feet = clamp(num(values.feet), 20, 1000);
    const trees = clamp(Math.round(num(values.trees)), 0, 30);
    const perTree = tree[values.treeSize] ?? tree.small;

    const roofLo = tier.lo * feet;
    const roofHi = tier.hi * feet;
    const treeLo = trees * perTree.lo;
    const treeHi = trees * perTree.hi;
    const lo = roofLo + treeLo;
    const hi = roofHi + treeHi;

    const secondary = [
      { label: 'Roofline labor', value: `${money(tier.lo)}–${money(tier.hi)}/ft × ${feet} ft = ${money(roofLo)} – ${money(roofHi)}` },
      trees > 0 && { label: `Tree wrapping (${trees} ${values.treeSize === 'large' ? 'large' : 'small'})`, value: `${money(treeLo)} – ${money(treeHi)}` },
      { label: 'Typical job range', value: '$219 – $673 (2026 US average job)' },
    ].filter(Boolean) as { label: string; value: string }[];

    return {
      primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)} per job` },
      secondary,
      verdict: { level: 'info', text: (p.copy as Record<string, string>).info },
    };
  },
  explain: `
    <h3>How much should I charge per linear foot?</h3>
    <p>By story and complexity. A <b>simple single-story run goes for $2–3.50 per foot</b>; add peaks,
    a steep pitch or a second story and it's <b>$3.50–5</b>; difficult two-to-three-story work runs
    <b>$4–6.50 or more</b>. That's Strandr's 2026 installer breakdown, and it sits inside the $2–6 per
    foot band christmaslights.io reports for the national market. If <b>you supply the lights</b> rather
    than just labor, Ware Landscaping pegs the rate at $10+ per foot — the lights are the margin.</p>
    <h3>How do I price tree wrapping?</h3>
    <p>Two ways, and pick one before the season: <b>per tree</b> — $50–200 for a small tree, $400–1,200
    for a tall canopy (Thumbtack and MyQuoteIQ 2026 data; christmaslights.io puts big trees at $75–1,500) —
    or <b>per strand</b>: $25–35 per strand for trunk wraps and $30–50 for taller trees, per the
    ChristmasLightsHQ pro guide. Per-strand is easier to defend on odd-shaped trees; per-tree is faster to quote.</p>
    <h3>What do finished jobs usually total?</h3>
    <p>The average 2026 installation lands near <b>$432, with most jobs between $219 and $673</b>
    (christmaslights.io). MyQuoteIQ's calculator puts most homeowners at $300–900. If your quote for a
    normal single-story home is far below that band, you're underpricing the ladder time.</p>
    <h3>What else belongs in the quote?</h3>
    <p>Takedown in January, timer setup and mid-season maintenance visits are real costs — price them into
    the job or list them as line items, and put the policy in writing before the first install. There's no
    reliable national benchmark for these fees, so set them deliberately instead of absorbing them.
    Upsell context: HomeGuide pegs <b>permanent</b> holiday lighting at $20–40 per foot for clients who want
    a year-round system.</p>
    <table>
      <thead><tr><th>Quote model</th><th>Typical US range (2026)</th></tr></thead>
      <tbody>
        <tr><td>Roofline — single story, simple</td><td>$2.00 – $3.50 / ft</td></tr>
        <tr><td>Roofline — peaks or two story</td><td>$3.50 – $5.00 / ft</td></tr>
        <tr><td>Roofline — 2–3 stories, difficult</td><td>$4.00 – $6.50 / ft</td></tr>
        <tr><td>Tree wrap — small</td><td>$50 – $200 per tree</td></tr>
        <tr><td>Tree wrap — large</td><td>$400 – $1,200 per tree</td></tr>
        <tr><td>Typical finished job</td><td>$219 – $673</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does Christmas light installation cost per foot?', a: 'Labor-only installation runs $2–6.50 per linear foot in 2026: $2–3.50 for a simple single-story run, $3.50–5 with peaks or on a two-story, and $4–6.50 for difficult multi-story work (Strandr breakdown, inside the $2–6 band christmaslights.io reports). Installers who supply the lights charge $10+/ft (Ware Landscaping).' },
    { q: 'How much should I charge to wrap a tree with lights?', a: 'About $50–200 for a small tree and $400–1,200 for a large one (Thumbtack and MyQuoteIQ 2026 data; christmaslights.io puts big trees at $75–1,500). Many pros quote trunks by the strand instead: $25–50 per strand (ChristmasLightsHQ).' },
    { q: 'What is the average price for professional Christmas light installation?', a: 'Roughly $432 on average, with most jobs between $219 and $673 (christmaslights.io 2026). MyQuoteIQ lands most homeowners at $300–900 for a typical display.' },
    { q: 'Should I charge extra for takedown and timers?', a: 'Yes — decide the policy before you quote. Takedown in spring, timer setup and mid-season bulb swaps are real costs with no reliable national benchmark; build them into the job price or list them as add-on line items in writing. For clients who re-enlist every year, a seasonal contract with both visits included is the cleaner model.' },
  ],
  related: ['snow-removal-pricing-calculator', 'leaf-removal-cost-calculator', 'contractor-hourly-rate-calculator'],
} as RegisteredTool;
