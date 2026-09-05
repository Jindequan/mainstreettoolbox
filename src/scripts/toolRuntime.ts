// 工具页客户端运行时：实时计算 / 标尺与诊断更新 / 行管理 / URL 与草稿持久化
// 规格来源：docs/产品设计-v1.1.md §3.1（15 条交互规格）
import { bySlug } from '../tools';
import type { EngineResult } from '../lib/types';
import { beaconUse } from './stats';

const $ = <T extends HTMLElement = HTMLElement>(sel: string): T | null => document.querySelector<T>(sel);
const bootEl = $('#tool-boot');
if (bootEl) {
  const { slug } = JSON.parse(bootEl.textContent ?? '{}') as { slug: string };
  // 唯一计算来源 = 工具注册表里的 compute（与 SSR 首屏渲染同源，防漂移）
  const tool = bySlug(slug);
  const compute = tool?.compute;
  const params = tool?.params ?? {};
  const form = $<HTMLFormElement>('.tool-form');

  if (compute && form) {

    const collect = (): { values: Record<string, string>; rows: Record<string, string>[] } => {
      const values: Record<string, string> = {};
      document.querySelectorAll<HTMLInputElement>('[data-field]').forEach((el) => {
        values[el.dataset.field!] = el.value;
      });
      const rows: Record<string, string>[] = [];
      document.querySelectorAll<HTMLElement>('[data-rows] [data-row]').forEach((row) => {
        const r: Record<string, string> = {};
        row.querySelectorAll<HTMLInputElement>('[data-col]').forEach((el) => (r[el.dataset.col!] = el.value));
        rows.push(r);
      });
      return { values, rows };
    };

    // —— 渲染 ——
    const iconFor = (lvl: string) => ({ ok: '✓', warn: '!', bad: '✕', info: 'ℹ' }[lvl] ?? 'ℹ');
    const esc = (s: string) => s
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const render = (res: EngineResult) => {
      $('#r-primary')!.textContent = res.primary.value;
      $('#m-primary')!.textContent = res.primary.value;
      const mLabel = $('#m-label');
      if (mLabel) mLabel.textContent = res.primary.label.toLowerCase();

      const sub = $('#r-secondary')!;
      sub.textContent = '';
      (res.secondary ?? []).forEach((s, i) => {
        if (i > 0) sub.appendChild(document.createTextNode(' · '));
        const span = document.createElement('span');
        span.textContent = `${s.label} `;
        const b = document.createElement('b');
        b.textContent = s.value;
        span.appendChild(b);
        sub.appendChild(span);
      });

      if (res.gauge) {
        const g = res.gauge;
        const pctAt = (v: number) => Math.min(100, Math.max(0, ((v - g.min) / (g.max - g.min)) * 100));
        const marker = $('#g-marker');
        if (marker) marker.style.left = `calc(${pctAt(g.value)}% - 2px)`;
        const zone = document.querySelector<HTMLElement>('.zone-ok');
        if (zone && g.healthy) {
          zone.style.left = pctAt(g.healthy[0]) + '%';
          zone.style.width = pctAt(g.healthy[1]) - pctAt(g.healthy[0]) + '%';
        }
      }

      if (res.doc) {
        const doc = res.doc;
        let host = document.getElementById('r-doc');
        if (!host) {
          host = document.createElement('div');
          host.id = 'r-doc';
          host.className = 'doc-block';
          document.getElementById('r-verdict')!.before(host);
        }
        let html = `<div class="doc-title">${esc(doc.title)}</div>`;
        (doc.fields ?? []).forEach((f) => { html += `<div class="doc-f"><span>${esc(f.label)}</span><b>${esc(f.value)}</b></div>`; });
        (doc.rows ?? []).forEach((r) => { html += `<div class="doc-r"><span class="doc-rn">${esc(r.name)}</span>${r.detail ? `<span class="doc-d">${esc(r.detail)}</span>` : ''}<b>${esc(r.value)}</b></div>`; });
        if (doc.total) html += `<div class="doc-t"><span>${esc(doc.total.label)}</span><b>${esc(doc.total.value)}</b></div>`;
        if (doc.footnote) html += `<div class="doc-note">${esc(doc.footnote)}</div>`;
        host.innerHTML = html;
      } else {
        document.getElementById('r-doc')?.remove();
      }

      const v = res.verdict;
      const box = $('#r-verdict')!;
      box.className = `verdict ${v.level}`;
      $('#r-verdict-icon')!.textContent = iconFor(v.level);
      $('#r-verdict-txt')!.textContent = v.text;
    };

    // —— 输入与行 ——
    let timer: ReturnType<typeof setTimeout>;
    let counted = false;
    const recalc = (userTriggered = false) => {
      const { values, rows } = collect();
      render(compute(values, rows, params));
      saveDraft();
      // "使用"语义：用户改动输入并得到结果 —— 每会话记一次
      if (userTriggered && !counted) { counted = true; beaconUse(slug); }
    };
    const debounced = () => {
      clearTimeout(timer);
      timer = setTimeout(() => recalc(true), 150);
    };

    form.addEventListener('input', (e) => {
      const t = e.target as HTMLElement;
      const slider = t.closest('input[data-kind="slider"]') as HTMLInputElement | null;
      if (slider) {
        const lbl = document.getElementById('v-' + slider.dataset.field);
        if (lbl) lbl.textContent = slider.value + (slider.dataset.unit ?? '%');
      }
      debounced();
    });

    const addBtn = $('#add-row');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const list = $('#rows-list');
        const first = list?.querySelector<HTMLElement>('[data-row]');
        if (!list || !first) return;
        const clone = first.cloneNode(true) as HTMLElement;
        clone.querySelectorAll<HTMLInputElement>('input').forEach((i) => {
          i.value = '';
        });
        list.appendChild(clone);
        clone.querySelector<HTMLInputElement>('input')?.focus();
        recalc();
      });
    }
    document.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('[data-remove]') as HTMLElement | null;
      if (btn) {
        const list = $('#rows-list');
        if (list && list.querySelectorAll('[data-row]').length > 1) btn.closest('[data-row]')?.remove();
        recalc();
      }
    });

    // —— 持久化：URL 序列化 + 本地草稿 ——
    const serialize = (): string => {
      const p = new URLSearchParams();
      document.querySelectorAll<HTMLInputElement>('[data-field]').forEach((el) => {
        if (el.value !== '') p.set('f.' + el.dataset.field!, el.value);
      });
      document.querySelectorAll<HTMLElement>('[data-rows] [data-row]').forEach((row, i) => {
        row.querySelectorAll<HTMLInputElement>('[data-col]').forEach((el) => {
          if (el.value !== '') p.set(`r${i}.${el.dataset.col!}`, el.value);
        });
      });
      return p.toString();
    };

    const restore = () => {
      const p = new URLSearchParams(location.search);
      const fromUrl = Array.from(p.keys()).length > 0;
      document.querySelectorAll<HTMLInputElement>('[data-field]').forEach((el) => {
        const key = 'f.' + el.dataset.field!;
        if (p.has(key)) el.value = p.get(key)!;
      });
      if (!fromUrl) {
        const draft = localStorage.getItem('mst-draft-' + slug);
        if (!draft) return;
        try {
          const d = JSON.parse(draft) as { values: Record<string, string>; rows: Record<string, string>[] };
          document.querySelectorAll<HTMLInputElement>('[data-field]').forEach((el) => {
            if (d.values[el.dataset.field!] !== undefined) el.value = d.values[el.dataset.field!];
          });
          if (d.rows?.length) {
            const list = $('#rows-list');
            const template = list?.querySelector<HTMLElement>('[data-row]');
            if (list && template) {
              list.innerHTML = '';
              d.rows.forEach((r) => {
                const clone = template.cloneNode(true) as HTMLElement;
                clone.querySelectorAll<HTMLInputElement>('input').forEach((i) => {
                  i.value = r[i.dataset.col!] !== undefined ? String(r[i.dataset.col!]) : '';
                });
                list.appendChild(clone);
              });
            }
          }
        } catch { /* 草稿损坏则忽略 */ }
      }
    };

    const saveDraft = () => {
      const { values, rows } = collect();
      try { localStorage.setItem('mst-draft-' + slug, JSON.stringify({ values, rows })); } catch { /* 隐私模式忽略 */ }
    };

    const copyBtn = document.querySelector<HTMLElement>('[data-act="copy"]');
    copyBtn?.addEventListener('click', () => {
      const url = location.pathname + (serialize() ? '?' + serialize() : '');
      history.replaceState(null, '', url);
      navigator.clipboard?.writeText(location.origin + url).catch(() => {});
      const svg = copyBtn.querySelector('svg');
      if (svg) svg.outerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>';
    });

    const emailBtn = document.querySelector<HTMLElement>('[data-act="email"]');
    emailBtn?.addEventListener('click', () => {
      const { values, rows } = collect();
      const res = compute(values, rows, params);
      const body = [
        `${document.title}`,
        '',
        `${res.primary.label}: ${res.primary.value}`,
        ...(res.secondary ?? []).map((s) => `${s.label}: ${s.value}`),
        '',
        res.verdict.text,
        '',
        '— Main Street Toolbox (' + location.origin + location.pathname + ')',
      ].join('\n');
      location.href = `mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(body)}`;
    });

    const saveBtn = document.querySelector<HTMLElement>('[data-act="save"]');
    saveBtn?.addEventListener('click', () => {
      saveDraft();
      const label = saveBtn.lastChild!;
      label.textContent = ' Saved ✓';
      setTimeout(() => (label.textContent = ' Save'), 1200);
    });

    // —— 启动 ——
    restore();
    recalc();
  }
}
