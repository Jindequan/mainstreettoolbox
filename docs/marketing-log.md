# 营销执行日志

> 规则：每一条对外发出的帖子/评论/私信/邮件记录一行。用户不审批，只审计。
> 渠道策略与文案模板见 [distribution-kit.md](./distribution-kit.md)。

## 状态板

| 渠道 | 状态 | 下一步 |
|---|---|---|
| GSC | ✅ 已提交（用户） | 等 guide 页出展示数据 |
| IndexNow | ✅ 39+4 URL | sitemap 缓存过期后自动收 |
| **Show HN** | ✅ **已发布 + maker 首评** | 守评论区回复问题（item?id=49583186） |
| **r/SideProject** | ✅ **已发布**（t3_1w8loew） | 守评论区，答反馈 |
| r/smallbusiness | ⏸ 等时机 | 仅每周 Promote megathread（规则禁止推广帖） |
| Product Hunt | ⏸ 向导抗自动化+图片上传墙 | 用户走 kit §4 手动 launch（周二 0:01 PT 最佳） |
| X | ⏸ 未登录 | build-in-public 线 |
| 邮件 pitch | ⏸ 邮箱未登录 | 首发对象：Cleanfax 编辑 |
| 长尾内容 | ✅ 3 篇已上线 | 每周 1 篇，按 GSC 展示数据选题 |

## 日志

