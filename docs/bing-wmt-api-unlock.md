# Bing WMT API 解锁包（2026-09-30 预置，等用户 30 秒操作）

## 解决什么问题

验证层（音量真源）目前依赖浏览器开 Bing WMT Keyword Research 界面，且要求 Chrome 窗口**前台可见**（AX 树冻结教训）——窗口被用户占用（John 窗口跑火山方舟）时整个 T2 队列挂起。API key 生成一次后，验证 permanently 解锁：agent 直接 curl，不再抢屏。

## 用户操作（一次性，约 30 秒）

1. 浏览器开 [bing.com/webmasters](https://www.bing.com/webmasters)（用 MST 已验证的微软账号登录）
2. 右上角 **Settings（齿轮）→ API Access**
3. **Generate API Key** → 复制
4. 把 key 交给 agent（或在终端跑下面命令时以 `BING_WMT_API_KEY=xxx` 传入；**key 不入库、不进 git**）

## Agent 执行

```bash
BING_WMT_API_KEY=<key> node scripts/bing-wmt-keyword-api.mjs
```

默认跑五个待验词族（popcorn ceiling 回补 + tv mounting + furniture assembly + carpet cleaning + stump grinding），产出 `docs/keyword-data/bing-api-<date>.md`。也可传指定词：`node scripts/bing-wmt-keyword-api.mjs "sod installation cost"`。

## 端点与已知风险

- 用法依据官方 IWebmasterApi 接口：**GetKeywordStats**（query/country/language，头词历史统计 = UI 的 Get details 数字）+ **GetRelatedKeywords**（query/country/language/from/to，= UI 的 Related keywords 表）
- 基址 `https://ssl.bing.com/webmaster/api.svc/json/`，apikey 走 query 参数
- ⚠️ 微软宣布 **SOAP/POX 2026-08-31 退役**、要求迁 REST。api.svc/json 若返回 410/404，把响应原文贴给 agent 换新端点（脚本只改 `API` 常量一行）
- key 是账号级权限凭证：只在本地终端环境变量里用，绝不写进代码/文档/日志

## 解锁后的队列（验证 → 构建，按本手册纪律）

| 词族 | 状态 | 过闸后动作 |
|---|---|---|
| popcorn ceiling removal cost | 回补官方数字 | 数字回填 benchmarks-popcorn-ceiling.md |
| tv mounting cost | 基准已预研（benchmarks-tv-mounting.md） | 过闸 → per-size 计算器；弱族 → 吸收进 handyman 预设 |
| furniture assembly cost | 基准已预研（benchmarks-furniture-assembly.md） | 过闸 → per-item 计算器；弱族 → 校准 handyman 预设 |
| carpet cleaning cost | 基准已预研（benchmarks-carpet-cleaning.md） | 过闸 → per-bedroom 计算器 |
| stump grinding cost | 基准已预研（benchmarks-stump-grinding.md） | 过闸 → per-inch 计算器 |
| ~~artificial turf~~ | **死队列项**：全轮次收割零信号（仅品牌噪声词），待办行笔误 | 不预研不构建，除非未来轮次收割出真实词形 |
