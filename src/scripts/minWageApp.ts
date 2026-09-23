// minWageApp.ts — 2026 Minimum Wage Calculator by state.
// Pure front end: pick a state for its current rate, enter weekly hours,
// see weekly / monthly / annual pay and the gap to the federal floor.
import wageData from '../data/min-wage.json';

interface StateRow { rate: number; note: string; }
interface WageData { federal: number; year: number; states: Record<string, StateRow>; }
const DATA = wageData as WageData;

const DRAFT_KEY = 'mst_minwage_v1';

interface WageState { state: string; hours: number; }

function freshState(): WageState {
  let saved: Partial<WageState> = {};
  try {
    saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
  } catch { /* ignore */ }
  return {
    state: saved.state && DATA.states[saved.state] ? saved.state : 'California',
    hours: saved.hours ? Number(saved.hours) : 40,
  };
}

export function initMinWageApp(root: HTMLElement): void {
  const $ = <T extends Element>(sel: string) => root.querySelector<T>(sel)!;
  const state = freshState();

  const stateSelect = $('#stateSelect') as HTMLSelectElement;
  for (const name of Object.keys(DATA.states).sort()) {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    stateSelect.appendChild(opt);
  }
  stateSelect.value = state.state;

  const hoursInput = $('#hoursInput') as HTMLInputElement;
  hoursInput.value = String(state.hours);

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const week1 = 40;

  const render = () => {
    const row = DATA.states[state.state];
    const rate = row.rate;
    const federal = DATA.federal;
    const hours = Math.min(168, Math.max(0, Number(state.hours) || 0));

    const weekly = hours * rate;
    const annual = weekly * 52;
    const monthly = annual / 12;
    const federalAnnual = hours * federal * 52;
    const gapAnnual = annual - federalAnnual;
    const ftAnnual = week1 * rate * 52;

    $('#results').innerHTML = `
      <div class="rate-card">
        <p class="rate-big">$${fmt(rate)}<span>/hour</span></p>
        <p class="rate-lbl">${state.state} minimum wage, ${DATA.year}</p>
      </div>
      <div class="pay-grid">
        <div><p class="k">Weekly (${hours} hrs)</p><p class="v">$${fmt(weekly)}</p></div>
        <div><p class="k">Monthly (avg)</p><p class="v">$${fmt(monthly)}</p></div>
        <div><p class="k">Yearly</p><p class="v">$${fmt(annual)}</p></div>
      </div>
      <div class="extra">
        <p><span>Full-time salary at this minimum (40 hrs × 52)</span><b>$${fmt(ftAnnual)}</b></p>
        <p><span>Federal minimum for the same hours ($${fmt(federal)})</span><b>$${fmt(federalAnnual)}</b></p>
        <p class="hl"><span>${state.state} advantage over federal floor, per year</span><b>${gapAnnual > 0 ? '+$' + fmt(gapAnnual) : '— same floor'}</b></p>
        <p><span>What a $1.00/hour raise adds in a year (at ${hours} hrs)</span><b>+$${fmt(hours * 52)}</b></p>
      </div>
      ${row.note ? `<p class="note">${row.note}</p>` : ''}`;

    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
    } catch { /* ignore */ }
  };

  stateSelect.addEventListener('change', () => { state.state = stateSelect.value; render(); });
  hoursInput.addEventListener('input', () => { state.hours = Number(hoursInput.value) || 0; render(); });

  render();
}
