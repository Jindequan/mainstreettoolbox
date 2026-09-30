# Benchmarks — TV mounting（预研，2026-09-30）

状态：**基准预研完成，T2 构建待音量验证**（Bing WMT 窗口恢复后跑 "tv mounting cost" 官方数字；R6 词族 "tv mounting cost" bing+google 双源命中，"near me" / "costco" 变体）。验证过闸 → 按本文档构建 per-size 计算器；若验证判弱族 → 基准吸收进 handyman 预设 H2/FAQ（不开新 URL，反 doorway 正确形态）。

## 核心基准（≥2 源交叉）

| 项目 | 区间 | 来源 |
|---|---|---|
| 人工费（labor only，标准干挂） | **$150–400** flat | HomeGuide（2025-01 更新，natl avg $275）；Angi $153–353 落在区间内 |
| 含支架总价（mount+labor） | $165–900 | HomeGuide；GeeksOnSite $165–900（avg ~$254） |
| 主流成交价 | ~$117–227（多数 ~$162） | Thumbtack |
| 安装时薪 | $75–100/hr（handyman $50–80；电工 $50–130） | HomeGuide |
| 标准支架干挂（木/石膏板） | $100–200 | Home Depot Pro Referral |

## 尺寸分档

| TV 尺寸 | 人工（TaskRabbit 2026 指南，**单源**） | 支架硬件（HomeGuide，unit only） |
|---|---|---|
| <35" | — | $15–200 |
| 35–55" | — | $20–300 |
| 55–65" | $180–350 | $25–400 |
| 65"+ | $250–400+ | $60–500 |

## 加价项（HomeGuide；单源细项标注）

- 藏线（in-wall A/V）：加收，无全国统一区间 → 定性进 FAQ
- 新增插座：**$150–350**（HomeGuide 单源，进 FAQ 不进 compute）
- 砖/石/混凝土墙、壁炉上方：显著加价 → 定性
- 大量施工垃圾清运：$150–350 → 不进 compute

## 计算器模型草案（验证过闸后用）

TV 尺寸 select（4 档）× 支架类型（fixed/tilt/articulating 微调）× 墙体（drywall/brick-concrete 上浮）+ 藏线/插座开关（标注单源）→ 输出人工+支架低/高带。默认含支架（用户问"cost"通常含硬件）。

来源：homeguide.com/costs/tv-mount-installation-cost（2025-01）；angi.com/articles/how-much-does-buying-and-repairing-tv-cost（2026 data）；thumbtack national avg；TaskRabbit 2026 guide（尺寸档单源）。

## 验证层判读（2026-09-30，Bing WMT API 批验）

**未过闸**：cost 头词及全部 cost 变体 strict=0/90d（数据 docs/keyword-data/bing-api-2026-09-30.md）。家族层意图不在价格信息（near-me/品牌/设备主导）→ **不建独立计算器 URL**；基准数字转作对应行业预设（handyman/cleaning）素材。待 GSC 侧出现直指量再复议。