| 日期 | 平台 | 动作 | 链接/对象 | 结果 |
|---|---|---|---|---|
| 2026-09-06 | IndexNow | 提交 39 URL | api.indexnow.org | 202 Accepted |
| 2026-09-06 | 站内 | 3 篇 guide 上线 | /guides/* | 已收录待观察 |
| 2026-09-06 | 站内 | 打印落款上线 | 全部工具页打印输出 | 生效 |
| 2026-09-06 | Hacker News | Show HN 发布 | news.ycombinator.com/item?id=49583186 | ✅ 在 /newest 首位 |
| 2026-09-06 | Hacker News | maker 首评（反馈引导） | 同上 | ✅ 已发布 |
| 2026-09-06 | Reddit | r/SideProject 发帖 | reddit.com/r/SideProject/comments/1w8loew | ✅ 发布成功（created=t3_1w8loew） |
| 2026-09-06 | Product Hunt | 尝试 launch 向导 | /launch | ⛔ Cloudflare+上传墙，转人工 |
| 2026-09-09 | 站内 | **GA 修复**：Vercel env 补 PUBLIC_GA_ID + 重部署 | 全站 | ✅ gtag 已注入（此前从未采集） |
| 2026-09-09 | Reddit | r/cleaningbusiness 答题：1200sqft 沙龙定价 | comments/1waarzx | ✅ 上线（纯价值无链接，遵守 No-Self-Promo 规则） |
| 2026-09-09 | Reddit | r/cleaningbusiness 答题：加拿大办公室清洁定价 | comments/1wa5bny | ✅ 上线（同上） |
| 2026-09-09 | Reddit | r/cleaningbusiness 答题：deep clean 加项 vs 打包 | comments/1w9975o | ✅ 上线（同上） |
| 2026-09-09 | 站内 | cleaning invoice template guide 上线 | /guides/cleaning-invoice-template/ | ✅ 交易意图内容第 4 篇 |
| 2026-09-10 | Reddit | 巡检：扫描完成、锁定 2 目标后浏览器通道断连 | — | ⛔ 本轮未发帖（次日恢复执行） |
| 2026-09-11 | Reddit | 巡检答题：3500sqft 美术馆商业报价（艺术品环境溢价角度） | comments/1wbqmzc | ✅ 上线（纯价值无链接） |
| 2026-09-11 | Reddit | 巡检答题：123 房新建酒店投标（per-room 锚点 $65-120 + 里程碑付款） | comments/1wbbujk（t1_p95m6wn） | ✅ 上线（前两次被限流静默吞掉，等 6 分钟后走 /api/comment 成功） |
| 2026-09-12 | 站内 | **关键词研究**：Google+Bing 采集 7142 词 → 报告 | docs/keyword-research-2026-09-12.md | ✅ T2 新工具选题确认 |
| 2026-09-12 | 站内 | 3 新工具上线：pressure washing / window cleaning / junk removal | /cleaning/*-calculator/ | ✅ 49 页构建 |
| 2026-09-12 | 站内 | post-construction cleaning rates guide（搜索+Reddit 双重信号） | /guides/post-construction-cleaning-rates/ | ✅ 下批：snow removal/painting/catering |
| 2026-09-12 | 站内 | T1 优化：contractor 页补 handyman 定价段（10+ 关键词变体） | /construction/contractor-hourly-rate-calculator/ | ✅ |
| 2026-09-12 | 站内 | T1 优化：food-cost 页 FAQ 补 "free app" 场景（4 变体词簇） | /restaurant/food-cost-percentage-calculator/ | ✅ 注意：该页 FAQ 为 JS 渲染，非 JS 爬虫不可见 |
| 2026-09-12 | 站内 | T1 优化：price-list-builder 跨行业泛化文案（service price list template 词簇） | /salon/service-price-list-builder/ | ✅ |
| 2026-09-12 | IndexNow | 重提 2 个 T1 更新页 | api.indexnow.org | 200 OK |
| 2026-09-12 | 站内 | **GEO 基线审计**（四层漏斗实测）+ 4 项 quick wins 上线：restaurant 3 定制页服务端 FAQ+schema（此前 FAQ 是死数据）、首页 Organization/WebSite schema、llms.txt、robots.txt AI 爬虫显式配置 | docs/geo-baseline-2026-09-12.md | ✅ GEO ~42→~48；10 月中旬 compare |
| 2026-09-13 | 运营循环 | 第 1 轮：snow removal 闸 3 基准研究（10 来源交叉，5 档区间 ≥2 源）→ 全闸通过进构建队列 | docs/benchmarks-snow-removal.md | ✅ GSC 本轮不可读（显示器不可用），已记状态文件 |
| 2026-09-14 | 站内 | 运营循环第 2 轮：**Snow Removal Pricing Calculator 上线**（第 27 个工具，挂 lawn）；per-push 三档/seasonal/hourly 全走 ≥2 源基准，问题式 H3 + 来源化 FAQ | /lawn/snow-removal-pricing-calculator/ | ✅ 生产冒烟全绿 + IndexNow 200；GSC 连续 2 天不可读 |
| 2026-09-15 | 运营循环 | 第 3 轮：**GSC 通道打通（IAB+browser-use）**，首份全量数据：3mo 527 展现/0 点击/排名 73.6/181 查询词 → 词形对齐批次上线（material-cost 与 menu-pricing 两页 title 吸收实测词形） | 状态机数据日志 | ✅ 生产冒烟 + IndexNow 200；读数方法已固化进规则 |
| 2026-09-15 | 站内 | **Recipe Cost Calculator 工作台上线**（第 28 个工具，用户指令「为中小企业做真东西」）：菜单利润链核心件；食材行→单份成本→目标成本率售价；可打印成本卡+本地草稿 | /restaurant/recipe-cost-calculator/ | ✅ 生产冒烟全绿 + IndexNow 200；需求三重验证（词库 12+ 变体/GSC menu 词 25+ 展现/MarketMan $249/mo） |
| 2026-09-16 | 站内 | 运营循环第 5 轮：**Pour Cost Calculator 上线**（第 29 个工具，挂 restaurant）；品类带 spirits 15-22%/draft 20-28%/wine 28-40% 全走池内 ≥2 源基准，目标价修复线 + 来源化 FAQ | /restaurant/pour-cost-calculator/ | ✅ 生产冒烟 + IndexNow 200；GSC 本轮不可读（IAB 会话过期，待用户重登） |

### 外联回复 2026-09-13
- **Neal（Can We Launch）来信**：经 Show HN 帖子扫站，报 3 项。核实：① GA cookieless 已配置（client_storage none），对方称有 2 个持久 cookie —— 已回信索要 cookie 名复现；② LCP 4.4s / 图片权重**属实** → hero 图已压 ~20%；③ www 双主机**属实** → vercel.json www→apex 308 已上线验证。已回信：澄清+通报修复+婉拒付费报告。**信号：Show HN 渠道带来首个深度外联。**

### 巡检结论 2026-09-12
- **0 条评论（纪律执行）**：11 帖过筛无合格目标——已答 2 帖排除；其余为经验分享/取消政策/消费者投诉/薪酬（非服务定价）/竞品调研/非领域话题。不硬凑。
- IndexNow 无待提交项（白天已提交 4 个新 URL 并验证 ALL_OK）。

### 巡检结论 2026-09-11
- 答 2 条（上限 3 内）；跳过：员工薪酬帖（领域边缘+措辞混乱）、客户生病取消帖（非定价）、2 个竞品调研帖（不碰）、酒类保险（非领域）、草坪设备（非定价）。
- **选题信号**：新建工程清洁（post-construction）两周内出现 3 次（酒店投标、post-construction 专创业夫妻、住宅新建）→ 潜在 guide 选题："How to bid post-construction cleaning"。
- **操作经验**：old.reddit 连续快速发评会触发 RATELIMIT（约 6 分钟冷却），DOM click 静默失败即限流征兆；正确姿势是 fetch POST /api/comment（带 uh modhash + api_type=json），返回可验证的 t1_id。

### R2 执行 2026-09-14（找词 → 验证 → 闸门）
- **T1 上线**：cleaning-checklist-builder 重定位为 "Deep Cleaning Checklist Generator — By Room"（承接 35+ 变体簇：by room/printable/move-out），预设换成 12 行深度清洁 by-room 任务，FAQ 补 deep vs move-out 区分；price-list-builder FAQ 补 handyman 换行示例（6 个常见服务+价锚）。IndexNow 已提 2 URL（200）。
- **闸 3 研究完成**（WebSearch ≥2 源）：pour cost 18–24% 总体+分品类（Backbar/DoorDash/MAJC/Bevspot）✅ 全闸过、候选池首位；gutter $0.95–2.50/lf 分楼层（Angi/CrewNest）✅ 数字齐、闸 2 需差异化；aeration 组合 $30–80/千sqft（HomeGuide/CountBricks/论坛）✅ 全闸过+秋季窗口；bakery **闸 2 不过**（免费工具已扎堆）→ 观察。
- 结果已写入 运营循环-状态.md 候选池；循环下一主线（painting 研究）不受影响。

### 外链与 Neal 回信 2026-09-14
- **Neal 第 2 封回信**（高质量技术信）：重扫确认 _ga + _ga_3XXDEY44GG 持久 cookie 属实，并给出双假设排查法。我方核实：单 tag、config 位置正确（他的两个常规病因都不成立）→ 直接上根治修复：**GA 改为首次交互后注入**（加载即追踪请求 + cookie 写入两个 finding 同时消失）。已部署（Vercel CLI 撞当日上限，走 git 自动部署验证中）。已回信：核实结果 + 修复说明 + 请他重扫确认 + 明确致谢。
- **关系价值**：Neal 是站长/工具圈内容作者，一次专业互动 = 潜在自然提及。这是 link-building playbook「路径 3：关系网络」的首个活案例。
- **新文档**：docs/link-building-playbook.md —— 五条白帽路径（编辑 pitch / 目录提交 / 关系网络 / 基准数据引用磁石页 / broken link），磁石页《Service Business Pricing Benchmarks 2026》优先级提升。

### 巡检结论 2026-09-14（夜轮）
- **答 2 条**：① Quote HELP（2307sqft/4猫/never-cleaned：$375 首次=顶格偏低可上探 $450-500，**全场没人问 $240/月对应的频率**——biweekly $120/次远低于市场 $150-220，这是我的增量点）；② 亏损老客户识别（4h 新帖仅 1 评：revenue per labor hour 跟踪法 + 半年工时复测 + 涨价过渡结构）→ t1_p9r3a31。零链接纯价值。
- 跳过：3 个竞品调研帖、2 个内容帖（非求助）、新手获客帖（非定价）、保险/草坪投诉（非领域）。
- **选题信号**：recurring client profitability 今天同日两帖（亏损识别+单客户亏损指标）→ 潜在 guide："How to know when a recurring client is unprofitable"（清洁行业经营指标方向，站点还没有经营类内容）。
- **部署备注**：磁石页 /benchmarks/service-pricing-2026/ 已提交 IndexNow 但**页面 404**——Vercel 当日 100 部署额度耗尽，等 UTC 重置（北京 8 点）后 git 自动部署生效，届时需重提 IndexNow。
- **Cleanfax pitch**：全文已备（docs/outbox-cleanfax.md），Gmail compose 渲染 3 次失败（网络）→ 明日重发。

### 外联鉴定 2026-09-15（用户转来的"外链"邮件）
- **LaunchKiwi "DR 51 dofollow 换 badge" 邀请 → 拒绝归档**。核实：站点 0 产品/0 投票/0 listing，自报 79k 月访问与 DR 均不可验证，唯一业务=卖链接（link farm 模式）。放 badge = 互惠链接（Google link scheme 明文覆盖），且给空壳站导流。
- 教训已固化进 link-building-playbook.md 路径 2：目录验收清单四条（真实 listing 非空、不卖 dofollow、不要求回链 badge、自报数字需独立佐证）。

### 巡检结论 2026-09-15
- **0 条评论（纪律执行）**：11 帖过筛无合格目标——4 个竞品调研帖（quote 流程/效率工具调研连发）、3 个经验征集帖（非求助）、客户冲突、保险、草坪投诉均非定价求助。昨日已答的亏损客户帖评论 2→24（我们的回答在持续曝光）。
- **选题信号强化**：Post-Construction 主题 24h 内再次出现（本月第 4 次）——昨日上线的 post-construction guide 选题再次验证押对。
- **磁石页生效**：/benchmarks/service-pricing-2026/ 部署验证 200，IndexNow 重提 200 ✅（昨日 Vercel 限额遗留清完）。
- **Cleanfax 仍排队**：Gmail 今日整页未渲染（bodyLen=0，网络级），pitch 在 outbox 备好，网络稳定即发。
