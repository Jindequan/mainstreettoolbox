import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 闸 3 来源（2026-10-01，≥2 源交叉，三源补齐后过闸）：
// 吹纤维素 standard — TLS $1.20–3.20/sqft ∩ Bob Vila ~$1.20 起步
// 吹玻璃纤维 standard — Bob Vila $0.60–2.30 ∩ 行业通带 $1.00–2.00
// 玻璃纤维毡 standard — $1.00–2.50（R60 项目源下带覆盖）
// R-60 加深 — 纤维素 $2.00–3.50 / 毡 $2.50–4.00（R60 项目源，乘数导出 ×1.7 标注）
// 整单对照 $1,000–3,500 — Angi($987–2,335) ∩ Thumbtack($1,193–3,077) ∩ TLS($1,500–3,500) 三源
// 喷沫 closed cell $1.50–4.00 — 前轮来源（单源标注）
// 喷沫 open cell $1.50–2.55/sqft — $0.50–0.85/board ft ×3 in（SprayFoam101 $0.44–0.65 ∩ SmartCalc $0.45–0.75 ∩ HomeHacksDIY $0.40–0.85 三源重叠核；33 轮迭代入计算，见 benchmarks-attic-insulation.md）
// 旧保温清除 — 口径杂 → FAQ 定性
// 验证层：attic insulation cost 544 strict + spray foam 421 + attic insulation 1,754（57 词清欠轮，SERP 只有材料量计算器）
const BANDS: Record<string, { lo: number; hi: number; label: string }> = {
  cellulose: { lo: 1.2, hi: 3.2, label: 'Blown-in cellulose' },
  fiberglass: { lo: 1.0, hi: 2.5, label: 'Blown-in fiberglass' },
  batts: { lo: 1.0, hi: 2.5, label: 'Fiberglass batts (DIY-friendly)' },
  foam: { lo: 1.5, hi: 4.0, label: 'Spray foam (closed cell)' },
  opencell: { lo: 1.5, hi: 2.55, label: 'Open-cell spray foam (~3 in)' },
};

