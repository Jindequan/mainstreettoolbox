#!/usr/bin/env node
// Bing WMT Keyword Research API 批量验证器 — 解锁验证层的抢屏瓶颈（2026-09-30 调通）。
// 前置（用户一次性操作，见 docs/bing-wmt-api-unlock.md）：
//   Bing Webmaster Tools → 右上 Settings → API Access → Generate API Key
// 用法：
//   BING_WMT_API_KEY=xxx node scripts/bing-wmt-keyword-api.mjs            # 跑全部待验词族
//   BING_WMT_API_KEY=xxx node scripts/bing-wmt-keyword-api.mjs "tv mounting cost"   # 跑指定词
// 产出：docs/keyword-data/bing-api-<date>.md（词/展现/相关词 Top20）
//
// 端点协议（2026-09-30 实测，勿再用旧参数名）：
//   GET https://ssl.bing.com/webmaster/api.svc/json/GetKeywordStats
//       ?apikey=..&q=<term>&language=en-US[&country=us]   ← 参数名是 q 不是 query！
//     country 省略=全球；language 必须是 IETF 标签（en 会报 ErrorCode 8）
//     响应 d[] = 每周一行 {Impressions(严格), BroadImpressions, Date(/Date(ms)/)}
//     UI 的 "impressions" 数字 = 严格 Impressions 求和（dumpster rental ≈3.8K/90d 实测对齐）
//   GET .../GetRelatedKeywords?apikey=..&q=..&country=us&language=en-US
//       &startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
//     响应 d[] = {Query, Impressions, BroadImpressions}
//   校验手段：错 key 返回 400 InvalidApiKey；GetUserSites 能列出已验证站点 → key 有效性可用它验证。
//   空数组就是空数组：绝不把空结果兜底成伪数字（首轮 query= 参数 bug 的教训）。
import { writeFileSync, mkdirSync } from 'node:fs';

const KEY = process.env.BING_WMT_API_KEY || process.argv[2];
if (!KEY) {
  console.error('缺 API key：BING_WMT_API_KEY=xxx node scripts/bing-wmt-keyword-api.mjs');
  console.error('key 生成步骤见 docs/bing-wmt-api-unlock.md（BWT → Settings → API Access）');
  process.exit(1);
}
const args = process.argv.slice(2).filter((a) => !a.includes('='));
const HEAD_TERMS = args.length ? args : [
  'popcorn ceiling removal cost', // 回补官方数字（2026-09-29 窗口冻结未查成）
  'tv mounting cost',
  'furniture assembly cost',
  'carpet cleaning cost',
  'stump grinding cost',
];
const API = 'https://ssl.bing.com/webmaster/api.svc/json';
const LANG = 'en-US';
const today = new Date().toISOString().slice(0, 10);
const to = today;
const from = new Date(Date.now() - 90 * 864e5).toISOString().slice(0, 10);

const get = async (op, params) => {
  const q = new URLSearchParams({ apikey: KEY, ...params });
  const res = await fetch(`${API}/${op}?${q}`);
  const body = await res.json().catch(() => null);
  if (!res.ok || !body) throw new Error(`${op} HTTP ${res.status} ${JSON.stringify(body).slice(0, 200)}`);
  if (body.ErrorCode) throw new Error(`${op} ErrorCode ${body.ErrorCode}: ${body.Message}`);
  return body.d ?? [];
};
const retry = async (fn, n = 3) => {
  for (let i = 1; i <= n; i++) {
    try { return await fn(); } catch (e) {
      if (i === n) throw e;
      await new Promise((r) => setTimeout(r, 2000 * i)); // 代理网络不稳，套重试
    }
  }
};
const sum = (rows, f) => rows.reduce((s, x) => s + (x[f] ?? 0), 0);
const fmt = (n) => (n > 0 ? n.toLocaleString('en-US') : '—');
const verdict = (imp, relCount) => {
  if (imp >= 2000 && relCount >= 10) return '强：过闸建工具';
  if (imp >= 500) return '中：可建轻量页';
  return '弱：进预设/出队';
};

let out = `# Bing WMT API 验证 — ${today}\n\n区间 ${from} → ${to}（90 天官方 Impressions，严格匹配；broad 括注）。\n\n| 头词 | US strict/90d | US broad/90d | 全球 strict/90d | 相关词数 | 判读 |\n|---|---|---|---|---|---|\n`;
const related = [];

for (const term of HEAD_TERMS) {
  try {
    const common = { q: term, language: LANG };
    const [us, global] = await Promise.all([
      retry(() => get('GetKeywordStats', { ...common, country: 'us' })),
      retry(() => get('GetKeywordStats', common)),
    ]);
    const usImp = sum(us, 'Impressions');
    const usBroad = sum(us, 'BroadImpressions');
    const gImp = sum(global, 'Impressions');

    let relRows = [];
    try {
      relRows = await retry(() => get('GetRelatedKeywords', {
        ...common, country: 'us', startDate: from, endDate: to,
      }));
    } catch (e) { console.warn(`  ⚠ related 失败（不阻塞）: ${e.message}`); }
    const rel = relRows.filter((r) => (r.Impressions ?? 0) > 0)
      .sort((a, b) => b.Impressions - a.Impressions).slice(0, 20);
    related.push({ term, rel });

    out += `| ${term} | ${fmt(usImp)} | ${fmt(usBroad)} | ${fmt(gImp)} | ${rel.length} | ${verdict(usImp, rel.length)} |\n`;
    console.log(`✓ ${term}: US ${usImp.toLocaleString()} strict / ${usBroad.toLocaleString()} broad, 相关词 ${rel.length} → ${verdict(usImp, rel.length)}`);
  } catch (e) {
    out += `| ${term} | ERROR | — | — | — | ${e.message} |\n`;
    console.error(`✗ ${term}: ${e.message}`);
  }
}

for (const { term, rel } of related) {
  out += `\n## ${term} — Related keywords Top20（US strict/90d）\n\n| 词 | strict | broad |\n|---|---|---|\n`;
  for (const r of rel) out += `| ${r.Query} | ${fmt(r.Impressions)} | ${fmt(r.BroadImpressions)} |\n`;
}
if (!related.length) out += '\n（Related 全空或调用失败——弱族信号，参考 keyword-verification 报告的判读规则）\n';

mkdirSync('docs/keyword-data', { recursive: true });
const file = `docs/keyword-data/bing-api-${today}.md`;
writeFileSync(file, out);
console.log(`\n落盘 ${file}`);
