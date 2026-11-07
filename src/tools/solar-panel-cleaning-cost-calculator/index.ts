import type { RegisteredTool } from '../../lib/types';
import { money } from '../../lib/types';

// 基准来源见 docs/benchmarks-solar-panel-cleaning.md（2026-11-07 立项闸 3，HomeGuide/SolarReviews/
// SolarCleanHub/Yelp/Thumbtack/r-solar 实务例，全部区间 ≥2 源）。
// 口径陷阱（本工具立足点）：聚合源在「每块面板」vs「每次上门」之间摇摆——模型固定为每块清洗价 × 面板数，
// 钳位 $150 上门最低收费；access=hard 时整单钳位进 SolarCleanHub $500–1,000 高难带。
// 子带拆分（light/typical/heavy）是 HomeGuide $10–20 带内的建模拆分，非新数字。
export default {
  slug: 'solar-panel-cleaning-cost-calculator',
  industry: 'cleaning',
  name: 'Solar Panel Cleaning Cost Calculator',
  tagline: 'The quote range for your array in 10 seconds — by panel count, soiling and roof access. No signup.',
  title: 'Solar Panel Cleaning Cost Calculator — Free 2026 Pricing',
  description:
    'How much does solar panel cleaning cost? $10–20 per panel, $150–500 per visit — instant 2026 band by system size and soiling. Free, no signup.',
  result: { label: 'Fair quote range' },
  fields: [
    {
      id: 'systemSize', label: 'System size', kind: 'select', default: 'medium',
      options: [
        { value: 'small', label: 'Small — 10–15 panels' },
        { value: 'medium', label: 'Medium — 16–25 panels (most homes)' },
        { value: 'large', label: 'Large — 26–40 panels' },
      ],
    },
    {
      id: 'condition', label: 'How dirty are they?', kind: 'select', default: 'typical',
      options: [
        { value: 'light', label: 'Light dust — rain has kept up with it' },
        { value: 'typical', label: 'Typical residential soiling' },
        { value: 'heavy', label: 'Heavy — bird droppings, hard-water spots, construction dust' },
      ],
    },
    {
      id: 'access', label: 'Roof access', kind: 'select', default: 'easy',
      options: [
        { value: 'easy', label: 'Easy — single story or walkable pitch' },
        { value: 'hard', label: 'Hard — two-story, steep, or needs lift / safety gear' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Fair quote range',
    copy: {
      info: '2026 US pricing runs $10–20 per panel and $150–500 per typical residential visit (HomeGuide, with SolarReviews’ $5–15 large-system floor and SolarCleanHub’s $150–500 guide band overlapping). A medium 16–25 panel array lands $160–500 per wash.',
    },
  },
  compute: (values, _rows, p) => {
    const PER_PANEL: Record<string, { lo: number; hi: number }> = {
      light: { lo: 10, hi: 15 },   // HomeGuide $10–20 下半带：雨水接管得住的量
      typical: { lo: 10, hi: 20 }, // HomeGuide $10–20 全带
      heavy: { lo: 15, hi: 20 },   // 上半带：鸟粪/水垢/施工尘
    };
    const COUNTS: Record<string, { lo: number; hi: number }> = {
      small: { lo: 10, hi: 15 },
      medium: { lo: 16, hi: 25 },
      large: { lo: 26, hi: 40 },
    };
    const MIN_VISIT = 150;              // SolarCleanHub $150–500 带下沿 ∩ r/solar 从业者 $150 minimum
    const HARD_ACCESS = { lo: 500, hi: 1000 }; // SolarCleanHub 高难整单带

    const per = PER_PANEL[values.condition] ?? PER_PANEL.typical;
    const n = COUNTS[values.systemSize] ?? COUNTS.medium;
    const rawLo = per.lo * n.lo;
    const rawHi = per.hi * n.hi;
    let lo = Math.max(rawLo, MIN_VISIT);
    let hi = Math.max(rawHi, MIN_VISIT);
    const hard = values.access === 'hard';
    if (hard) {
      lo = Math.max(lo, HARD_ACCESS.lo);
      hi = Math.max(hi, HARD_ACCESS.hi);
    }

    const secondary: { label: string; value: string }[] = [
      { label: 'Per panel, installed clean', value: `${money(per.lo)} – ${money(per.hi)} (HomeGuide ∩ SolarReviews)` },
      { label: 'Visit minimum', value: `≈ ${money(MIN_VISIT)} — small arrays ride the floor (SolarCleanHub ∩ r/solar operator pricing)` },
    ];
    if (hard) {
      secondary.push({ label: 'Same array, easy access', value: `${money(rawLo)} – ${money(rawHi)} per visit` });
    } else {
      secondary.push({ label: 'Two-story / steep / dedicated crew', value: `${money(HARD_ACCESS.lo)} – ${money(HARD_ACCESS.hi)} per job (SolarCleanHub)` });
    }
    secondary.push({ label: 'Twice-yearly payback', value: 'restores up to 20% of lost output ≈ $150+/yr (HomeGuide)' });

    const verdictText = `Quotes inside ${money(lo)}–${money(hi)} are market rate — past that you should be hearing a reason (lift time, nesting, scale). Then check whether you need the wash at all: the largest field study (UC San Diego) found rain keeps most US arrays clean enough that professional cleaning rarely pays back — the payback cases are dusty or drought regions, coastal bird territory, or visible soiling. NREL’s global-average soiling loss is only ~3–4% a year, while heavy soiling can cost 20%+ of output — that’s the line a twice-yearly clean ($150+/yr recouped, HomeGuide) walks.`;

    return {
      primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)} per visit` },
      secondary,
      verdict: { level: 'info', text: verdictText },
    };
  },
  explain: `
    <h3>How much does solar panel cleaning cost?</h3>
    <p>The fair 2026 band is <b>$10–20 per panel</b> (HomeGuide, with SolarReviews’ <b>$5–15</b> as the
    large-system floor) and <b>$150–500 per visit</b> for a typical residential array (HomeGuide averages
    $325; SolarCleanHub’s 2026 guide quotes the same $150–500; Yelp’s flat-rate average is ~$200 and
    Thumbtack’s $142–310 with most people paying ~$209). Practitioner pricing on r/solar runs about
    $9/panel with a <b>$150 visit minimum</b> — small arrays ride that floor rather than the per-panel math.
    Jobs that need a lift, a steep pitch or a dedicated crew exit the band into <b>$500–1,000</b>
    (SolarCleanHub).</p>
    <h3>Is solar panel cleaning even worth it?</h3>
    <p>Honest answer: often no. The largest field study (UC San Diego) found rain keeps panels in most
    US climates clean enough that professional washing rarely pays for itself. NREL’s global-average
    soiling loss is only <b>~3–4% a year</b>. The payback cases are real though: dusty or drought
    regions, coastal bird droppings, construction dust, or visible caking — heavy soiling can cut output
    <b>20%+</b>, and HomeGuide’s twice-yearly cadence recoups roughly <b>$150+/yr</b> on a typical
    system. If none of those describe your roof, spend the $200 on something else.</p>
    <h3>Why do quotes vary so much?</h3>
    <p>Three things move the number, and none of them is a mystery: <b>system size</b> (larger arrays
    drop toward $5–10 per panel — the per-visit total grows while the per-panel rate shrinks),
    <b>access</b> (roof height and pitch decide whether a crew works from the ridge or rigs a lift —
    the difference between a $200 job and a $500–1,000 one), and <b>soiling</b> (bird nests under
    panels, hard-water scale and construction dust are scrubbing work, not a rinse). Regional labor
    scales the whole band — high-cost metros quote $10–25 per panel for the same work.</p>
    <h3>Can you clean solar panels yourself?</h3>
    <p>For a ground-mount or single-story array with a walkable pitch, yes: cool panels early in the
    morning, a garden hose with deionized or distilled water, and a soft brush or squeegee on an
    extension pole. Never pressure-wash or use abrasives — panel manufacturers commonly tie warranty
    coverage to it, and thermal shock on hot glass is real. If the array is two-story, steep, or you
    wouldn’t walk that roof for free, that <b>is</b> the $500–1,000 crew band, and the safe DIY answer
    is: don’t. Rain does most of the routine work anyway — most owners are buying an inspection with
    the wash, so ask for photos of mounts and seals while they’re up there.</p>
    <table>
      <thead><tr><th>Job</th><th>Typical US range (2026)</th></tr></thead>
      <tbody>
        <tr><td>Per panel, installed clean</td><td>$10 – $20</td></tr>
        <tr><td>Typical residential visit (16–25 panels)</td><td>$150 – $500</td></tr>
        <tr><td>Visit minimum (small arrays)</td><td>≈ $150</td></tr>
        <tr><td>Two-story / steep / dedicated crew</td><td>$500 – $1,000</td></tr>
        <tr><td>Large-system floor (per panel)</td><td>$5 – $15 (SolarReviews)</td></tr>
        <tr><td>Twice-yearly energy recoup</td><td>up to 20% of lost output ≈ $150+/yr</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does solar panel cleaning cost?', a: 'In 2026 US data: $10–20 per panel and $150–500 per visit for a typical residential array (HomeGuide averages $325; Yelp ~$200; Thumbtack ~$209). Most pros carry a ~$150 visit minimum, and hard-access jobs — two-story, steep, or lift work — run $500–1,000 (SolarCleanHub).' },
    { q: 'How often should solar panels be cleaned?', a: 'Where soiling is real, twice a year is the standard cadence — HomeGuide pegs the recoup at roughly $150+/yr on a typical system. In rainy climates the largest field study (UC San Diego) found rain keeps arrays clean enough that scheduled washing rarely pays back, so let rainfall and a visual check drive the calendar instead.' },
    { q: 'Is professional solar panel cleaning worth the money?', a: 'Only when soiling is real: dusty or drought regions, coastal bird droppings, construction dust, or visible caking that can cut output 20%+. NREL’s global-average soiling loss is just ~3–4% a year, and the UC San Diego study found rain handles most US roofs. A fair-price wash ($150–500) pays back roughly $150+/yr in those soiling cases; outside them it’s mostly a cosmetic spend.' },
    { q: 'Do two-story or steep roofs cost more to clean?', a: 'Yes — access is the biggest quote mover after system size. Jobs needing lift time, steep-pitch safety rigging or a dedicated crew run $500–1,000 per job (SolarCleanHub), versus $150–500 for an easy single-story array. That jump is labor and liability, not extra dirt.' },
  ],
  related: ['window-cleaning-price-calculator', 'gutter-cleaning-price-calculator', 'pressure-washing-price-calculator'],
} as RegisteredTool;
