# 新词机会研究 · 2026-10-02

**推荐已撤回（2026-10-02 用户复核后修正）。** n8n/HubSpot 品牌计费词不纳入本次非品牌引流短名单。原先将 n8n 排第一没有充分证据：没有证明官网外的任务需求、精确词需求深度或排名增量；产品变更日期不能代替选题验证。下方保留原研究作为审计记录，所有“优先试验”和建页建议均失效。没有词被本轮证实同时满足高搜索量、高 CPC、低竞争。

这是一份选题研究，不构成重做 Main Street Toolbox 的依据。优先级依据新变化、可解决的付费决策、已有替代和证据完整度；不是流量或收益预测。

## 采集与证据口径

- 默认英语、美国；另列英国及法国业务切片，不能混作美国需求。
- 已查矩阵总表和本站词族登记，未重扫旧判死词族。本站库存以小商家、家居服务、餐饮、沙龙计算和报价为主；AI 计费不适合直接塞入本站目录。
- 首轮 32 seeds，2 rounds，2,881 去重词；Google/Bing 各 1,072 请求全部成功。新增概念轮 15 seeds，1 round，604 词；Google 179 成功/1 失败，Bing 180 成功。
- 合并 **3,404 唯一词，88 个完全相同词来自双源**。这只是联想信号；包含品牌导航、大学学分、错误年份、多语种及不相关词。不是 3,404 个可做关键词，更不是搜索量。
- 意图粗分：工具 549、解释/操作 681、对比/商业 407、忽略 103、未分类/观察 1,664；每词只分一类，规则和结果保存于 combined-clustered.json。人工核验只覆盖短名单，未分类池不算合格需求。
- 两批 DDG serp-verify.mjs 已实际执行。首批 6 项、补充 7 项均未得到可靠结构化结果，记录 FAILED；不能把 0 结果当成 0 对手。补充检查使用 IAB 内实际 Google 页面，保留原始快照。
- Google 参数 hl=en / gl=us，但页面跳转 google.com.hk，页尾位置 Unknown。属于一次实际页面观察，不保证美国用户稳定排名。广告、视频、重复链接不作为十个自然结果。没有可靠 URL 清单的查询不做 SERP-overlap 数值聚类。
- 未配置 Bing WMT API key；BWT Keyword Research 页面要求登录。因此所有短名单均标 **量级未排序**，没有 strict/broad 数字。词级 CPC 和本站对应 RPM 均未知。

数据目录：[原始证据](kw/fresh-opportunities-2026-10-02/)。raw.json、emerging/raw.json 保留两轮来源；combined.json 合并 sources，seedHits 是命中累计，不能当不同 seed 数。Google 原始页面保存在 google/；DDG 失败证据在 serp/ 与 serp-emerging/。

## 10 个重点候选词

“推导词”是根据官方变化提出的查询表达，**不是联想接口采到的词**。“观察”不等于已证明可排名。本轮无 T1 已过闸词，以下均为 T3 观察；前四项可共用一个有用的小试验，不能拆四个薄页面。

