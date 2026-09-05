// local 适配器 — L1 默认实现。
// usage: 有 PUBLIC_STATS_API 时走 Cloudflare Worker，否则静默 no-op。
// auth/documents/entitlements: L1 阶段 no-op（返回未登录/空），M2 切 supabase 适配器。
import type { MstSDK, UsageCounts } from './types';

const API: string = (import.meta.env.PUBLIC_STATS_API as string | undefined) ?? '';
const CACHE_KEY = 'mst-counts';
const CACHE_MS = 10 * 60 * 1000;

export function createLocalSDK(): MstSDK {
  return {
    usage: {
      beacon(slug: string): void {
        if (!API || sessionStorage.getItem('mst-beacon-' + slug)) return;
        sessionStorage.setItem('mst-beacon-' + slug, '1');
        fetch(API.replace(/\/$/, '') + '/hit', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ slug }),
          keepalive: true,
        }).catch(() => {});
      },

      async counts(days = 7): Promise<UsageCounts | null> {
        if (!API) return null;
        try {
          const cached = sessionStorage.getItem(CACHE_KEY);
          if (cached) {
            const c = JSON.parse(cached) as { ts: number; data: UsageCounts };
            if (Date.now() - c.ts < CACHE_MS) return c.data;
          }
        } catch { /* ignore */ }
        try {
          const res = await fetch(API.replace(/\/$/, '') + `/counts?days=${days}`);
          if (!res.ok) return null;
          const data = (await res.json()) as UsageCounts;
          try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data })); } catch { /* ignore */ }
          return data;
        } catch {
          return null;
        }
      },
    },

    auth: {
      async user() { return null; },
      async signIn() { throw new Error('auth lands in M2 (supabase adapter)'); },
      async signOut() { /* no-op */ },
    },

    documents: {
      async list() { return []; },
      async put() { throw new Error('documents land in M2 (supabase adapter)'); },
      async remove() { /* no-op */ },
    },

    entitlements: {
      async plan() { return 'free' as const; },
      async limits() { return { saved_items: 3, clients: 0 }; },
    },
  };
}
