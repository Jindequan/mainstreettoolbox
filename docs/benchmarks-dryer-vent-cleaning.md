# Benchmarks — Dryer vent cleaning (2026-09-30)

验证层：Bing WMT API 批验（57 词清欠轮）——"dryer vent cleaning cost" **354 strict/90d**，家族层强（dryer vent cleaning 5,573 / how to clean 4,590 / near me 2,217 / services 568）。
**闸 2：计算器真空**——SERP 全是成本指南（六源），无任何交互计算器。

## 核心基准（≥2 源交叉）

| 项目 | 区间 | 来源 |
|---|---|---|
| 标准单次清洁 | **$100–350**（中位 ~$150） | Angi 均 ~$140 · Homewyse $171–392 · Thumbtack $186–510（均 $307）· TopAir $75–340（均 $145）· Gage $100–300 · Brown Chimney 平价 $249 |
| 二楼 vent 加价 | $110–185 | Angi |
| 屋顶 vent | $150–250 | Angi |
| 复杂工况上限 | $350–510 | Thumbtack 上带 |
| 与 duct cleaning 打包 | duct cleaning services 568 strict（族内承接） | — |

## 模型草案

per-vent 基价 × 位置档（地面/二楼/屋顶）× 数量 + duct 打包折价提示。$49 特价陷阱进 verdict 警告（多源共识：低价引流到店后加价）。

## 挂载

cleaning hub（清洁/家政公司加价服务+房主比价双受众）。互链：duct cleaning（若未来建）、gutter-cleaning、cleaning-estimate。
