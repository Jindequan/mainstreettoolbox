# R8 找词报告 — 2026-10-06（carecost 续页供给 + MST 新垂直 + procurelink 邻接）

**本会话无 Bing WMT API key** → 本报告所有词族**没有量级数字**，一律「⏳ 待 Bing 验证」；本报告的真实数据=autocomplete 家族证据（词形数量、dual 密度、seedHits）+ SERP 竞品形态（WebSearch 实查）。**没有任何一个数字是编造的——因为没有任何量级数字。**

## 1. 种子与收割交代

- 种子 **34 个**（+round-2 自动晋升 11 个=45 有效种子），设计原则与 R1-R7 头词零重叠；fence/deck/pool 虽在 registry 有 strict=0 旧判，按任务指令以**新角度**（installation cost/staining/maintenance 具体短语）复探，**不构成翻案**，翻案必须等 Bing strict 新证据。
- 展开：skill `keyword-harvest.mjs`，Google+Bing 双 autocomplete，2 轮，en-us。
- 结果：**7,722 unique terms；双源 395 词；dual 且多种子命中 33 词**。源状态 google=3454 成功/0 失败，bing=3453 成功/1 失败。
- 原始数据：`docs/kw/r8/raw.json`、`docs/kw/r8/terms.md`、`docs/kw/r8/seeds.txt`。

**判读纪律**（沿用 R7 定版）：
- autocomplete 家族证据只做**闸 1**（需求存在性）与**闸 2**（SERP 增量）初筛；过闸词全部标「待 Bing strict 验证后立项」。
- 凡问句型/消费型词（carecost 全部候选、small claims 消费问句等）预标「**Google 侧待验证**」——R7 已证此类词 Bing strict 看不见（daycare/senior care 全族 strict=0）。禁 broad 冒充 strict。
- 反向能力边界（R7）：**大额替换/购置词 Bing strict 最灵敏**（windshield 1,415 实证）——aging in place 大件（stair lift/walk-in tub）是本轮唯一有望拿到真 strict 数字的消费族。

## 2. A 方向 · carecost 续页候选（现有 8 内容页：irmaa×2、magi、ssa-44、va stipend×2、assisted living、home care）

> 消费照护族全组预标「Google 侧待验证」；⏳=待 Bing strict。

| 词族 | 词形/dual/seedHits 峰值 | 闸 1 | 闸 2（SERP 实查 2026-10-06） | 数据源可得性（闸 3 命门） | 初判 |
|---|---|---|---|---|---|
| **respite care cost** | 190 词 / **23 dual** / seedHits **12**（per hour/day/week 四变体全 12） | ✅ 本轮全场最强消费族；per-hour/per-day/per-week=计算器输入参数现成 | 工具真空：SERP 只有单个设施自家报价器（Optalis/Timber Ridge/Flexcare），无国家级 respite 计算器 | ⚠️ 命门：CareScout **不单列 respite**。可拼州 Medicaid 1915(c) waiver fee schedule（IN $34.36/hr 等州官方费率）+ ARCH 州 fact sheet——一手但 50 州手拼（VA stipend 58-locality 先例，工作量数倍） | **Top 候选** ⏳Google 侧待验证 |
| **adult day care cost** | 131 词 / 7 dual（cost/cost per day/average/near me/start up） | ✅ 族小但语义精确；「adult day care start up cost」=附带 provider 侧词形 | CareScout 官方工具覆盖 adult day 切片（thelongtermcareplanninggroup 等转售位）；**无 adult day 专用州对比工具** | ✅ **最强**：CareScout 2025 州级现成（AL $58/day→MT $267/day，州排名表公开），seniorliving.org 2026 已引 | **Top 候选**（切片玩法=assisted-living-cost-by-state 同款 playbook）⏳ |
| **aging in place 改造费**（stair lift/ramp/walk-in tub/grab bar） | **673 词 / 27 dual**（stair lift calculator/estimate/installed、ramp home/van/portable、tub with shower/price range） | ✅ 本轮最大池；**大额购置词=Bing strict 可见性最高的一组**（windshield 判例），最可能真验证 | 无交互组合计算器：SERP=内容 guide（familymattershc/zoomer/elderfit）+ Angi/HomeAdvisor 基准（stair lift avg $7,050、$2,300-24,000；ramp $800-8,000；grab bar $50+） | 🟡 中等：多源基准易凑（≥2 源达标），但无一手州表；AARP HomeFit/报道可引 | **Top 候选** ⏳（唯一有望 strict 直接出数的） |
| nursing home cost（+vs assisted living） | 417 词 / **36 dual**（cost by state/in texas/in florida/per month/calculator）+ 对比族 47 词/5 dual | ✅ 大族+州切片词形成排 | CareScout 官方计算器占头词工具位 → 头词不可打；**州切片页空位仍在**（站点已跑通 2 个 by-state 页） | ✅ CareScout 州级现成（semi/private 两档） | 切片候选（`/care/nursing-home-cost-by-state`，对比内容并入）⏳ |
| senior living / independent living | 257 词 / 16 dual（**senior living cost calculator dual seedHits=3**、comparison worksheet） | ✅ calculator 直指词双源 | ❌ 工具位被占：Seniorly/APFM/CalculatorOra/seniorcarecostcalc EMD 群全在（assisted-living 判死同款形状） | 🟡 independent living 无 CareScout 品类，只有 APFM 等二手报告 | 头词判负；观察 |
| hospice cost | 177 词 / 7 dual | 🟡 族薄 | 计算器不成立：Medicare hospice benefit 对 terminal 诊断基本全覆盖 → 答案≈$0（room & board 除外），无「算」的需求 | 🟡 NHPCO/Medicare 官方但口径是覆盖不是价格 | 判死（计算器不成立；指南型另议） |

