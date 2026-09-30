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

- 用法依据官方 IWebmasterApi 接口：**GetKeywordStats**（头词历史统计 = UI 的 Get details 数字）+ **GetRelatedKeywords**（= UI 的 Related keywords 表）
- **✅ 2026-09-30 已调通**（key 实测有效：GetUserSites 能列出 mainstreettoolbox.com）。基址 `https://ssl.bing.com/webmaster/api.svc/json/` **没有死**——退役的只是 SOAP/POX 两种协议；首轮全空 `{"d":[]}` 的真因是**参数名错**：
  - GetKeywordStats：`q`（不是 `query`！）+ `country=us`（小写 ISO，省略=全球）+ `language=en-US`（必须 IETF 标签，`en` 报 ErrorCode 8）。响应 `d[]` = 每周一行 `{Impressions(严格), BroadImpressions, Date}`；**UI 的数字 = 严格 Impressions 求和**（dumpster rental 3.9K/90d 实测对齐 UI 的 3.8K）
  - GetRelatedKeywords：`q` + `country` + `language` + `startDate/endDate`（YYYY-MM-DD 即可）。响应 `d[]` = `{Query, Impressions, BroadImpressions}`
  - key 校验手段：错 key → 400 InvalidApiKey；`GetUserSites` 列站点可验证 key 本身
  - **空数组就是空数组**：绝不把空结果兜底成伪数字（首轮 `query=` bug + `JSON.stringify` 兜底差点造出假数据）
- key 是账号级权限凭证：只在本地终端环境变量里用，绝不写进代码/文档/日志

## 解锁后的队列（2026-09-30 已全部判读，数据=keyword-data/bing-api-2026-09-30.md）

| 词族 | 判读 | 处置 |
|---|---|---|
| popcorn ceiling removal cost | cost 头词 0 strict，家族 2.5K+（popcorn ceiling 1,265 / removal 1,081） | 已建工具保留；官方数字回填 benchmarks-popcorn-ceiling.md |
| tv mounting cost | 0 strict，族仅 3 词 | **未过闸** → 吸收进 handyman 预设，不建 URL |
| furniture assembly cost | 0 strict，族仅 2 词 | **未过闸** → 校准 handyman 预设 |
| carpet cleaning cost | 0 strict/431broad；家族=品牌+near-me | **未过闸** → 进 cleaning 行业预设素材 |
| stump grinding cost | 头词 126；家族=设备/租赁意图 | **未过闸** → per-inch 计算器搁置；benchmarks 留档 |
| ~~artificial turf~~ | **死队列项**：全轮次收割零信号 | 不预研不构建 |
| **tree removal cost（批验新王）** | **996 strict/90d**，free-estimate 701、stump removal 854 | ✅ **已建 tree-removal-cost-calculator（lawn hub）2026-09-30** |
| 批验次强（未过闸） | pest control 288 / gutter cleaning 217 / water heater 215 / junk removal 205 | 进各自行业预设素材池，等 GSC 侧复核 |

## 判读规则（2026-09-30 定版）

Bing 严格匹配下 "X cost" 四词短语普遍 ≈0。过闸看**家族层**：cost 头词 + cost 变体 + related 前 20 里的价格/估价意图词合计有量（dumpster、tree removal 级别）→ 建；全 0 且 related 纯 near-me/品牌/设备 → 进预设不建 URL。
