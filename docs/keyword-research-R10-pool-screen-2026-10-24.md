# R10 记录池形态筛报告 — 2026-10-24（7 族双 SERP 实查，规划 B 线 #1）

> 背景：R11 定的供给线——R10 记录池 7 族从未做 SERP 形态筛。本轮按 R11 升级规则执行**双查**：头词形态 + 计算器词形各查一次（WebSearch，US）。
> 结论先行：**7 族 5 死 2 出线**——消费服务带饱和扩散的又一实证；出线的两族恰好都是「紧急维修 + 报价焦虑」形态（Reddit 头词 #1），是 MST「匿名价格带 vs 引流聚合器」DNA 的正缝隙。

## 判决表（证据具名）

| 族 | R10 量级（词形/dual） | 计算器词形 SERP | 头词 SERP | 判决 |
|---|---|---|---|---|
| tile installation | 200/10 | **5+ 器**：Homewyse（交互+$16.38-20.21/sqft）+ Inch Calculator（2026 价）+ Lowe's + Koffler + TileBuys | 未查（器位已饱和，双查规则单侧即判死） | **判死** |
| countertop/cabinet refacing | 236/11 | **6+ 器**：AmericanQuartzGranite + Marble.com 即时估价 + Houzz + MeasureSquare + Surprise Granite + Homewyse laminate + Lowe's | 未查 | **判死** |
| epoxy garage floor | 199/8 | **4+ 成本器**：ProjectCalcs（免费全功能）+ Homewyse + Epoxy-King + Croc Coatings，另有 4 个材料量器 | 未查 | **判死** |
| artificial turf | 124/6 | **6 器**：NexGen Lawns + The Turf Yard + MyQuoteIQ（2026）+ Netting World + GoTurf + InstallArtificial | 未查 | **判死** |
| porch/pergola（outdoor living） | 212/7 | **4+ 器**：Homewyse + BEC 即时估价 + ProjectCostPro + Southern Style + Screentight | 未查 | **判死** |
| **garage door spring** | 144/5 | 仅 **2 个器且全是承包商工具**：DoorMatrix EMD（选型器：torsion 尺寸/IPPT/门重，非成本）+ ServiceAgent（承包商 SaaS）；成本指南=Homewyse/ConsumerAffairs/TOH/DoorServPro | **Reddit r/GarageDoorService 帖居首**（双弹簧 $1,800 报价被围殴=真实询价焦虑），无 homeowner 即时成本器 | **✅ 出线 → ⏳ strict 待验** |
| **sump pump** | 174/10 | 仅 **Homewyse 通用器**；其余全是内容指南（TOH/thebasement.guide/Mr. Handyman/Oriole） | **Reddit r/homeowners 帖居首**（$9,000 报价帖=换新 vs 维修的真实困惑），报价离散度 $250-9,000=公平带焦虑的标准形态 | **✅ 出线 → ⏳ strict 待验** |

## 出线两族的闸门预读（先过嘴瘾，立项仍走全闸）

- **garage door spring replacement cost**：闸 1 行为证据强（Reddit 首帖即询价焦虑）；闸 3 数字现成（ConsumerAffairs $160-350 ∩ DoorServPro $150-500 ∩ TOH $300-540 ∩ Homewyse $327-576，单弹簧安装带收敛 $150-500+；extension $100-200；双弹簧 $200-500）；模型=弹簧类型×数量+同访 add-on，贴真实报价决策。风险=族薄（144/5），strict 是生死线。
- **sump pump installation cost**：闸 1 变体多（installation/replacement/cost/per new install）+ 行为证据强；闸 3 数字现成（TOH $500-4,000 均 $1,400 ∩ thebasement.guide $600-2,500 ∩ Mr. Handyman $500-3,000；replacement $250-600 vs 新挖 basin $1,000-2,500+）；模型=替换 vs 新装（basin）双轨——正是 Reddit 帖里 homeowners 分不清的那条线。风险=R10 曾判「族薄边缘偏死」，strict 复核翻案需 ≥ 安全线。

## 流程与下一步

1. 两族 strict 批验（BWT API，IAB 自取 key 路径已入册 bing-wmt-api-unlock.md）；**四词短语效应注意**：验 `garage door spring cost` / `sump pump cost` / `sump pump installation cost` 三词形 + related 表价格意图层。
2. strict 过线 → 闸 3 正式研究（benchmarks 文档 ≥2 源成文）→ 立项评估（construction/handyman 路由）。不过线 → 判死回 registry，记录池就此清空。
3. R11 遗留 solar panel cleaning（⏳ Google 侧验证）继续挂起，等下次 GSC 会话顺手查族内查询。
4. R12 全新种子轮维持缓排——本轮 7 族出 2 的命中率仍高于 R11 的 36 出 1，记录池回挖路线继续有效。