## 3. B 方向 · MST 新垂直（legal/consumer、moving、户外施工）

| 词族 | 词形/dual | 闸 1 | 闸 2（SERP 实查） | 初判 |
|---|---|---|---|---|
| small claims court cost | 504 词 / 11 dual（cost california/florida/oregon、application fee、how much to sue someone） | ✅ 需求真实，州切片词形成族 | ❌ **DocketMath 直接同款**（州 filing fee+limit+deadline+interest 全含）+ sue.com 品牌域 + ClaimWise | 判死头词（工具位已有直接对手；且法律建议红线=R7 llc 同判） |
| **security deposit refund** | 429 词 / **35 dual**（refund calculator/form/letter template/california/30 day） | ✅ 族深；calculator+form+letter 三种工具词形齐 | ✅ **通用 refund 计算器真空**：只有 MD 州利息工具+MN 律师利息计算器+内容文（Azibo/CA courts） | **候选（条件）** ⏳：州法定 deadline（CA 21 天/FL 15/30/TX 30）=官方数据闸 3 易；但 landlord 新 vertical 需 INDUSTRY_META 路由评估（同 notary 当年形状）。买方=小房东，MST「小生意工具箱」语境可容 |
| moving company cost / movers charge | 756 词 / 17 dual（how much do moving companies charge seedHits=2） | ✅ | ❌ moving.com/MoveBuddha/Move.org/NorthAmerican/Allied **5 个重型计算器**（R3 T3 判法复确认） | 判死维持 |
| pod vs movers / container | 422 词 / 7 dual（pods vs moving company cost seedHits=2） | 🟡 | ❌ MoveBuddha 已含 movers/containers/truck 三方比价 | 判死 |
| pool maintenance cost | 248 词 / 6 dual | 🟡 族浅 | 未深查（registry pool strict=0 旧判在案） | 判死维持（无新证据不翻案） |
| fence installation cost | 239 词 / 10 dual（calculator/estimator/per foot） | 🟡 | 未深查（registry fence strict=0 旧判在案；R4 provider 词形 how to price a fence job 仍活着） | 记录池 ⏳，construction 批次回头看 |
| deck staining/repair cost | 78 词 / 4 dual | ❌ 薄+产品评测噪音（R4 已注） | 未查 | 判死维持 |
| driveway sealing cost | 159 词 / 9 dual（calculator/per square foot） | 🟡 | ❌ getasphaltcalculator（EMD 型）/Calk-USA/asphalttons/renovprice 计算器群 | 判死 |

## 4. C 方向 · procurelink 邻接（现有 18 工具：net-30 簇、inventory-turnover、unit-price 等）

| 词族 | 词形/dual | 闸 1 | 闸 2（SERP 实查） | 初判 |
|---|---|---|---|---|
| **days sales outstanding (DSO)** | 394 词 / **43 dual**（calculator/formula excel/benchmark/interpretation/higher-or-lower） | ✅ 全场 dual 第二高；公式族完整成阵 | ✅ 有条件过：在位者全是**保理/fintech 内容营销**（Universal Funding/C2FO/Peakflo/Paidnice），无权威专用匿名计算器 | **procurelink 候选 #1** ⏳：net-30 簇天然内链邻居（DSO 就是 net-30 条款要优化的指标）；bench benchmark 行可复用站内工具数据 |
| **sell-through rate** | 198 词 / 18 dual（calculator/formula/ebay 噪音/adalah 噪音） | ✅ 健康但杂音多 | 🟡 小站计算器在位（JustCalculators/Inventory-System）无权威垄断 | **候选 #2** ⏳：与站内 inventory-turnover 组成零售库存簇（STR=units 口径、turnover=金额口径，两页互补不重复） |
| cogs calculator | 109 词 / 7 dual（excel/percentage/formula） | 🟡 中等 | **SERP 未查**——立项前必查（CalculatorSoup 类大概率在位） | 记录池 ⏳：procurelink 采购角度（期初+采购−期末）与 MST 餐饮 prime-cost 不撞，但头词竞争未知 |
| timesheet calculator | 458 词 / **72 dual 全场最高**（with lunch/with breaks/decimal/biweekly/excel） | ✅ 需求最大 | ❌ **结构性饱和**：GigaCalculator/Harvest/TimeTac/ClockIt + 2001 年老页仍在排名 | 判死头词（不因需求大而可打）；hours-to-paycheck 切片亦被 ADP/SmartAsset 占——记录池 |
| tip out / gratuity 分布 | 21 词 / **0 dual** | ❌ | MST 已有 tip-out-calculator（撞车确认） | 判死（零双源+矩阵内撞车双重死） |

