# R11 找词报告 — 2026-10-18（消费服务价格族专场，Bing strict 同轮批验零积压）

> 背景：R10 T1/T2（foundation/waterproofing）判死后词池需重开。本轮 36 个全新种子（与 R0-R10 全部 340 历史种子程序化零重叠：exact+全串包含双向双检），转向上轮未覆盖的消费服务/本地服务价格族。
> **验证层同轮闭环**：Bing key 按 10-18 定论从 BWT Settings→API access 自取（指纹 2609…ca1 与台账一致，证实「从未失效」），15 个头词当轮过 strict，**零 ⏳ 积压**——R8/R9/R10 积压教训不再重演。

## 1. 收割交代

- 种子 36 个（候选 45 → 剔除与历史种子精确/包含重叠 9 个），方向：宠物服务/汽车美容/活动服务/健康服务/专业服务/设备租赁/制造工价。
- 双源 autocomplete 2 轮：**6,966 unique terms**（google 3,570 / bing 3,571，失败 3）。
- 原始数据：`kw/r11/kw-out/raw.json`、`family-analysis.json`（36 族分池）、种子 `/tmp/r11-seeds.txt`（已回填 kw/r11/seeds.txt）。

## 2. 头部族与判决（11 族 SERP 实查 + 15 词 strict 实数）

| 族 | 词形/dual | strict 实数（US/90d） | SERP 形态（WebSearch 实查） | 判决 |
|---|---|---|---|---|
| tattoo removal | 258/18 | **头词 840/966 broad**（族内 tattoo removal 1,675、near me 1,181） | 头词 SERP=文章（Removery/LaserAway/CareCredit）；**但计算器词形 SERP=6+ 计算器 + EMD（tattoo-removal-calculator.com/TattooStudioPro/InkStudioAI/TattooifyAI/TattooFadeLedger/PerfectB）** | **判死（闸 2 计算器位≥5）**——840 strict 也救不回，R10 roof「高需求≠可打」复演 |
| home inspection | 366/23 | 291/939 broad | EMD homeinspectioncalculator.com + InterNACHI 协会工具 + Spectora SaaS 工具三强在位 | 记录池（在位偏强；需求真实，在位衰落才复议） |
| equipment rental | 172/12 | 头词 0（dual 全是 caltrans/dpwh/usace 政府费表噪音） | 未深查 | 判负（族噪音重，无消费级价格意图） |
| ceramic coating | 297/10 | 186/186 | 文章+Reddit+AutoZone，无计算器 | 记录池 ⏳（SERP 正面但头词量级弱中； detailing 簇邻接） |
| wedding photographer | 266/10 | 0（UK/AU/SG 国际噪音重） | The Knot 文章墙 | 判负（US 头词无量+权威墙） |
| paint protection film | 172/9 | 0（相关词仅 3） | 文章+Reddit 无计算器 | 判死（族薄） |
| dog training | 332/7 | 0 | near-me 本地意图重 | 判死（R7 宠物问句族 Bing 盲区规则扩展证实） |
| pet sitting | 295/7 | 0 | 供给侧 Time To Pet 有现成 rate calculator | 判负（在位工具；本地意图） |
| process server | 131/7 | 0 | NAPPS 协会文章+Thumbtack 铅页，无计算器 | 记录池（ landlord/eviction 簇邻接+法律邻接红线注记；0 strict 不立项） |
| solar panel cleaning | 157/6 | cost 词形 0，**服务形态 solar panel cleaning 500 strict** | **工具真空**（SolarReviews/Reddit/SolarCleanHub 全文章；per-panel 模型现成） | **候选 ⏳ Google 侧待验证**（本轮最强正面；价格词形 Bing 盲，禁 broad 冒充；与 MST cleaning 族 DNA 同构） |
| massage therapy | 153/5 | price-list 词形 0 | 文章+真实 spa 价目表+Reddit | 记录池（price-list-builder 预设形态可承接，0 strict 不立项） |
| photo booth rental | 134/5 | 0 | 供应商包价页+城市切片 | 判负（族薄） |
| welding / cnc / laser cutting | 83/5+ | 0 | 未深查 | 判负（B2B 工价族薄，machine-shop 受众偏离 main street） |
| 其余（answering service/bookkeeper/nanny/rv/boat storage 等） | 各 <70/≤4 | 未验 | — | 记录池底部，不排期 |

## 3. 结构发现（写给下一轮选题）

1. **闸 2 升级（本轮核心教训）**：头词 SERP 干净 ≠ 可打——必须**头词形态 + 计算器词形各查一次 SERP**。tattoo removal 头词是文章墙（看似真空），计算器词形却 6+ 工具+EMD（实际饱和）。单向查 SERP 会把 840 strict 的死族误判为 T1。
2. **消费服务价格族的结构性饱和正在扩散**：R10 发现 home services 头词计算器真空关闭，本轮证明宠物/医美/活动服务带也已关闭（tattoo 6+、pet sitting TTP、home inspection 三强）。剩余真空带=**服务型词形（solar panel cleaning 500）但价格词形盲**的缝隙，和 B2B 工价族（量薄）。
3. **种子命中率下降**：36 种子仅产出 1 个「候选 ⏳」、0 个可建。R4-R7 时代每轮 2-3 个 T1 的窗口在消费服务带已经结束。MST 下批选题应回挖：GSC 已有展现词的存量深化、R10 记录池族（tile/countertop/epoxy/turf/porch/garage-door-spring/sump pump 从未做 SERP 形态筛+strict）优先于全新种子。

## 4. 判据与下一步

- 本轮零新建 → 无新判据。
- solar panel cleaning：挂「Google 侧待验证」，验证通道=GSC 已登录时 site: 或 Google Trends 族内相对量，或下次 IAB GSC 会话顺手查族内询查询。过验证才可立项（cleaning 第 9 族）。
- MST 下一构建窗优先级不变：内链专项轮（10-14 判定 64<65 的预案）> R10 记录池族形态筛 > 全新种子轮（R12 缓排）。

## 5. 四问汇报（Push 前汇报制）

①本轮纯找词+验证，零页面零工具；②无既有页改动；③围绕词：tattoo removal cost（840 strict/90d，判死）、home inspection cost（291，记录池）、solar panel cleaning（服务形态 500，候选 ⏳）等 15 词全量实数入册；④新发现=闸 2 双查规则（头词+计算器词形分查）+ 消费服务带饱和扩散，均入册 R11 报告与 registry。
