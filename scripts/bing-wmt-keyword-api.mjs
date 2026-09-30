#!/usr/bin/env node
// Bing WMT Keyword Research API 批量验证器 — 解锁验证层的抢屏瓶颈（2026-09-30 预置）。
// 前置（用户一次性操作，见 docs/bing-wmt-api-unlock.md）：
//   Bing Webmaster Tools → 右上 Settings → API Access → Generate API Key
// 用法：
//   BING_WMT_API_KEY=xxx node scripts/bing-wmt-keyword-api.mjs            # 跑全部待验词族
//   BING_WMT_API_KEY=xxx node scripts/bing-wmt-keyword-api.mjs "tv mounting cost"   # 跑指定词
// 产出：docs/keyword-data/bing-api-<date>.md（词/展现/国家分布/相关词 Top20）
// 注意：官方宣布 SOAP/POX 2026-08-31 退役、迁 REST；api.svc/json 若 410/404，把响应贴回给 agent 换端点。
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
const SITE = 'https://mainstreettoolbox.com/';
const API = 'https://ssl.bing.com/webmaster/api.svc/json';
const today = new Date().toISOString().slice(0, 10);
const to = today;
const from = new Date(Date.now() - 90 * 864e5).toISOString().slice(0, 10);

const get = async (op, params) => {
  const q = new URLSearchParams({ apikey: KEY, ...params });
  const res = await fetch(`${API}/${op}?${q}`);
  const body = await res.json().catch(() => null);
  if (!res.ok || !body) throw new Error(`${op} HTTP ${res.status} ${JSON.stringify(body).slice(0, 200)}`);
  return body;
};
const retry = async (fn, n = 3) => {
  for (let i = 1; i <= n; i++) {
    try { return await fn(); } catch (e) {
      if (i === n) throw e;
      await new Promise((r) => setTimeout(r, 2000 * i)); // 代理网络不稳，套重试
    }
  }
};

let out = `# Bing WMT API 验证 — ${today}\n\n区间 ${from} → ${to}（3 个月官方 Impressions）。\n\n| 头词 | 全球/3M | US | 备注 |\n|---|---|---|---|\n`;
const related = [];

for (const term of HEAD_TERMS) {
  try {
    const stats = await retry(() => get('GetKeywordStats', { query: term, country: '', language: 'en' }));
    const d = stats.d ?? stats;
    const total = d.ImpressionsData?.reduce?.((s, x) => s + (x.Impressions ?? 0), 0)
      ?? d.Impressions ?? JSON.stringify(d).length; // 结构未知时兜底打印原始
    let us = '?';
    if (Array.isArray(d.ImpressionsData)) {
      const row = d.ImpressionsData.find((x) => /US|United States/i.test(x.Country ?? ''));
      us = row?.Impressions ?? '?';
    }
    out += `| ${term} | ${typeof total === 'number' ? total.toLocaleString() : total} | ${us} | |\n`;
    console.log(`✓ ${term}: ${typeof total === 'number' ? total.toLocaleString() : total}`);

    try {
      const rel = await retry(() => get('GetRelatedKeywords', {
        query: term, country: 'us', language: 'en', from, to,
      }));
      const rows = (rel.d?.Data ?? rel.d ?? []).filter((r) => r.Impressions > 0)
        .sort((a, b) => b.Impressions - a.Impressions).slice(0, 20);
      related.push({ term, rows });
    } catch (e) { console.warn(`  ⚠ related 失败（不阻塞）: ${e.message}`); }
  } catch (e) {
    out += `| ${term} | ERROR | — | ${e.message} |\n`;
    console.error(`✗ ${term}: ${e.message}`);
  }
}

for (const { term, rows } of related) {
  out += `\n## ${term} — Related keywords Top20\n\n| 词 | US 展现/3M |\n|---|---|\n`;
  for (const r of rows) out += `| ${r.Keyword ?? r.KeyWord ?? '?'} | ${(r.Impressions ?? 0).toLocaleString()} |\n`;
}
if (!related.length) out += '\n（Related 全空或调用失败——弱族信号，参考 keyword-verification 报告的判读规则）\n';

mkdirSync('docs/keyword-data', { recursive: true });
const file = `docs/keyword-data/bing-api-${today}.md`;
writeFileSync(file, out);
console.log(`\n落盘 ${file}`);
