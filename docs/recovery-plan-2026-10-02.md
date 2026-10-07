# Main Street Toolbox：获客与产品重做方案 · 2026-10-02

## 决策建议

**复核更新：撤回优先重做清洁报价的推荐。** 高 V 与高 CPC 未验证；本轮两词的客观 SERP 已显示密集工具/模板供给，且成本→报价主干已有直接替代。详见 [cleaning-direction-validation-2026-10-02.md](cleaning-direction-validation-2026-10-02.md)。下面保留的两周工作流方案仅为产品实验备选；产品完成/复用不能代替搜索流量与广告变现验证。先补选题证据和同口径候选对比，再决定是否重做。

这是本轮提出的方向方案，并非已上线的新产品，也没有修改既有自动任务配置。当前实施范围是三处单点修正；正式工作台与首页改造尚未实施。

## 数据证据：已核实正确资源

数据账号 jindeqhk52@gmail.com，GA 账号 a406995620、资源 p552881939；显示 mainstreettoolbox.com / www.mainstreettoolbox.com。账号切换后重新选择本站，确认首页近 7 天，避免把「本月」「今天」「实时 30 分钟」混作同一个口径。

| 口径 | 实测结果 | 能说明什么 |
|---|---|---|
| 首页近 7 天 | 活跃用户 8、事件 33、浏览 14、关键事件 0；活跃用户较前期下降 68% | 流量很小且下降，并非近 7 天完全没人访问 |
| 流量获取，09-04—10-01 | 90 会话、20 互动会话、互动率 22.22%、平均每会话互动时间 11 秒 | 访问规模低；不能凭此确定真人比例或产品价值 |
| 同期渠道 | Direct 86、Paid Search 2、Referral 1、Unassigned 1，没有 Organic Search 行 | 已记录会话缺少可验证的持续获客来源 |
| GA 关联 Search Console：落地页，09-04—10-01 | 1,384 展现、0 点击、平均排名 71.18，57 个落地路径 | Google 搜索获客未起量；不是 GA 单独漏掉了所有搜索点击 |
| GA 关联 Search Console：查询，同期 | 381 个公开查询、1,084 展现、0 点击、平均排名 77.54 | 真实词形可用来筛选存量优化；不能与页级展现强行等同 |

Direct 表示来源信息不足，不能直接当成忠实用户，也不能全部当作开发者或机器人。Paid Search/google cpc 是归因标签，本轮没有查 Google Ads 账单，不代表确认有人投放或支出。关键事件未完整接入核心产品动作，0 不能当成零打印、零成交；Ko-fi 销量本轮未核实。

之前实测：页面加载后 GA 等 pointerdown/keydown/scroll/touchstart 才启动；交互后 page_view 的 tid=G-3XXDEY44GG，采集端 204。无交互离开可能漏记。保留隐私约束，先用 Cloudflare 同期统计交叉核对访问总量，不能用改采集口径制造增长。

