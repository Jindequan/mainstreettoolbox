import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 闸 3 来源（2026-09-19 重验，每档 ≥2 源）：
// 一层 $0.95–1.75/lf — Angi; CrewNest($1.00–1.50); HomeGuide($0.75–2.00) 覆盖
// 二层 $1.00–2.50/lf — Angi; CrewNest($1.50–2.25); MyQuoteIQ($1.25–1.85)
// 三层 $2.25–3.50/lf — CrewNest; CleanProGutterCleaning($1.40–3.45) 覆盖
// 整单对照 $100–320 — HomeGuide($100–275); Modernize($128–320)
// 典型住宅 gutter 150–200 lf — HomeGuide; Angi
// 频率：无 guards ≥2 次/年（Leafguard），有 guards 约 1 次/年（K-Guard; Clemens）——行为事实，非定价
export default {
  slug: 'gutter-cleaning-price-calculator',
  industry: 'cleaning',
  name: 'Gutter Cleaning Price Calculator',
  tagline: 'Per-linear-foot pricing by story. No signup.',
  title: 'Gutter Cleaning Cost Calculator — Free Price per Linear Foot Tool',
  description: 'Gutter cleaning cost calculator: price by linear feet and story height — one-story $0.95–1.75/ft, two-story $1.00–2.50/ft — with yearly plan spend and gutter-guard guidance. Free, instant, no signup.',
  result: { label: 'Quote per cleaning' },
  fields: [
    { id: 'feet', label: 'Gutter length (linear feet)', kind: 'number', default: 175, hint: 'most homes: 150–200 ft' },
    {
      id: 'story', label: 'Stories', kind: 'select', default: '1',
      options: [
        { value: '1', label: 'One story' },
        { value: '2', label: 'Two stories' },
        { value: '3', label: 'Three or more' },
      ],
    },
    {
      id: 'cleans', label: 'Cleanings per year', kind: 'select', default: '2',
      options: [
        { value: '1', label: 'Once a year (typical with gutter guards)' },
        { value: '2', label: 'Twice a year (standard, no guards)' },
        { value: '4', label: 'Quarterly (heavy tree cover)' },
      ],
    },
  ],
  params: {
    primaryLabel: 'Quote per cleaning',
    copy: {
      info: 'US gutter cleaning runs $0.95–1.75 per linear foot one-story and $1.00–2.50 two-story (Angi; CrewNest), with typical homes carrying 150–200 ft. Gutter guards cut cleanings from twice a year to about once — they don\'t eliminate them.',
    },
  },
  compute: (values, _rows, p) => {
    const feet = clamp(num(values.feet), 10, 2000);
    // 楼层带 [$ low, $ high] 与中值 —— 见文件头闸 3 来源
    const bands: Record<string, [number, number]> = { '1': [0.95, 1.75], '2': [1.0, 2.5], '3': [2.25, 3.5] };
    const [low, high] = bands[values.story] ?? bands['1'];
    const mid = (low + high) / 2;
    const cleans = clamp(num(values.cleans) || 2, 1, 6);
    const quote = feet * mid;
    const yearly = quote * cleans;
    return {
      primary: { label: p.primaryLabel as string, value: money(quote) },
      secondary: [
        { label: 'Market range', value: `${money(feet * low)} – ${money(feet * high)}` },
        { label: `Yearly spend (${cleans} clean${cleans > 1 ? 's' : ''})`, value: money(yearly) },
      ],
      verdict: { level: 'info', text: (p.copy as Record<string, string>).info },
    };
  },
  explain: `
    <p>Gutter cleaners price by the <b>linear foot</b>, adjusted for height: <b>$0.95–1.75 per foot</b> on a
    one-story home, <b>$1.00–2.50</b> two-story, <b>$2.25–3.50</b> three-story (Angi; CrewNest; CleanPro).
    Most homes have <b>150–200 feet</b> of gutter, which is why typical whole-house jobs land between
    <b>$100–320</b> (HomeGuide; Modernize).</p>
    <p>Height is the price driver because it changes the equipment and the safety work: a two-story clean
    needs ladder extensions or a platform at every section, and three-story work is a different insurance
    tier entirely. Quote the height honestly — it's the first thing a competitor will undercut with an
    unsafe setup.</p>
    <p><b>Frequency</b> is standard twice a year (spring and fall) without guards (Leafguard). Heavy tree
    cover pushes it to quarterly. Sell it as a plan: two scheduled visits beat two one-offs for both sides —
    the customer's gutters never hit the clog stage, and your route fills.</p>
    <p><b>Gutter guards don't end the work.</b> Guards block leaves but shingle grit, seeds and pollen still
    wash through, and debris piles on top of the guard itself — so guarded homes drop from two cleanings a
    year to about one (K-Guard; All Day Power Washing). Guards themselves run <b>$500–5,000</b> installed
    (Downspout Services). If a customer has guards, price the lighter annual clean, not a full de-clog.</p>
    <table>
      <thead><tr><th>Story height</th><th>2026 US rate per linear foot</th></tr></thead>
      <tbody>
        <tr><td>One story</td><td>$0.95–1.75</td></tr>
        <tr><td>Two stories</td><td>$1.00–2.50</td></tr>
        <tr><td>Three or more</td><td>$2.25–3.50</td></tr>
        <tr><td>Typical whole job (150–200 ft)</td><td>$100–320</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does gutter cleaning cost in 2026?', a: 'By the linear foot: $0.95–1.75 one-story, $1.00–2.50 two-story, $2.25–3.50 three-story (Angi; CrewNest). A typical home with 150–200 feet of gutter lands $100–320 per cleaning (HomeGuide; Modernize).' },
    { q: 'Do gutter guards eliminate the need for cleaning?', a: 'No — they cut it roughly in half. Guards block leaves, but shingle grit, seeds and pollen still wash into the gutter, and debris piles on top of the guards themselves. Guarded homes need about one cleaning a year instead of two (K-Guard; All Day Power Washing).' },
    { q: 'How often should gutters be cleaned?', a: 'At least twice a year — spring and fall — without guards (Leafguard). Homes under heavy tree cover do better on a quarterly plan. With quality guards, once a year usually covers it.' },
    { q: 'Why do two-story gutters cost more to clean?', a: 'Height drives equipment, time and insurance: extensions or platforms on every section, slower ladder work, and a higher risk tier for the crew. That\'s why the per-foot rate roughly doubles from one story to three.' },
  ],
  related: ['cleaning-estimate-calculator', 'pressure-washing-price-calculator', 'window-cleaning-price-calculator'],
} as RegisteredTool;
