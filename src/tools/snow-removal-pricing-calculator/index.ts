import type { RegisteredTool } from '../../lib/types';
import { clamp, money, num } from '../../lib/types';

// 基准来源见 docs/benchmarks-snow-removal.md（2026-09-13，10 来源交叉）。
// 只用 ≥2 一致来源的区间；坡度乘数与 per-inch 附加无一致来源，不进计算（FAQ 提及）。
export default {
  slug: 'snow-removal-pricing-calculator',
  industry: 'lawn',
  name: 'Snow Removal Pricing Calculator',
  tagline: 'Per push, per season or by the hour — price it before the flurries. No signup.',
  title: 'Snow Removal Pricing Calculator — Free 2026 Cost Tool',
  description: 'Price a snow removal job in seconds: per push by driveway size, a full-season contract, or hourly shoveling — with fair 2026 US ranges for each. Free, no signup.',
  result: { label: 'Suggested quote' },
  fields: [
    {
      id: 'mode', label: 'How do you charge?', kind: 'select', default: 'push',
      options: [
        { value: 'push', label: 'Per push (per visit)' },
        { value: 'seasonal', label: 'Seasonal contract' },
        { value: 'hourly', label: 'Hourly (one-offs, shoveling)' },
      ],
    },
    {
      id: 'size', label: 'Driveway size', kind: 'select', default: 'medium',
      options: [
        { value: 'small', label: 'Small (1–2 cars)' },
        { value: 'medium', label: 'Medium (2–3 cars)' },
        { value: 'large', label: 'Large (3+ cars or 150 ft+)' },
      ],
    },
    { id: 'hours', label: 'Hours on site', kind: 'number', default: 2, hint: 'hourly mode only' },
  ],
  params: {
    primaryLabel: 'Suggested quote',
    copy: {
      info: '2026 US residential plowing runs $30–75 per push by driveway size; full-season contracts $350–700; hourly shoveling $40–75. Quote a range and put the trigger depth in writing.',
    },
  },
  compute: (values, _rows, p) => {
    // 住宅 per-push 三档（Thumbtack/CrewNest/LawnLove/Jobber 交叉）
    const push: Record<string, { lo: number; hi: number }> = {
      small: { lo: 30, hi: 40 },
      medium: { lo: 40, hi: 60 },
      large: { lo: 55, hi: 75 },
    };
    // 整季住宅（InvoiceFly/Angi：$350-700；大坡车道上限另见 explain）
    const seasonal = { lo: 350, hi: 700 };
    // 时薪（TaskRabbit ~$41 均价 / Jobber / LawnLove 人行道 $25-75/hr）
    const hourRate = { lo: 40, hi: 75 };

    const size = push[values.size] ?? push.medium;
    const hours = clamp(num(values.hours), 0.5, 12);
    const mode = values.mode;

    let lo: number, hi: number, unit: string;
    if (mode === 'seasonal') { lo = seasonal.lo; hi = seasonal.hi; unit = 'per season'; }
    else if (mode === 'hourly') { lo = hours * hourRate.lo; hi = hours * hourRate.hi; unit = `for ${hours} hr${hours === 1 ? '' : 's'} on site`; }
    else { lo = size.lo; hi = size.hi; unit = 'per push'; }

    const others = [
      mode !== 'push' && { label: 'Per-push instead', value: `${money(size.lo)} – ${money(size.hi)} per push` },
      mode !== 'seasonal' && { label: 'Seasonal instead', value: `${money(seasonal.lo)} – ${money(seasonal.hi)} per season` },
      mode !== 'hourly' && { label: 'Hourly instead', value: `${money(hourRate.lo)} – ${money(hourRate.hi)} per hour` },
    ].filter(Boolean) as { label: string; value: string }[];

    return {
      primary: { label: p.primaryLabel as string, value: `${money(lo)} – ${money(hi)} ${unit}` },
      secondary: others,
      verdict: { level: 'info', text: (p.copy as Record<string, string>).info },
    };
  },
  explain: `
    <h3>How much should I charge per push?</h3>
    <p>By driveway size. A standard <b>1–2 car driveway runs $30–40 per push</b>; a 2–3 car driveway
    <b>$40–60</b>; and long or 3+ car driveways <b>$55–75 or more</b>. Thumbtack's 2026 estimates land a
    1–2 car driveway near $35 and a 150-footer near $60, which matches what operators report charging.</p>
    <h3>Per push, seasonal or hourly — which quote fits?</h3>
    <p>Per-push is the default for residential work: simple, and the client only pays when it snows.
    A <b>seasonal contract ($350–700 for a typical driveway)</b> trades a lower effective rate for guaranteed
    revenue — it pays for itself in a heavy winter and costs you in a light one. Hourly ($40–75) fits
    one-offs, shoveling and sidewalk work where you can't predict the job.</p>
    <h3>What separates a good snow contract from a bad one?</h3>
    <p>The trigger depth. "$X per push" means nothing until it says <b>per push, once accumulation passes
    1–2 inches</b> — otherwise you and the client will disagree about the dusting in November. Put the
    trigger, the turnaround window and what counts as a "push" (plow pass vs. full clear) in writing
    before the first flake.</p>
    <table>
      <thead><tr><th>Quote model</th><th>Typical US range (2026)</th></tr></thead>
      <tbody>
        <tr><td>Per push — small (1–2 cars)</td><td>$30 – $40</td></tr>
        <tr><td>Per push — medium (2–3 cars)</td><td>$40 – $60</td></tr>
        <tr><td>Per push — large (150 ft+)</td><td>$55 – $75+</td></tr>
        <tr><td>Seasonal contract</td><td>$350 – $700</td></tr>
        <tr><td>Hourly / shoveling</td><td>$40 – $75 / hr</td></tr>
      </tbody>
    </table>`,
  faq: [
    { q: 'How much does snow removal cost per push?', a: 'Across 2026 US data, $30–75 per push depending on driveway size: about $35 for a 1–2 car driveway (Thumbtack), $40–60 for 2–3 cars, and $60–75+ for 150-foot or larger drives.' },
    { q: 'How much is a full-season snow removal contract?', a: 'Typical residential seasonal contracts run $350–700 according to Angi and InvoiceFly 2026 data. Large or steep driveways can run far higher — LawnLove documents slopes exceeding $5,700 per season.' },
    { q: 'Should I charge extra per inch of snow?', a: 'Some operators add a per-inch fee for heavy storms — Angi reports add-ons of $10–30 per inch above the base. If you use one, keep it in the contract; many operators instead bill a heavy-storm push at 1.5× the normal rate. Either way, write it down.' },
    { q: 'What should I charge for hourly snow shoveling?', a: 'US hourly shoveling and sidewalk work runs $40–75; TaskRabbit puts the national average near $41/hour. Hourly fits one-offs — for repeat driveway work, per-push pricing is the norm.' },
  ],
  related: ['lawn-mowing-price-calculator', 'lawn-care-estimate-generator', 'mulch-calculator'],
} as RegisteredTool;
