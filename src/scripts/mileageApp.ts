// mileageApp.ts — 2026 Mileage Log & Deduction Calculator.
// Pure front end, framework-free: state autosaved to localStorage and the
// printable document is the live preview. Rate per trip is resolved from
// the trip date — 2026 has two IRS rate periods (72.5c to Jun 30, 76c
// from Jul 1) so a single-rate calculator miscomputes half the year.
import rateData from '../data/mileage-rates.json';

type Category = 'business' | 'medical' | 'moving' | 'charity';

interface Trip {
  id: string;
  date: string;
  category: Category;
  purpose: string;
  from: string;
  to: string;
  miles: number;
}

interface MileageState {
  bizName: string;
  vehicle: string;
  odoStart: number;
  odoEnd: number;
  trips: Trip[];
}

interface Period {
  from: string;
  to: string;
  rates: Record<Category, number>;
}

const PERIODS = rateData.periods as Period[];
const CATEGORIES = rateData.categories as Record<Category, string>;
const YEAR = rateData.year;
const DRAFT_KEY = 'mst_mileage_v1';

/** 0.725 -> "72.5¢", 0.76 -> "76¢" */
const fmtCents = (rate: number): string => {
  const c = rate * 100;
  return `${c % 1 ? c.toFixed(1) : c.toFixed(0)}¢`;
};

let idSeq = 0;
const newId = () => `t${Date.now().toString(36)}${(idSeq++).toString(36)}`;
const blankTrip = (): Trip => ({
  id: newId(), date: '', category: 'business', purpose: '', from: '', to: '', miles: 0,
});

/** Rate for a trip date + category; null when the date is outside 2026. */
export function rateFor(date: string, category: Category): number | null {
  if (!date) return null;
  const p = PERIODS.find((x) => date >= x.from && date <= x.to);
  return p ? p.rates[category] : null;
}

function freshState(): MileageState {
  return { bizName: '', vehicle: '', odoStart: 0, odoEnd: 0, trips: [blankTrip()] };
}

function loadDraft(): MileageState | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as MileageState;
    if (!Array.isArray(s.trips)) return null;
    return s;
  } catch {
    return null;
  }
}

