# R9 新种子收割报告 — 2026-10-07（DME/老年辅具 + 采购营运公式 + 小生意新垂直）

**本会话无 Bing WMT API key** → 全部词族**没有量级数字**，一律「⏳ 待 Bing 验证」；真实数据=autocomplete 家族证据（词形数、dual 密度、seedHits）+ WebSearch 竞品形态实查（`kw/r9/serp-gate2-notes.md` 14 条）。**没有任何编造数字——因为没有任何量级数字。**

## 1. 种子与收割交代

- 种子 **38 个**（+round-2 自动晋升 7 个=45 有效种子），**与 R0-R8 全部种子清单零重叠**（程序化校验：38 seed × 214 往轮种子 exact+全词包含双检，唯一近邻 `wheelchair cost`⊆R8 `wheelchair ramp cost` 为设备 vs 房屋改造两个购买品类，R8 报告原文亦只覆盖 ramp/梯椅/浴缸，不覆盖轮椅整机）。
- 收割：skill `keyword-harvest.mjs`，Google+Bing 双 autocomplete，2 轮，en-us。
- 结果：**8,918 unique terms；双源 535 词；dual 且多种子命中 16 词**。源状态 google=3,817 成功/1 失败，bing=3,817 成功/1 失败。
- 原始数据：`docs/kw/r9/raw.json`、`terms.md`、`seeds.txt`、`family-analysis.json`（分族原始池）、`serp-gate2-notes.md`（14 条实查）。

**判读纪律**（沿用 R7/R8 定版）：autocomplete 只做闸 1/闸 2 初筛，过闸词全部「待 Bing strict 后立项」；问句型消费词族预标「**Google 侧待验证**」（R7：daycare 类 Bing strict 看不见）；**大额购置词除外**（R7 windshield 1,415 strict 判例——wheelchair/hospital bed 属此组，是本轮 strict 验证最有望直接出数的消费族）。

**本轮闸 3 新发现（本报告最重要产出）**：R8 遗留的 carecost 消费族命门「CareScout 不覆盖就没有一手源」在 DME 品类上有解——**CMS DMEPOS 官方费表**（联邦，HCPCS 码级：wheelchair K 系列、hospital bed E0260/E0265、CPAP E0601、seat lift E0626）+ 各州 Medicaid DME 费表（Illinois HFS E0260=$864.01 实证）= 一手官方价格锚。hearing aids 是唯一例外（Medicare 不覆盖，官方源降级为州 Medicaid 合同，MI 2026 合同价目实证）。

## 2. carecost · DME/老年辅具（第 14+ 页供给，消费照护族全组⏳）

