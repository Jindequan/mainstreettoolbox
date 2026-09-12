# MST GEO 基线审计 — 2026-09-12

> 方法论：docs/GEO-SEO方法论学习笔记-v1.md（geo-seo-claude 四层漏斗 + 六类评分）。
> 本报告 = compare 工作流的基线存档。**一个月后（10 月中旬）重跑审计出 delta 报告。**
> 数据全部为当日实测（curl 伪装 UA、页面抓取、段落级统计），非工具自动跑分。

## 四层漏斗结论

| 层 | 结论 | 证据 |
|---|---|---|
| **Findable** | ✅ 全绿 | robots.txt 通配放行；GPTBot/OAI-SearchBot/ChatGPT-User/ClaudeBot/PerplexityBot/Bytespider/Googlebot 七个 UA 实测全 200（无 WAF 403，推文作者翻车点不存在）；sitemap-index 200；llms.txt 404（当日已补） |
| **Readable** | ⚠️ 大体好，有死角 | 全站 SSG、正文服务端渲染、无 noindex/X-Robots-Tag；但 restaurant 3 个定制页 FAQ 完全不渲染（连用户都看不到，注册表 FAQ 是死数据）且零 schema（当日已修）；首页零 schema（当日已修） |
| **Citable** | ⚠️ 有底子，欠结构 | 数据密度优秀（每页 49-65 个数据点）；定义句式有（1-3 处/页）；**全站 0 个问题式 H2**；最优长度自包含段落仅 2-3 段/页（目标：多数段落）；llms.txt 缺失（当日已补） |
| **Sufficient** | ⚠️ 分化 | 通用路由页 552-835 词尚可；food-cost 定制页仅 212 词、0 表格，是全站最薄的主力页（竞品基准 1500-3000 词）；首页 248 词（实体信息少） |

## 六类评分（基线 → 当日修复后，LLM 按规则判分，±3 分噪声）

| 类目 | 权重 | 基线 | 修复后 | 主要缺口 |
|---|---|---|---|---|
| AI Citability & Visibility | 25% | ~42 | ~55 | llms.txt 0→90；问题式 H2 与自包含段落仍缺 |
| Brand Authority | 20% | ~8 | ~8 | 品牌实体存在感≈0（见下） |
| Content & E-E-A-T | 20% | ~50 | ~50 | 无作者页/About/署名；基准数字有交叉来源 ✅ |
| Technical | 15% | ~80 | ~85 | SSG ✅；安全响应头未测（下轮补） |
| Structured Data | 10% | ~35 | ~60 | Organization/WebSite 补齐；仍缺 BreadcrumbList、Person、speakable |
| Platform Optimization | 10% | ~40 | ~40 | ChatGPT 实体层弱；Bing WMT/IndexNow ✅（已在用） |
| **GEO Score** | | **~42/100 Poor** | **~48/100** | |

## 当日已实施的修复（quick wins）

1. **restaurant 3 定制页**（food-cost / menu-engineering / tip-out）：补服务端 FAQ 区块（复用全站 `.faq` 样式与「Questions owners ask」模式）+ FAQPage + WebApplication JSON-LD。此前这 3 页 FAQ 连用户都看不到（BESPOKE 页不走 ToolLayout，注册表 faq 为死数据）。
2. **首页**：补 Organization（含 sameAs: ko-fi.com/devinjin、github.com/Jindequan）+ WebSite JSON-LD。此前全站无 Organization 实体标记。
3. **llms.txt**：按规范生成（30 条目、绝对 URL、事实性描述、Key Facts、Contact），放置 public/llms.txt。
4. **robots.txt**：显式放行 10 个 AI 搜索爬虫（Tier1+2）、封 Bytespider，保留通配与 sitemap 行。

## 品牌实体层现状（GEO 最大欠账）

- Wikipedia/Wikidata：本轮 API 网络不通未能验证，下轮复查（预期：不存在——新品牌正常状态，不硬上，等有二手报道）
- Reddit：r/cleaningbusiness 已有 6+ 条纯价值答题（无品牌提及，遵守版规）——**这是实体层的种子，量变到质变需要持续**
- YouTube：无频道（GEO 学习结论：与 AI 引用相关性 0.737 的最强信号，中期最值得开的资产）
- LinkedIn：无公司页
- sameAs：今日补 Ko-fi + GitHub（2 平台，评分标准 5+ 平台含 Wikipedia 才满分——不硬凑）

## 遗留改进项（下轮 / 内容批次）

1. **问题式 H2**：工具页 explain 区改写为「问题式标题 + 首段直答」结构（citable 层最大结构性缺口，配合 T1 词簇做）
2. **自包含段落**：关键段落改写到 50-200 词最优区间、显式点名主语（数据密度已够，是排版问题不是研究问题）
3. **food-cost 定制页加厚**：212 词 → 600+ 词（基准表 + 常见误区段），它承载 app 词簇
4. **BreadcrumbList schema**：全站工具页通用补
5. **安全响应头检查**：HSTS/CSP 等未测
6. **YouTube 频道**：3-5 条工具讲解视频（中期，实体层最强信号）

## 下次 compare 判据（10 月中旬）

- llms.txt / schema / FAQ 修复是否被收录（site: 检查 + GSC）
- GSC 展现趋势（对齐「两周 10 自然点击」判据，09-22 中检）
- AI 引用初验：Perplexity/ChatGPT 搜 3-5 个目标词（如 "house cleaning cost calculator"）看是否出现