export function initMileageApp(root: HTMLElement): void {
  const $ = <T extends Element>(sel: string) => root.querySelector<T>(sel)!;
  const state: MileageState = loadDraft() ?? freshState();

  const renderTrips = () => {
    const wrap = $('#tripsEditor');
    wrap.innerHTML = '';
    state.trips.forEach((trip) => {
      const row = document.createElement('div');
      row.className = 'trip-row';
      row.innerHTML = `
        <div class="trip-top">
          <label class="c-date">Date <input class="in-date" type="date" aria-label="Trip date" /></label>
          <label class="c-cat">Purpose type
            <select class="in-cat" aria-label="Trip category">
              ${(Object.keys(CATEGORIES) as Category[]).map(
                (c) => `<option value="${c}">${CATEGORIES[c]}</option>`
              ).join('')}
            </select>
          </label>
          <button class="in-del" type="button" aria-label="Remove trip">✕</button>
        </div>
        <div class="trip-mid">
          <input class="in-purpose" placeholder="Business purpose (e.g. client visit, supplies)" aria-label="Business purpose" />
        </div>
        <div class="trip-mid fromto">
          <input class="in-from" placeholder="From" aria-label="From" />
          <input class="in-to" placeholder="To" aria-label="To" />
        </div>
        <div class="trip-bot">
          <label>Miles <input class="in-miles" inputmode="decimal" aria-label="Miles" /></label>
          <span class="trip-rate"></span>
          <span class="trip-amount"></span>
        </div>`;

      const date = row.querySelector<HTMLInputElement>('.in-date')!;
      const cat = row.querySelector<HTMLSelectElement>('.in-cat')!;
      const purpose = row.querySelector<HTMLInputElement>('.in-purpose')!;
      const from = row.querySelector<HTMLInputElement>('.in-from')!;
      const to = row.querySelector<HTMLInputElement>('.in-to')!;
      const miles = row.querySelector<HTMLInputElement>('.in-miles')!;
      const rateEl = row.querySelector<HTMLElement>('.trip-rate')!;
      const amountEl = row.querySelector<HTMLElement>('.trip-amount')!;

      date.value = trip.date;
      cat.value = trip.category;
      purpose.value = trip.purpose;
      from.value = trip.from;
      to.value = trip.to;
      miles.value = trip.miles ? String(trip.miles) : '';

      const refresh = () => {
        const rate = rateFor(trip.date, trip.category);
        const m = Number(trip.miles) || 0;
        if (!trip.date) rateEl.textContent = '';
        else if (rate === null) {
          rateEl.textContent = `⚠ date outside ${YEAR} — excluded`;
          rateEl.classList.add('warn');
        } else {
          rateEl.textContent = `${fmtCents(rate)}/mi`;
          rateEl.classList.remove('warn');
        }
        amountEl.textContent = rate !== null && m > 0
          ? `= $${(rate * m).toFixed(2)}`
          : '';
      };

      date.addEventListener('change', () => { trip.date = date.value; refresh(); scheduleSave(); });
      cat.addEventListener('change', () => { trip.category = cat.value as Category; refresh(); scheduleSave(); });
      purpose.addEventListener('input', () => { trip.purpose = purpose.value; scheduleSave(); });
      from.addEventListener('input', () => { trip.from = from.value; scheduleSave(); });
      to.addEventListener('input', () => { trip.to = to.value; scheduleSave(); });
      miles.addEventListener('input', () => { trip.miles = parseFloat(miles.value) || 0; refresh(); scheduleSave(); });
      row.querySelector('.in-del')!.addEventListener('click', () => {
        state.trips = state.trips.filter((x) => x.id !== trip.id);
        if (!state.trips.length) state.trips.push(blankTrip());
        renderAll();
      });

      refresh();
      wrap.appendChild(row);
    });
  };

  const esc = (s: string) =>
    s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
  const m2 = (n: number) => n.toFixed(2);

  const renderDoc = () => {
    // Per-category totals
    const perCat: Record<Category, { miles: number; amount: number }> = {
      business: { miles: 0, amount: 0 },
      medical: { miles: 0, amount: 0 },
      moving: { miles: 0, amount: 0 },
      charity: { miles: 0, amount: 0 },
    };
    const validTrips = [] as (Trip & { rate: number })[];
    for (const t of state.trips) {
      const rate = rateFor(t.date, t.category);
      if (rate === null || !(Number(t.miles) > 0)) continue;
      perCat[t.category].miles += Number(t.miles);
      perCat[t.category].amount += rate * Number(t.miles);
      validTrips.push({ ...t, rate });
    }
    validTrips.sort((a, b) => a.date.localeCompare(b.date));
    const deduction = (Object.keys(perCat) as Category[])
      .filter((c) => c !== 'charity') // charity mileage isn't a cash deduction line here conceptually: it IS a charitable contribution
      .reduce((s, c) => s + perCat[c].amount, perCat.charity.amount);
    const totalMiles = validTrips.reduce((s, t) => s + Number(t.miles), 0);
    const odoTotal = Number(state.odoEnd) - Number(state.odoStart);

    $('#doc').innerHTML = `
      <div class="m-head">
        <div>
          <p class="m-biz">${esc(state.bizName) || 'Your business name'}</p>
          <p class="m-veh">${esc(state.vehicle) ? esc(state.vehicle) + ' · ' : ''}${YEAR} vehicle mileage log</p>
        </div>
        <h2>Mileage Log ${YEAR}</h2>
      </div>
      <table class="m-table">
        <thead><tr>
          <th class="x-date">Date</th><th class="x-cat">Type</th>
          <th>Purpose / destination</th><th class="x-mi">Miles</th>
          <th class="x-rate">Rate</th><th class="x-amt">Amount</th>
        </tr></thead>
        <tbody>
          ${validTrips.map((t) => {
            const dest = [t.from, t.to].filter(Boolean).join(' → ');
            return `<tr>
              <td class="x-date">${t.date}</td>
              <td class="x-cat">${t.category.slice(0, 4)}</td>
              <td>${esc(t.purpose)}${dest ? `<span class="x-dest">${esc(dest)}</span>` : ''}</td>
              <td class="x-mi">${Number(t.miles)}</td>
              <td class="x-rate">${fmtCents(t.rate)}</td>
              <td class="x-amt">$${m2(t.rate * Number(t.miles))}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
      <div class="m-foot">
        <div class="m-summary">
          ${(Object.keys(perCat) as Category[])
            .filter((c) => perCat[c].miles > 0)
            .map((c) => `<p><span>${CATEGORIES[c]}</span><span>${perCat[c].miles} mi · $${m2(perCat[c].amount)}</span></p>`)
            .join('')}
          <p class="grand"><span>Total standard mileage deduction</span><span>$${m2(deduction)}</span></p>
        </div>
        <div class="m-odo">
          <p><b>Log miles (total)</b> ${totalMiles}</p>
          <p><b>Odometer start / end</b> ${state.odoStart || '—'} / ${state.odoEnd || '—'}</p>
          <p><b>Odometer total miles</b> ${odoTotal > 0 ? odoTotal : '—'}</p>
          <p class="src">Rates: IRS standard mileage ${YEAR} — 72.5¢ Jan–Jun, 76¢ Jul–Dec (IR-2025-128, IR-2026-29).
          Log format meets IRS record requirements: date, destination, business purpose, miles.</p>
        </div>
      </div>`;

    $('#totalsCard').innerHTML = `
      <p class="big">$${m2(deduction)}</p>
      <p class="lbl">estimated ${YEAR} standard mileage deduction · ${totalMiles} logged miles over ${validTrips.length} trips</p>`;
  };

  // ── Persistence ───────────────────────────────────────────────
  let saveTimer: ReturnType<typeof setTimeout> | undefined;
  const scheduleSave = () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { localStorage.setItem(DRAFT_KEY, JSON.stringify(state)); } catch { /* ignore */ }
      renderDoc();
    }, 250);
  };
  const saveAndRender = () => { renderDoc(); scheduleSave(); };

  // Top info fields
  root.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement;
    const bind = el.dataset?.bind;
    if (!bind) return;
    (state as any)[bind] = ['odoStart', 'odoEnd'].includes(bind)
      ? parseFloat(el.value) || 0
      : el.value;
    saveAndRender();
  });

  $('#addTrip').addEventListener('click', () => {
    state.trips.push(blankTrip());
    renderAll();
    const dates = root.querySelectorAll('#tripsEditor .in-date');
    (dates[dates.length - 1] as HTMLInputElement)?.focus();
  });

  $('#sampleTrips').addEventListener('click', () => {
    if (state.trips.some((t) => t.purpose || t.date) &&
        !window.confirm('Add two example trips to the current log?')) return;
    state.trips.push(
      { id: newId(), date: '2026-03-12', category: 'business', purpose: 'Client meeting', from: 'Office', to: 'Downtown', miles: 18 },
      { id: newId(), date: '2026-08-05', category: 'business', purpose: 'Pick up supplies', from: 'Home', to: 'Hardware store', miles: 12 }
    );
    renderAll();
  });

  $('#clearAll').addEventListener('click', () => {
    if (!window.confirm('Clear the whole log? This cannot be undone.')) return;
    const next = freshState();
    Object.assign(state, next);
    bindInputs();
    renderAll();
  });

  $('#printBtn').addEventListener('click', () => window.print());

  const bindInputs = () => {
    root.querySelectorAll<HTMLInputElement>('[data-bind]').forEach((el) => {
      const key = el.dataset.bind!;
      const v = (state as any)[key];
      el.value = v ? String(v) : '';
    });
  };

  function renderAll() {
    renderTrips();
    saveAndRender();
  }

  bindInputs();
  renderAll();
}
