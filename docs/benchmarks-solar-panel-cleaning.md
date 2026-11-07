# Benchmarks: Solar Panel Cleaning Cost（2026-11-07 立项闸 3）

> 立项依据：R11 唯一候选（服务形态 `solar panel cleaning` 500 strict/90d，价格词形 Bing 盲），
> round 46（10-28）Google 侧验证转正 T1——计算器词形 SERP 0/6 计算器（Yelp 报价单为最接近形态）。
> 本轮（11-07，round 55）构建前重新具名核数，全部区间 ≥2 源。工具：`/cleaning/solar-panel-cleaning-cost-calculator/`。

## 核心带（每带 ≥2 具名源）

| 带 | 采用值 | 来源 |
|---|---|---|
| 每块面板（installed clean） | **$10–20 / panel** | HomeGuide $10–20（solar-panel-cleaning-cost 专页）；SolarReviews $5–15（大系统下沿）；湾区高成本都会 $10–25 上沿 |
| 单次上门总价 | **$150–500 / visit**（典型住宅） | HomeGuide $150–500、均价 $325；SolarCleanHub 2026 指南 $150–500；SolarReviews $100–300 与之重叠；Yelp flat $95–350 均值 $200；Thumbtack $142–310 均值 $209 |
| 上门最低收费 | **~$150** | SolarCleanHub 带下沿 $150 ∩ r/solar 从业者实价（$9/panel + $150 minimum） |
| 高难工況（两层/陡坡/专队） | **$500–1,000 / job** | SolarCleanHub 2026 指南（dedicated cleaning teams / hard access）；HomeGuide 列 roof height/accessibility 为首要定价因子（与上带衔接） |
| 频率与回收 | **每年 2 次 ≈ 恢复至多 20% 效率损失 ≈ $150+/年 电费回收** | HomeGuide（twice a year … recoup roughly $150+） |
| 诚实锚点（反向真相） | **多数多雨气候区清洗不回本**；NREL 全球年均 soiling 损失仅 ~3–4%；重尘区损失可超 20%（5–25% 带） | UC San Diego 大样本研究（行业转述）；NREL（energy-solutions.co 转述）；solarishydrobotics（15–25% 低效带） |

## 口径陷阱（本工具立足点，沿用 garage 门弹簧方法论）

1. **聚合源在「每块」vs「每次上门」之间摇摆**——模型固定为：每块面板安装清洗价 × 面板数，并钳位 $150 上门最低收费。
2. **$131–165/panel 级的极端报价**属检测打包/维修捆绑假口径 → 不进计算，不入册。
3. **子带拆分是建模决定（非新数字）**：`light $10–15 / typical $10–20 / heavy $15–20` 全部是 HomeGuide $10–20 带内的拆分
   （轻尘=带下半，重尘鸟粪水垢=带上半），SolarReviews $5–15 只作大系统下沿解释，不单独成带。
4. **高难工況 $500–1,000 是「整单带」**：access=hard 时对整单钳位 `max(lo,500)/max(hi,1000)`，与 SolarCleanHub 口径逐字对应。
5. UCSD 反向真相是差异化主叙事：SERP 竞品全是纯成本文章，无人告诉读者「多雨区可能根本不用洗」——verdict 区承载。

## 词形

- 头词：`solar panel cleaning`（500 strict 服务形态）+ Google 侧 `solar panel cleaning cost` 文章群词形。
- 计算器词形 SERP 0/6（round 46 双查），slug/title 承接 `solar panel cleaning cost calculator`。
- description 锚点纪律（leaf-removal 手术教训）：$10–20 / $150–500 两锚点必须在前 80 字符。

## 来源清单（本轮 11-07 实查）

- HomeGuide — homeguide.com/costs/solar-panel-cleaning-cost（$10–20/panel、$150–500/visit、avg $325、2×/yr 20%/$150+）
- SolarReviews — solarreviews.com/blog/solar-panel-cleaning（$5–15/panel、$100–300/visit；UCSD 研究转述）
- SolarCleanHub — solarcleanhub.com/resources/solar-panel-cleaning-cost（$150–500/visit、$500–1,000 hard access、2026 指南）
- Yelp / Thumbtack 成本页（avg $200 / $142–310，均值 $209）
- r/solar 从业者帖（$9/panel + $150 minimum 实价例）
- NREL soiling ~3–4%/yr + 5–25% 输出损失带（energy-solutions.co / solarishydrobotics.co 转述）
