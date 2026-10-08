# R10 新种子收割报告 — 2026-10-08（房修结构族 + 设备服务族，MST 专场）

**本会话无 Bing WMT API key**（10-07 那次运行报 InvalidApiKey，key 需用户重新内联提供）→ 全部词族**没有量级数字**，一律「⏳ 待 Bing 验证」；真实数据=autocomplete 家族证据 + WebSearch 竞品形态实查 18 条（`kw/r10/serp-gate2-notes.md`）。**没有任何编造数字。**

## 1. 种子与收割交代

- 种子 **40 个**（+round-2 自动晋升 5 个=45 有效种子），**与 R0-R9 全部种子零重叠**（程序化校验：40 seed × 259 历史种子 exact+全词包含双向双检 ✅）。
- 方向：已验证「SERP 无强敌」打法的本命地带——房修结构（foundation/waterproofing/crawl space）+ 设备服务（water heater/HVAC/appliance）+ 邻近 specialty（locksmith/piano moving 等），全部避开站内已有工具家族（gutter cleaning/window cleaning/junk removal/pressure washing/leaf removal/aeration 均已有工具，不再重复研究）。
- 收割：skill `keyword-harvest.mjs`，Google+Bing 双 autocomplete，2 轮，en-us。
- 结果：**6,904 unique terms；源状态 google=4,000/4,000、bing=4,000/4,000 零失败**。
- 原始数据：`docs/kw/r10/raw.json`、`terms.md`、`seeds.txt`、`family-analysis.json`（25 族分池）、`serp-gate2-notes.md`（18 条实查）、`serp-verify-2026-10-08.md`（DDG 全批 FAILED 留档）。

**判读纪律**（沿用 R7-R9）：autocomplete 只做闸 1/闸 2 初筛，过闸词全部「待 Bing strict 后立项」；无任何量级数字。

## 2. 家族全景（25 族，词形/dual）

