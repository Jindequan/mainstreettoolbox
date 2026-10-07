# Ahrefs 非品牌关键词研究：2026-10-02

**结论：找到了真实有量的非品牌任务词，也核实了新政策窗口；本轮没有足够证据支持直接重做网站。已完全通过本站准入闸门的新选题为 0，值得继续验证的具体方向为 2。** 这不等于市场没有机会，而是不能把免费工具显示的 Easy、政策新、头词有量，当成高 CPC 和能排名的证明。

本轮实际查询 Ahrefs 免费工具 20 组种子×国家，19 组返回关键词，1 组未返回建议；共 325 行、324 个唯一国家×关键词。排除品牌、新闻、当地服务、异义与错误市场等 113 行后，剩余 **211 个候选**，候选不等于推荐。另保存 **10 组实际 Google 搜索页面**，检查了最接近的工具与模板。美国是本站主要市场；英国、澳洲候选属于地区扩展，必须单独评估，不能共享搜索量或直接替换本站主线。

## API 能不能用、额度有多少

使用 Ahrefs 官方 Python SDK 实测了两个只读接口：

| 接口 | 结果 | 可以得出的结论 |
|---|---|---|
| subscription_info_limits_and_usage | 401 Unauthorized | 无法读取实际套餐、密钥权限、已用/剩余额度、重置时间 |
| keywords_explorer_overview：battery passport / US / 1 行 | 401 Unauthorized | 这把密钥目前无法取得这项关键词数据 |

因此，**当前剩余额度是未知，不是 0；也没有证据说明是额度耗尽。** 套餐、密钥来源、是否过期或所属工作区问题，不能仅凭 401 区分。原始错误见 [subscription-before.json](kw/ahrefs-deep-research-2026-10-02/api/subscription-before.json) 和 [keyword-access-probe.json](kw/ahrefs-deep-research-2026-10-02/api/keyword-access-probe.json)。密钥只在临时进程内存中使用，未保存到代码或报告；该进程已关闭。

