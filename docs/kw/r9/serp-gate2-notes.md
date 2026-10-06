# R9 闸 2 / 闸 3 实查记录 — 2026-10-07

引擎：WebSearch（web_search_prime，location=us）。纯 HTTP/搜索 API，未碰浏览器。
每条 = 一次真实查询；结果要点与原样链接保存于下方。**不构成完整本地化排名导出**（skill 纪律：搜索摘要=发现，不冒充 SERP 表）。

| # | 查询 | 闸 | 观测要点 |
|---|---|---|---|
| 1 | power wheelchair cost calculator | 闸2 carecost | 无专用计算器。零售商（marcsmobility $2,699 例）+ 二手市场 listing + NEMT 交通费计算器（medicalride.org，非本意图）。Medicare Part B 80% 覆盖规则出现（2026 自付额/copay 语境） |
| 2 | how much do hearing aids cost 2026 | 闸2/闸3 carecost | hearingtracker.com「How much do hearing aids cost in 2026」内容霸位（$99-8,000+/pair，OTC vs prescription 分档）；无计算器。**闸3 现货：密歇根州 MDHHS 2026-09-01 生效 hearing aid contract 官方型号价目**（michigan.gov）+ Hearing Tracker 多零售商 2026 数据 |
| 3 | hospital bed for home cost buy | 闸2 carecost | 内容型 SERP：GoodRx $500-5,000+ / SonderCare 2026 / DME of America / Accora / RehabMart $270-9,000；租 $100-250/月。无计算器；分档模型（manual/semi-electric/full-electric/bariatric）现成 |
| 4 | CPAP machine cost out of pocket | 闸2 carecost | 零售商务 SERP：hartmedical/cpap.com/ResMed eShop 本尊价页（$500-1,100 现金价）+ Humana 保险内容。Medicare 13 个月租购规则官方存在。工具增量=保险 vs 现金价对比，但购物意图主导 |
| 5 | safety stock calculator | 闸2 procurelink | 头部=库存 SaaS 内容营销（NetSuite/Fishbowl/Slimstock/SPS）+ MIT 教案 PDF + ASCM 协会页；摘要未见专用匿名计算器位。公式两派（max-avg 法 vs Z×σ×√L）无争议；ASCM 10-20% 经验锚 |
| 6 | landed cost calculator import | 闸2 procurelink | **9 个计算器在位**：NormSuite 免费器（duties+MPF+HMF）/Import4u/ShopWired app/AutoAuctionAtlas/Oracle/FBAGuys/Primeval/Trustur.ai/ModalTrans → 头词判死依据 |
| 7 | cash conversion cycle calculator | 闸2 procurelink | **6 个专用计算器**：MoneyDeck/financialratiocalculator/Calcopolis/TibCal/Utilifie/Ecom10x → 头词判负依据（R8 COGS 同形） |
| 8 | "2/10 net 30" calculator early payment discount | 闸2 procurelink | FlexPoint 专用 early payment discount 计算器 + Tipalti/Moon Invoice/C2FO 内容簇；年化 37% APR 公式为通行口径 → 头词判负（直接工具+内容簇） |
| 9 | vending machine cost profit calculator | 闸2 MST | **5+ 计算器**：VendROI app（2026-08 上架）/PVS/Wendor/Vending Concepts/DFY；行业基准 $1,500-10,000 启动、$300-600/月利润（vendingmachinepapa）→ 头词判死依据 |
| 10 | pressure washing price list calculator per square foot | 闸2 MST | **6 个计算器**：MyQuoteIQ/Homewyse/Southeast Softwash/Calday/CrewNest/Power Washing Genie；per-sqft 基准多源（driveway $0.15-0.35、siding $0.12-0.40、roof $0.30-0.60）→ 头词判死；provider 侧 price-list 词形留存（T1 预设候选） |
| 11 | food handler card cost by state how much | 闸2/闸3 MST | 州/县官方价差真实：CA ~$7.95-15（州法定上限 $7 语境）/Maricopa $6.95/KY Lexington ~$23/VA Western Tidewater $34.50（$10+$5 费）；在位者=认证商内容（360training 全 50 州 requirements 指南、statefoodsafety 县页）；无整合 cost 对比工具。闸3=州/县官方费率但县级拼图（respite 同款重活） |
| 12 | car inspection cost by state fee | 闸2 MST | 官方页霸位（TX DPS 本尊：2025 起安全检查废除改 $7.50 replacement fee、commercial $40；NC $13.60/$30、MA $35 官价、VA $20-51、MO $12）；聚合器+官页双重在位，且规则处于变动期（TX 取消）→ 判负 |
| 13 | economic order quantity calculator + inventory carrying cost calculator | 闸2 procurelink | **7 个 EOQ 计算器**（SourceSquid/TheStatSigma/Klyff/RetailScanStock/Inventory-System/DIXANI/Calculator.academy）+ carrying cost 计算器在位（15-30% 通行率）→ 双头词判负 |
| 14 | CMS DMEPOS fee schedule wheelchair/bed/CPAP/seat lift | 闸3 carecost | **CMS 官方费表覆盖确认**：wheelchair K0001-K0008/E1161、hospital bed E0260/E0265/E0271/E0296、CPAP E0601（+A7034/A7037 耗材）、seat lift E0626；州级官方例：Illinois HFS 费表 E0260=$864.01；第三方 lookup（lcodelookup 2026 州级 allowable、payerprice、findacode）可作交叉源 |

**闸 3 总判**：DME/老年辅具族（hearing aids 除外）有一手官方数据源 = CMS DMEPOS 费表（联邦）+ 各州 Medicaid DME 费表（州级），R9 新发现，解决 R8 aging-in-place 族「无一手州表」的缺口；hearing aids 无 Medicare 覆盖，官方源降级为州 Medicaid 合同（MI 实证）+ 多零售商 2026 数据。