| 族 | 词形/dual | 闸 2 裁决 |
|---|---|---|
| piano moving | 121/5 | 未深查（族薄，记录池） |
| playset/hot tub/carport install | 212/3 | 族薄判死（R8 deck staining 78/4 同判法） |
| pool installation | 85/2 | 族薄判死 |
| demolition/haul-off | 83/1 | 族薄判死 |
| outdoor living（porch/pergola） | 212/7 | 未深查（dual 薄，记录池） |
| artificial turf | 124/6 | 未深查（dual 薄，记录池） |
| floor refinishing | 70/7（**dual 率全场最高 10%**） | ❌ 4 计算器（Homewyse/HowToSandAFloor/Big Bro/AbsolutelyFloored） |
| gutter guards/replacement | 268/27 | ❌ 双头词合计 10+ 计算器（Lowe's/Homewyse/Modernize/Sacramento GG/RoofingCalculator.com…） |
| basement waterproofing | 138/7 | ✅ **可打**（详见 §4） |
| crawl space encapsulation | 116/8 | ❌ MyHomeCostCalc 免费+Stellrr 即时 |
| foundation repair（含 mudjacking） | 302/22 | ✅ **可打，本轮头号**（详见 §3） |
| concrete leveling/removal（独立池） | 109/10 | 边缘：无专用匿名交互器，作 foundation 行项/姊妹件（SlabCalc 内容 guide 在位但非工具） |
| roof replacement | 424/**61 全场最大** | ❌ 8 计算器（GAF/Calculator.net/Homewyse/RoofMaxx/Inch/CostFlowAI/RoofPitch/Modernize）——**高需求≠可打最实证** |
| water heater | 655/29（**seedHits 峰值 6 全场最高**） | ❌ 6 计算器（RePlumbs/RealCostIQ/HeyJodie/SubcontractorHub/Repipe/RemodelCostCalc） |
| sump pump | 174/10 | 边缘偏死：内容指南+Homewyse 通用器；族薄，记录池 |
| radon | 233/10 | ❌ 3 计算器（ProjectCostPro/EraseRadon/ProMatcher）；EPA 官方锚留档 |
| furnace/hvac | 339/12 | ❌ 5+ 器（myhomecostcalc 专用+LeadDuo/OxMaint/Patchogue/Housecall Pro） |
| well pump/drilling | 287/17 | ❌ 4 器（TheWell.guide/SC Well/SubcontractorHub/NGWA 协会本尊） |
| garage door repair（spring） | 144/5 | 未深查（dual 薄，记录池） |
| tile installation | 200/10 | 未深查（记录池 ⏳） |
| countertop/cabinet refacing | 236/11 | 未深查（记录池 ⏳） |
| appliance repair | 224/10 | ❌ GR Appliance 品类×品牌×故障器+Homewyse+repair-vs-replace 器 |
| locksmith（含 car key） | 682/23 | ❌ car key 3 个免费即时 EMD 计算器；lockout 无器但 scam 敏感行业不开族（记录池标注） |
| epoxy garage floor | 199/8 | 未深查（dual 薄，记录池 ⏳） |
| gravel driveway/delivery | 179/10 | ❌ 6 器（InchCalculator/Calculator.net/ConcreteCalculatorMax/HelloGravel/Omni…） |
| 未分配池 | 1,088/8 | 逐一核对：全为已析族边缘词形，无新族漏网 |

## 3. T1：foundation repair cost（本轮头号交付）

- **闸 1**：302 词形/22 dual，family 深（cost/crack/piering/leveling/settling/mudjacking 变体成阵）。
- **闸 2**：calculator 头词 SERP = 1 个留资铅页（"calculator…call or fill out for quotes"）+ 1 个 TX 报价对比器（比较两份已收报价，估价意图外）+ **3 个随机字符串域名垃圾站**（.website/.ink/.pics）= tree-removal 同款「脏 SERP」；信息头词 = NerdWallet/HomeGuide 内容指南，**无权威免费即时匿名计算器**。我们的增量=即时、匿名、分修复类型的完整估价工具。
- **闸 3**：分类型区间 ≥2 源现成——crack $250-800（多源）、sinking/settling $4,500-15,000（HomeGuide）、piering $25,000+（Bedrock）、全国均值 ~$5,000 典型 $2,225-8,135（NerdWallet 2026-02）、mudjacking $4-9/sqft + min $300-700（SlabCalc/Angi 双源）。模型=修复类型 × 基础类型（slab/crawl/pier-beam）× 延米/面积，贴真实报价决策。
- **闸 4**：房主面对 $5K-25K 报价零价格透明度 → 收藏级参考成立。
- **行动**：待 Bing strict 验证后立项 `construction/foundation-repair-cost-calculator/`；mudjacking/concrete leveling 作同页行项或姊妹预设（锚现成）。

## 4. T2：basement waterproofing cost

- **闸 1**：138 词形/7 dual（族深弱于 foundation，故列 T2）。
- **闸 2**：SERP = 承包商铅页为主——waterproofingpenn 原文描述承包商报价模型「周长 LF × 固定单价」= 我们的计算器模型现成；HomeAdvisor 指南 + ArcSite（B2B 模板，非消费者工具）；**无匿名即时计算器**。
- **闸 3**：interior sealant $500-1,500 / exterior excavation $4,000-10,000+ / 膜 $3-6 per sqft（HomeAdvisor）、$3-10/sqft 总区间（basementwaterproofingscientists）——多源一致可凑。
- **行动**：记录池正向，待 strict；若 strict 过闸可与 foundation 组「地下室/基础」内链簇。

## 5. R10 判死名单（全部具名证据，已回写 registry）

roof replacement（8 器，61 dual 仍死）、water heater replacement（6 器）、gutter replacement + gutter guards（10+ 器）、crawl space encapsulation（2 器）、hardwood floor refinishing（4 器）、appliance repair（3 器）、car key replacement（3 个免费即时 EMD 器）、well drilling（4 器）、furnace/hvac（5+ 器）、radon mitigation（3 器）、gravel driveway（6 器）；族薄判死：demolition（83/1）、pool installation（85/2）、playset/hot tub/carport（212/3）。

**不开族声明**：locksmith/lockout（SERP 无计算器但 scam 高发敏感行业+族 geo 噪音重；记录池标注，不做）。

## 6. 结构发现（写给下一轮选题）

本轮 dual 密度前三（roof 61、water heater 29、gutter guards 27）**全部判死于计算器饱和**——R4-R7 时代的「免费即时计算器真空」在 home services 头词层正在快速关闭。R10 唯一幸存模式 = **铅页+垃圾站的脏 SERP**（foundation repair），而非「无工具的处女地」。后续选题优先级应按 SERP 形态重排：脏 SERP 族 > 内容 guide 族 > 工具饱和族（直接放弃）。未深查的记录池族（tile/countertop/epoxy/turf/garage door spring）下轮用同一形态筛先查 SERP 再查家族。

## 7. 下一步

1. **Bing strict 验证批次**（key 到位一条命令；R8/R9/R10 三轮待验词一次跑）：foundation repair cost、basement waterproofing cost、mudjacking cost（R8 security deposit + R9 wheelchair/hospital bed/hearing aids/safety stock 同批）。
2. foundation repair 进闸 3 数据工程（正式 benchmark 文档，按 benchmarks-tree-removal 模板；NerdWallet/HomeGuide/Bedrock/SlabCalc/Angi 五源已在 #5/#6 实查留档）。
3. 记录池族（tile/countertop/epoxy/turf/garage door spring/sump pump）下轮先做 SERP 形态筛，再决定是否深查。