| 词族 | 词形/dual | 闸 1 | 闸 2（SERP 实查 2026-10-07） | 闸 3 数据源可得性 | 初判 |
|---|---|---|---|---|---|
| **wheelchair / power wheelchair（整机，非 ramp）** | 624 词 / 13 dual / seedHits 峰 **5**（cost of power wheelchair 5、custom power wheelchair cost 4、how much wheelchair cost 4）；**how to get a wheelchair for free 双源×2** | ✅ 本轮 DME 组最强；大额购置词（$1,500-15,000）=strict 最有望出数组 | 无专用计算器：SERP=零售商价签（marcsmobility 等）+二手市场 listing+NEMT 交通计算器（错意图）；无匿名可比价工具 | ✅ **最强**：CMS DMEPOS 费表（K 系列/E1161）+州 Medicaid 费表+Medicare Part B 80% 规则；「free wheelchair」词族给资助渠道内容角 | **carecost Top1** ⏳ |
| hearing aids cost | **738 词 / 52 dual**（全场最大消费族）；how much do **good/decent** hearing aids cost 3/2=分档意图 | ✅ 需求最深 | 无计算器；hearingtracker 2026 内容指南强在位（$99-8,000/pair，OTC vs 处方分档）——内容增量难，工具角度未被打 | 🟡 无 Medicare；州 Medicaid 合同价（MI 2026 官方型号价目）+多零售商数据，≥2 源可凑但无联邦费表 | **Top3 候选**（问句型→预标 Google 侧待验证）⏳ |
| hospital bed（家用） | 262 词 / 8 dual（cost to buy / per day / for home） | ✅ 分档词形成排（manual/semi-electric/full-electric/bariatric） | 无计算器：GoodRx/Accora/DME of America 内容给全档位基准（$270-9,000+，租 $100-250/月）；buy vs rent vs Medicare 模型无人做 | ✅ DMEPOS E0250/E0260/E0265+IL 州费表 $864.01 实证；租购官方口径（13 个月封顶） | **Top2 候选** ⏳ |
| cpap machine cost | 304 词 / 17 dual（但 usa/canada/australia 地理噪音重） | 🟡 双源多为地理变体，美国本部词形弱 | ❌ 零售商务霸位（cpap.com/ResMed 本尊金价+保险内容）；购物意图主导，工具增量弱 | ✅ E0601 费表官方 | 头词判负（闸 2）；记录池 |
| walker / rollator | 437 词 / 6 dual（walker cost walmart 零售噪音） | 🟡 | 未深查（dual 薄+零售意图主导） | ✅ DMEPOS walker E0140 系 | 记录池 ⏳ |
| mobility scooter | 151 词 / 5 dual | 🟡 | 未深查 | ✅ DMEPOS POV 码组 | 记录池 ⏳（与 wheelchair 同页行项候选，不独立立项） |
| lift chair recliner | 51 词 / 1 dual（amazon/best/cheap 零售噪音重） | ❌ 族薄 | 未查 | ✅ seat lift 机构 E0626 费表（Medicare 只报销机构不报整椅=好内容角） | 记录池（可作 wheelchair/hospital bed 页行项）⏳ |
| patient lift（hoyer） | 57 词 / 1 dual | ❌ 族薄 | 未查 | 🟡 DMEPOS 有码但居家场景多不覆盖 | 判死（族薄；行项并入改造页候选） |
| diabetic shoes | 92 词 / 2 dual | ❌ 族薄 | 未查 | ✅ A5500+年度一双报销规则官方 | 判死（族薄） |
| medical alert system cost | 97 词 / 2 dual | ❌ 薄+品牌噪音（AARP/ADT/Life Alert） | 未查 | 🟡 无官方费表，纯商业订阅价 | 判死（族薄+商业噪音） |
| geriatric care manager cost | 38 词 / 1 dual | ❌ 族薄 | 未查 | 🟡 | 判死（族薄） |

## 3. procurelink · 采购/营运资本公式族（本方向 6 组公式 dual 全部丰厚，但闸 2 大面积饱和）

| 词族 | 词形/dual | 闸 1 | 闸 2（SERP 实查） | 闸 3 | 初判 |
|---|---|---|---|---|---|
| **safety stock + reorder point** | **390 词 / 98 dual 本轮全场第一**（how to calculate safety stock formula 成阵；reorder point 并族） | ✅ | ✅ 有条件过：头部全是库存 SaaS 内容营销（NetSuite/Fishbowl/Slimstock/SPS）+MIT 教案 PDF+ASCM 协会页，摘要未见专用匿名计算器（DSO 判法同款） | ✅ 公式教科书标准（Z×σ×√L 两派无争议）+ASCM 10-20% 经验锚+z 表 | **procurelink 候选 #1** ⏳（与 R8 DSO、sell-through 组营运资本/库存簇） |
| landed cost | 343 词 / 80 dual | ✅ | ❌ **9 个计算器**（NormSuite 免费/Import4u/FBAGuys/Oracle…） | ✅ 官方 HTS+MPF/HMF | 判死头词 |
| cash conversion cycle | 356 词 / 71 dual | ✅ | ❌ **6 个专用计算器**（MoneyDeck/Calcopolis/TibCal…） | ✅ DSO+DIO−DPO | 判负头词（R8 COGS 同形；DSO 页可作行项承接） |
| economic order quantity | 289 词 / 38 dual | ✅ | ❌ **7 个计算器** | ✅ | 判负头词 |
| import duty / tariff | 255 词 / 40 dual | ✅ | ❌ landed cost 实查已带出 duty/tariff 计算器群（NormSuite 含 duties+MPF+HMF；未单独深查，记录不确定性） | ✅ USITC HTS 官方 | 判负头词（基于邻近实查；如翻案需单独 SERP 复核） |
| inventory carrying cost | 142 词 / 17 dual | 🟡 | ❌ Calculator.academy 等在位（15-30% 通行率已成俗语） | ✅ | 判负头词 |
| 2/10 net 30 / early payment discount | 142 词 / 6 dual（含 **2 10 net 30 annualized interest rate**——年化 37% APR 切角词形真实） | 🟡 族薄 | ❌ FlexPoint 专用计算器+Tipalti/C2FO 内容簇 | ✅ 公式无争议 | 判负头词（年化切角留 DSO/net-30 簇 FAQ 行项） |

