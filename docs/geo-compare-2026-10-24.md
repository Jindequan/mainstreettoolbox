# MST GEO Compare — 2026-10-24（vs 基线 2026-09-12）

> 方法：geo-baseline-2026-09-12.md §下次 compare 判据三条 + citable/readable 层脚本量测（dist 81 页）+ 线上安全头实测 + AI 引用初验（WebSearch 2 目标词）。

## 1. Citable/Readable 层量测（脚本客观计数）

| 指标 | 基线（09-12） | 今测（10-24） | 判读 |
|---|---|---|---|
| 问题式标题 | **全站 0 个** | **153 个**（问句 H2 ×15 + 问句 H3 ×138），56/81 页覆盖 | ✅ 结构性缺口清零（10-01 批次兑现且存活） |
| BreadcrumbList | 0 | 41 页 | ✅ 已铺 |
| FAQPage schema | 3 页（当时修复的定制页） | 61 页 | ✅ |
| WebApplication schema | ~0 | 51 页 | ✅ |
| 页面含数据表格 / FAQ 折叠 | 少量 | 49 / 63 页 | ✅ 数据密度结构化 |
| llms.txt | 当日补 | 在 ✓ | 保持 |
| robots AI 爬虫显式行 | 当日补 | 5 个 UA 行 ✓ | 保持 |
| 安全响应头 | 未测（CSP 遗留） | **CSP 已上线**（default-src 'self'+unsafe-inline）+HSTS+nosniff+SAMEORIGIN+referrer-policy 全在 | ✅ 遗留项关闭 |

**内功结论：基线遗留改进项 6 条中 5 条已闭环**（问题式 H2/自包含段落/food-cost 加厚/BreadcrumbList/安全头；YouTube 频道已建但视频内容被用户禁令冻结）。按基线六类评分口径，AI Citability 与 Structured Data 两类应有显著跃升（估 citability ~55→70+，structured ~60→75+，非精确重评）。

## 2. AI 引用初验（基线 compare 判据第 3 条）

- `house cleaning cost calculator`：7 结果 **MST 缺席**。且 SERP 出现 9 月没有的 4+ 个新免费计算器（Clean Estimator/ShiftFlow/LeadDuo/InvoiceFly）。
- `snow removal pricing calculator`：8 结果 **MST 缺席**（CrewNest/Homewyse/InvoiceMama/ToolChunks/Ventrac 全是工具位；10-03 时 MST 曾被提及）。

## 3. 三句话结论（喂 11-07 总死线判读）

1. **内功全绿**：基线遗留 5/6 闭环，内容质量层按方法论口径全面进步——「落地不完善」的指控已不成立。
2. **战场恶化**：两个目标词的工具位竞争者数量比 9 月明显增加，MST 从「被提及」退到「缺席」——在零引用域的条件下，内容进步被竞争稀释吞掉。
3. **11-07 预判收紧**：方向假设的失败不在内容质量维度（本 compare 证明），在权威维度（引用域 0 + SERP 拥挤度上升）。判负分支（cost 计算器停建→存量深化+收入路径）与 10-21 冻结令一致，应按期执行且不应因「内容已变好」而心软——数据说变好的是内功，没变好的是位置。

## 4. 遗留（下轮）

- YouTube 实体层：等用户对视频线的裁定（10-01 禁令在案）。
- 品牌 entity 层（Wikipedia/Reddit 量变）：外线依赖，不在 MST 站内可解。
