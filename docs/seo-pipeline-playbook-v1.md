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
- **每周：GSC 收录覆盖三数**（Pages 报告，IAB 可达）：Indexed / Discovered / Crawled-not-indexed + **sitemap Last read 日期**。基线 2026-09-30：Indexed 55 / Discovered 7 / Crawled 1 / canonical 变体 32（?trade= 参数页归并=良性，勿当问题修）；**sitemap last read 9/25 落后于 9/29-30 新页发布 → 已重提 sitemap-index.xml 触发重读**。0 点击的部分解释=新页尚未进 Google 索引队列，重读后 Discovered 应清零；若 Discovered 持续 >7 不降，开内链/内容优化单
- GSC UI 操作经验：伪表格行/radio 的 playwright role 定位全部失效——用 dom_cua get_visible_dom 按 node_id 点（菜单项 e57 式）；drilldown URL 猜参数直接 400，不许试错；sitemap 重提走「输入框 fill + SUBMIT 按钮（dom_cua 找）」，Enter 不触发表单

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
- 待办：~~Bing 窗口恢复后补 popcorn ceiling 官方数字 + tv mounting / furniture assembly 两族验证~~（2026-09-30 API 全部完成，见上）；mini split / ev charger 若 Google 侧 GSC 起量可翻案复核；批验次强族（pest control 288 / gutter cleaning 217 / water heater 215 / junk removal 205）进预设素材池，等 GSC 侧复核；每周 GSC 覆盖三数照常。
- **2026-09-30 上午合规+GEO 轮（用户「按 Google 规矩行事」指令）**：①T1 三连预设落地（R5 遗留清零）：taxprep/eventplanner/lash 进 price-list-builder（锚点全部 ≥2 源：AccWire/Relay/QuickBooks、WeddingWire/The Knot/Zola、LalaLash/PMUHub）——**同族词形用 ?trade= 预设承接不开新 URL**，本身就是反 doorway 的正确形态。②BreadcrumbList 补进 ToolLayout（一次覆盖 33 页），GEO 审计遗留缺口清一项；剩余 GEO 缺口（问题式 H2、实体层 YouTube）维持排队。③Google 实践准则七条入册（见上节）——矩阵扩站前先过合规门。**矩阵纪律重申**：R4/R5 拍板"全落 MST 不开新站"仍有效（排名 73 卡点 → 同域 topical mass 是唯一杠杆），开新站触发条件已在分配计划 doc；"站点矩阵"的当下形态=MST 纵深 + whataicando 整合底盘 + tc 单站，不是新增域名。
- **2026-09-30 下午监控+预研轮**：①**AdSense 政策中心首采**（IAB 直达主号，无需绕用户浏览器）：基线 "No current issues"，加入每轮回灌巡检。②**基准预研模式**：验证通道被阻塞时，前置 闸3 研究（carpet cleaning 每房间 $25-75/2-3BR $100-500/4BR $250-500+；stump grinding $2-5/inch、最低 $100、单桩 $175-475）——Bing 解冻后构建延迟归零，两份 benchmarks 文档已落 docs/。③Chrome John 窗口被用户占用（火山方舟），Bing 验证队列继续挂起不抢屏——**双源验证策略的反向纪律：预研可以做，构建仍等验证**。
- **2026-09-30 T2 双工具发布轮 + 预研扩容**：①dumpster + popcorn ceiling 计算器上线（commit 7b71e62，Vercel 17s，live 200 + sitemap 双收录 + SSR 计算值 + IndexNow 200）。**新教训：worker SLUGS 白名单是第五处注册点，vitest slugs.test 会先红——registry 注册后必须跑 `bun run test`**（本仓库无 precheck script，AGENTS.md 的 bun run precheck 是 monorepo 上层的，此处 build+test 即序列）。②预研扩容至四族：tv mounting（HomeGuide labor $150-400 ∩ Angi $153-353，Thumbtack ~$162 印证；尺寸档 TaskRabbit 单源标注）+ furniture assembly（HomeGuide $50-550 按件阶梯，Thumbtack $105-150/单 + TaskRabbit ~$50/hr 印证）落 benchmarks 文档，直抓被墙（403/ECONNRESET）走 web_reader 通道。③**Bing WMT API 解锁包预置**（scripts/bing-wmt-keyword-api.mjs + docs/bing-wmt-api-unlock.md）：GetKeywordStats + GetRelatedKeywords 端点已核实（.NET 接口签名），用户生成一次 API key 即永久绕开抢屏瓶颈；⚠️ 官方 SOAP/POX 2026-08-31 退役公告是风险项，脚本响应异常时换基址一行。④artificial turf 判死项（见待办行修正）。
- **2026-09-30 收录覆盖首采 + 问题式 H2 轮**：①**GSC Pages 报告首读**：Indexed 55 / Discovered 7 / Crawled 1 / canonical 变体 32（?trade= 归并=良性）。**根因发现：sitemap last read 9/25 落后于 9/29-30 新页**——0 点击第一层解释是索引滞后非排名。已重提 sitemap-index.xml 强制重读；每周回灌加「覆盖三数 + last read」指标。②**GEO 问题式 H2 清零（枢纽侧）**：六行业枢纽 H2 从陈述式改为问句式（"How much does house cleaning cost in 2026?" 等），问句下紧跟 sourced 答案表=AI 提取最优形态；build 69 页 + 部署 + 六枢纽 IndexNow 200。GEO 剩余缺口仅剩实体层（YouTube 信号）。③并行会话协同格局确认：llms.txt 57 行对账已修、worker 白名单已补——多实例同流水线时，动手前先 `git log` + `ls -lt docs/` 对账防撞车。
- **2026-09-30 晚 API 解锁轮（验证层永久提速）**：①**Bing WMT API 调通**（用户交 key，30 秒操作）：首跑全空 `{"d":[]}` 差点当死端点——差分诊断（错 key→400 InvalidApiKey；GetUserSites→列出已验证站点）证明 key/端点都活着，真因=**参数名 `q` 不是 `query`**（.NET 接口签名可查）；language 必须 `en-US`（`en` 报 ErrorCode 8）；Related 需 `startDate/endDate`。UI 数字=严格 Impressions 求和（dumpster 3.9K 对齐 UI 3.8K）。**教训链：空响应≠端点死；先做差分定位，再用已知答案词校准；绝不把空数组兜底成伪数字**。②**验证成本坍缩**：浏览器 UI 每词数分钟+抢屏风险 → API 每词 ~300ms 零抢屏，当日即批验 41 词/36 族。③**判读规则升级**：Bing 严格匹配下 "X cost" 四词短语普遍 ≈0，过闸看**家族层**（cost 变体合计 + related 前 20 价格/估价意图词）。据此 T2 四族（tv mounting/furniture assembly/carpet cleaning/stump grinding）全部未过闸→预设吸收，benchmarks 已打"未过闸"戳防重建；**tree removal cost 996 strict 新王过闸**→tree-removal-cost-calculator 上线（lawn hub，70 页，四源交叉基准）。④popcorn 官方数字回填：cost 头词 0 但家族 2.5K+，工具保留。
- **2026-09-30 方向复盘轮（用户质疑路径依赖 → 三顾问脑暴 → 领导裁决）**：①**审计结论**：16 轮 0 次方向级决策，根因=状态机无「方向假设」字段、判据失败只触发预案不触发方向重估。②**自纠偏四字段入状态机**：方向假设（含三死线 10-14/10-21/**11-07 总死线**：Indexed≥65 且点击 0 且排名>60 → cost 计算器停建转存量深化+Ko-fi 前置）、复盘计数器（≥5 轮强制方向复盘）、证据配额（连续 SEO 型构建 ≤3，第 4 轮强制排名独立型）、止损触发器（同一预案最多连做 2 轮）。③**决策权边界成文**：判据修订/小额基建/闸门裁决/T2 排序自主拍板；广告变现模式/新域名/凭据/付费永远用户——终结"事事请示"。④**Bing SubmitUrlBatch 全量提交 69 URL**（HTTP 200）：Bing 小时级收录 vs Google sitemap 慢通道，配合 GetQueryStats 构成早于 GSC 的第二回灌真源。⑤**意义测试构建定案**：/restaurant/menu-profit-sheet/（菜单利润链的汇总环，价值独立于排名，打印率 >10%=产品行分发不行 / 载入率 <10%=产品不行）——**SEO 型构建配额三连已满（dumpster/popcorn/tree removal），下一构建强制排名独立型**。

## 文件索引

- 收割：`keyword-harvest-r6-2026-09-29.{json,md}`（R1-R5 同前缀）
- 验证：`keyword-verification-bing-wmt-2026-09-29.md` + 原始 CSV（sites/mainstreettoolbox/docs/keyword-data/）
- 基准：`benchmarks-*.md`（每工具一份，含来源与单源标注）
- 本手册：每轮结束时追加自进化日志一行，v 号只在不兼容时升