## 4. MST · 小生意新垂直（头部饱和为主，存活件走 T1 预设与记录池）

| 词族 | 词形/dual | 闸 1 | 闸 2（SERP 实查） | 初判 |
|---|---|---|---|---|
| pressure washing price | 325 词 / 12 dual（**pressure washing price list 双源**、cost calculator 双源；money 子池 231 词） | ✅ | ❌ 头词 **6 个计算器**（MyQuoteIQ/Homewyse/Calday/CrewNest…）；per-sqft 基准反而多源现成 | **头词判死；T1 候选**：price-list-builder 加 Pressure Washing 预设（R3 detailing 同款打法），基准行已见三层 |
| vending machine | 580 词（money 子池 442）/ 16 dual / seedHits 3 | ✅ 需求真实 | ❌ **5+ ROI 计算器**（VendROI app 2026-08 新上架/PVS/Wendor/Vending Concepts/DFY） | 判死头词（结构性饱和，timesheet 判法） |
| food handler card / servsafe cost | 150+147 词 / dual 仅 6（且 servsafe 为品牌词=vendor navigation 应剔除）；州切片词形真（california food handlers card cost 等） | 🟡 | 无整合 cost 对比工具；在位=认证商内容（360training 全 50 州指南、statefoodsafety 县页） | 🟡 记录池 ⏳：州/县官方费率（CA 州法定 $7 上限）但县级拼图=respite 同款重活；买方一半是员工个人（受众半错位） |
| personal trainer / CPR / YTT certification cost | 311 词 / 11 dual + YTT 68 词 / 2 dual | 🟡 | 未深查：预期 affiliate 「best cert」文章农场霸位；工具角度未被打 | 🟡 记录池 ⏳：官方价源极易（NASM/ACE/ISSA/AHA/Red Cross 公开价），但意图=职业入门者，MST 受众（在业者）半错位 |
| car inspection cost（by state） | 333 词 / 18 dual（ma/nc/pa/tx/va/nj/ny 切片成排） | ✅ | ❌ 官方页霸位（TX DPS 本尊）+聚合器双重在位；**TX 2025 年取消安全检查**=规则变动期，内容易腐烂 | 判负（official dominance+移动物；auto 路由不做此件） |
| eviction cost | 148 词 / 2 dual；问句型 | ❌ 薄 | 未查（R8 security deposit 同买方，landlord 路由条件未决） | 记录池：**Google 侧待验证预标**+landlord 路由条件+法律邻接三重折价 |
| laundromat startup | 76 词 / 4 dual | ❌ 族薄 | 未查 | 判死（族薄，R8 deck staining 78/4 同判法） |
| car wash business startup | 44 词 / 2 dual | ❌ 族薄 | 未查 | 判死（族薄） |
| commercial kitchen rental | 66 词 / 2 dual | ❌ 族薄 | 未查 | 判死（族薄） |
| estate sale fees | 224 词 / **0 dual** | ❌ | 未查 | 判死（0 dual，R8 tip-out 判例：零双源即死） |
| gym / yoga studio startup | 71 词 / 1 dual | ❌ 族薄 | 未查 | 判死（族薄） |
| elder law attorney cost | 66 词 / 1 dual | ❌ 族薄+near-me 噪音 | 未查 | 判死（族薄+法律红线，R7 llc/R8 small claims 同判） |

