// Tier 0 使用统计 Worker：POST /hit 记一次工具使用，GET /counts?days=N 读窗口聚合。
// 无 PII：visitor = 当日盐化哈希(IP+UA)，只用于 distinct 计数，不可回溯个人。
// 契约消费方：src/sdk/local.ts（beacon/counts）与 src/scripts/stats.ts（渲染）。

interface Env {
  DB: D1Database;
}

const SLUG_RE = /^[a-z0-9-]{1,80}$/;
const ALLOWED_ORIGINS = new Set([
  'https://mainstreettoolbox.com',
  'https://www.mainstreettoolbox.com',
  'http://localhost:4321',
]);

function cors(origin: string | null): Record<string, string> {
  const base: Record<string, string> = {
    'access-control-allow-methods': 'POST, GET, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) base['access-control-allow-origin'] = origin;
  return base;
}

function json(body: unknown, status = 200, origin: string | null = null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...cors(origin) },
  });
}

async function visitorHash(req: Request, day: string): Promise<string> {
  const ip = req.headers.get('cf-connecting-ip') ?? '';
  const ua = req.headers.get('user-agent') ?? '';
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${day}:${ip}:${ua}`));
  return [...new Uint8Array(digest)].slice(0, 8).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    const origin = req.headers.get('origin');

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });

    if (req.method === 'GET' && url.pathname === '/health') return json({ ok: true }, 200, origin);

    if (req.method === 'POST' && url.pathname === '/hit') {
      let slug = '';
      try {
        const body = (await req.json()) as { slug?: unknown };
        slug = typeof body.slug === 'string' ? body.slug : '';
      } catch {
        return json({ error: 'bad json' }, 400, origin);
      }
      if (!SLUG_RE.test(slug)) return json({ error: 'bad slug' }, 400, origin);

      const day = new Date().toISOString().slice(0, 10);
      const visitor = await visitorHash(req, day);
      await env.DB.prepare(
        `INSERT INTO hits (day, slug, visitor, n) VALUES (?, ?, ?, 1)
         ON CONFLICT (day, slug, visitor) DO UPDATE SET n = n + 1`,
      )
        .bind(day, slug, visitor)
        .run();
      // 保留 90 天窗口：小概率顺带清理，免维护任务
      if (Math.random() < 0.02) {
        await env.DB.prepare(`DELETE FROM hits WHERE day < date('now', '-90 day')`).run();
      }
      return new Response(null, { status: 204, headers: cors(origin) });
    }

    if (req.method === 'GET' && url.pathname === '/counts') {
      const days = Math.min(Math.max(parseInt(url.searchParams.get('days') ?? '7', 10) || 7, 1), 90);
      const since = new Date(Date.now() - (days - 1) * 86400_000).toISOString().slice(0, 10);
      const { results } = await env.DB.prepare(
        `SELECT slug, SUM(n) AS uses, COUNT(DISTINCT visitor) AS users
         FROM hits WHERE day >= ? GROUP BY slug ORDER BY uses DESC`,
      )
        .bind(since)
        .all<{ slug: string; uses: number; users: number }>();
      return json({ counts: results ?? [] }, 200, origin);
    }

    return json({ error: 'not found' }, 404, origin);
  },
};
