# Benchmarks — Attic insulation (2026-10-01)

验证层：Bing WMT API 批验（57 词清欠轮 09-30）——"attic insulation cost" **544 strict/90d**，"attic insulation" **1,754**，"spray foam insulation cost" **421**。
**闸 2**：SERP 只有材料量计算器（多少袋/板尺），无成本报价器——MST 差异化=报价视角（面积×工法×旧棉处置），保温承包商+房主两头用。
**闸 3（10-01 本轮研究，三搜索交叉；原"两源待补第 3 锚点"条件已解除）**：

## 核心基准（≥2 源交叉）

| 工法 | 区间 | 来源 |
|---|---|---|
| Blown-in top-up（玻纤/纤维素盖旧棉到 ~R-49） | **$1.50–2.45/sq ft** | Home Depot $1.50–2.45（均 $1.80）∩ Bob Vila 纤维素带上沿 $0.60–2.30 |
| Full-depth blown-in（空阁楼专业回填） | **$3.00–7.50/sq ft** | Angi $3–7.50 ∩ Homewyse $3.90–8.11（1 ft 深口径） |
| Open-cell spray foam（~3 in） | **$0.50–0.85/board ft**（×3 in ≈ $1.50–2.55/sq ft） | SprayFoam101 $0.44–0.65 ∩ SmartInsulationCalculator $0.45–0.75 ∩ TheHomeHacksDIY $0.40–0.85（三源重叠核）；HomeBlue $0.50–1.20 上探吻合 |
| Closed-cell spray foam（~2 in） | **$1.00–1.90/board ft**（×2 in ≈ $2.00–3.80/sq ft） | refitzen $1.00–1.75 ∩ SmartCalc 族带 $1.00–2.10 |
| 旧棉拆除 add-on | **$1.50–3.00/sq ft**（宽带，按可达性/干湿浮动） | refitzen $1.50–3.50 ∩ 独立口径 $0.50–1.50 合并带；800–1,200 sqft 典型阁楼整单 $600–1,350 |
| 全项目典型带 | **$1,700–2,500**（均 ~$2,100） | ArmorThane 引 HomeAdvisor/Angi ∩ Thumbtack $1,193–3,077 |
| 实例锚点 | 1,000 sqft open-cell @3" ≈ $1,300–2,250；closed-cell @2" ≈ $2,000–3,500 | refitzen 例算（与 board ft 换算自洽 ✓） |

## 不进计算（单源/口径杂）

- DIY two-part kits $0.85–1.40/board ft（单源，explain 提及勿混入安装带）
- R-value 分区推荐值（DOE 分区图 R-38–R-60）→ FAQ 定性
- 节能回报百分数（ENERGY STAR ~15% 暖冷口径）→ explain 定性引用

## 模型

面积 sqft × 工法带 + 旧棉处置（留/拆，拆=+$1.50–3.00/sqft）→ 总价区间；verdict=全项目典型带对照 + air-sealing 提示。

## 挂载

construction hub。互链：mold-remediation（阁楼发霉场景）、drywall-repair、material-cost、contractor-hourly。
