# SEO 词库流水线手册 v1（找词 → 验证 → 分析 → 发布 → 回灌）

> 本文是 MST 词库运营的操作手册：每阶段用什么工具、过什么闸门、以及每轮结束后新增/修订的规则（自进化日志）。
> 演进原则：每轮只保留"改变了下一轮行为"的教训；死路记录在案，禁止重试浪费轮次。

## 流水线五段

### 1. 收割（harvest）— 量要大，成本要零
- 工具：seo-keyword-research 技能的 `keyword-harvest.mjs`（Google+Bing autocomplete，纯 HTTP，无需浏览器）
- 产出：`docs/keyword-harvest-rN.{json,md}`，种子数、双源词数、0 失败为质量线
- **边界：autocomplete 只证明"有人在搜"，不回答"多少人搜、值多少钱"**（R6 实证：ev charger 族 autocomplete 双源命中，Bing 官方展现仅 136/3M）

### 2. 验证（verify）— 没有 real 数字不过闸
- **音量（已闭环，免费免卡）**：Bing WMT → Keyword Research（站点需已在 BWT 验证，MST 用 XML 文件路径）
  - 头词 Get details 读 3M Impressions；Related 表 Download all 拿全量 CSV
  - 操作纪律：①Download all 弹 macOS 保存框，文件可能落上次目录（**保存后立刻 mv 出 public/，曾污染过部署目录**）②Chrome 窗口必须前台可见，否则 AX 树冻结在读不到数据（popcorn ceiling 首查因此作废）③Question keywords 标签覆盖极薄（dumpster 也为空），跳过不浪费时间
- **音量（自有，滞后 2-3 周）**：GSC 展现——新页上线 2-3 周后读，这是自我校准的最终真相
- **CPC**：免卡前提下无免费真源（KP 绑卡=红线）。词库标注「未验证」，禁止估算冒充
- 死路（勿重试）：Google Trends API（429 预标）、WordStream（JS 墙）、Ahrefs 免费口（会话墙）、KP 免卡路径（UnionPay 硬门槛）

### 3. 分析（analyze）— 用 SERP 构成决定承接角度
- 逐簇问：头部 SERP 是大站/铅页/计算器/本地服务页？
- **规则（dumpster 族实证）：SERP 全是本地服务页的 near-me 词族，信息站只能吃价格/成本意图子族**——服务词不争，价格词（prices/cost/how-much/cheapest）建计算器页承接
- 闸门记录进报告（R4 式：过/带条件过/不过 + 证据）

### 4. 发布（build & ship）— 词不落页=白找
- 落点：`src/tools/<slug>/index.ts`（registry 工具，isomorphic compute）+ benchmarks 文档（**价格基准 ≥2 源一致才进 compute**，单源标注）
- 注册：`src/tools/index.ts` + 行业枢纽 HUB band + sitemap 自动收录
- 部署：`npx vercel deploy --prod --scope jindequans-projects --project mainstreettoolbox`（git push 不触发部署）
- 烟测：live URL 200 + sitemap 含新页 + SSR 首屏含计算结果
- **纪律：本 session 曾出现"建了没发"（focus-games 建完遇整合决策下线）——每轮收割/验证后必须以发布或显式 T3 归档收尾**

### 5. 回灌（readback）— 数据闭环
- 上线 2-3 周后：GSC 读展现/排名 → 回填词库 → 排名好的词形吸收进标题/FAQ，没动静的降级
- 每月：Bing WMT Keyword Research 重跑头词族（数据月更），diff 上一份 CSV
- **每轮顺手：AdSense 政策中心巡检**（IAB 直达主号 pub-8535，路径 /policy-center；基线 2026-09-30 = "No current issues"）——最终警告期账号，异常即停手上报

## Google 实践准则（Search Essentials 合规清单——每页发布前自查）

依据：Google Search Essentials + spam policies（scaled content abuse / doorway abuse / site reputation abuse）。

