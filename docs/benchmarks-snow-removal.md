# Snow Removal Pricing 基准研究（闸 3）— 2026-09-13

> 选题：Snow Removal Pricing Calculator（挂 lawn 行业，10 月上旬季节窗口）。
> 本文只放**有出处**的数字。每个区间标注来源数与一致性；不足 2 源的标 ⚠️，构建轮禁用或默认关闭。

## 引用模型（从业者真实报价方式，多源一致）

雪铲行业三种主流报价模式（Trillium 2026 / FieldPulse / Lingo Group）：
1. **Per-push / per-event**：按次，住宅最常见；商业按 lot 尺寸分档
2. **Seasonal contract**：整季打包，住宅 $350-700；商业常为 2-3 年固定月费协议
3. **Hourly**：零散活/人行道，$40-75/hr

工具模型建议：住宅为主（与站内 lawn/cleaning 受众一致），输入=车道尺寸档（1-2 车 / 2-3 车 / 3+车或 150ft+）+ 坡度 + 人行道附加 + 模式（per-push / seasonal / hourly），输出建议报价 + 健康带。

## 基准区间（引擎默认值来源）

| 项 | 区间 | 来源 | 一致性 |
|---|---|---|---|
| 住宅 per-push，小型（1-2 车） | **$30-40** | LawnLove $30-70/visit；CrewNest $35-75；Thumbtack 1-2 车 ~$35；Jobber $25-75；Reddit 实况 $30 | ✅ 5 源一致 |
| 住宅 per-push，中型（2-3 车） | **$40-60** | Thumbtack 2-3 车 ~$40；InvoiceFly $50-150 按长度；LawnLove 上段 | ✅ 3 源 |
| 住宅 per-push，大型/长车道（150ft+、3 车+） | **$55-75+** | Thumbtack 150ft ~$60；CrewNest 上限 $75；InvoiceFly 至 $150 | ✅ 3 源（上界发散，取保守 $75，页面注明长车道可更高） |
| 住宅 seasonal（整季） | **$350-700** | InvoiceFly $350-700；Angi $300-700（大/坡车道可至 $5,700+，LawnLove） | ✅ 3 源 |
| Hourly（零散/人行道） | **$40-75/hr** | TaskRabbit 全国均 ~$41/hr；Jobber $25-75；LawnLove 人行道 $25-75/hr | ✅ 3 源 |
| 商业 per-push / per-event | **$150-500**（整场服务 $75-200 小型） | CrewNest $150-500+；Angi per-event $75-200 | ✅ 2 源（模型可只做住宅，商业列为 FAQ） |
| 坡度/长度加价 | 定性：更贵（无一致系数） | LawnLove（sloped 显著更贵）；InvoiceFly 按长度 | ⚠️ 无量化来源 → **模型用尺寸档替代乘数**，不做 slope multiplier |
| 深度附加（per-inch add-on） | Angi $10-30/inch（基价之上）；Trillium 商业 $3-10/inch；Reddit 实况重雪 $40 vs 平常 $30 | ⚠️ 两源口径不一（商业模型 vs 住宅加价） → **做成可选参数，默认关**，页面注明常见做法 |
| 商业 seasonal | $3,000-15,000 | Shyft（俄亥俄 Dayton 市场数据） | ⚠️ 单一市场 → 仅 FAQ 提及，不进计算器 |

## 来源清单

- LawnLove 2026 成本指南：https://lawnlove.com/blog/snow-removal-cost/
- Trillium Facility Group 商业定价 2026：https://trilliumfacility.com/commercial-snow-removal-cost/
- Angi 年度合同成本 2026：https://www.angi.com/articles/how-much-does-annual-snow-removal-contract-cost.htm
- FieldPulse 报价公式指南：https://www.fieldpulse.com/resources/blog/how-to-bid-snow-removal-pricing-formula-guide
- Lingo Group 定价模型解释：https://www.lingogroup.com/snow-management-tips/commercial-snow-removal-pricing-explained/
- CrewNest 2026 定价指南 / Thumbtack 2026 估算 / InvoiceFly 2026 / Jobber / TaskRabbit（经搜索聚合，关键数字如上引用）

## 闸 3 结论

**通过**。核心区间（尺寸三档、seasonal、hourly）均有 ≥2 一致来源；两个 ⚠️ 项按上述方式保守处理（尺寸档替代乘数、深度附加默认关）。模型贴真实决策（per-push 分档 + seasonal + hourly 三模式），符合 worth-doing-bar 闸 3。

## 构建轮备忘

- 挂 lawn 行业页 + tools 自动挂链（注册 TOOLS 即可，非 bespoke 也行——但按 MST 规矩新工具值得 bespoke；至少做到问题式 H2 + 首段直答，顺手实践 GEO citability 规范）
- title 瞄准词簇：snow removal pricing calculator / snow removal cost calculator（词报告 v3 信号：commercial/formula/per hour 多变体）
- 基准表 + per-inch 附加做成 FAQ/explain 素材（带来源句式 "According to Angi 2026…"——GEO 统计密度加分项）
- 上线后 IndexNow + llms.txt 增补该条目
