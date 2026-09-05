// 使用次数统计 UI：上报 + 展示。DOM 关切；数据能力全部走 SDK（getSDK().usage）。
// 未配置 PUBLIC_STATS_API 时 SDK 静默 no-op —— L1 页面不依赖本模块。
import { getSDK } from '../sdk';

const sdk = getSDK();

/** 记一次工具使用（每页面会话只上报一次；由调用方定义"使用"语义） */
export function beaconUse(slug: string): void {
  sdk.usage.beacon(slug);
}

const fmt = (n: number): string => (n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'k' : String(n));

/** 把 counts 注入 [data-uses-for] 元素；并对 [data-stats-sort] 列表按使用量排序 */
export async function renderCounts(): Promise<void> {
  const data = await sdk.usage.counts(7);
  if (!data) return;
  const bySlug = new Map(data.counts.map((c) => [c.slug, c]));

  document.querySelectorAll<HTMLElement>('[data-uses-for]').forEach((el) => {
    const c = bySlug.get(el.dataset.usesFor!);
    if (c && c.uses > 0) {
      el.hidden = false;
      const users = el.dataset.usesMode === 'users';
      const noun = users ? (c.users === 1 ? 'run' : 'runs') : 'uses';
      const sep = el.classList.contains('use-count') ? '· ' : '';
      el.textContent = `${sep}${fmt(users ? c.users : c.uses)} ${noun} this week`;
    }
  });

  document.querySelectorAll<HTMLElement>('[data-stats-sort]').forEach((list) => {
    const items = Array.from(list.querySelectorAll('[data-stats-slug]')) as HTMLElement[];
    if (items.length === 0) return;
    const key = (el: HTMLElement) => bySlug.get(el.dataset.statsSlug ?? '')?.uses ?? -1;
    const sorted = [...items].sort((a, b) => key(b) - key(a));
    sorted.forEach((el) => list.appendChild(el));
  });
}

// 页面加载即渲染（隐藏元素 → 有数据才显示）
renderCounts();