| 顺序 | 查询词 | 来源/新鲜度 | 当前裁决 | 页面动作与增量假设 |
|---|---|---|---|---|
| 1 | n8n assistant credits calculator | 推导词；Google 页面另出现 calculator free 相关搜索；10-01 额度换算变化 | 🟡 优先试验；精确额度族浅 | 同一预算页的 Assistant 模块：新套餐余额、实际日耗、月中耗尽预测、充值预算；不要预测一个 prompt 必定消耗多少 |
| 2 | n8n gateway credits cost | 推导词；09-17 推出 | 🟡 优先试验；Gateway 精确联想未出现 | 同页 Gateway 模块：模型 token、工具调用、重试/循环和月运行次数预算，引用当前费率 |
| 3 | n8n assistant credits vs gateway credits | 推导词；两套额度混用的解释需求来自官方机制差异 | 🟡 同页辅助查询；未独立验证 SERP | 开头决策表区分“构建助手消耗”与“工作流运行的模型/工具费用”，不要做第三页 |
| 4 | n8n gateway credits vs own api key | 推导词；09-17 支持的支付路径 | 🟡 同页辅助查询；未独立验证 SERP | BYOK/Gateway 成本与账户管理对比；不承诺 Gateway 比厂商 API 更便宜 |
| 5 | hubspot credits calculator | Google 联想实采；04-14 两类 Agent 改按结果计费 | 🟡 观察；不是刚发布的新词 | 仅保留“业务结果数量→额度→充值”的切角；官网 TCO 和第三方成本工具已有，先核验其新费率/额度支持再决定 |
| 6 | payrolling benefits in kind letter template | Bing 联想实采；另一 employee template 表达来自 Google；HMRC 指引 09-23 更新 | 🟡 英国观察；19 词浅族 | 按福利类型和转换情况填写员工通知的需求明确，但 Workmax 已提供模板/就绪工具，普通模板不新建 |
| 7 | uk cbam and eu cbam | Bing 联想实采；英国 2027 生效倒计时，欧盟已进入正式期 | 🟡 英国/EU 对比观察 | 两地区适用性和成本口径对照；先证明比 Steelmath、Kolum 等现有跨区工具多解决什么，头词计算器不新建 |
| 8 | france e invoicing timeline | Bing 联想实采；09-01 首阶段实际落地，09-30 e-reporting 指引更新 | 🟡 法国观察；23 相关词且无双源同词 | 区分接收、开票、交易/付款 e-reporting 的企业行动清单；英语买家需求和法语词池需另核验，通用 checker 已有替代 |
| 9 | machine payments protocol mpp | Bing 联想实采；Stripe/Tempo 03-18 推出 | 🟡 太早；精确族仅 3 词 | 仅保留调试/协议对比研究；MPP-Inspector 已有 CLI+网页控制台，普通 validator 不新建 |
| 10 | agentic commerce protocol example | Google 联想实采；新兴主题，但本轮没有证实最近才发布 | 🟡 太早；精确族 10 词 | 仅观察开发者实施需求；需核实官方样例和现有工具增量，不能靠缩写热度做模板页 |

新鲜度依据产品/政策事件日期；本轮没有 Google Trends 增长证据，不把新发布写成搜索热度正在上涨。

排序 1—4 是同一个新机会的四种表达，并非四个独立市场。5—10 是不同市场的备选，当前证据弱于前四项；没有为凑数把它们写成“低竞争好词”。

## 词族深度：不要拿泛品牌词凑够 30

| 词族 | 相关字符串池 | 双源同词 | 解释 |
|---|---:|---:|---|
| n8n 泛池 | 130 | 1 | 包含下载、自托管、免费 API 等，不能作为 Assistant/Gateway 额度深度 |
| n8n credit/cost/pricing 相关 | 18 | 1 | 双源词是 free open ai credits，并非新 Gateway 额度；细族未过深度闸 |
| HubSpot 泛池 | 160 | 2 | 泛 CRM/品牌需求 |
| HubSpot credits 相关 | 11 | 1 | 含 AWS credit、信用卡、集成歧义；真正额度词更少 |
| Machine Payments Protocol | 3 | 0 | 太早，只有概念与品牌组合 |
| Agentic Commerce Protocol | 10 | 0 | 部分词将 Google/OpenAI 等混写，不能照抄 |
| CBAM 泛池 | 86 | 3 | 可见需求深度；不能移植为 UK/Fertiliser 子族量级 |
| UK CBAM | 20 | 1 | 头词有双源，子族仍浅 |
| payrolling BIK | 19 | 1 | 有真实模板需求，已有直接替代 |
| France invoicing | 23 | 0 | 单源、跨语言，观察 |
| content signals / web bot auth | 各 1 | 各 0 | 过早/过薄，且 Content Signals 首发是 2025-09-24，不是本周新词 |

这里是 grep/正则相关词计数，部分含噪声，不是人工认定的合格变体数；各词池可重叠，不能相加。可复算 audited-family-pools.json。

## 实际竞争观察与淘汰清单

以下是页面观察/竞品存在的证据，不是可靠 DDG top-10 的正式“可打/判死”裁决。由于脚本失败，统一保留 🟡 人工定；可以明确淘汰已知功能完全重合的产品方案。

