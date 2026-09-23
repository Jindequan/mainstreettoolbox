// estimateApp.ts — Free Estimate Generator application logic.
// Framework-free: state lives in a plain object, autosaved to localStorage,
// rendered into a live document preview that is also what prints to PDF.
import presets from '../data/estimate-presets.json';

export interface LineItem {
  id: string;
  desc: string;
  note: string;
  qty: number;
  price: number;
}

interface Business { name: string; phone: string; email: string; address: string; logo: string; }
interface Client { name: string; contact: string; address: string; }

export interface EstimateState {
  trade: string;
  biz: Business;
  client: Client;
  estNo: string;
  date: string;
  expires: string;
  lines: LineItem[];
  discountPct: number;
  taxPct: number;
  deposit: number;
  notes: string;
  showSignature: boolean;
}

type Presets = Record<string, { label: string; terms: string; items: { d: string; n: string; p: number }[] }>;
const DATA = presets as Presets;

const DRAFT_KEY = 'mst_estimate_draft_v1';
const COUNTER_KEY = 'mst_estimate_counter';
const today = () => new Date().toISOString().slice(0, 10);
const plusDays = (iso: string, n: number) => {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};
let idSeq = 0;
const newId = () => `l${Date.now().toString(36)}${(idSeq++).toString(36)}`;

const DEFAULT_TERMS =
  'Estimate valid for 30 days. Any work outside the items above will be quoted before starting. Thank you for your business.';

function suggestedNumber(): string {
  let n = 1;
  try {
    n = parseInt(localStorage.getItem(COUNTER_KEY) || '1', 10) || 1;
    localStorage.setItem(COUNTER_KEY, String(n + 1));
  } catch {
    /* ignore */
  }
  return `EST-${today().replaceAll('-', '')}-${String(n).padStart(2, '0')}`;
}

function freshState(trade = ''): EstimateState {
  const preset = trade ? DATA[trade] : null;
  return {
    trade,
    biz: { name: '', phone: '', email: '', address: '', logo: '' },
    client: { name: '', contact: '', address: '' },
    estNo: suggestedNumber(),
    date: today(),
    expires: plusDays(today(), 30),
    lines: preset
      ? preset.items.map((i) => ({ id: newId(), desc: i.d, note: i.n, qty: 1, price: i.p }))
      : [{ id: newId(), desc: '', note: '', qty: 1, price: 0 }],
    discountPct: 0,
    taxPct: 0,
    deposit: 0,
    notes: preset ? preset.terms : DEFAULT_TERMS,
    showSignature: true,
  };
}

function loadDraft(): EstimateState | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as EstimateState;
    if (!s.lines?.length) return null;
    return s;
  } catch {
    return null;
  }
}

// ── Totals ──────────────────────────────────────────────────────────────
export interface Totals {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  balance: number;
}

function totalsOf(s: EstimateState): Totals {
  const subtotal = s.lines.reduce((sum, l) => sum + (Number(l.qty) || 0) * (Number(l.price) || 0), 0);
  const discount = subtotal * (Math.min(100, Math.max(0, Number(s.discountPct) || 0)) / 100);
  const taxable = subtotal - discount;
  const tax = taxable * (Math.min(100, Math.max(0, Number(s.taxPct) || 0)) / 100);
  const total = taxable + tax;
  return { subtotal, discount, tax, total, balance: total - (Number(s.deposit) || 0) };
}

