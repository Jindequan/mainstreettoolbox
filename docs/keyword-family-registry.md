# MST 词族本地复查登记

矩阵总表位于 ../../docs/keyword-family-registry.md（相对站点根）。本表记录本站本次复查，不覆盖总表历史裁决。

| 日期 | 词族 | 状态 | 新证据与动作 |
|---|---|---|---|
| 2026-10-02 | retail markup/margin | 已有页面；量级未排序；SERP 待验证 | retail 字符串池 78 词，双源存在；markup 头词客观抓取 FAILED；仅存量优化候选 |
| 2026-10-02 | cleaning estimate/quote/invoice template | 已有页面；量级未排序；SERP 待验证 | cleaning 池 174 词，多条双源；estimate template SERP FAILED；优先产品链分发实验 |
| 2026-10-02 | lawn estimate/mowing template | 已有页面；量级未排序；SERP 待验证 | lawn 池 101 词，多条双源；优化现有打印承接，不裁决新建 |
| 2026-10-02 | recipe cost sheet/spreadsheet | 已有页面；量级未排序；SERP 待验证 | recipe 池 38 词，多条双源；核对真实输出格式，避免不实 spreadsheet 承诺 |
| 2026-10-02 | menu profit worksheet | 观察；SERP 待验证 | menu 池 34 词；worksheet 头词抓取 FAILED；不能宣称可打 |
| 2026-10-02 | painting estimate template | 已有页面；量级未排序；SERP 待验证 | painting 池 40 词，多条双源；检查现有输出与抓取 |
| 2026-10-02 | mulch yard calculation | 已有页面；量级未排序；SERP 待验证 | mulch 池 35 词；how to calculate yards of mulch 双源；优化既有单位解释与收录检查 |

证据：traffic-diagnosis-2026-10-02.md 与 kw/traffic-diagnosis-2026-10-02/。FAILED 不是竞争判负；联想数量不是搜索量；本轮不翻案任何旧判负词族。

后续证据：已读取 09-04—10-01 的 381 个公开 GSC 查询（1,084 展现、0 点击），完整行位于 evidence/2026-10-02/ga-queries-28d.json；57 个落地页合计 1,384 展现、0 点击。页级优先候选调整为 food-cost-percentage guide、booth-rent-vs-commission guide、retail-math-calculator。详见 recovery-plan-2026-10-02.md；此排序不等于竞争难度裁决，不新增词族。

| 日期 | 词族 | 状态 | 新证据与动作 |
|---|---|---|---|
| 2026-10-02 后续复核 | cleaning estimate/quote/template | ⚠️ 头词工具/模板位密集；V/CPC 未验证 | cleaning estimate calculator 的 DDG 前十 10 工具/0 论坛；house cleaning quote template 前十均相关模板/0 论坛。FieldBid 的自有成本→客户报价与原建议重合。撤回优先重做推荐，保留产品实验备选，不判死整个族。证据 kw/cleaning-validation-2026-10-02/ 与 cleaning-direction-validation-2026-10-02.md |

## 2026-10-02 新计费/新政策词扫描（3,404 联想词；量级未排序）

