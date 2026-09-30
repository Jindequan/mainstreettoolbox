# Benchmarks — Carpet cleaning（预研，2026-09-30）

状态：**基准预研完成，T2 构建待音量验证**（Bing WMT 窗口恢复后跑 "carpet cleaning" 官方数字；R6 词族 28 词，"cost for 2/4 bedroom" 长尾具体词形）。验证过闸 → 直接按本文档构建 per-bedroom 计算器。

## 核心基准（≥2 源）

| 项目 | 区间 | 来源 |
|---|---|---|
| 每房间（标准清洁，不含移家具） | **$25–75/room** | EasyClean 2025；ProMatcher NY 均值 $58.60（$52–65）|
| 每平方英尺 | **$0.20–0.50**（特种毯更高；都会区 $0.35–0.75） | EasyClean；ContractorPlus（$0.20–0.40 标准）|
| 2–3 bedroom 整屋 | **$100–500**（深度/除敏处理走上沿） | 整屋聚合（EasyClean 等）|
| 4 bedroom 整屋 | **$250–500+** | 同上推算带 |
| 1 bedroom | $120–180（NYC 2026 全包口径，偏高） | NYC 指南 |

## 加价项（定性进 FAQ，不进计算）

- 宠物异味处理、防污涂层、移家具——加收但无全国统一区间
- 地区差：都会显著高（NYC 示例）

## 计算器模型草案（验证过闸后用）

rooms select（1–6+）× 每房间价带 + 可选 add-on 开关 + sqft 交叉校验；输出低/典型/高三档。

## 验证层判读（2026-09-30，Bing WMT API 批验）

**未过闸**：cost 头词及全部 cost 变体 strict=0/90d（数据 docs/keyword-data/bing-api-2026-09-30.md）。家族层意图不在价格信息（near-me/品牌/设备主导）→ **不建独立计算器 URL**；基准数字转作对应行业预设（handyman/cleaning）素材。待 GSC 侧出现直指量再复议。