| 方向 | 看见的实际供给 | 本轮动作 |
|---|---|---|
| n8n Assistant 预算 | Google 有官方额度/消费记录/充值文档、旧 AI 成本工具、TestMu AI 总成本计算器；未观察到明确覆盖昨天新 Assistant 换算与额度预测的独立工具 | 留新额度切角；不称全网空白。官方使用记录和自动充值已解决部分需求，工具必须提供未来预算增量 |
| n8n Gateway 预算 | Google 以官方价格/额度文档、社区公告、定价文章为主 | 留模型+工具调用的月预算切角；也可能因为词太新无人搜，不能直接推断低竞争高需求 |
| HubSpot 全套餐成本 | 实际页面包含 HubSpot TCO、Zeeg、MarketDisrupt、SeldonFrame 等工具 | 不做另一个通用 TCO；新额度模块差异仍待查 |
| CBAM cost calculator | Google 首屏已有 Kolum、Greenly、EarthEmission、cbam-calculator.eu、REACH24h、Senseible 等 | 淘汰通用成本计算器 |
| CBAM 50 tonne threshold checker | cbampulse 等已提供确切阈值工具 | 淘汰只做阈值判断 |
| UK CBAM calculator / registration threshold | Kolum、Steelmath、cbamproof；ukcbam.com/threshold 已提供 £50k 注册阈值工具 | 淘汰简单计算/阈值页 |
| UK CBAM fertiliser | Google 有政府、行业、媒体和 cbamjournal；AIC 行业协会另已提供肥料 CBAM 计算器（07-15） | 不能因 Google 主要是文章就认定没有工具；保留未验证的业务切片，拒绝同款 |
| MPP validator | Google 有协议/Stripe 文档/开源样例；GitHub MPP-Inspector 已有协议全流程调试和签名校验 | 淘汰通用 validator；免安装粘贴诊断是否缺位未验证 |
| payrolling BIK readiness / template | CalcStack、Workmax：就绪检查、转换计算、员工通知模板 | 淘汰通用 checker 和同款模板 |
| Make credits calculator | LiveInAIWorld 已有免费无需登录工具 | 淘汰简单用量→额度计算器 |
| TikTok GMV Max calculator | TecPulse、D2Group、TTCalc、truemargin 等工具 | 淘汰普通盈亏计算器 |
| Roth catch up calculator | FinCalPlus、SwitchWize、catchupcalc.com 等免费工具 | 淘汰普通新规计算器 |
| Lovable credits calculator | lovablecreditcalculator.lovable.app 及 APIcostcalc 对比工具 | 淘汰简单复制 |
| Hermes agent cost calculator | tokenscost.com/agents/hermes 等已覆盖 | 淘汰普通预算页 |
| llms.txt / MCP security / Agent Card / SKILL.md validators | BridgeToAgent、mcptrustchecker.com、agentcard.net、AgentSkills.site 等直接工具 | 淘汰头词泛工具，不把任何 AI 新缩写都建一页 |
| Content Signals validator | Cloudflare 官方已有生成器；CrawlPact 有交叉信号审计 | 淘汰简单 validator，且首发已有一年 |
| France e-invoicing checker | 官方问卷、ToolFoundry、EUInvoice、EInvoiceLab 等 | 淘汰通用资格 checker |
| USPS nonstandard fee calculator | 本次精确族未采到联想；不能把新的体积费调整说成非标费刚变化 | 不推荐 |

部分竞品是网页检索发现后读取其自身说明，尚未逐个操作验证；它们足以否定“没有同类工具”的说法，不足以证明各工具质量或稳定排名。所有旧判决保持历史，不把本轮抓取失败升级为判死。

## CPC 与变现判断

关键词 CPC 未知，搜索量未排序，AdSense RPM 未测。用户支出、厂商每 credit 价格、厂商销售额都不等于广告 CPC。

