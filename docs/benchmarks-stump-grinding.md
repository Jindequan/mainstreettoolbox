# Benchmarks — Stump grinding（预研，2026-09-30）

状态：**基准预研完成，T2 构建待音量验证**（Bing WMT 窗口恢复后跑 "stump grinding" 官方数字；R6 词族 24 词，tree service 邻接，MST 核心 Sweaty-Startup 受众）。验证过闸 → 按本文档构建 per-inch 计算器。

## 核心基准（≥2 源）

| 项目 | 区间 | 来源 |
|---|---|---|
| 每英寸直径 | **$2–5/inch**（HomeGuide $2–6 与 Angi $2–5 采信重叠区；basic $2–4 / standard $4–6 分档） | HomeGuide；Angi；Woodland Mills；密歇根区域 $3–5 |
| 单桩典型 | **$175–475，均值 $325** | Woodland Mills |
| 单桩（第二源） | **$131–438，均值 $272** | LawnStarter |
| 最低收费 | **$100（flat，Angi）**；区间 $80–160 | Angi；HomeGuide；Monkeyman's（$100–150 trip）|
| 大桩（24–36"） | $300–900 | Monkeyman's |
| 整日打包 | $800–1,600 | Woodland Mills |

## 加价项

- **清运木屑 +30–50%**（grind-only ~$200–250/桩 vs 带清理 $400–500，Reddit 从业者口径——单源，标"从业者口径"进 FAQ）
- 密度硬木、进出场难（围栏/坡地）抬价——定性

## 计算器模型草案（验证过闸后用）

直径 inches 输入 × $2–5/inch → 与最低收费 $100 取 max → 多桩逐行（同页批量=常见询价形态）→ 可选清运开关（+30–50% 标从业者口径）。

## 验证层判读（2026-09-30，Bing WMT API 批验）

**未过闸**：cost 头词及全部 cost 变体 strict=0/90d（数据 docs/keyword-data/bing-api-2026-09-30.md）。家族层意图不在价格信息（near-me/品牌/设备主导）→ **不建独立计算器 URL**；基准数字转作对应行业预设（handyman/cleaning）素材。待 GSC 侧出现直指量再复议。
