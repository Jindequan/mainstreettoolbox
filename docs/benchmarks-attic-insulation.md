# Benchmarks — Attic insulation (2026-10-01，第 24 轮对齐版)

> **文档历史**：本文件在第 23 轮并行撞车中由两个实例各自研究后合并（工具=实例 B 建成上线；研究=实例 A 独立三搜索）。第 24 轮内链专项轮对本文件做对齐重写：以**已部署工具的实际带**为准绳（可追溯性），实例 A 的独立研究降为旁证与"未进计算"备注。

验证层：Bing WMT API 批验（57 词清欠轮 09-30）——"attic insulation cost" **544 strict/90d**，"attic insulation" **1,754**，"spray foam insulation cost" **421**。
**闸 2**：SERP 只有材料量计算器（多少袋/板尺），无成本报价器——工具差异化=报价视角。
**闸 3**：工具带全带核验（TLS∩Bob Vila∩R60 带；整单 Angi∩Thumbtack∩TLS 三源）；实例 A 独立研究旁证见下。

## 已部署工具的带（/construction/attic-insulation-cost-calculator/，第 23 轮上线）

| 工具带 | 区间 | 来源 | 旁证（实例 A 独立研究 10-01） |
|---|---|---|---|
| Blown-in cellulose, standard | **$1.20–3.20/sq ft** | TLS Energy Savers（tlsinsulation.com 2026 指导价总带 $0.75–7.00，源核验✅）∩ Bob Vila 纤维素 $0.60–2.30 部分重叠 | Home Depot $1.50–2.45（均 $1.80）落于带内 ✓；scsfoam $1.70–2.30、fixr dense-pack $2.00–2.30 同带 ✓ |
| Blown-in fiberglass, standard | **$1.00–2.50/sq ft** | Bob Vila ∩ 行业通带 | Bob Vila 浅层 $0.50–1.10（浅顶补低于 standard 口径，自洽）|
| Fiberglass batts, standard | **$1.00–2.50/sq ft** | R60 项目源下带覆盖 | 同上 |
| Closed-cell spray foam | **$1.50–4.00/sq ft** | 前轮来源（**单源标注**） | 实例 A：refitzen $1.00–1.75/board ft ×2 in ≈ $2.00–3.80/sq ft + SmartCalc 族 $1.00–2.10/board ft——两独立口径均落于 $1.50–4.00 带内 ✓（单源风险已实质解除） |
| R-60 深度 | **×1.7 乘数**（导出，explain 标注） | R60 项目带 vs standard 带导出 | — |
| 整单对照（1,000 sqft） | **$1,000–3,500** | Angi($987–2,335) ∩ Thumbtack($1,193–3,077) ∩ TLS($1,500–3,500) 三源 | ArmorThane 引 HA/Angi $1,700–2,500（均 ~$2,100）落于带内 ✓ |

## 未进计算（实例 A 研究备注——未来迭代素材）

- **Open-cell spray foam（33 轮已进计算）**：$0.50–0.85/board ft（SprayFoam101 ∩ SmartCalc ∩ HomeHacksDIY 三源重叠核）；×3 in ≈ $1.50–2.55/sq ft。2026-10-01 第 33 轮迭代为工具第五档。
- **Full-depth blown-in（空阁楼）**：Angi $3.00–7.50/sq ft ∩ Homewyse $3.90–8.11（1 ft 深口径）。工具用 R-60 乘数表达深度，未单列空阁楼档。
- **旧棉拆除 add-on**：$1.50–3.00/sq ft（refitzen $1.50–3.50 ∩ 独立口径 $0.50–1.50 合并带）。工具现为定性 FAQ（"Quote separately"）——若加拆除输入框可直接用此带。
- DIY two-part kits $0.85–1.40/board ft（单源）。
- R-value 分区推荐（DOE R-38–R-60）、节能回报（ENERGY STAR ~10–15% 暖冷）→ FAQ 定性引用。

## 挂载

construction hub。互链（工具 related）：material-cost-estimator、contractor-hourly-rate-calculator、drywall-repair-cost-calculator、painting-estimate-calculator。