## 5. 各站 Top3

### carecost（DME 续页，第 14+ 页）
1. **power-wheelchair-cost-calculator**（wheelchair 整机族，含 manual/power/scooter 行项）——624 词 13 dual、seedHits 5 全场最高；SERP 零计算器；**CMS DMEPOS 费表+州 Medicaid=一手官方闸 3**；大额购置词=下轮 strict 最有望直接出数（windshield 判例）。行项带 lift chair（E0626 机构报销 nuance）与 free/资助渠道段。
2. **hospital-bed-cost-calculator**（buy vs rent vs Medicare 三态模型）——分档基准多源现成（$270-9,000+、租 $100-250/月），E0250/E0260 官方锚+IL 州费表实证；无人在位做交互模型。
3. **hearing-aid-cost**（分 OTC vs 处方 + by state Medicaid 覆盖切片）——52 dual 本轮最大消费族；hearingtracker 内容强但工具位空；MI Medicaid 合同价=官方州源样板。**Google 侧待验证预标**。

### procurelink
1. **safety-stock-calculator**（含 reorder point 同页行项）——98 dual 本轮全场第一；在位者全是 SaaS 内容营销+一篇 MIT PDF，匿名即时计算器缺位（DSO 同款判法）；公式无争议+ASCM 经验锚=闸 3 轻。与 R8 DSO、sell-through 组成营运资本/库存内链簇。
2. （无第 2 名——landed/CCC/EOQ/duty/carrying/2-10 六组高 dual 公式头词全部判死于计算器饱和；本轮 procurelink 实际过闸=1 件。这是诚实的结论，不凑数。）

### MST
1. **T1：price-list-builder 加 Pressure Washing 预设**——"pressure washing price list" 双源直指模板意图（R3 detailing 同款零新建成本打法）；头词计算器虽饱和但模板词形由现有工具承接；基准行现成（driveway $0.15-0.35/sqft 等多源）。
2. **记录池：food-handler-card-cost-by-state**（restaurant 垂直参考表，非工具）——州法定费率官方（CA $7 上限），县级拼图为闸 3 工作量风险；待 strict。
3. **记录池：PT/CPR certification cost 对比**——官方价源最易的一族，但受众半错位；仅在 fitness provider 线内容轮捎带。

## 6. R9 判死名单（本轮新判，已回写 registry）

- landed cost / cash conversion cycle / EOQ / import duty / inventory carrying cost / 2/10 net 30 头词（procurelink）——6 组公式族 dual 丰厚但专用计算器结构性饱和（9/6/7 个在位），高需求≠可打
- vending machine cost/profit 头词（MST）——5+ ROI 计算器（含 2026-08 新上架 app）
- pressure washing cost 头词（MST）——6 个计算器；模板意图留存为 T1 预设
- car inspection cost 头词（MST）——官方页霸位+TX 2025 取消安全检查的移动规则
- cpap machine cost 头词（carecost）——零售商务 SERP，购物意图主导
- estate sale fees（0 dual）、laundromat/car wash/commercial kitchen/gym-yoga studio startup（族薄）、patient lift/diabetic shoes/medical alert/geriatric care manager（族薄）、elder law attorney（族薄+法律红线）

## 7. 下一步

1. **Bing strict 验证批次**（key 到位一条命令，本轮优先序）：cost of power wheelchair、custom power wheelchair cost、hospital bed cost、walkers/rollator cost、safety stock calculator、landed cost（已判死头词可跳过）、cpap machine cost、hearing aid prices（预期 Google 侧盲区，作 R7 假设第三例证）。
2. carecost：power wheelchair 件先进闸 3 数据工程（拉 CMS DMEPOS 全码费表 CSV+3 个州 Medicaid 费表），hospital bed 随后；两件可共用一张 DME 费表底稿。
3. procurelink：safety stock 进闸 3（公式定稿+z 表+ASCM 锚 3 源），页脚内链 DSO/sell-through/R8 候选件。
4. MST：T1 Pressure Washing 预设（查 2 源价锚即可动工）；food handler/fitness cert 记录池待 strict。