| 词族 | 本轮状态 | 新证据与动作 |
|---|---|---|
| n8n Assistant/Gateway credits budget | 🟡 待验证；优先小试；量级未排序 | 10-01 Assistant 调整、09-17 Gateway 发布属官方新证据。泛品牌130词不充当精确族深度；额度/成本仅18词。Google 实际页以文档和邻近工具为主；总成本工具已有。不称低竞争。四种查询先合并一个预算页假设。 |
| HubSpot credits budget | 🟡 待验证；量级未排序 | credit 相关11词，calculator Google 单源；官网 TCO/第三方工具已存在，仅观察按结果额度预测切角。 |
| Machine Payments Protocol / x402 tools | 🟡 观察；量级未排序 | MPP 仅3词；Stripe03-18发布；MPP-Inspector 和 x402 header decoder 已有，拒绝同款泛 validator，不判死全族。 |
| agentic commerce protocol examples | 🟡 观察；量级未排序 | 精确协议10词、example Google 单源；未证实本周发布，未过变体深度与工具增量。 |
| UK CBAM / EU CBAM cost and threshold | 🟡 人工定；量级未排序；拒绝重复头词方案 | CBAM泛池86/双源3，UK20/双源1；Google实际页面工具密集，精确阈值及跨UK/EU工具已有。保留有增量的对比假设，不称工具真空。 |
| UK CBAM fertiliser | 🟡 观察；拒绝同款计算器 | Bing联想；Google偏文章不代表空缺，AIC07-15已有行业计算器。 |
| payrolling benefits in kind templates | 🟡 观察；量级未排序；拒绝同款checker/template | 19词/双源1；09-23 HMRC指引更新、11月自愿登记窗口。Workmax/CalcStack已有就绪/模板/转换工具。 |
| France e-invoicing/e-reporting | 🟡 观察；量级未排序 | 英语相关23词无双源同词；09-01落地、09-30指引更新；官方问卷与第三方checker已有，需法语及业务切片核验。 |
| Make credits / Lovable credits calculators | 🟡 人工定；拒绝重复产品 | 现成免费 credits 工具已找到，不能仅因新计费推荐同款；DDG抓取FAILED不构成判死。 |
| TikTok GMV Max / Roth catch up calculators | 🟡 人工定；拒绝重复头词产品 | 已发现多个直接免费计算器；本轮无量/CPC，不宣称可打。 |
| Hermes agent cost calculators | 🟡 人工定；拒绝重复头词产品 | tokenscost.com/agents/hermes 等现成工具。 |
| llms.txt / MCP security / Agent Card / SKILL.md validators | 🟡 人工定；拒绝重复头词产品 | 存在 BridgeToAgent / mcptrustchecker.com / agentcard.net / AgentSkills.site 等直接工具，本轮不将AI缩写热度当增量。 |
| Content Signals / Web Bot Auth | 🟡 薄族观察；拒绝普通Content Signals validator | 各1条联想；Content Signals为2025-09-24发布，Cloudflare生成器/CrawlPact审计已在，非本周新词。 |
| USPS nonstandard fee calculator | 🟡 记录池；需求未证实 | 精确联想未采到；不可把新的体积费变化移植为非标费新窗口。 |

DDG serp-verify 两批共13次查询均 FAILED，不能据此声称0对手、判死或✅可打；IAB Google实际页快照用于补充人工判断。精确细族未通过深度的不标T1/T2；泛品牌池不代替精确细族。保留所有旧判决。报告：[fresh-keyword-opportunities-2026-10-02.md](fresh-keyword-opportunities-2026-10-02.md)。

### 2026-10-02 用户复核修正：品牌计费词撤回

n8n Assistant/Gateway credits 与 HubSpot credits 不纳入本次非品牌引流推荐。此前“优先小试”撤回：未证明官网外的任务需求，精确族浅，流量/CPC/排名增量均未证实。产品变更新不等于词值得做。保留历史证据，不再以预算页建议推进。

### 2026-10-02 非品牌初筛（1,090联想词）

| 词族 | 状态 | 证据与动作 |
|---|---|---|
| digital waste tracking / waste transfer note | 初筛待验证；不推荐普通validator | Weave Comply免费校验已找到；未证明增量，无正式SERP裁决 |
| packaging EPR / recyclability | 初筛待验证；不推荐普通费用计算器 | EPR Rates/TARE/EPR Atlas等供给；未证明增量 |
| battery passport / state of health | 初筛待验证 | 新采集数据，仅观察，无工具推荐 |
| nonbrand e-invoicing/e-reporting | 初筛待验证 | 补充非品牌任务词数据，不翻原有观察结论 |
| AI inference cost / energy / agent ROI / data centre water | 初筛待验证；不推荐普通推理成本计算器 | RunPlacement/C4C等供给已找到；其余切片未查 |
| refrigerant GWP | 初筛待验证；不推荐普通GWP工具 | Refrigerants.net现成工具，未证明增量 |

详见 nonbrand-research-correction-2026-10-02.md；初筛不等于过闸，无V/CPC数字。


### 2026-10-02 Ahrefs 实测补充：Free API 鉴权失败，免费 UI 指标与产品深查

两次官方 SDK 请求均 401；剩余 units 未知。实际免费 UI 查询 20 组国家×种子，325 行原始、324 唯一国家×词、211 清洗候选；所有 CPC、增长、页面流量/权威未取得。Google 保存 10 组实际页，gl 参数已指定但定位 Unknown，不能冒充当地完整排名。完全过闸的新选题 0；以下两项仅为继续验证的任务候选。

