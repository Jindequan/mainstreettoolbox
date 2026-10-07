# SEO 找词技能安装与方法修正 · 2026-10-02

已安装并读取两套外部技能，更新现有找词工作流。此次完成的是技能安装/方法修正，**没有因此产生已验证的新关键词，也未接通 Ahrefs 的指标数据**。

## 安装结果

| 技能 | 来源及用途 | 安装位置 | 状态 |
|---|---|---|---|
| seo-keyword | RampStack 社区工作流：意图、实际SERP、竞争/业务契合、词簇映射 | /Users/devin/.codex/skills/seo-keyword | 已安装；读完主文件和两份参考；作小幅本地兼容与证据约束修正 |
| ahrefs-python | Ahrefs 官方仓库：Keywords Explorer、竞品排名和SERP的数据访问方法 | /Users/devin/.codex/skills/ahrefs-python | 已安装；读完主文件和filter-syntax参考；未改接口说明 |
| seo-keyword-research（原有） | 本地项目流程：可用证据整合、词族登记、报告交付 | /Users/devin/.agents/skills/seo-keyword-research | 主文件和playbook已修正；脚本保留 |

来源固定到提交，而非安装时漂移的main：

- [RampStack 原版](https://github.com/rampstackco/claude-skills/tree/3d4510a94a76ead80122c691b5c480f92f3fbe40/skills/seo-keyword)，MIT。
- [Ahrefs 官方原版](https://github.com/ahrefs/ahrefs-api-skills/tree/7e777771deefe378d3e0967c4ccd8b41dd07920c/skills/ahrefs-python)，Apache-2.0。

两者使用内置 skill-installer 安装。初始官方curated目录请求HTTP403后，改为筛选公开仓库；未以此中断工作。保存原版SKILL.md、原版模板、安装源提交和内容哈希，根许可证复制入安装目录。记录位于 evidence/seo-skill-upgrade-2026-10-02/installed-skills.json。

RampStack 是社区方法模板，不声称它获得专业机构认证。其原文仍有“无数据粗估量”、固定簇生产比例、简单URL交集即同页等不严谨处；本地已修正，兼容性frontmatter字段移入metadata。保留来源版本，不伪装为未修改的上游。

## 比较后未安装的方案

- meikidd/keyword-research：有GSC/竞争gap流程，但要求另一缺失的web-access技能、Claude路径与重复询问；把30展现0CTR直接推成meta问题，忽略排名条件。不直接采用。
- Senuto/nodeshub-seo-skills：可取的是实时Google SERP/PAA扩展；Fan-out包含AI生成词，不是搜索量库，且依赖NodesHub密钥/额度、Claude路径和其他技能，不为本次装一整套。
- OpenSEO keyword-research：有明确市场指标和品牌过滤，但依赖OpenSEO MCP、project上下文和seo-report；目前未连接，不安装一个表面可用、实际上缺依赖的流程。
- SEO Machine：是完整内容工作区，依赖数据源与写作/发布管线；本次需求是找词学习，不迁入整个工作区。

## 已读取的专业方法材料

1. [Ahrefs Keyword Research](https://ahrefs.com/seo/keyword-research)：目标用户语言、真实竞品排名、流量潜力、业务价值、竞争评估；不以词数代替需求。
2. [Ahrefs Search Intent](https://ahrefs.com/blog/search-intent/)：从实际结果看内容类型、格式和切角；导航、信息、商业、交易及混合意图。
3. [Google Keyword Planner指标定义](https://support.google.com/google-ads/answer/3022575?hl=en)：月搜索量包含近似变体；Competition为广告主竞争，bid ranges不是自然排名难度或站长收入。
4. [Google Trends数据说明](https://support.google.com/trends/answer/4365533?hl=en)：0—100相对归一化指标，低量可显示0，不能当月搜索量。

读取的是源码、参考文本和上述方法页面；没有观看完整视频课程，不能称“已完成课程培训”。

## 对现有流程的具体修正

- 当前非品牌引流任务：先剔除厂商导航/登录/余额/售后词，判定用户是否愿意使用第三方。评论/替代/比较属于不同意图，不能一律把所有品牌字符串等同导航；本次不扩到这些策略。
- 网站受众与业务契合先于新鲜度，换站方向单列论证。公告新只说明产品/规则变化；搜索增长要真实时间序列。
- 原始、清洗和合格词数分开。精确意图族不靠泛品牌和噪声补深度；AI推导查询只作假设。
- 搜索量可以来自授权可用的专业数据/API/UI/导出，不再限定只有Bing。保留引擎、地域、时间窗、单位及变体口径。
- CPC、bid、广告竞争、自然竞争、GSC曝光、Trends、RPM分别记录；未知不打分，不充当0。
- DDG失败按失败记，允许实际Google API/浏览器/导出证据；不把DDG等同Google。论坛、长尾、低KD、EMD都不自动产生可打/判死结论。
- 比较实际竞品功能和官方功能，证实输入、数据和输出的增量。四个近义查询不能列成四个独立机会。
- 报告至多10个合格词簇，找到几个交付几个；观察词和已淘汰词不补推荐榜单。没有合格词时明确0。

## 将修正应用到此前失败案例（人工复核）

| 已有证据/情况 | 修正后的处理 |
|---|---|
| n8n精确额度族浅，官方文档/消费记录/充值已有，4条查询系推导 | 维持撤回；不靠事件日期升级推荐，不凑4机会 |
| Google页面出现相邻总成本工具，未看见相同名字的Assistant计算器 | 只记录未观察到；未证明供给缺口或用户需求 |
| DDG抓取13次均失败 | 数据不可用；不能称零竞争，也不判死 |
| 本站28天页级平均排名71.18、0搜索点击 | 不从零CTR直接推成title/meta故障，先分查询/页/市场看可见度和排名 |
| CBAM、废物记录、AI推理出现现成免费直接替代 | 不把非品牌、新政策或AI概念本身包装成推荐；需实际增量 |

人工复核不是独立行为评测，不证明这些skill今后一定选出赢家。

## 验证与可用性

三个技能通过 skill-creator 的 quick_validate.py 格式校验；已核安装文件、直接参考链接、许可证和保留脚本路径。这是安装/结构验证，不是关键词质量、API连通或收益验证。

本次执行环境未发现 AHREFS_API_KEY，未发起付费指标查询、创建账号或安装全局SDK。Ahrefs skill描述需要认证的关键词接口；它的免密公开接口仅爬虫IP数据，不提供搜索量/CPC。现有GSC/浏览器/公开工具仍可用于获得各自实际可得的证据。

新增技能将在下一轮对话可供正常发现；本轮已通过读取应用其方法。修改前的现有工作流备份：evidence/seo-skill-upgrade-2026-10-02/seo-keyword-research.before.md 与 playbook.before.md。
