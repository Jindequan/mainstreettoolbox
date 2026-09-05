// Main Street Toolbox — 使用次数统计 Worker
// POST /hit    {slug}   记一次使用（按 ip+ua+day 去重的 users + 原始 uses 双指标）
// GET  /counts?days=7  返回近 N 天各工具 {uses, users}
// 设计约束：无状态、无敏感数据（IP 哈希后即弃）、slug 白名单防垃圾写入。

export interface Env {
  DB: D1Database;
  ALLOW_ORIGIN: string;
}

const SLUGS = new Set([
  'menu-maker',
  'menu-pricing-calculator',
  'food-cost-percentage-calculator',
  'menu-engineering-matrix',
  'tip-out-calculator',
  'break-even-calculator',
  'labor-cost-calculator',
  'markup-vs-margin-calculator',
  'recipe-scaler',
  'prime-cost-calculator',
  'profit-margin-calculator',
]);

const cors = (origin: string, extra: Record<string, string> = {}) => ({
  'access-control-allow-origin': origin,
  'access-control-allow-methods': 'POST, GET, OPTIONS',
  'access-control-allow-headers': 'content-type',
  ...extra,
});
const json = (data: unknown, origin: string, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', ...cors(origin) } });

async function ipHash(req: Request): Promise<string> {
  const ip = req.headers.get('cf-connecting-ip') ?? '';
  const ua = req.headers.get('user-agent') ?? '';
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip + '|' + ua));
  return [...new Uint8Array(digest)].slice(0, 12).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    const allowList = (env.ALLOW_ORIGIN || '*').split(',').map((s) => s.trim());
    const requestOrigin = req.headers.get('origin') ?? '';
    // 反射式 CORS：仅放行配置清单内的 origin
    const origin = allowList.includes('*') ? '*' : allowList.includes(requestOrigin) ? requestOrigin : allowList[0] ?? '*';

    if (req.method === 'OPTIONS') return new Response(null, { headers: cors(origin) });

    if (url.pathname === '/hit' && req.method === 'POST') {
      let slug = '';
      try { ({ slug } = (await req.json()) as { slug?: string }); } catch { /* ignore */ }
      if (!slug || !SLUGS.has(slug)) return json({ ok: false, reason: 'bad slug' }, origin, 400);
      const day = new Date().toISOString().slice(0, 10);
      const h = await ipHash(req);
      await env.DB.prepare(
        `INSERT INTO hits (day, slug, iphash, n) VALUES (?1, ?2, ?3, 1)
         ON CONFLICT(day, slug, iphash) DO UPDATE SET n = n + 1`,
      ).bind(day, slug, h).run();
      return json({ ok: true }, origin);
    }

    if (url.pathname === '/counts' && req.method === 'GET') {
      const days = Math.min(90, Math.max(1, parseInt(url.searchParams.get('days') ?? '7', 10) || 7));
      const since = new Date(Date.now() - days * 864e5).toISOString().slice(0, 10);
      const { results } = await env.DB.prepare(
        `SELECT slug, SUM(n) AS uses, COUNT(DISTINCT iphash) AS users
         FROM hits WHERE day >= ?1 GROUP BY slug ORDER BY uses DESC`,
      ).bind(since).all();
      return json({ since, days, counts: results }, origin);
    }

    return json({ ok: false, reason: 'not found' }, origin, 404);
  },
};
