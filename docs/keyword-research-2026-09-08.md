# 关键词研究报告 — mainstreettoolbox.com(2026-09-08,GSC 验证增量版)

**与 09-06 报告的关系**:09-06 全站扫描(30 种子 / 9,522 词)是基线;本次是 **GSC 真实查询数据驱动的定向增量**——种子全部来自 Google 实际带出本站的查询词族,用于验证哪些词族 Google 已经在给展现、以及往哪个方向补采。

**本次数据**:
- **GSC 真实数据**(2026-09-08 从 Search Console 读取):
  - 最近 24 小时:**75 次展现、0 点击、平均排名 72.8**(今天真实起量;长周期视图因 GSC 2-3 天数据滞后仅显示 10 次)
  - 热门查询(24h):lawn care estimate(6 次)、retail calculator(4)、retail markup calculator(4)
  - 热门查询(3 个月,平均排名 30.5):house cleaning cost calculator、lawn care estimate calculator、move out cleaning cost calculator(各 1 次)
- **定向补采**:24 个种子(全部来自上述 GSC 验证词族),两轮 Google+Bing 自动联想,**3,449 个去重词**(Google 2,542 次查询成功 / Bing 2,544 次成功,双源全通)。原始数据 `docs/kw/out-2026-09-08/raw.json`。
- **诚实声明**:联想词 = 真实用户在搜,但**不含搜索量数字**。信号强度 = 双源收录 × 种子广度(seedHits)。短名单请用 Keyword Planner 复核。

---

## GSC 核心结论:展现已经来了,卡在"标题匹配 + 排名深度"

Google 已经在把 5 组查询带给本站,且**全部命中已有页面**——方向对了,问题是:① 平均排名 30.5~72.8(第 3~7 页),② 0 点击说明标题/内容与查询词还有错位。**第一步不是建新页,是把这几页的 title/H1 对准实际查询词**,让已有的展现先变成第一批点击。

| GSC 实际查询 | 对应页面 | 现标题问题 | 动作 |
|---|---|---|---|
| house cleaning cost calculator(排名~30) | cleaning-estimate-calculator | 标题无 "house cleaning" 无 "cost" | **改 title/H1**:"House Cleaning Cost Calculator — Free Estimate Tool" |
| lawn care estimate / calculator(30~73) | lawn-care-estimate-generator | 匹配良好,新收录排名深 | 不动 title,加 estimate template 导出吃模板词 |
| move out cleaning cost calculator(排名~30) | cleaning-estimate-calculator | 页面无 move-out 场景 | **加 move-out/deep-clean 模式小节**(见下) |
| retail calculator / retail markup calculator | retail-markup-calculator | 匹配良好 | 加 "how to calculate retail price" 公式小节 |
| lawn mowing price(联想验证) | lawn-mowing-price-calculator | 采集显示 "lawn mowing **cost** calculator" 信号更强(2源/10种子) | title/H1 补 "cost" 一词 |

---

## 与 09-06 报告的差异(新增/上升词族)

- **🆕 retail math 族(97 词,25 个双源——本次全库双源密度最高)**:retail math calculator / retail math cheat sheet pdf / retail math formulas。09-06 报告完全没有这个词族,GSC 今天带出 retail calculator 说明 Google 已在把本站归入 retail math 语义场。**这是本次最大新发现。**
- **🆕 move out/in cleaning 族(85 词)**:move out cleaning cost calculator(正是 GSC 查询)/ move in cleaning cost calculator / how much does move out cleaning cost。09-06 只报了 house cleaning 泛族。
- **🆕 deep cleaning cost 族(98 词,扣除牙科后 ~60 词有效)**:deep cleaning house cost calculator / deep cleaning cost per hour。
- **🆕 keystone pricing(16 词,5 双源)**:keystone pricing formula / examples / meaning——retail-markup 页的天然内容小节。
- **⬆️ 确认加强:house cleaning(268 词)/ lawn care(212 词)/ lawn mowing(177 词)**——比 09-06 同族广度显著扩大,且 GSC 真实展现背书。house cleaning estimate template free(2源/10种子)验证了 09-06 的"模板意图"判断。

---

## Top 10 机会(按 GSC 验证 × 信号强度 × 可赢性)

