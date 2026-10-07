import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 基准来源见 docs/benchmarks-tree-removal.md（2026-09-30，LawnStarter/Lawn Love/HomeGuide/TreeCostEstimator 交叉，每档 ≥2 源）。
// 验证层：Bing WMT API "tree removal cost" 996 strict/90d（R6 批验 36 族最强）。
// emergency 乘数、accessibility +50%、crane/permit 单源或口径混 → 只进 verdict/explain 定性。
const BANDS: Record<string, { lo: number; hi: number; label: string }> = {
  small: { lo: 200, hi: 500, label: 'Under 30 ft' },
  medium: { lo: 450, hi: 1200, label: '30–60 ft' },
  large: { lo: 850, hi: 1600, label: '60–80 ft' },
  verytall: { lo: 1500, hi: 4000, label: 'Over 80 ft' },
};
const FALLEN = { lo: 85, hi: 300 }; // 倒伏树平价带（LS/LL 双源），比立树便宜
const STUMP = { grind: { lo: 150, hi: 450 }, remove: { lo: 175, hi: 525 } };
const MID_HEIGHT: Record<string, number> = { small: 15, medium: 45, large: 70, verytall: 90 }; // 每档中位高，per-foot 交叉核查用

export default {
  slug: 'tree-removal-cost-calculator',
  industry: 'lawn',
  name: 'Tree Removal Cost Calculator',
  tagline: 'Price by height, situation and stump work before the crew rolls. No signup.',
  title: 'Tree Removal Cost Calculator — Free 2026 Pricing by Tree Size',
  description: 'Price tree removal in seconds: $200–500 under 30 ft up to $1,500–4,000 over 80 ft, with fallen-tree and stump add-ons plus per-acre land clearing ($850–6,000). Free 2026 US ranges, instant, no signup.',
  result: { label: 'Suggested quote' },
  fields: [
    {
      id: 'size', label: 'Tree height', kind: 'select', default: 'medium',
      options: [
        { value: 'small', label: 'Under 30 ft (small ornamentals, young maples)' },
        { value: 'medium', label: '30–60 ft (most yard trees)' },
        { value: 'large', label: '60–80 ft (mature oaks, pines)' },
        { value: 'verytall', label: 'Over 80 ft (very large, crane territory)' },
      ],
    },
    { id: 'count', label: 'How many trees', kind: 'number', default: 1 },
    {
      id: 'situation', label: 'Situation', kind: 'select', default: 'standing',
      options: [
        { value: 'standing', label: 'Standing, normal access' },
        { value: 'fallen', label: 'Already fallen (ground work)' },
        { value: 'emergency', label: 'Emergency / storm (urgent, hazardous)' },
      ],
    },
    {
      id: 'stump', label: 'Stump work', kind: 'select', default: 'none',
      options: [
        { value: 'none', label: 'No stump work' },
        { value: 'grind', label: 'Grind the stump' },
        { value: 'remove', label: 'Full stump removal (roots out)' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Suggested quote',
    copy: {
      info: '2026 US: a typical single-tree removal runs $385–1,070, averaged $630–850, or $10–14.50 per foot of height. Price by height band below, then add stump work — it always bills separately.',
      fallen: 'Fallen trees are ground work, not climbing work: $85–300 per tree across sources — well under the standing band. Quote it fast; the customer often has a deadline (city pickup rules, blocked driveway).',
      emergency: 'Emergency/storm removal runs $450–3,000 per job (Lawn Love) — call it 1.5–2.5× the standing band and say so on the phone. Insurance may cover part; offer the paperwork, not a discount.',
    },
  },
  compute: (values, _rows, p) => {
    const band = BANDS[values.size as string] ?? BANDS.medium;
    const count = clamp(num(values.count) || 1, 1, 50);
    const situation = values.situation as string;
    const copy = p.copy as Record<string, string>;

    let lo = band.lo, hi = band.hi, per = '';
    if (situation === 'fallen') {
      lo = FALLEN.lo; hi = FALLEN.hi;
      per = `${band.label} fallen tree`;
      if (band === BANDS.large || band === BANDS.verytall) {
        lo = band.lo * 0.5; hi = band.hi * 0.5; // 大型倒伏按带内折半估，口径在 explain 说明
        per = `${band.label} fallen tree (large debris load)`;
      }
    } else if (situation === 'emergency') {
      lo = band.lo * 1.5; hi = band.hi * 2.5;
      per = `${band.label} emergency removal`;
    } else {
      per = `${band.label} tree`;
    }

    const stump = values.stump as string;
    const add = stump === 'grind' ? STUMP.grind : stump === 'remove' ? STUMP.remove : null;
    const jobLo = count * (lo + (add?.lo ?? 0));
    const jobHi = count * (hi + (add?.hi ?? 0));

    const h = MID_HEIGHT[values.size as string] ?? 45;
    const secondary = [
      add && { label: `Stump ${stump === 'grind' ? 'grinding' : 'removal'} add-on`, value: `${money(add.lo)} – ${money(add.hi)} per stump` },
      situation !== 'standing' && { label: 'Standing equivalent', value: `${money(count * band.lo)} – ${money(count * band.hi)} (compare before promising a discount)` },
      count > 1 && { label: 'Per tree', value: `${money(lo + (add?.lo ?? 0))} – ${money(hi + (add?.hi ?? 0))}` },
      { label: 'Per-foot cross-check', value: `${money(10 * h)} – ${money(14.5 * h)} at ${h} ft ($10–14.50/ft band)` },
      { label: 'Per-acre land clearing', value: '$850 – $6,000' },
    ].filter(Boolean) as { label: string; value: string }[];

    return {
      primary: { label: p.primaryLabel as string, value: `${money(jobLo)} – ${money(jobHi)} · ${count} × ${per}` },
      secondary,
      verdict: {
        level: situation === 'emergency' ? 'warn' : 'info',
        text: situation === 'fallen' ? copy.fallen : situation === 'emergency' ? copy.emergency : copy.info,
      },
    };
  },
  explain: `
    <h3>How much does tree removal cost in 2026?</h3>
    <p><b>By height, per tree:</b> under 30 ft runs $200–500, 30–60 ft runs $450–1,200, 60–80 ft runs
    $850–1,600, and over 80 ft starts around $1,500 and clears $4,000 for crane-assisted jobs
    (HomeGuide, Lawn Love and TreeCostEstimator bands overlapped). Across all sizes the typical
    single-tree invoice lands at <b>$385–1,070</b> — the one band LawnStarter and Lawn Love publish
    identically — with national averages of $630–850.</p>
    <h3>What drives the price up?</h3>
    <p>Height is the biggest lever ($10–14.50 per foot is the two-source rate band), and access is the
    second: proximity to houses or power lines can add <b>up to 50%</b> (LawnStarter) because it forces
    rigging and sectional dismantling instead of a straight fell. Thick trunks, dead-but-standing
    stability issues and long travel distances all move the number inside the band.</p>
    <h3>Do you charge extra for the stump?</h3>
    <p>Always bill it separately — tree removal quotes exclude stump work by default. <b>Grinding runs
    $150–450 per stump</b> (LawnStarter's $158–450 band), while <b>full removal with the roots costs
    $175–525</b> (LawnStarter averages $326; Lawn Love agrees at $180–525). Grinding is the standard
    upsell; full removal is for replanting sites and fence lines.</p>
    <h3>How do fallen and emergency jobs price differently?</h3>
    <p>Two opposite directions. A tree that's <b>already down costs $85–300</b> (LawnStarter; Lawn Love)
    — no climbing, no rigging, just cut and haul — which is why storm-season ground cleanup is the
    easiest yes in the trade. <b>Emergency removal runs $450–3,000 per job</b> (Lawn Love), roughly
    1.5–2.5× the standing band: after-hours crews, hazard exposure and insurance paperwork. Quote it
    high and document it; the insurer is often the real payer.</p>
    <h3>What about clearing a whole lot?</h3>
    <p>Bulk land clearing runs <b>$850–6,000 per acre</b> (LawnStarter and Lawn Love band), driven by
    tree density and size. For multi-tree jobs, quote per-tree bands stacked with a density discount —
    the second tree on site is always cheaper than the first because the setup is paid for.</p>
    <h3>How do you estimate a job step by step?</h3>
    <p>Worked example — a 65-ft oak with one stump to grind: start with the 60–80 ft band
    (<b>$850–1,600</b>), add grinding (<b>$150–450</b>), and quote <b>$1,000–2,050</b> all-in.
    Cross-check by foot: 65 ft × the $10–14.50 band = <b>$650–942</b> of tree work. When the two
    methods disagree, the difference is access — drops over structures, wires, tight backyards are
    what push a quote to the top of its band or past it (up to +50%, LawnStarter).</p>
    <table>
      <thead><tr><th>Job</th><th>Typical US range (2026)</th></tr></thead>
      <tbody>
        <tr><td>Under 30 ft</td><td>$200 – $500</td></tr>
        <tr><td>30–60 ft</td><td>$450 – $1,200</td></tr>
        <tr><td>60–80 ft</td><td>$850 – $1,600</td></tr>
        <tr><td>Over 80 ft</td><td>$1,500 – $4,000+</td></tr>
        <tr><td>Already fallen</td><td>$85 – $300</td></tr>
        <tr><td>Emergency / storm</td><td>$450 – $3,000</td></tr>
        <tr><td>Stump grinding add-on</td><td>$150 – $450</td></tr>
        <tr><td>Full stump removal</td><td>$175 – $525</td></tr>
        <tr><td>Land clearing per acre</td><td>$850 – $6,000</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does tree removal cost?', a: 'In 2026 US data: $200–500 for trees under 30 ft, $450–1,200 for 30–60 ft, $850–1,600 for 60–80 ft and $1,500–4,000+ over 80 ft (HomeGuide, Lawn Love, TreeCostEstimator bands). A typical single tree lands at $385–1,070, about $10–14.50 per foot of height.' },
    { q: 'Do tree services charge by the tree or by height?', a: 'By the tree, with height setting the band — the $10–14.50 per foot rate is how crews sanity-check the quote, not how they invoice. Multi-tree jobs get a density discount because setup is shared; per-acre land clearing runs $850–6,000.' },
    { q: 'How do you calculate tree removal cost per foot?', a: 'Multiply height by the $10–14.50 per foot band (two sources): a 65-ft tree checks out at $650–942 of tree work before stump add-ons. Per-foot is the sanity check, not the invoice — real quotes price by height band, and access difficulty (up to +50% near structures or power lines) is the swing factor.' },
    { q: 'How much extra is stump grinding?', a: '$150–450 per stump for grinding (LawnStarter: $158–450) and $175–525 for full root removal (LawnStarter averages $326). It always bills separately from tree removal — quote it as its own line.' },
    { q: 'Why is emergency tree removal more expensive?', a: 'Emergency work runs $450–3,000 per job (Lawn Love) — roughly 1.5–2.5× the standing band — because of after-hours crew calls, hazard exposure near power lines or structures, and insurance documentation. By contrast, a tree that already fell costs just $85–300 since there is no climbing or rigging.' },
  ],
  related: ['leaf-removal-cost-calculator', 'lawn-care-estimate-generator', 'dumpster-rental-cost-calculator'],
} as RegisteredTool;