可参考但不能外推：WordStream 2025 美国 Search Ads 行业基准，16,446 个广告系列，观察期 2024-04-01—2025-03-31；Business Services 中位 CPC $5.58、Finance & Insurance $3.46。它是广告主买点击的历史行业数据，不是本轮关键词 CPC，不是站长 AdSense 收入，也不能说明 AI 额度词比家居服务更赚钱。[方法与原表](https://www.wordstream.com/blog/2025-google-ads-benchmarks)。

n8n/HubSpot 候选面向已经在购买软件的人，有费用决策价值，这是业务推断。可能适合联盟、咨询线索或预算管理功能；每种收入方式均需实际验证，不能因此标“高 CPC”。MPP 的开发者受众可能广告点击少；合规类商业价值可能较强，但数据维护、语言及适用性成本高。

## 已撤回的原试验建议（仅保留审计记录，不执行）

只投入一个 n8n credits budget 页面，1—4 用一个页面承接；这是由共同产品决策形成的页面假设，未取得 URL overlap 证据，不谎称已完成 SERP 聚类。优先评估 AI 主题站（如 whataicando.site）现有目录能否承接；如其目录只讨论 AI 趋势，应先评估栏目契合度。MST 保持小商家主题，procurelink 仅列合规/采购候选，均未建页或部署。

试验的直接价值：根据用户自己的用量估算本月剩余天数、追加预算，并看清助手搭建和模型运行是两份支出。Assistant 使用用户实际每次/每天消耗，不能把工作流执行数乘为 Assistant 费用；Gateway 用官方当前模型及工具费率，并包含失败重试和循环。套餐内余额、购买余额、重置和过期分别建模，所有假设/费率日期可见。Gateway BYOK 比较不声称自带折扣。

验证顺序：

1. 先逐项对照 n8n 官方消费记录/自动充值与 TestMu 工具；若已完整解决上述前瞻预算，则取消重复工具。
2. 整理当前官方费率和可输入的单位，无法核实的服务不填猜测价格。
3. 把报告中的推导词与实采词分别留在词表，补做新细族双源深挖；不能用泛品牌词补深度。
4. 重新获取可审阅的自然前十 URL 后再裁决低竞争，并聚类同页意图；本轮 FAILED 保留。
5. 在有登录的 Bing WMT 用短名单核 strict/broad 词族量；没数据继续标未排序，不虚构数值。
6. 试验仅一个页面，不买新域名、不批量发布年度页。
7. 先验模型和 GA4/GSC 采集，避免再把统计故障当零需求。
8. 发布后按收录→相关查询展现→点击→预算计算完成/返回使用观察；早期没有展现要先查收录，不能直接归因关键词没量。
9. 有真实使用再扩服务/充值方案；没有相关查询或直接用户价值，不扩十页。
10. 收益用实际 RPM/联盟有效转化衡量，再决定是否增加投入；不以一周流量承诺回本。

本轮完成范围为研究与证据留存；上述试验尚未实施。对当前零流量站的修复应继续按 recovery-plan 检查收录/排名和已有展现页，不因为这份新词表整体换站主题。

## 官方新变化来源

- [n8n 10 月 1 日 Assistant 换算调整](https://support.n8n.io/article/fewer-assistant-credits-october-2026)：每 credit 1 美分；套餐数变小但每次请求额度消耗也变小，不是实际使用能力按比例降低；工作流运行不耗 Assistant credits。
- [n8n 9 月 30 日充值发布](https://blog.n8n.io/top-up-your-n8n-assistant-credits/)；[9 月 17 日 Gateway 发布](https://blog.n8n.io/gateway-credits/)：与助手额度分开，价格目标为跟随供应商公开价，不保证比较工具可节省支出。
- [HubSpot 4 月 14 日按结果计费](https://www.hubspot.com/company-news/hubspots-customer-agent-and-prospecting-agent-now-you-pay-when-the-task-is-complete)：本轮没有以官方页面核实“10 月 1 日 EMEA 全新价格”，不使用社区传闻给它加新鲜度。
- [Stripe 3 月 18 日 MPP 发布](https://stripe.com/blog/machine-payments-protocol)；[MPP-Inspector](https://github.com/amgb20/MPP-Inspector)。
- [HMRC 准备指引，09-23 更新](https://www.gov.uk/guidance/draft-guidance-and-legislation-to-aid-preparation-for-reporting-benefits-in-kind-in-real-time/getting-ready-for-mandatory-payrolling-of-benefits-in-kind)：强制部分 2027-04 起；非强制福利的自愿登记服务 2026-11 开放，不能误写所有福利都需登记。替代：[Workmax](https://workmax.co.uk/payroll-hub/mandatory-payrolling-benefits-2027)、[CalcStack](https://calcstack.co.uk/payrolling-bik)。
- [英国 CBAM 注册日期指引](https://www.gov.uk/guidance/work-out-the-date-youll-need-to-register-for-carbon-border-adjustment-mechanism-cbam)、[AIC 肥料供给](https://www.agindustries.org.uk/sectors/fertiliser.html)。
- [欧盟 CBAM 正式阶段](https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-definitive-regime_en)；[09-30 阈值评估](https://taxation-customs.ec.europa.eu/news/cbam-de-minimis-threshold-assessment-2026-09-30_en)：50 吨阈值不是昨天才设立。
- [法国税局时间表](https://www.impots.gouv.fr/professionnel/questions/partir-de-quand-suis-je-concerne-par-la-reforme-de-la-facturation)、[09-30 交易 e-reporting 指引](https://bofip.impots.gouv.fr/bofip/13897-PGP.html/identifiant%3DBOI-TVA-DECLA-20-30-50-20260930)。9 月 1 日所有企业的接收义务和部分大企业开票义务不同，不能写所有小企业同时开票强制。
- [Cloudflare Content Signals，2025-09-24](https://blog.cloudflare.com/content-signals-policy/)：一年前的新概念，不能算本周新词；表达偏好不等于技术阻止所有爬虫。