// ── App bootstrap ───────────────────────────────────────────────────────
export function initEstimateApp(root: HTMLElement): void {
  const $ = <T extends Element>(sel: string) => root.querySelector<T>(sel)!;
  const state: EstimateState = loadDraft() ?? freshState();

  // Build trade chips
  const chips = $('#tradeChips');
  for (const [key, preset] of Object.entries(DATA)) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chip' + (state.trade === key ? ' active' : '');
    btn.textContent = preset.label;
    btn.dataset.trade = key;
    chips.appendChild(btn);
  }

  // Field wiring: [data-bind="biz.name"] etc.
  const bindInputs = () => {
    root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-bind]').forEach((el) => {
      const path = el.dataset.bind!;
      const [group, key] = path.split('.');
      if (group === 'lines') return; // line inputs handled separately
      el.value = String((state as any)[group]?.[key] ?? (state as any)[key] ?? '');
    });
  };

  const renderLinesEditor = () => {
    const wrap = $('#linesEditor');
    wrap.innerHTML = '';
    state.lines.forEach((l, idx) => {
      const row = document.createElement('div');
      row.className = 'line-row';
      row.innerHTML = `
        <div class="line-main">
          <input class="in-desc" aria-label="Service description" placeholder="Service / item" />
          <input class="in-note" aria-label="Detail" placeholder="Detail (optional)" />
        </div>
        <div class="line-nums">
          <input class="in-qty" aria-label="Quantity" inputmode="decimal" />
          <input class="in-price" aria-label="Unit price" inputmode="decimal" placeholder="0.00" />
          <span class="line-amount"></span>
          <button class="in-del" type="button" aria-label="Remove line" title="Remove">✕</button>
        </div>`;
      const desc = row.querySelector<HTMLInputElement>('.in-desc')!;
      const note = row.querySelector<HTMLInputElement>('.in-note')!;
      const qty = row.querySelector<HTMLInputElement>('.in-qty')!;
      const price = row.querySelector<HTMLInputElement>('.in-price')!;
      desc.value = l.desc;
      note.value = l.note;
      qty.value = l.qty ? String(l.qty) : '';
      price.value = l.price ? String(l.price) : '';
      desc.addEventListener('input', () => {
        l.desc = desc.value;
        scheduleSave();
      });
      note.addEventListener('input', () => {
        l.note = note.value;
        scheduleSave();
      });
      const numIn = (el: HTMLInputElement, target: 'qty' | 'price') =>
        el.addEventListener('input', () => {
          l[target] = parseFloat(el.value) || 0;
          scheduleSave();
        });
      numIn(qty, 'qty');
      numIn(price, 'price');
      row.querySelector('.in-del')!.addEventListener('click', () => {
        state.lines = state.lines.filter((x) => x.id !== l.id);
        if (!state.lines.length)
          state.lines.push({ id: newId(), desc: '', note: '', qty: 1, price: 0 });
        renderAll();
      });
      void idx;
      wrap.appendChild(row);
    });
  };

  const esc = (s: string) =>
    s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
  const fm = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const renderDoc = () => {
    const t = totalsOf(state);
    const b = state.biz;
    const c = state.client;
    const contactBits = [b.phone, b.email, b.address].filter(Boolean).map(esc).join(' · ');
    const clientBits = [c.contact, c.address].filter(Boolean).map(esc).join('<br/>');
    $('#doc').innerHTML = `
      <div class="doc-head">
        <div class="doc-brand">
          ${b.logo ? `<img class="doc-logo" src="${b.logo}" alt="" />` : ''}
          <div>
            <p class="doc-biz">${esc(b.name) || 'Your business name'}</p>
            <p class="doc-contact">${contactBits}</p>
          </div>
        </div>
        <div class="doc-meta">
          <h2>Estimate</h2>
          <p><b>No.</b> ${esc(state.estNo)}</p>
          <p><b>Date</b> ${esc(state.date)}</p>
          <p><b>Valid until</b> ${esc(state.expires)}</p>
        </div>
      </div>
      <div class="doc-client">
        <p class="k">Prepared for</p>
        <p class="v">${esc(c.name) || 'Client name'}</p>
        ${clientBits ? `<p class="v sub">${clientBits}</p>` : ''}
      </div>
      <table class="doc-table">
        <thead><tr><th class="t-desc">Description</th><th class="t-qty">Qty</th><th class="t-price">Unit</th><th class="t-amt">Amount</th></tr></thead>
        <tbody>
          ${state.lines
            .filter((l) => l.desc.trim() || l.qty * l.price > 0)
            .map(
              (l) => `<tr>
                <td class="t-desc">${esc(l.desc) || '<i>Item</i>'}${l.note ? `<span class="row-note">${esc(l.note)}</span>` : ''}</td>
                <td class="t-qty">${l.qty || ''}</td>
                <td class="t-price">${l.price ? fm(l.price) : ''}</td>
                <td class="t-amt">${fm((Number(l.qty) || 0) * (Number(l.price) || 0))}</td>
              </tr>`
            )
            .join('')}
        </tbody>
      </table>
      <div class="doc-totals">
        <p><span>Subtotal</span><span>$${fm(t.subtotal)}</span></p>
        ${t.discount > 0 ? `<p><span>Discount (${Number(state.discountPct) || 0}%)</span><span>−$${fm(t.discount)}</span></p>` : ''}
        ${t.tax > 0 ? `<p><span>Tax (${Number(state.taxPct) || 0}%)</span><span>$${fm(t.tax)}</span></p>` : ''}
        <p class="grand"><span>Total</span><span>$${fm(t.total)}</span></p>
        ${state.deposit > 0 ? `<p><span>Deposit paid</span><span>−$${fm(Number(state.deposit) || 0)}</span></p><p class="balance"><span>Balance due</span><span>$${fm(t.balance)}</span></p>` : ''}
      </div>
      ${state.notes.trim() ? `<div class="doc-notes"><p class="k">Notes &amp; terms</p><p>${esc(state.notes)}</p></div>` : ''}
      ${
        state.showSignature
          ? `<div class="doc-sig"><div><p>Accepted by</p><span></span></div><div><p>Date</p><span></span></div></div>`
          : ''
      }`;
  };

  // ── Persistence ───────────────────────────────────────────────────────
  let saveTimer: ReturnType<typeof setTimeout> | undefined;
  const scheduleSave = () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
      } catch {
        /* quota / private mode */
      }
      renderDoc();
    }, 250);
  };
  // rerender doc immediately for numeric feedback, persistence debounced
  const saveAndRender = () => {
    renderDoc();
    scheduleSave();
  };

  // ── Static-bound inputs (biz / client / meta) ─────────────────────────
  root.addEventListener('input', (e) => {
    const el = e.target as HTMLElement;
    const bind = (el as HTMLInputElement).dataset?.bind;
    if (!bind) return;
    const [group, key] = bind.split('.');
    if (group === 'lines') return;
    if ((state as any)[group] && key) (state as any)[group][key] = (el as HTMLInputElement).value;
    else (state as any)[group] = (el as HTMLInputElement).value;
    saveAndRender();
  });

  // Trade chips
  chips.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-trade]');
    if (!btn) return;
    const key = btn.dataset.trade!;
    const hasWork = state.lines.some((l) => l.desc.trim());
    if (state.trade !== key && hasWork && !window.confirm('Replace the current items with the ' + DATA[key].label + ' price set?'))
      return;
    const next = freshState(key);
    // Preserve identity/business details across trade switches
    next.biz = state.biz;
    next.client = state.client;
    next.estNo = state.estNo;
    Object.assign(state, next);
    chips.querySelectorAll('.chip').forEach((c) => c.classList.toggle('active', c === btn));
    bindInputs();
    renderAll();
  });

  // Toolbar / settings buttons
  $('#addLine').addEventListener('click', () => {
    state.lines.push({ id: newId(), desc: '', note: '', qty: 1, price: 0 });
    renderAll();
    const rows = root.querySelectorAll('#linesEditor .in-desc');
    (rows[rows.length - 1] as HTMLInputElement)?.focus();
  });

  $('#newEstimate').addEventListener('click', () => {
    if (!window.confirm('Start a new, blank estimate? The current one stays in this browser.')) return;
    const draft = freshState(state.trade);
    draft.biz = state.biz; // business identity carries over
    Object.assign(state, draft);
    bindInputs();
    renderAll();
  });

  $('#logoInput').addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      // Downscale to a small logo so the draft stays light.
      const img = new Image();
      img.onload = () => {
        const maxW = 220;
        const scale = Math.min(1, maxW / img.width);
        const cv = document.createElement('canvas');
        cv.width = img.width * scale;
        cv.height = img.height * scale;
        cv.getContext('2d')!.drawImage(img, 0, 0, cv.width, cv.height);
        state.biz.logo = cv.toDataURL('image/png');
        saveAndRender();
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });

  $('#logoClear').addEventListener('click', () => {
    state.biz.logo = '';
    ($('#logoInput') as HTMLInputElement).value = '';
    saveAndRender();
  });

  $('#sigToggle').addEventListener('change', (e) => {
    state.showSignature = (e.target as HTMLInputElement).checked;
    saveAndRender();
  });

  $('#printBtn').addEventListener('click', () => window.print());

  function renderAll() {
    renderLinesEditor();
    saveAndRender();
  }

  // Init
  bindInputs();
  ($('#sigToggle') as HTMLInputElement).checked = state.showSignature;
  renderAll();
}