1. **每页独立价值（反 doorway/反 scaled content）**：每个 URL 必须有独占的有用功能或内容——工具页的独占价值=isomorphic 计算器本身；同一模板复用的页面，explain/FAQ 必须逐页手写（本站 registry 工具的 explain/FAQ 全部人工撰写带来源，这是 scaled content 指控的核心防线）。**禁止**为词形变体开重复页（同族词形用预设 ?trade= 或页内 H2/H3 承接，不开新 URL）。
2. **结构化数据诚实**：只声明页面真实具备的东西——WebApplication（真实免费工具）、FAQPage（真实可见 FAQ）、BreadcrumbList（真实层级）。不堆无关 schema，不标 review/rating（没有真实评价数据）。
3. **数字可溯源**：一切价格/量级数字进页面前过 benchmarks 文档（≥2 源；单源显式标注），页面内给出来源名。**禁止虚构数字**——既是 Google 的 helpful content 要求，也是 MST 工作守则第 2 条。
4. **链接纪律**：内链=同簇工具互链+枢纽下沉（用户路径真实需要）；外链只做来源引用（nofollow 不必需，引用性引用本就自然）。不买卖链接、不交换互推、不 guestbook 式外链（tc 外链包也只用白帽手法）。
5. **AI 内容口径**：AI 辅助撰写没问题（Google 只看质量不看产线），但每页发布前人工核事实、核口径、核可用性；纯机翻/纯拼接的页面不该存在。
6. **AdSense 纪律（账号最终警告期）**：MST 现阶段零广告（变现三段式），AI 爬虫放行无风险；任何新站/新页在 serving restriction 解除前不接广告代码。
7. **收录卫生**：sitemap 自动生成、IndexNow 即提、无薄页（每页 ≥1 个可交互工具或 ≥800 词有源内容）、404/软 404 及时清。

## 自进化日志（每轮只记改变行为的）

- **2026-09-29 验证层闭环**：Bing WMT Keyword Research 成为免费音量真源（此前仅 GSC 自站展现）。首验证即推翻直觉：ev charger / mini split 族 autocomplete 信号强、官方量级弱（136/168 vs dumpster 3.8K）→ **T2 排序以验证层为准，不以 autocomplete 密度为准**
- **2026-09-29 价格子族打法**：本地服务词族中，价格意图子族是信息站的可赢面（dumpster 族 951+741+505+261+191/3M）→ 首个产物 /construction/dumpster-rental-cost-calculator/
- **2026-09-29 操作防坑**：下载目录污染 public/（已 mv）、窗口隐藏冻结 AX（须前台）、Question 标签为空（跳过）
- **2026-09-30 双源验证策略（Bing 冻结不阻塞队列）**：Bing WMT 窗口被冻结时，Ahrefs 已验词族照常过闸构建（vol+KD 过闸 → 发布，Bing 官方数字窗口恢复后回填）。T2 队列按验证层顺序消费：dumpster ✅ → popcorn ceiling ✅（/construction/popcorn-ceiling-removal-cost-calculator/，基准 Angi $1-3 ∩ CalcBuilt $1.25-3.60 → 采信带 $1.25-3.25/sqft，漆面 ×1.5-2，石棉警告进 verdict+FAQ）→ mini split/ev charger（Bing 判弱族，出队）。
- **2026-09-30 GSC 回灌读数**：3mo（9/5-9/27）0 点击、排名 72.8（09-15 基线 73.6 微升）、retail calculator 族领先（48/36/35/26/21 展现）全命中已有页。7 天视图切换按钮 dom_cua 点击后视图不刷新——**周读数用 3mo 默认视图即可**（GSC 滞后 2-3 天，7d 本来就读不到新页）。IndexNow 每新页即提（两轮均 200）。
- 待办：Bing 窗口恢复后补 popcorn ceiling 官方数字 + tv mounting / furniture assembly / artificial turf 三族验证；mini split / ev charger 若 Google 侧 GSC 起量可翻案复核。
- **2026-09-30 上午合规+GEO 轮（用户「按 Google 规矩行事」指令）**：①T1 三连预设落地（R5 遗留清零）：taxprep/eventplanner/lash 进 price-list-builder（锚点全部 ≥2 源：AccWire/Relay/QuickBooks、WeddingWire/The Knot/Zola、LalaLash/PMUHub）——**同族词形用 ?trade= 预设承接不开新 URL**，本身就是反 doorway 的正确形态。②BreadcrumbList 补进 ToolLayout（一次覆盖 33 页），GEO 审计遗留缺口清一项；剩余 GEO 缺口（问题式 H2、实体层 YouTube）维持排队。③Google 实践准则七条入册（见上节）——矩阵扩站前先过合规门。**矩阵纪律重申**：R4/R5 拍板"全落 MST 不开新站"仍有效（排名 73 卡点 → 同域 topical mass 是唯一杠杆），开新站触发条件已在分配计划 doc；"站点矩阵"的当下形态=MST 纵深 + whataicando 整合底盘 + tc 单站，不是新增域名。

## 文件索引

- 收割：`keyword-harvest-r6-2026-09-29.{json,md}`（R1-R5 同前缀）
- 验证：`keyword-verification-bing-wmt-2026-09-29.md` + 原始 CSV（sites/mainstreettoolbox/docs/keyword-data/）
- 基准：`benchmarks-*.md`（每工具一份，含来源与单源标注）
- 本手册：每轮结束时追加自进化日志一行，v 号只在不兼容时升