## 5. carecost 续页 Top3（按「先易后难、先有数据后有词」排序）

1. **adult-day-care-cost-by-state**（+calculator 块）——数据闸 3 现成（CareScout 2025 州表公开，AL $58→MT $267/day），站点 by-state playbook 已验证两页；闸 1 族小（7 dual）但头部语义零歧义；内链邻居=assisted-living-cost-by-state。**风险**：消费型 → Google 侧待验证；CareScout 官方工具在位但无 adult day 专用对比页。
2. **aging-in-place-home-modification-cost-calculator**（行项加法模型：grab bar $50-150 / handrail $150-400 / ramp $800-8,000 / stair lift $2,300-24,000 / walk-in tub / doorway widening）——闸 1 本轮最大池（673 词 27 dual）；**大额购置词是 Bing strict 唯一可能直接出数的消费组**，下轮 key 到位第一批验它；基准 ≥2 源易凑。**风险**：无一手州表（闸 3 中等），carecost 语境要把「改房子」写成「留在自己家养老」的照护叙事。
3. **respite-care-cost-calculator**（小时×费率+天数/周档模型）——闸 1 语义最强（seedHits 12/12、per hour/day/week 就是输入参数）、闸 2 工具真空最干净；**命门在闸 3**：需拼 50 州 Medicaid 1915(c) waiver 费率表（州官方一手，但重活；VA stipend 58-locality 先例=可复制路径）。建议作为 #1/#2 上线后的攻坚件。

（nursing-home-cost-by-state 为第四顺位切片件，数据现成但头词工具位=CareScout 官方，天花板低于以上三个。）

## 6. R4 遗留三件复核（只做闸 1/2）

| 词族 | R8 复核结论 |
|---|---|
| septic pumping cost（gallon tier） | **正面积维持**：500/1000/1500/2000/3000-gallon pumping cost 词形本轮重现（单源）；SERP=安装计算器多（FigureNerd/Rex's Toolbox）而**泵送计算器仍真空**；基准多源（$300-550/1000-1500gal + ProMatcher $294-346 + per-gallon $0.25-0.50）。维持记录池 ⏳，待 strict 后仍是合格立项候选 |
| plumbing estimate | **T1 仍开放**：24 dual（free plumbing estimate template word/excel 词形依旧双源），且实证 estimate-presets.json 十组预设**至今无 Plumbing 组**（R4 布置未落地）——preset 是零新建成本承接，可在任意内容轮捎带；量级仍待 strict |
| mobile notary fee | **翻为判负**：R4 时「无大站」的窗口已关闭——notaryfeebystate.com（EMD 全 50 州 2026）+ notarycostcalc.com（EMD）+ Mobiigo/Superior/JKC/eOnline 共 6 个计算器在位。维持记录池，不再推荐立项 |

## 7. 判死名单（本轮新判，均已回写 registry）

- tip out/gratuity 分布（procurelink）——0 dual + MST tip-out-calculator 撞车
- timesheet calculator 头词（procurelink）——72 dual 需求最大但工具站结构性饱和，不可打
- moving company cost / pod vs movers（MST）——5 个重型计算器，R3 判法维持
- small claims court cost 头词（MST）——DocketMath 直接同款 + 法律红线
- mobile notary fee 头词（MST）——EMD 群关闭窗口（R4 遗留翻案）
- driveway sealing（MST）——EMD 型计算器群在位
- hospice cost（carecost）——Medicare 全覆盖，计算器不成立
- senior living cost calculator 头词（carecost）——工具位被 Seniorly/APFM/EMD 群占
- pool maintenance / deck staining——registry 旧判（strict=0/族薄）无新证据，维持

## 8. 下一步

1. **Bing strict 验证批次**（key 到位后一条命令）：respite care cost、adult day care cost、stair lift cost、walk in tub cost、wheelchair ramp cost、nursing home cost、security deposit refund、days sales outstanding calculator、sell through rate calculator、septic tank pumping cost——消费组预期多落 Google 侧盲区，大件组（stair lift/tub）预期可见。
2. carecost 续页从 #1 adult day care 开工（数据现成、playbook 已验证）；aging in place 随后；respite 先做州费率表数据工程再决定。
3. procurelink：DSO calculator 进闸 3（公式无争议、benchmark 表需 ≥2 源），与 net-30 簇互链。
4. MST：security deposit refund 待 landlord 路由成本评估（INDUSTRY_META 一行 + hub 页），可接受则进闸 3（州 deadline 数据全官方）。
