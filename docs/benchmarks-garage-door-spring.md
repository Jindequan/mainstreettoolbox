# 基准来源 — Garage Door Spring Replacement Cost Calculator（2026-10-24 立项研究）

> 质量门要求：进入计算的每个区间 ≥2 一致来源。查证方式：WebFetch 直接核对源页（TOH/ConsumerAffairs）+ WebSearch 交叉（Angi/HomeGuide/HomeAdvisor/DoorServPro/Homewyse）。
> 立项依据：`garage door spring replacement cost` **943 strict/90d**（windshield 1,415 后最强验证词，keyword-data/bing-api-2026-10-24.md）；闸 2 双查过（计算器词形仅 DoorMatrix 选型 EMD+ServiceAgent 承包商 SaaS，homeowner 即时成本器真空）。

## 口径陷阱（本工具存在的核心理由，入册）

聚合源的数字在「每根弹簧」vs「整套（多数门=双弹簧）」之间摇摆，homeowner 拿着 $75 到 $1,800 的报价无从对表——Reddit r/GarageDoorService 询价帖居 SERP 首位即行为证据。本模型固定为**每根弹簧安装价 × 数量**，把套装口径折算进去对照。

## 计算区间（全部 ≥2 源交叉）

| 区间 | 来源 1 | 来源 2（+3） | 交叉结论 |
|---|---|---|---|
| **Torsion 每根安装 $150–350** | HomeGuide（torsion $150–350） | DoorServPro（single torsion incl. parts+labor $150–500）重叠；Angi/HomeAdvisor $75–150 为轻活下沿 | ✅ 取重叠核 $150–350 |
| **Extension 每根安装 $100–200** | HomeGuide（extension $120–200） | TOH 整套 $300–400 折每根 ≈$150–200；Angi $50–100 为下沿 | ✅ 取 $100–200 |
| **双弹簧整门（计算值）$300–700** | 模型 2×torion 带外核：TOH torsion set $350–540 | ConsumerAffairs both-springs 上沿 $400–500 | ✅ 计算值落在双源夹层内 |
| **DIY 零件（仅辅助信息）** | ConsumerAffairs：torsion 两支装 ≈$80、extension 两支 $30–60 | TOH：torsion 零件 $80–120/支、extension $20–60/支 | torsion $40–120/支、extension $15–60/支 |
| **人工占比 $75–150** | ConsumerAffairs（technician labor $75–150） | Angi 同口径 | ✅ |
| **Extension→torsion 改装 $400–800** | ConsumerAffairs（$400–800 incl. labor） | Angi（convert extension→torsion $400–800） | ✅ 精确一致 |

## 仅 FAQ/解释区带出处提及（不进计算）

- Tune-up 同访加项 $120–240（TOH，1 源）
- Torsion 寿命 8–15 年/≈20,000 cycles vs extension 7–12 年/≈10,000 cycles（TOH）
- 双门重 300–450 lbs 需高 cycles 弹簧（TOH）
- Service call/夜间/周末附加费（ConsumerAffairs/TOH 双源定性）
- Reddit 两支 $1,800 报价被社区围殴（行为证据，r/GarageDoorService 询价帖）

## 判源冲突记录

- Homewyse $327–576/支 显著高于聚合源带（它是「基础全国均价」口径）——不进计算带，在 explain 的报价离散段作上沿引用。
- Angi torsion $75–150 与 HomeGuide $150–350 几乎不重叠——如实呈现为「轻活下沿 vs 标准带」，模型带取标准带，explain 说明离散。
