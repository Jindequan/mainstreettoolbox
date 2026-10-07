# GA4 连续零流量诊断 · 2026-10-02

> 后续更新：用户完成登录后，已读取本站正确 GA 资源及关联 Search Console。近 7 天活跃用户 8；09-04—10-01 共 90 会话，搜索 1,384 展现、0 点击。以下保留登录前的诊断记录；最新结论、重做方案和三处本地修正以 [recovery-plan-2026-10-02.md](recovery-plan-2026-10-02.md) 为准。

## 判断与证据边界

建议下一周暂停扩页，先核实 GA4 资源和实时采集，再以清洁报价产品线做定向分发测试，同时优化已有展现的页面。现在不能用零用户推断产品无需求，也不能用新增工具数量证明获客有效。

本轮没有读到本站最新 GA4 报表：内置浏览器当前登录的是项目记录中不用于本站读数的账号，其首页为「测试 / choiceform」，衡量 ID G-SHSS70KKCT。访问历史本站资源 p552881939 显示缺少权限，然后回退到 choiceform。**这是本轮浏览器会话的发现，不证明用户此前看错了资源。** 正确数据账号按项目记录是 jindeqhk52@gmail.com。登录页已保留，待用户登录后核对资源、数据流、时间范围和筛选条件。

## 本轮线上实测

- 首页 HTTP 200，canonical 为 https://mainstreettoolbox.com/；生产 HTML 含 G-3XXDEY44GG。
- robots.txt 对通用爬虫 Allow: /；sitemap-index.xml 和 sitemap-0.xml 可读取。这里只排除了这些基础配置故障，不能证明所有页面已被 Google 收录。
- 页面初次加载没有 googletagmanager 脚本，没有 GA page_view；真实 ArrowRight 按键触发后，gtag.js 返回 200，g/collect 的 tid=G-3XXDEY44GG、en=page_view，返回 **204**。
- 因此交互后的发送链路工作；未交互即离开的访问可能漏记。204 证明采集端接受请求，不能替代正确资源报表中的处理结果验证。
- 本轮产生一次自访问 page_view，约北京时间/新加坡时间 16:17；复盘获客时不得算作外部用户。
- 延迟交互加载是既有隐私决策，见 src/layouts/BaseLayout.astro 注释。建议评估计数口径并用已有 Cloudflare 统计交叉验证，不能只为数字变大而盲目修改。

Google 文档说明 config 默认发送 page_view：https://developers.google.com/analytics/devguides/collection/ga4/views 。

## 搜索诊断：历史记录，非今日新读数

来源 docs/运营循环-状态.md：10-01 读取时，近 7 天 199 展现 / 0 点击 / 平均排名 66，近 28 天 1,217 展现 / 0 点击 / 平均排名 72.8，最新效果数据到 09-27。这说明 Google 搜索获客尚未起量。平均排名是跨查询平均值，不能直接换算为所有页面都在某一页，也不能证明排名是唯一卡点。

覆盖率报告的更新时间停在 09-21，Indexed 55 属滞后快照。URL 检查的 Referring page=None 不等于网站没有内部链接：本轮源码检索已见 lawn-mowing 页面正文指向 mulch、benchmarks 正文指向 painting。下一步应逐页核对实际链接、sitemap、最后抓取与 Google canonical，不沿用「零 referring=孤儿」推断。

## 新关键词复查

用途：现有产品的承接和分发文案复查，不开启新行业。闸 0 已检查矩阵根目录 docs/keyword-family-registry.md，避开判负的新建词族。