| # | 关键词 | 簇 | 信号 | 页面 | 动作 |
|---|---|---|---|---|---|
| 1 | house cleaning estimate calculator(2源/11种子)+ house cleaning cost calculator(GSC) | tool | 全库最高种子广度 | cleaning-estimate-calculator | 改 title 加 "house cleaning cost";**今天就能做** |
| 2 | lawn care cost calculator(2源/12种子,全库最高 seedHits) | tool | 双源+最广 | lawn-care-estimate-generator / lawn-mowing-price-calculator | 两页 title/H1 分头覆盖 cost/estimate 词形 |
| 3 | move out cleaning cost calculator(2源/5种子,= GSC 查询) | tool | GSC 已验证 | cleaning-estimate-calculator | 加 move-out 模式(按卧室数/平尺),小节 title 带 move out |
| 4 | free lawn care estimate template(2源/9种子) | tool | 模板意图,SERP 弱 | lawn-care-estimate-generator | 加可打印模板导出(= 09-06 T2-2,本次 GSC 背书,提级到 T1) |
| 5 | retail math calculator / cheat sheet(97 词,25 双源) | tool | 新词族 | **新页:Retail Math Calculator + Cheat Sheet** | 见 T2-1 |
| 6 | how to calculate retail price from cost(2源/7种子) | how-to | 双源强 | retail-markup-calculator | 加公式小节(retail price = cost ÷ (1 − markup%)) |
| 7 | house cleaning estimate template free(2源/10种子) | tool | 模板意图 | **新页或 estimate 页内模块** | 可打印 cleaning estimate template PDF |
| 8 | deep cleaning cost calculator(2源/2种子,族 60 词有效) | tool | 长尾无强对手 | cleaning-estimate-calculator | 加 deep-clean 模式小节 |
| 9 | free lawn mowing cost calculator(2源/10种子) | tool | 双源 | lawn-mowing-price-calculator | title 补 "cost calculator";加 per acre/hour 价格表 |
| 10 | keystone pricing formula / examples(16 词) | how-to | 全双源小众 | retail-markup-calculator | 加 keystone pricing 内容小节,顺手吃掉 |

---

## T1 快赢(现有页面,1-2 天)

- **cleaning-estimate-calculator**(本次最大机会页,吃下 #1/#3/#8 三组词):title 改 "House Cleaning Cost Calculator";页面加三个场景模式:标准 / **move-out** / **deep-clean**,每个模式一段 50 字说明 + H3。加价格基准表(per hour / per sq ft / per bedroom)。
- **lawn-care-estimate-generator**:加可打印 estimate template 导出(PDF);标题已含 "lawn care estimate" 不动。
- **lawn-mowing-price-calculator**:title/H1 补 "cost";加 average lawn mowing cost 价格表内容(15 词族:average lawn mowing cost / per acre / per hour)。
- **retail-markup-calculator**:加 "how to calculate retail price" 公式小节 + keystone pricing 小节。
- **how much to charge for lawn mowing**(2源/4种子 + "charge lawn" 13 词):并进 lawn-mowing 页 FAQ。

## T2 建新页(附为什么能赢)

1. **Retail Math Calculator(全公式交互 + cheat sheet PDF 下载)** — 97 词、25 双源、全库双源密度最高。为什么能赢:SERP 实查(2026-09-08)全是公式文章(Toolio/RetailDogma/LiveAbout)和一家小众站 retail-calculators.com,**没有大站的交互式 all-in-one 计算器**;本站已有 markup/margin/discount/break-even 组件可直接拼装,内链现成。
2. **House Cleaning Estimate Template(可打印 PDF)** — 2源/10种子。为什么能赢:SaaS 竞品(Jobber/Connecteam)全做 calculator 不做 printable template,模板意图词 SERP 是 Etsy/Pinterest 弱页。
3. (维持 09-06 建议)通用 Free Invoice Generator、Booth Rental Agreement Template——本次采集未覆盖这两个族,维持原判。

## T3 观察

- house cleaning cost calculator **头部词本身**:SERP 实查被 Jobber/Connecteam/Invoice Fly 等高 DR SaaS 免费工具页占满,先靠长尾变体(#3/#7/#8)爬,不直接打头部。
- software for lawn care estimates(11 词,SaaS 意图)、most affordable house cleaning app(比价平台意图)。
- lawn care estimate near me / near florida 类本地词。

## Ignore(不再争论)

- **teeth/dental cleaning(127 词,本次最大污染源)**:牙科服务意图,不是清洁生意,整族丢弃。
- 品牌生态(quickbooks/home depot/lowes 等)、招聘薪资、非美国locale、教育意图(shopping math worksheets)。

## 下一步动作(按顺序,对应"如何推进")

1. **今天**:改 cleaning-estimate-calculator 的 title/H1(GSC 已在给展现,0 点击卡在匹配)。
2. **今天**:retail-markup-calculator 加 how-to-calculate-retail-price 公式小节(GSC 查询 retail calculator 在排名 72.8,内容补齐会爬升)。
3. **本周**:cleaning-estimate-calculator 加 move-out / deep-clean 模式;lawn-mowing 页补 "cost" 词形 + 价格表。
4. **本周**:lawn-care-estimate-generator 加 estimate template 导出(GSC 背书的模板意图)。
5. **下周**:建 T2-1 Retail Math Calculator 页(本次最大新词族)。
6. 每周读一次 GSC 24h 视图,新增查询重复本流程;两周后复盘:**判据 = 自然点击 ≥ 10 次**(现在 0)。
