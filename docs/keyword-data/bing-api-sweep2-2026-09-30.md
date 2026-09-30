# Bing WMT API 清欠批验 — 57 词（2026-09-30 晚，第二轮批验）

US strict/broad /90d。方法同 bing-api-2026-09-30.md。动机：tree removal 翻案（R4 判死→实测 996 过闸）证明 T3 名单存在 SERP 直觉误杀，全量清欠。

## ≥300 strict（新强族）

| 头词 | strict | broad | 闸2 判读 |
|---|---|---|---|
| popcorn ceiling removal | 1,081 | 1,858 | 已建工具覆盖 |
| roof replacement cost | **990** | 2,694 | **判负维持**：roofingcalculator.org/HomeAdvisor/HomeDepot/GAF 强手占计算器位，增量不足（"roofing calculator" 1,504 strict 虽大但同判） |
| mold remediation cost | **764** | 798 | **过闸**：两个弱工具（MyQuoteIQ 无名/Homewyse 口径错）→ 承包商报价视角差异化。benchmarks-mold-remediation.md ✅ |
| bathroom remodel cost | 654 | 869 | 待 SERP 复查（大媒体+计算器密集垂直，预期判负） |
| attic insulation cost | **544** | 544 | **过闸（条件）**：SERP 只有材料量计算器（Owens Corning/Lowes），无成本报价器；还需补第 3 源锚点 |
| kitchen remodel cost | 493 | 493 | 待 SERP 复查（同 bathroom） |
| spray foam insulation cost | 421 | 421 | 与 attic insulation 同族同建（一个页双模式） |
| duct cleaning cost | 367 | 752 | 与 dryer vent 同族打包评估（dryer vent 先建） |
| dryer vent cleaning cost | **354** | 354 | **过闸**：SERP 计算器真空（六成本指南零交互工具），家族 10K+。benchmarks-dryer-vent-cleaning.md ✅ |
| carpet installation cost | 336 | 336 | 待 SERP 复查 |

## <300 strict（记录池底）

septic tank pumping 246 · notary fees 191 · mold removal 161 · foundation repair 66（！）· hardwood floor 45 · ceiling fan 29 · basement waterproofing 16 · ac install 9

## =0 strict（判死，禁止重建）

siding install/repair、stucco、crawlspace encapsulation、floor refinishing、tile install、land clearing、gutter guards/install、fence/deck staining、deck repair、hedge/tree/bush trimming、sprinkler/irrigation repair、pool service/cleaning、water damage restoration、chimney sweep、estate cleanout、shed/hot tub/appliance/furniture removal、mattress disposal、ac/furnace repair、generator install、panel upgrade、sump pump、light fixture/outlet/thermostat install、drywall install、piano moving、appliance repair、christmas light removal

> 方法论：**SERP 直觉判死必须经 API 音量复核才能定案**——本轮 57 词救出 3 个真族（mold/dryer vent/attic insulation），roof 990 的需求真实但工具位被占=闸 2 各司其职的直接证据。