- 15 个种子，180 查询，Google+Bing 联想；**721 独立词，41 双源词**。
- Google 179 成功 / 1 失败，Bing 180 成功 / 0 失败。
- 工具意图 396、信息意图 180、商业比较 66、其他观察 79；分类只是文案整理，不代表 SERP 重合度聚类。
- 家族字符串池：retail 78、cleaning 174、lawn 101、menu 34、recipe 38、painting 40、mulch 35；池之间可重叠，不相加为总数。
- 原始证据 docs/kw/traffic-diagnosis-2026-10-02/raw.json、terms.md；分类 clustered.json；种子 seeds-traffic-diagnosis-2026-10-02.txt。
- **联想不等于搜索量。** 本轮未跑 Bing strict，全部标「量级未排序」。
- 客观 SERP 脚本已检查 retail markup calculator / cleaning estimate template / menu profit worksheet，三词均连续三次未解析到结果。记录 FAILED，不能据此判无竞争、可打或没需求；不做新建裁决。

### Top 10 承接候选（均为真实双源联想，排名可打性待验证）

| 词 | 意图 | 现有承接路径 | 页动作 |
|---|---|---|---|
| house cleaning estimate template | 工具 | /estimate-generator/ + /cleaning/cleaning-estimate-calculator/ | 优化现有清洁报价导出链路与说明 |
| house cleaning quote template | 工具 | /estimate-generator/ | 优化已有清洁预设，分发直达链接 |
| cleaning invoice template free | 工具 | /guides/cleaning-invoice-template/ + /cleaning/cleaning-invoice-generator/ | 优化现有 guide→工具链路 |
| post construction cleaning estimate template | 工具 | /guides/post-construction-cleaning-rates/ + /estimate-generator/ | 核实预设能承接后优化，不新建 |
| lawn care estimate template free pdf | 工具 | /lawn/lawn-care-estimate-generator/ | 验证打印/PDF流程后优化 |
| lawn mowing estimate calculator | 工具 | /lawn/lawn-mowing-price-calculator/ | 用 GSC 页级查询复核后优化 |
| recipe cost spreadsheet template | 工具 | /restaurant/recipe-cost-calculator/ | 核对导出格式；未支持 spreadsheet 则忽略该承诺 |
| recipe cost sheet template | 工具 | /restaurant/recipe-cost-calculator/ | 强化既有成本卡打印说明 |
| how to calculate retail markup | 信息 | /retail/retail-math-calculator/ | 强化已有例题、结果解释和内容内链 |
| how to calculate yards of mulch | 信息 | /lawn/mulch-calculator/ | 核对单位解释、链接与收录状态 |

## 七天执行顺序（建议，未发布或发送）

1. **先校准统计。** 正确账号选择 mainstreettoolbox.com；数据流 G-3XXDEY44GG；核对过去 7/28 天、全部渠道、没有比较或过滤。实时看到一次已知测试访问后，排除自访问再判断外部流量。
2. **选一条完整路径：清洁报价。** 已有报价→打印→发票工具，且本轮双源联想支持 template/quote 意图。先实际验证输出可用性，不再新增计算器。
3. **准备定向分发。** 用一个真实报价案例和直达工具链接，分别标 utm_source / utm_medium / utm_campaign=cleaning_validation_20261002。社区发帖和联系人消息均待用户明确授权，不代发。
4. **做小样本诊断。** 测试目标可先设 20 次可归因的目标用户访问，记录修改报价、打印、再次使用和实际反馈。该数量是内部实验目标，不是需求或转化率基准。没有访问=渠道未验证；有访问无使用=检查承接；有使用=检查实际价值和复用。小样本不做市场成败结论。
5. **SEO 聚焦存量。** 最新 GSC 按页查看有展现的查询与排名分布，从 retail/cleaning 中选 3–5 页，依据真实词形改善示例、内容链接和标题；核查 painting/mulch 的抓取与 canonical。不能仅凭全站平均排名排序。
6. **10-09 复盘本轮。** 看外部来源会话、工具操作/打印、反馈与新增搜索点击。搜索排名变化可能需要更长观察，不用一周零点击判 SEO 失败；但无需等到 11-07 才验证渠道与产品使用。

本轮仅新增诊断文档和关键词数据，没有修改产品代码、提交、推送、部署或向外发送消息。