按照当前 [Ahrefs API V3 官方说明](https://help.ahrefs.com/en/articles/6559232-about-api-v3)，常规 API 从 Lite 起支持：

| 套餐 | 每月 API/Integrations units | 单请求最多行数 |
|---|---:|---:|
| Free | 未列入常规 API 支持套餐 | 不能推定可任意查词 |
| Lite | 200,000 | 100 |
| Standard | 800,000 | 250 |
| Advanced | 2,000,000 | 500 |
| Enterprise | 定制 | Unlimited |

units 不是请求次数。收费数据请求通常至少 50 units，更多费用取决于行数及字段；[limits-and-usage 接口自身免费](https://docs.ahrefs.com/en/api/reference/subscription-info/get-limits-and-usage)。有限的[免费测试查询](https://docs.ahrefs.com/en/api/docs/free-test-queries)限制目标和关键词，不能据此取得任意商业关键词。没有购买套餐、启用付费加量或建立广告账户。

## 本轮实测结果

来源：[Ahrefs Free Keyword Generator](https://ahrefs.com/keyword-generator)，Google，2026-10-02 查询时选择指定国家。搜索量是界面显示的本地月均估计区间，原样保留。`>100` 不能擅自写成 100–999；不能把相近变体相加。KD 只取得 Easy / Medium / Hard 等分类，未取得 0–100 分数。N/A、空白或 Sign up 均不是低竞争。

| 实際关键词 | 国家 | 月搜索量显示 | KD 显示 | 行动判断 |
|---|---|---|---|---|
| no tax on tips calculator | US | >1000 | Easy | 有明确工具需求；多个免费工具已在，放弃普通克隆 |
| overtime tax deduction calculator 2025 | US | >1000 | Easy | 已有 IRS、Intuit、Fidelity 与独立工具，2025 年份也不能当成 2026 新机会 |
| overtime tax deduction calculator | US | >100 | Medium | 不能把带 2025 的量移植给这条；普通计算器不做 |
| qualified overtime compensation | US | >1000 | Medium | 真实知识需求；可作为后续核验的入口词，尚未证明我们的细分工具可获同等流量 |
| flsa qualified overtime | US | >1000 | Easy | 需要规则解释与工作周计算，专业正确性和竞争均需继续核验 |
| qualified overtime tracking | US | >100 | N/A | 混合软件支持意图；实际 SERP 首条为 QuickBooks 支持，不能当成纯非品牌获客词 |
| w2 code tt | US | <100 | N/A | 2026 报表背景真实；词量小，不能把政策重要性当高量 |
| treasury tipped occupation code | US | >100 | N/A | 普通查询器已有；代码查询不做重复版本 |
| surcharge ban | AU | >100 | Easy | 新规则已开始执行；头词以新闻/政策解释为主 |
| credit card surcharge calculator | AU | <100 | Easy | 精确工具词量较小，已有直接免费产品 |
| cash discount | AU | <100 | Easy | 泛词混入折扣码与会计任务，不能把整池当商家决策需求 |
| digital waste tracking | GB | >100 | Easy | 新执行窗口；仅作英国细分市场候选 |
| digital waste tracking spreadsheet | GB | <100 | 未显示 | 有实际长尾表述，具体校验任务的量仍未知 |
| waste transfer note | GB | >1000 | Easy | 老需求，模板/解释/购买混合；不能移植给新制申报工具 |
| waste transfer note template | GB | >100 | Easy | 官方和多家免费模板存在，不做普通 PDF 模板 |
| labor burden calculator | US | >100 | Easy | 已有免费、即时、多成本输入工具，普通版本不做 |
| booth rent vs commission | US | >100 | Easy | 与本站现有页面一致；适合继续评估存量改进，不另起同款 |
| fall cleanup prices | US | <100 | 未显示 | 精确报价词未证实高量；已有价格计算器 |

`surcharge ban calculator` / AU 未返回建议，记录为 **no_keyword_ideas**；不能写成月搜索量 0。`battery passport` / US 为 <100、Medium，`packaging epr` / US 为 >100、Hard；两池含大量新闻词，不进入优先工具清单。

**所有词的 CPC、实际增长曲线、竞争页面流量、UR/DR 和引用域数据均未取得。** 因此本报告没有“高 CPC”“已验证持续增长”或“低自然竞争”的推荐。更新于 1 天前表示指标更新，不表示这个词昨日才出现。[完整清洗表](kw/ahrefs-deep-research-2026-10-02/clean-keywords.csv)保留缺失值。

## 为什么很多 Easy 词仍然不做

| 方向 | 实际竞争证据 | 对原先方案的影响 |
|---|---|---|
| 小费税扣除 | 实际 Google 页面有 OnPay、PaycheckCity、Plootus、YourIncomeCalculator、Jupid 等；包含工资预扣与年度扣除的不同任务 | Easy 不能消除免费工具供给；先区分任务，拒绝泛扣除计算器 |
| 加班税扣除 | 实际 Google 页面含 IRS、Intuit、Fidelity 与独立计算器 | 不能称弱站占位；年份差异不是独立机会 |
| 加班记录 | [QualifiedOvertime 当前模板页](https://qualifiedovertime.com/templates/)有免费 CSV，无账户/邮箱要求；付费扩展包尚未可直接购买。[NicheToolkits](https://nichetoolkithub.com/p/tax-deduction)展示付费记录、TT/TP 对账与更正请求功能 | “无注册模板”和“工资单对账”均非从未有人做；不能重复宣传成空白 |
| 澳洲附加费 | [Compayr](https://compayr.com.au/surcharge-calculator)实际无需登录计算，已有 PDF、打印、复制和分享；输入月卡收入 40,000、费率 1.5%，显示月 600、年 7,200 | 导出 PDF/打印不能作为新卖点 |
| 现金折扣 | [MerchantCompare](https://merchantcompare.com.au/articles/cash-discount-surcharge-ban)已有免费折扣损益和既有现金客户成本模型；[Insightful Sums](https://insightfulsums.com/blog/how-to-price-services-surcharges-banned/)已有服务定价输入 | “禁附加费后怎么办”的基础模型已存在；普通现金折扣计算器不做 |
| 英国废物表格 | [Weave 校验器](https://weavecomply.com/tools/spreadsheet-validator)实际要求公司名、工作邮箱，并同意被联系；可见检查覆盖必填字段、代码与跨表引用 | 修正此前仅凭简介作出的判断：免费不等于无门槛。隐私/免留资可作为待验证的具体增量 |
| 废物交接单 | 实际 Google 页面有 Ealing Council、The Waste Group、Crate、QWTN、GOV.UK 等免费模板与指引 | 新数字申报制度没有自动淘汰旧 WTN，不能卖“替换全部旧表单”的错误方案 |
| 沙龙分成/人工负担/季节服务报价 | HairSalonPro、SilverTaza、SiteAnchor、BuildMetric、MarginWrench、ColdDay、Okason 等直接工具已发现 | 品类贴合本站不等于同款值得再建；没有据此判死整个词族 |

证据优先级：当前实际浏览器页面高于缓存的搜索摘录。QualifiedOvertime 的缓存资料还描述“索取模板包”，但本轮当前页面已提供免费 CSV，因此以当前页为准。Weave 的指南简介说免费，实际提交页有留资门槛，因此不能称其匿名即用。未上传工资记录或业务文件，也未提交联系人信息。

实际 Google 证据保存在 [google/](kw/ahrefs-deep-research-2026-10-02/google/)，工具快照在 [products/](kw/ahrefs-deep-research-2026-10-02/products/)。浏览器转到 google.com.hk，查询携带 gl=us/gb/au，设备位置显示 Unknown。结果页包含图片、视频和 PAA；[链接表](kw/ahrefs-deep-research-2026-10-02/serp-observed-links.csv)保留真实显示标题与 href，视频另标，**不冒充当地排名导出或完整前十自然排名**。部分 href 是 Google 的不透明跳转，未编造解码后的目标地址。正式低竞争裁决仍需要完整本地化结果和页面强度数据。

## 只保留两项进一步验证的方向

### 1. 美国：按工作周核对合格加班额，生成工资单 TT 差异记录

最接近本站的受众是小企业雇主、小时工资员工，以及现有 construction/salon 受众。实际入口词为 `qualified overtime compensation`、`flsa qualified overtime`、`how to calculate qualified overtime`；不围绕 QuickBooks 设置或品牌支持获客。

2026 年首次使用 W-2 Box 12 TT 的背景由 [IRS 2026 W-2/W-3 指引](https://www.irs.gov/instructions/iw2w3)确认。TP 是已报告现金小费，不可直接等同个人可扣除小费；TT 报告合格加班补偿，也不可直接等同个人最终税收优惠。雇主报数和员工扣除上限是不同任务。

具体待验证增量：用户自行输入或本地导入多工作周记录，显示每周的合格 premium、来源记录、未知资格与 TT 差额，再导出可交给工资部门的核对表。按标准 FLSA 场景逐周计算，不能跨周平均，不能把全部 1.5 倍加班工资当可扣除额。奖金、多费率、州法加班与豁免情况必须有明确规则和审核范围，不能硬套一行公式。

需求证据不只来自联想：[工资软件用户讨论](https://quickbooks.intuit.com/learn-support/en-us/employees-and-payroll/re-new-qualified-overtime-compensation-tracking/01/1596076/highlight/true)出现多项目、多工资率记录和手工计算的问题。它支持“用户遇到任务困难”，不证明每个用户都会改用外部工具。NicheToolkits 的付费表格证明有商业供给，未核实成交或收入，也不证明 CPC。

**状态：中期产品验证候选，未通过上线闸门。** 已有免费记录 CSV 和付费对账表；多工作周核对工具的精确需求、完整 SERP 差异与真实场景模型还需补齐。`qualified overtime tracking` 可能是软件工资项名称，不能用它的 >100 直接计算外部工具流量。若可用数据或实际页面显示同任务匿名免费工具已满足，就停止这项切角。

### 2. 英国：无需留邮箱、在本地完成的废物申报表预检

实际入口表述为 `digital waste tracking spreadsheet`；精确 validator 词的量未取得，`waste receipt` / GB 为 <100、N/A。`waste transfer note` 的 >1000 不能算入这个任务的量。

[GOV.UK 当前要求](https://www.gov.uk/guidance/digital-waste-tracking-check-if-you-need-to-report-the-waste-you-receive)说明：英格兰、威尔士相关接收设施自 2026-10-01 使用新服务，在收货次日起 2 个工作日内提交，现有 WTN 等义务仍并行。[最新实施时间表](https://www.gov.uk/government/publications/digital-waste-tracking-service/digital-waste-tracking-service)列出北爱尔兰与苏格兰 2027-01；不能采用旧新闻或供应商仍写北爱尔兰 2026-10 的说法。

具体增量来自**实际页面门槛**：Weave 要求联系人资料并同意联系。因此“官方版本对应、纯本地解析、无需账户或邮箱、逐行提示错误”有潜在直接价值。需要核验真实模板版本、跨表参照、EWC/危险废物代码规则和示例错误，不能声称通过我们的检查就一定获政府接受；政府服务本身也会校验，是否需要提前预检必须验证。

**状态：新执行窗口下的细分实验候选，未通过上线闸门。** 本轮修正的是“现成免费工具没有访问摩擦”的先前判断；仍未证明完整 SERP 没有同款匿名工具、精确词有足够点击量或 CPC 较高。这一市场较窄、专业维护成本较高，且属于本站英国扩展，不宜仅凭政策日期作为 AdSense 全站转向依据。

## 澳洲新规为什么暂时不排前两位

[RBA 官方 FAQ](https://www.rba.gov.au/payments-and-infrastructure/review-of-retail-payments-regulation/2026-03/conclusions-paper/faqs/)确认 2026-10-01 的卡组织规则变化和商家可采取的做法；不能泛化成所有支付方式、周末附加费一律禁止。现金折扣等决策有实际背景，但 Compayr、MerchantCompare、Insightful Sums 已覆盖多个直接工具任务。

MerchantCompare 明确未计固定每笔费用和现金处理成本，可能存在更细的模型差异。**这些字段是产品假设，尚不是验证过的关键词机会。** “批量菜单重定价”等表达本轮未取得精确量、用户需求或完整竞争证据，不作为推荐。暂留观察，不另建基础 surcharge/cash-discount calculator。

## 可执行的下一步

1. 目前不按这份候选池新建一批页面，也不因零点击全站重做。本站现有 booth-rent-vs-commission 相关查询已有 17 展现、平均位置 42.59，证据可支持继续评估现页；并不能支持承诺排名或点击。完整存量恢复动作见 [recovery-plan](recovery-plan-2026-10-02.md)。
2. 数据恢复后，只对这两个具体任务补查：严格国家的 Volume、CPC、近 12 个月历史、Parent Topic、实际竞争页面 Traffic Potential 与引用域。先读取免费的 limits-and-usage；无法确认访问和剩余额度就不继续付费数据请求。无需为了本轮结论购买升级。
3. 美国任务先确认多周/多费率核对需求是否独立于工资软件支持；英国任务先确认真实预检使用场景与其他匿名工具。每项只形成一个任务映射，近义词不堆成多个页面。不满足完整竞争与模型验证就撤回，不把缺失数据变成“机会分”。
4. 若最终通过本站四道闸，再决定现页扩展或独立新页；SEO 价值之外还需有可重复使用的结果。AdSense 评估使用实际可得流量与后续 RPM；CPC 不能作为站点收入承诺。

## 可复查材料

- [summary.json](kw/ahrefs-deep-research-2026-10-02/summary.json)：本轮计数与数据限制。
- [clean-keywords.csv](kw/ahrefs-deep-research-2026-10-02/clean-keywords.csv)：211 个国家×关键词候选，保留区间与空缺。
- [raw-metrics.csv](kw/ahrefs-deep-research-2026-10-02/raw-metrics.csv)：325 行原始指标与排除理由。
- [query-attempts.json](kw/ahrefs-deep-research-2026-10-02/query-attempts.json)：20 组查询、国家、结果状态与原始文件。
- [serp-observed-links.csv](kw/ahrefs-deep-research-2026-10-02/serp-observed-links.csv)：实际 Google 显示的结果链接，包含类型与定位限制。
- [free-ui/](kw/ahrefs-deep-research-2026-10-02/free-ui/) / [api/](kw/ahrefs-deep-research-2026-10-02/api/) / [products/](kw/ahrefs-deep-research-2026-10-02/products/)：免费指标、鉴权错误和当前竞争产品证据。

应用技能：ahrefs-python、seo-keyword、seo-keyword-research、control-in-app-browser。研究没有改动或发布网站。