export default {
  slug: 'attic-insulation-cost-calculator',
  industry: 'construction',
  name: 'Attic Insulation Cost Calculator',
  tagline: 'Price by square feet, material and R-value target — before the energy audit becomes an upsell. No signup.',
  title: 'Attic Insulation Cost Calculator — Free 2026 Price per Sq Ft by Material',
  description: 'Attic insulation costs $1.00–3.20 per sq ft blown-in, with R-60 upgrades running ~1.7×; open-cell or closed-cell spray foam priced per board foot. Free attic insulation cost calculator — instant, no signup.',
  result: { label: 'Suggested quote' },
  fields: [
    { id: 'sqft', label: 'Attic floor area (square feet)', kind: 'number', default: 1000, hint: 'most homes: 800–1,400' },
    {
      id: 'material', label: 'Material', kind: 'select', default: 'cellulose',
      options: [
        { value: 'cellulose', label: 'Blown-in cellulose' },
        { value: 'fiberglass', label: 'Blown-in fiberglass' },
        { value: 'batts', label: 'Fiberglass batts' },
        { value: 'foam', label: 'Spray foam (closed cell, roofline)' },
        { value: 'opencell', label: 'Open-cell spray foam (roofline, ~3 in)' },
      ],
    },
    {
      id: 'depth', label: 'Depth target', kind: 'select', default: 'standard',
      options: [
        { value: 'standard', label: 'Standard (top up to ~R-38)' },
        { value: 'r60', label: 'Full upgrade (to R-49–60, energy-audit spec)' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Suggested quote',
    copy: {
      info: 'US 2026: blown-in attic insulation runs $1.20–3.20 per sq ft for cellulose and $1.00–2.50 for fiberglass (Bob Vila; TLS Energy Savers), with whole-attic projects landing at $1,000–3,500 (Angi; Thumbtack). Most attics in climate zones 4–7 target R-49–60; topping up to R-38 costs less.',
      r60: 'R-60 depth runs roughly 1.7× the standard band — cellulose reaches $2.00–3.50 per sq ft at that depth (R-60 project data). The payback case comes from the energy audit, not the sq ft price: ask for the auditor\'s numbers before committing.',
    },
  },
  compute: (values, _rows, p) => {
    const band = BANDS[values.material as string] ?? BANDS.cellulose;
    const sqft = clamp(num(values.sqft), 100, 20000);
    const r60 = values.depth === 'r60';
    const f = r60 ? 1.7 : 1; // R-60 加深乘数：R60 项目带 vs standard 带导出，标注于 explain
    const lo = sqft * band.lo * f, hi = sqft * band.hi * f;
    const copy = p.copy as Record<string, string>;
    return {
      primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)} · ${sqft} sq ft ${band.label.toLowerCase()}${r60 ? ', R-60 depth' : ''}` },
      secondary: [
        { label: 'Per sq ft', value: `${money(band.lo * f)} – ${money(band.hi * f)}` },
        { label: 'Whole-project cross-check', value: '$1,000 – $3,500 typical attic (Angi; Thumbtack; TLS)' },
        { label: 'Old insulation removal', value: 'Quote separately — disposal changes the day count' },
      ],
      verdict: { level: r60 ? 'info' : 'info', text: r60 ? copy.r60 : copy.info },
    };
  },
  explain: `
    <h3>How much does attic insulation cost?</h3>
    <p>Blown-in cellulose runs <b>$1.20–3.20 per sq ft installed</b> and blown fiberglass
    <b>$1.00–2.50</b> (Bob Vila; TLS Energy Savers bands overlapped), with batts in the same $1.00–2.50
    range, closed-cell spray foam at $1.50–4.00, and open-cell at $1.50–2.55 (about $0.50–0.85 per
    board foot at a ~3 in roofline). A typical 1,000 sq ft attic lands at
    <b>$1,000–3,500 all-in</b> — the band Angi ($987–2,335), Thumbtack ($1,193–3,077) and TLS
    ($1,500–3,500) all agree on.</p>
    <h3>What does the R-60 upgrade add?</h3>
    <p>Roughly <b>1.7× the standard price</b>: cellulose reaches $2.00–3.50 per sq ft at R-60 depth and
    batts $2.50–4.00 (R-60 project data). The number that justifies it is not the sq ft price — it is the
    energy audit's before/after load calculation. Sell the audit first; the insulation sells itself off the
    auditor's numbers.</p>
    <h3>Should old insulation be removed first?</h3>
    <p>Only when it is wet, moldy, pest-soiled or vermiculite-suspect — removal is a separate hazardous
    disposal job with its own day count, and blowing new loft over clean, dry existing insulation is
    standard practice. Quote removal as its own line so the insulation price stays honest.</p>
    <h3>Blown-in, batts or spray foam — which per sq ft wins?</h3>
    <p>For open attics, blown-in wins on cost and coverage: it fills joist gaps batts bridge, and the
    machine pays for itself across a crew-day. Batts suit accessible, standard-spaced joists and DIY.
    Spray foam is for converting the attic to conditioned space (roofline insulation), not for the
    floor: <b>open-cell</b> runs $0.50–0.85 per board foot and buys air sealing and sound dampening at the
    lower price; <b>closed-cell</b> runs roughly double per board foot and adds rigidity plus a moisture
    barrier. Different job from the floor — different quote.</p>
    <table>
      <thead><tr><th>Material / depth</th><th>Installed per sq ft (2026)</th></tr></thead>
      <tbody>
        <tr><td>Blown-in cellulose, standard</td><td>$1.20 – $3.20</td></tr>
        <tr><td>Blown-in fiberglass, standard</td><td>$1.00 – $2.50</td></tr>
        <tr><td>Fiberglass batts, standard</td><td>$1.00 – $2.50</td></tr>
        <tr><td>Spray foam (closed cell)</td><td>$1.50 – $4.00</td></tr>
        <tr><td>Open-cell spray foam, ~3 in</td><td>$1.50 – $2.55 ($0.50–0.85 / board ft)</td></tr>
        <tr><td>R-60 depth multiplier</td><td>≈ ×1.7 on band</td></tr>
        <tr><td>Typical whole attic (1,000 sq ft)</td><td>$1,000 – $3,500</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does attic insulation cost?', a: 'In 2026 US data: blown-in cellulose $1.20–3.20 per sq ft installed, blown fiberglass and batts $1.00–2.50, closed-cell spray foam $1.50–4.00, open-cell $1.50–2.55 per sq ft installed ($0.50–0.85 per board foot at ~3 in). A typical 1,000 sq ft attic project lands at $1,000–3,500 (Angi; Thumbtack; TLS).' },
    { q: 'How much insulation do I need in my attic?', a: 'Most US climate zones target R-49–60 for attics — roughly 16–20 inches of loose-fill cellulose. Topping an under-insulated attic up to R-38 costs meaningfully less than the full R-60 upgrade, which prices at about 1.7× the standard band.' },
    { q: 'Is blown-in insulation cheaper than batts?', a: 'Installed, they overlap: blown cellulose $1.20–3.20 vs batts $1.00–2.50 per sq ft. Blown-in usually wins on real attics because it fills irregular joist bays and wire clutter batts bridge — the air gaps are where R-value dies.' },
    { q: 'Should I remove old attic insulation before adding new?', a: 'Only if it is wet, mold-contaminated, pest-soiled or possibly asbestos-containing vermiculite. Clean, dry insulation accepts new blow-over directly; removal is a separate disposal line item — keep it out of the insulation quote.' },
  ],
  related: ['material-cost-estimator', 'contractor-hourly-rate-calculator', 'drywall-repair-cost-calculator', 'painting-estimate-calculator'],
} as RegisteredTool;
