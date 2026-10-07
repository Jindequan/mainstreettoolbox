---
name: seo-keyword-research
description: Keyword research (找词/选词) for sites & products — harvests real autocomplete suggestions from Google/Bing, verifies winnability with objective SERP parsing, applies the five-gate pipeline, and outputs a prioritized keyword report. Use ANY time the user mentions 找词, 关键词, 关键字, keyword, keywords, 长尾词, 词库, SEO 选词, search terms — even if they only say "做 SEO" or "给站引流" without the word keyword. Never answer an SEO question without running keyword research first.
---

# SEO Keyword Research

Deliverable = a keyword report file with real harvested terms + objectively verified winnability. **Never deliver SEO advice without new keyword data.** The #1 failure mode is talking about SEO strategy (intent theory, content plans) without actually finding words — the user considers that a failed task.

## Hard rules

1. **Never fabricate search volumes.** Free suggest APIs give demand *signals* (a term appears in autocomplete = real people type it), not volume numbers. Volume verdicts only from Bing WMT API (strict/broad, family-level); CPC only from (a) labeled industry benchmarks or (b) post-launch AdSense RPM — never from guessing.
2. **Minimum bar:** ≥150 harvested terms, ≥3 intent clusters, every tier-1 keyword mapped to a page action (optimize existing / build new / ignore).
3. **Always write the report to a file** (repo `docs/` of the target site) and put the top-10 opportunities in the chat reply.
4. **SERP winnability MUST be objective (2026-10-01 rule).** AI-summarized search results (WebSearch summaries) are a *first-pass filter only* — they have missed exact-match domains and high-authority incumbents (eBay fees case). Before calling any term winnable or dead, run `scripts/serp-verify.mjs` (DDG html direct parse, real organic top-10) and let a human eyeball the evidence table. Verdict vocabulary: ⛔ 头词危(exact-match domain) / ⚠️ 官方位·工具位密集·强手位 / ✅ 论坛占位可打 / 🟡 人工定。
5. **Registry dedup before harvesting (闸0).** Check `docs/keyword-family-registry.md` (repo-level) for already-judged families; never re-litigate 判负 families without new evidence, and append every new family verdict to the registry in the same run.
6. **Status labels are honest, and volume is a sorter, not a gate.** 项目自己的准入标准(worth-doing-bar 四道闸 + niche-matrix §3.1)不以 API 音量为门禁——四道闸=变体深度/SERP 增量/数字出处/直接价值,过闸即可建(tree removal 先判死后实测 996 翻案的教训两边都成立:音量复核防误杀,但不可为等音量挂起可建词)。没 strict 数据时标 「量级未排序」继续推进,禁把 broad 冒充 strict、禁把「未排序」写成「不可做」。Question-type consumer families (Bing strict=0 but broad>0 pattern) get 「Google 侧待验证」 label.

## Workflow — five gates

1. **闸0 Registry dedup + inventory.** Read the registry + target site inventory. Skip judged-dead families; note audience + country/language.
2. **闸1 Demand harvest.** 15–40 seeds across *fresh* verticals → run:
   ```bash
   node <skill-dir>/scripts/keyword-harvest.mjs --seeds seeds.txt --out kw-out --rounds 2 --lang en --country us
   ```
   Pass bar: dual-source (Google+Bing both responded) AND family depth ≥30 terms (family = grep-able pool around a head concept). Single-source or shallow families → downgraded to watch.
3. **闸2 SERP winnability (objective).** Shortlist head terms (≤15) → run:
   ```bash
   node <skill-dir>/scripts/serp-verify.mjs --terms "head term one" "head term two" --out kw-out
   ```
   Read the evidence tables; apply the verdict vocabulary; drop ⛔/⚠️-official heads, keep ✅/🟡 with a differentiation angle. AI-summary SERP checks may *precede* this to prioritize, but never *replace* it.
4. **闸3 Volume sort (Bing WMT API, family-level) — 排序器,非门禁.** If the API key is available, batch-verify with `mainstreettoolbox.com/scripts/bing-wmt-keyword-api.mjs` (param is `q`, language `en-US`); sort anchor = family rollup ≥500 US strict/90d (dumpster ≈3.8K/90d ≈ UI). No key? Two non-blocking paths: (a) BWT 网页界面 Keyword Research 逐词查(~10 min,历史上 T2 队列就是这么跑的); (b) shortlist 脚本待跑,先标 「量级未排序」。闸1/2/4 过了的词**不因缺 strict 停建**——严格按四道闸判可建性。
5. **闸4 Monetization fit.** CPC evidence = labeled industry benchmarks (WordStream/WebFX etc., cited) or post-launch RPM closure. Map survivors to pages/roots (cluster-fit, theme-convergence per niche-matrix §1.2), then write the report per `references/playbook.md` and reply with top-10 + evidence sources.

## Notes

- **Clustering upgrade (2026-09-06):** for the shortlist terms only, upgrade from text-intent clustering to SERP-overlap clustering — see `~/.agents/skills/seo-audit/references/serp-overlap-methodology.md`. The serp-verify.mjs JSON (top-10 per term) feeds this directly: shared-URL overlap 7-10 = same page, 4-6 = same cluster, 2-3 = interlink, 0-1 = separate.
- Both scripts are dependency-free Node 18+. harvest: concurrency 6, ~120 ms stagger, keep totals under ~4k queries. serp-verify: sequential, 2s stagger, retry×3 — ≤15 terms per run.
- DDG html endpoint = Bing-index reality. Google organic composition can differ; the divergence rule lives in the volume layer (strict=0+broad>0 = Google-side pending), not in guessing. **Engine fallback chain (2026-10-01 实测): 本机 curl(指纹可用)→ 本机被限流(202/连接失败,持续数小时)→ `web_reader` MCP 工具抓同一 DDG html URL(另一出口 IP,亲测可用)→ WebFetch(TLS reset,对 DDG 不可用)。Bing html 在 CN 出口地域锁死,禁用。**
- Re-run monthly per site; diff vs registry + previous reports, call out new/rising terms and verdict flips.
