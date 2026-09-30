# Bing WMT 真实音量验证 — R6 头词族（2026-09-29）

数据源：Bing Webmaster Tools → Keyword Research（mainstreettoolbox.com 已验证站点，免登录免卡免费）。
区间：2026-06-29 → 2026-09-26（3 个月）。这是**微软官方搜索展现数据**，非估算——至此 vol 验证闭环完成（此前唯一真源是 GSC 自站展现）。
原始 CSV：`sites/mainstreettoolbox/docs/keyword-data/bing-wmt-dumpster-rental-related-2026-09-29-official.csv`（62 行 Related keywords 全量）。

## 方法

1. 浏览器进 BWT Keyword Research（网站属性=mainstreettoolbox.com）。
2. 输入头词 → Get details → 头部显示该词 3M 总 Impressions + 国家分布；Related keywords 表给相关词逐一展现量。
3. Download all 导出 CSV（Chrome「下载前询问保存位置」开启，会弹保存框；文件默认名 KeywordStats_M_D_YYYY.csv）。

## 验证结果

| 头词 | Bing 展现 / 3M | US | Related 表 | 判定 |
|---|---|---|---|---|
| dumpster rental | **3,800** | 3,000 | 62 词全量 | **强族，T2 队首确认** |
| ev charger installation cost | **136** | 44（UK 76） | 空（低于阈值） | 弱族 |
| mini split installation cost | **168** | 166 | 空（0 rows） | 弱族 |
| popcorn ceiling removal cost | 待补 | — | — | 查询中途浏览器窗口被隐藏，结果丢失 |
| tv mounting cost | 待补 | — | — | 同上未查 |
| furniture assembly cost | 待补 | — | — | 同上未查 |

> 待补 3 词的重跑步骤：BWT → Keyword Research → 输词 → Get details → 读头部 Impressions 数字即可（Related 表对这几个词族预计为空，无需 Download）。注意先确认 Chrome 窗口前台可见，否则 AX 读数会冻结在旧页面。

## dumpster 族完整分析（Bing 3M 展现，62 词去噪后）

核心商业词族合计 **≈46,700 展现 / 3M（≈15.6K/月）**，头部词：

| 词 | 展现/3M | 备注 |
|---|---|---|
| dumpster rentals near me | 16,618 | 族内最大；**本地服务意图** |
| dumpster（宽头） | 8,993 | 意图混杂 |
| dumpster rental near me | 2,916 | 本地服务意图 |
| dumpsters for rent near me | 1,797 | 本地 |
| roll off dumpster rental | 1,711 | 服务意图 |
| dumpster rentals | 1,582 | |
| roll off dumpsters near me | 1,348 | 本地 |
| roll off dumpster | 1,262 | |
| **dumpster rentals near me prices** | 951 | **价格意图，MST 可承接** |
| affordable dumpster rental | 774 | 价格意图 |
| rent a dumpster | 764 | |
| cheapest dumpster rental near me | 741 | 价格意图 |
| rent a dumpster near me | 623 | 本地 |
| waste management dumpster rental cost | 505 | 价格意图（含品牌但长尾化） |
| how much does it cost to rent a dumpster | 261 | **问题/成本意图** |
| dumpster rental cost | 191 | 成本意图 |
| cheap dumpster rental near me | 330 | 价格意图 |
| residential dumpster rental near me | 414 | 本地 |

噪声/品牌词（已排除，勿写入内容）：waste management 176K、trash bin 1,024K（不同意图）、waste connections 41.8K、jtr 24.3K、waste 18.9K、dump truck 11.7K、garbage disposal 9.8K、dumpster fire 5.8K（梗词）、bin there dump that、carolina waste、budget dumpster、gfl、wm、montella、binco、pete and pete（电视剧）等。

### 对 MST 的意义

1. **"near me" 主导 = 本地租箱服务意图**。MST 是工具/信息站，做不了 local service，别直接追 near-me 词——但 SERP 前十全是本地公司页（Budget Dumpeter/WM/iowa-dumpsters…），侧面证明服务词不可争。
2. **可承接的角度 = 成本/价格信息词**：dumpster rentals near me prices（951）+ WM cost（505）+ how much does it cost to rent a dumpster（261）+ dumpster rental cost（191）+ cheapest（741）→ 建 **Dumpster Rental Cost Calculator / 2026 价格指南** 一页吃整组价格词，provider/两端通吃（房主询价+小型清运公司定价）。
3. Bing:Google 份额关系是估算（业内常见 5-20x），本报告只声明 Bing 官方数字；Google 侧量级留待 GSC 上量后回填。
4. **ev charger / mini split 族重新评估**：头词 Bing 仅 136/168（≈45-56/月），Related 全空 = 整族在 Bing 侧低于展示阈值。即使按最大 Google 倍率放大也仍是小族 → T2 排期降级，等 GSC 数据再说。R6 的 autocomplete 命中≠有量，这就是"autocomplete≠验证"的直接证据。
5. Question keywords 对 dumpster rental 为空（No data available）——Bing 该标签覆盖很薄，别指望它。

## CPC 状态（明确记录）

Bing WMT Keyword Research **不提供 CPC**，只给 Impressions。免费 CPC 真源目前不存在：
- Keyword Planner：需绑卡（用户红线，停）
- Ahrefs/WordStream 免费口：已实测堵死
- **结论：CPC 列保持「未验证」状态写入词库，不用任何估算冒充。**

## 与既有文件的关系

- R6 收割：`keyword-harvest-r6-2026-09-29.{json,md}`（589 词，本报告验证其中 6 个头词族）
- R4 报告：`keyword-research-2026-09-29.md`（T1/T2/T3 行动清单，dumpster T2 队首以此验证为准）
- 原始 CSV：`web/whataicando.site/sites/mainstreettoolbox/docs/keyword-data/`