| 词族 | 本轮裁决 | 新证据与动作 |
|---|---|---|
| US no-tax-on-tips / overtime-tax-deduction calculators | 有真实量；不建普通克隆 | no tax on tips calculator >1000/Easy；2025 overtime calculator >1000/Easy；实际免费工具及 IRS/Intuit/Fidelity 等存在，Easy 不等于低竞争 |
| US qualified overtime / W-2 TT reconciliation | 细分核对任务待验证 | qualified overtime compensation >1000/Medium；tracking >100/N/A，但实际 tracking 搜索混入工资软件支持。2026 TT 官方依据真实；当前 QualifiedOvertime 有免邮箱免费 CSV，付费邻居已有 TT 对账。多周核对增量、精确量及完整 SERP 未过闸 |
| Treasury tipped occupation code | 不建普通 lookup | US >100/N/A；已发现多家直接查询器；不可称高 CPC |
| AU surcharge ban / cash discount | 新执行窗口；不建基础同款 | surcharge ban >100/Easy，credit card surcharge calculator <100/Easy，精确 surcharge ban calculator 未返回建议≠0量。Compayr 有 PDF/打印；MerchantCompare 已做免费现金折扣损益，模型细分仅假设 |
| GB digital waste tracking spreadsheet | 修正此前访问门槛判断；预检任务待验证 | head >100/Easy、spreadsheet <100/KD未显示。深入 Weave 提交页发现公司名/工作邮箱及联系同意，免费≠无留资。免邮箱本地预检有具体摩擦差异，但仍缺精确需求、完整竞争及官方模型验证，不直接上线 |
| GB waste transfer note template | 不建普通模板 | head >1000/Easy，template >100/Easy；政府/多家匿名免费模板与数字工具在，不能借新制移植旧头词量 |
| US labor burden calculator | 不建普通版本 | >100/Easy；实际多成本免费工具存在，未证明增量 |
| US booth rent vs commission | 存量评估，非新机会 | >100/Easy；本站已有，直接对手多，不另建重复页 |
| US snow removal / fall cleanup pricing | 保留族历史；撤回无增量同款切角 | 头词多当地服务/设备，不能当业务报价工具的量；fall cleanup prices <100，已有季节盈利/报价工具。未取得整个细族完整 SERP，不判死全族 |
| US battery passport / packaging EPR | 延续观察，暂不优先 | 分别 <100/Medium、>100/Hard；原始池含新闻；普通护照生成/EPR计算器已有供给，无新的过闸证据 |

证据与限制见本站 `docs/ahrefs-deep-keyword-research-2026-10-02.md` 与 `docs/kw/ahrefs-deep-research-2026-10-02/`。保留旧记录；Weave 仅按新取得的真实提交门槛修正先前判断，未自动推翻整个族裁决。

## 2026-10-06 R8 复查（7,722 词/395 dual；无 Bing key，量级全待 strict）

| 日期 | 词族 | 状态 | 新证据与动作 |
|---|---|---|---|
| 2026-10-06 | security deposit refund | 🟡 候选（条件）；量级未排序 | 429 词/35 dual；SERP 通用 refund 计算器真空（仅 MD/MN 州利息件+内容文）；州法定 deadline=官方数据；landlord 新 vertical 路由成本评估先行 |
| 2026-10-06 | moving cost / pod vs movers | 判死维持 | moving.com/MoveBuddha/Move.org/NAVL/Allied 五重型计算器，R3 T3 判法复确认 |
| 2026-10-06 | small claims court cost | 判死（头词） | DocketMath 直接同款工具（fee+limit+deadline+interest）；法律建议红线同 R7 llc 判 |
| 2026-10-06 | driveway sealing | 判死 | getasphaltcalculator EMD 型+Calk-USA/asphalttons 计算器群在位；族仅 9 dual |
| 2026-10-06 | fence / pool / deck | 维持旧判 | fence 10 dual、pool 6 dual、deck 4 dual；registry strict=0 旧判在案，无新证据不翻案，fence 留记录池待 strict |
| 2026-10-06 | septic pumping（R4 遗留） | 记录池维持，正面积 | gallon tier 词形重现（500-3000）；SERP 泵送计算器真空（在位全是安装计算器 FigureNerd/Rex's Toolbox）；基准 $300-550/1000-1500gal 多源 |
| 2026-10-06 | plumbing estimate（R4 遗留） | 记录池；T1 预设仍开放 | 24 dual 模板词形依旧；estimate-presets.json 十组无 Plumbing 组（R4 布置未落地），零新建成本承接可捎带 |
| 2026-10-06 | mobile notary fee（R4 遗留） | 翻为判负（头词） | R4「无大站」窗口已关：notaryfeebystate.com EMD+notarycostcalc.com EMD+Mobiigo/Superior/JKC/eOnline 共 6 计算器在位 |

aging in place 改造费（stair lift/ramp/walk-in tub，673 词/27 dual）为 carecost/MST 双站邻接候选，判决记矩阵总表。报告：[keyword-research-R8-2026-10-06.md](keyword-research-R8-2026-10-06.md)。