Google 解释查询隐私省略及页级/属性级聚合会导致口径差异：[官方数据说明](https://support.google.com/webmasters/answer/17010575?hl=en)。GA 流量获取使用 session 口径：[官方说明](https://support.google.com/analytics/answer/12923437?co=GENIE.Platform%3DDesktop&hl=en-AU)。

证据在 `docs/evidence/2026-10-02/`：ga-traffic-28d.png、ga-organic-28d.png/.txt、ga-queries-28d.json（381 行），query-sample 文件是字母排序抽样，不是最高曝光词列表。

## 为什么当前路线应改变

1. 记录里构建已到 48 工具/77 页，但还没有稳定自然点击。新增一页不等于新增一次可归因的目标用户访问。原计划「先堆 topical mass，等排名爬升」尚未取得获客验证。
2. 差异化假设需要重验。[Jobber](https://www.getjobber.com/free-tools/estimate-template/cleaning/)已有免费清洁报价 PDF/Excel 模板、自定义报价及发票链路；[ZenMaid](https://get.zenmaid.com/free-resources)已有清洁定价、利润、常客收入计算器。不能继续把“竞品都卖线索/付费，我们免费”当作普遍事实。此次核查不等于完整 SERP 排名核验，也不证明我们一定不能竞争。
3. 产品还没有围绕一次真实工作收拢。线上点击 House Cleaning 后，标准清洁 $120、深度清洁 $220、搬家清洁 $250 和全部加项一起计入，默认 **$738**。这是样例价目表而非一次任务的报价；三种清洁通常是替代选择，用户需要自行删除才能使用。证据 cleaning-quote-current.png/.txt。
4. 复用承诺缺口：estimateApp 只有一个 DRAFT_KEY；New estimate 会写回覆盖同一份草稿，但原确认文案声称旧报价仍留在浏览器。按钮、恢复与实际存储不一致，会伤害信任。
5. 当前营销记录的 PH/HN 等渠道表现不足以验证清洁业主需求。Reddit 纯价值回答收集了痛点，却缺少可归因的工具使用闭环；不能把发过帖、写过物料视为有效获客。

## 目标用户与最薄产品切片（§2.1—§2.4）

**目标用户**：美国独立住宅清洁公司，1–5 人，老板自己报价，有每周或双周常客，目前依赖纸笔/表格。1–5 人是招募范围，不是本轮已经验证的客群规模。

**一句话价值**：用自己的人工和费用核算一单清洁，再生成客户能看懂的报价，下一单可直接复用。

**对象**：业务身份、服务类型、工作量、人工成本、直接费用、目标利润率、客户报价行项、报价版本。客户姓名/地址、成本和金额保留在设备端，不进入分析事件。

| 主流程 | 现状 | 重做要求 |
|---|---|---|
| 选择工作类型 | 房间计算器有三选一，报价预设全加总 | 标准/深度/搬家三选一；加项默认未选 |
| 输入自己的成本 | 房间模型以全国参考价格推算 | 可编辑人数、每人工作时数、人工费用及直接成本；全国带仅作参考 |
| 核算报价 | 有建议区间，另页有通用总价 | 自有成本与客户报价同时可理解；利润率与加价率明确区分 |
| 输出客户报价 | estimate-generator 能打印 | 同一流程带入服务、数量、金额及 scope，不手动跨页重填 |
| 保存与复用 | 主要是单份自动草稿 | 至少保存多份命名报价；新建不覆盖旧报价；可导出/导入备份 |
| 反馈 | 核心动作未完整进 GA | 记录流程启动/成功计算/打印意图/恢复报价；真实完成另以访谈或交付证据确认 |

第一版不加入登录、团队协作、支付、预约、自动发邮件；沿用现有免费模式与设计 tokens。暂不改 Ko-fi 商品或变现模式。

内部计算示例（非行业行情）：直接成本 $100、目标毛利率 30% → 底价 $100/(1−0.30)=$142.86。用户输入是权威；未来若引入额外行业区间必须按 worth-doing-bar 双源核验。该毛利是扣除所填成本后的模型值，不应称为最终净利润。

**验收 GWT**：

- Given 没有草稿，When 选标准清洁，Then 深度/搬家和未选择加项不进入总价，60 秒内可完成一笔最小报价。
- Given 人工 2 人×2 小时×$20、其他直接费用 $20、目标毛利率 30%，When 计算，Then 成本 $100、底价 $142.86；页面解释口径，客户版不显示内部成本。
- Given 已保存报价 A，When 新建 B 并刷新，Then A 与 B 均可找回；取消新建不改变 A。删除可恢复，导入不静默覆盖。
- Given 存储失败，When 保存，Then 明确告知失败并提供导出备份；不宣称已保存，当前内容仍可使用。
- Given 未改任何真实输入，When 页面加载示例，Then 不计成功计算；点击打印只计 print_intent，不计 PDF 已生成或客户已接受。

四类风险：价值风险用真实旧报价与复用验证；可用性风险用手机任务走查；技术风险用现有本地存储与打印薄切片；商业风险暂不新增付费功能，先观察是否有人持续完成工作。

## 页面契约草案（§2.5—§2.13，正式重做前细化）

沿用 `/estimate-generator/`，提供明确的清洁入口与预选模式；已有 `/cleaning/cleaning-estimate-calculator/` 保留搜索承接。首页将工作台设为一个主任务，其他行业在 All tools 保持可达。正式变更 IA 前以最终页面契约和现有品牌基线审阅，不先删除路由。

| 契约项 | 工作台草案 |
|---|---|
| 唯一问题 | 这笔清洁任务该怎样报价并生成可发给客户的文件？ |
| 业务 | 单笔报价，保存后可复用 |
| 数据 | 用户自有成本、选择的工作类型与报价行项，设备内保存 |
| 首屏 | 服务三选一、成本输入、当前报价、来源/模型说明 |
| 主操作 | 生成客户报价 |
| 次操作 | 恢复已有报价、返回修改；输出后打印/备份 |
| 进入条件 | 无账号也能开始；已有草稿明确询问恢复/新建 |
| 成功结果 | 客户版报价已生成，保存状态明确 |
| 失败恢复 | 输入错误就地提示；存储失败保留内容并导出；打印取消可返回 |
| 离开路径与权限 | 返回工具库；本地持久化不冒充云端；成本与身份不上传 |

首页文案方向可先用：**“Price your next cleaning job with your own costs.”** 说明：**“Choose the service, check your margin, and create a client-ready estimate. Free, no signup.”** 主 CTA：**“Build a cleaning quote”**。首屏展示真实可编辑报价实例，不能放虚构热门/用户数/评价。承诺必须等功能实现后再上线。

## 获客：两周能执行的实验

**10-02—10-04：修产品与测量。** 做上述薄切片；建立六个事件：workbench_start、quote_calculated（合法真实输入）、quote_saved（确实保存成功）、print_intent、quote_restored（恢复自建报价）、contact_email_click。标记 qa/debug 测试，访谈样本按参与者去重；不用 cookie/GA 的“用户数”直接当独立业主数。注册 GA 自定义维度与关键事件仍是后续工作，不因代码事件名存在就宣称报表已完成。

**10-05—10-09：10 位目标业主的任务测试。** 用户可从已有行业联系和清洁社群中招募，也可使用清洁培训者/资源页作为合作渠道。只要求拿最近一张真实报价，现场完成并评价；受邀者自愿用数据，敏感资料不上传。不向开发者泛社区重复 launch 来代替行业样本。

邀请稿（本轮未发送）：

> I’m improving a free quoting tool for small residential cleaning businesses. Would you try it with one job you priced recently and tell me where it gets in your way? It runs on your device; please leave customer names and addresses out of any feedback. I’d like to see whether it can produce a quote you would actually use.

每个授权投放位置独立 UTM，格式 `utm_source=<真实渠道>&utm_medium=<email/social/referral>&utm_campaign=cleaning_quote_pilot_20261002&utm_content=<版本>`。不在站内导航传播 UTM，不伪装 google/cpc。本轮未联系任何人、发帖或提交目录。

**10-10—10-16：看复用并修阻塞。** 复访受测者是否拿工具处理下一张真实报价；把问题记录为进入困难/输入困难/结果不可信/输出不可用/无法复用，不将全部问题归为“UI 不够好看”。

| 判据（内部实验标准，非市场基准） | 行动 |
|---|---|
| 未招到足够目标业主 | 实验样本未获得；调整招募入口或联系人，不能据此判产品失败 |
| 10 位已确认目标业主中，少于 5 位能独立完成真实报价 | 重做观察到的具体阻塞环节，暂不扩大推广 |
| 至少 5 位独立完成，至少 3 位在后续真实任务复用 | 进入第二批 30 位测试，再评估首页全面聚焦与行业合作 |
| 至少 5 位完成，但无人复用 | 区分没新任务、已有替代工具和产品不值得复用；访谈后修产品或换痛点 |
| 两轮获得足够样本且连续无完成/复用改善 | 停止这条工作台开发，依据已观察到的替代流程重新选题；不回到扩页消耗 |

指标一经确定不因未达而下调。必要调整留旧值、写理由。两周足够验证流程与招募，不足以对长期 SEO 成败定论。

## SEO：保留资产，预算收敛到 3 页

优先页由当前页级结果决定，不沿用「retail 最接近点击」旧推断：

| 现有页 | 28d 展现 / 平均排名 | 这轮动作 |
|---|---|---|
| `/guides/food-cost-percentage/` | 23 / 23.91 | 查相应 query、补一份可验证的完整成本案例、直连已有计算器；不写第二篇同义 guide |
| `/guides/booth-rent-vs-commission/` | 16 / 34.00 | 用同一收入口径展示租金/佣金临界点与假设，连现有工具 |
| `/retail/retail-math-calculator/` | 31 / 50.55 | 对齐其实际页级 queries，展示 margin/markup 反例与步骤；检查同族分流再决定是否合并 |

低展现不能保证这些页很容易排上去，先限定小批次以便归因。lawn-mowing 有 116 展现/63.26、menu-pricing 136/63.25，作为下一批观察；pressure-washing 156/84.53 展现多但排名远，不因展现最高就先重做。

不批量 noindex、不删除旧域/URL、不做未经核验的重定向，不用重复提交收录代替内容与真实引用。已有10-01内链修复和收录请求不重复执行。14天跟踪页级曝光/排名趋势；自然点击破零为额外信号，不能承诺一周就起量。

### 本轮 GSC 最高曝光十词（全部 0 点击，需求信号，不代表低竞争）

| 查询 | 28d 展现 / 排名 | 现有页动作 |
|---|---|---|
| retail calculator | 48 / 74.46 | retail-math 与 retail hub 分工核对，优化已有页 |
| material cost calculator | 36 / 75.64 | material-cost-estimator 已改 title；查长尾与样例，不重复改标题 |
| retail price calculator | 35 / 71.14 | 优化 retail-math 的成本→售价说明 |
| restaurant menu price calculator | 27 / 77.07 | 优化 menu-pricing 的完整售价示例 |
| retail markup calculator | 26 / 78.54 | 核对 standalone 与 math 的实际排名 URL，先不删除合并 |
| restaurant menu cost calculator | 25 / 82.52 | 分清单菜成本与售价，链接 recipe-cost 工具 |
| retail margin calculator | 21 / 82.05 | 核对现有页面承接，margin/markup 示例统一 |
| booth rent vs commission calculator | 17 / 42.59 | 优化现有 guide→工具路径 |
| lawn care estimate | 17 / 79.41 | 优化现有 estimate 输出可用性 |
| how to price window cleaning | 15 / 70.73 | 优化现有 window-cleaning 单位与工作量说明 |

381 query 原始行已保存；关键词联想 721 词、41 双源的证据继续引用 traffic-diagnosis-2026-10-02.md。本轮无新建词族裁决；SERP 前轮 FAILED 的词仍不得标可打。

## 全面重做的条件与保留边界

如果两批目标用户证明清洁工作台可复用，再重做首页和清洁入口：用服务工作流取代行业工具目录作为首屏主承诺；用真实报价示例展示结果；用成本可编辑、输出与复用能力支撑承诺；目录页承接其他行业。现有 Astro/本地计算/打印能力可以继续使用。技术重写、后端、开新域、付费墙均不是当前实验的必要条件。

如果清洁测试失败但餐厅用户愿意带真实菜谱回来用，可用 recipe-cost→menu-profit 的已有链路做第二个同标准实验。首页 Menu Profit Sheet 的少量浏览可能是测试访问，不能凭 5 次浏览就宣称餐厅胜出。

## 已实施的单点修正与验证边界

按 §4.8：涉及首页推荐工具的可信陈述、报价帮助链接、New estimate 确认承诺；没有变更 IA/数据 schema/计算模型。

- `src/pages/index.astro`：Most popular this month → Featured tool，去除没有数据支撑的受欢迎声明（§1.4）。
- `src/pages/estimate-generator.astro`：错误 `/contractor/…` 链接改为真实 `/construction/contractor-hourly-rate-calculator/`（§1.2、§3.3）。
- `src/scripts/estimateApp.ts`：新建确认明确说明覆盖当前草稿，建议先打印/PDF，不再宣称保存了多个报价（§1.4、§3.2）。这是告知修正；多报价恢复能力尚未实现。

验证：`npm run build` 成功，77 页；`git diff --check` 通过；构建产物核对三处文本与目标文件存在；本地 DOM 验证新推荐文案与正确链接，输入业务名后客户预览同步。首页 1280/390 截图已保存（§4.3 部分证据）；390 宽度实测无横向溢出。报价页确认弹窗交互时浏览器超时，取消恢复与该页双端截图**未验证**，不宣称完整交付验收通过。修正没有部署（§4.5 未实施），工作台/首页重做亦未实施。

当前执行优先级：选题量级、广告价值与实际 SERP 缺口复核 → 同口径候选比较 → 决定是否进行产品实验。工作台薄切片、业主测试及首页聚焦均为条件备选。既有修正发布仍需补 UI 验证，并按用户积累制要求汇报和批次推送。
