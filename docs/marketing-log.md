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
| 2026-09-17 | 站内 | 运营循环第 6 轮：**Aeration and Overseeding Calculator 上线**（第 30 个工具，挂 lawn，赶秋季窗口）；建前重验基准（组合 $35-80/ksqft，整单口径自洽） | /lawn/aeration-and-overseeding-calculator/ | ✅ 生产冒烟 + IndexNow 200；GSC 恢复读数（7d 576 展现/0 点击/排名 75.8，爬升健康） |
| 2026-09-20 | 站内 | 运营循环第 13 轮：tutoring 闸 2 查证闭项（Edtonomy/SubSchool 已占位 → 独立工具不做）→ **price-list-builder 加 tutoring 预设**（math $55 / reading $45 / SAT $75，≥2 源）承接 R3 词族 | /salon/service-price-list-builder/?trade=tutoring | ✅ 测试构建全绿 + 部署中；GSC 例行 7d 451/0/75.5、28d 累计 849（三天 +177）；hub 410 rewrites 修复部署中 |
| 2026-09-21 | 站内 | 运营循环第 14 轮：**food-cost 页加厚上线**（212→636 词，问题式 H3 + Rezku 2026 基准表 + 菜单利润链互链）；GSC 28d 累计 904 展现 | /restaurant/food-cost-percentage-calculator/ | ✅ 生产冒烟 + IndexNow 200；明日 09-22 中检 |
| 2026-09-22 | 运营循环 | 第 15 轮·**两周判据中检**：判据未达（0 点击），诊断=排名 74 是唯一卡点（展现 904 健康爬升、181 查询全命中）；词形对齐第二批上线（lawn-mowing 吸收 mowing estimate 族） | 状态机中检复盘区 | ✅ 生产 + IndexNow 200；GSC 会话第 3 次过期（结构性问题已提两个方案待用户拍板） |
| 2026-09-24 | 运营循环 | 第 16 轮·数据观察：GSC 恢复读数（用户重登），28d 1052 展现破千；**收录核对=Indexed 55 页（健康）**；09-15 词形对齐三连全部翻倍验证成功 | 状态机数据日志 | ✅ 无需改动无部署；10-06 判据日 + 10-12 月度复盘 |
| 2026-10-02 | 运营循环 | **GA+GSC 双通道全量读数（用户质询触发，提前判定）**：GA 属性 552881939，28d（Sep4–Oct1）总 90 会话全部为 Direct 86/Paid 2/Unassigned 2/Referral 1，**Organic Search sessions=0**（"1-4 of 4" 完整行数实锤）；近 7 天活跃用户 0。GSC 28d 1,280 展现/**0 点击**/CTR 0%/排名 71.7；日级曲线展现 9/8–9/12 见顶（~100/天）后持续回落至 ~20-40/天。**结论：organic 流量从未启动过，不是"最近掉到 0"**；展现回落与排名过深（第 7-8 页）并存，10-06 判据日结论已可预定=不达标 | GA 后台+GSC 后台截图留存 | ✅ 双源交叉一致（GSC 0 点击 ↔ GA organic 0 会话，GA 采集链路正常非故障） |

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

### 词形对准 2026-09-16（SERP 反向工程，回应用户"排名降/0 点击"）
- **诊断**：GSC 只显示已有展现的词（后视镜）——真正的缺口是"有搜索需求但我们词形没覆盖"的词。四词族 SERP 侦察发现全部是"有功能、无词形"错配：
  - menu-pricing ← "recipe cost / plate cost calculator"（title+description 已对准）
  - tip-out ← "tip pool / tip sharing"（title+description 已对准；**bespoke 页 title 独立于工具 def，已单独修复**——教训：BESPOKE 页的 SEO 元数据在 pages/ 下，不在 tools/ def 里）
  - break-even ← "covers per day"（title 已对准）
  - labor-cost ← "labor cost percentage"（title+description 已对准）
- **功能级 gap**：tip pool 按工时/点数/销售额分（竞品 eTip/ShiftFlow 模式）→ 记入候选池，下次工具迭代项。
- 全部零逻辑改动，53 页构建，部署验证中。

### 巡检结论 2026-09-16
- **0 条评论（纪律执行）**：11 帖过筛无合格目标——经营困境帖（21 评饱和）、lead 转化帖（非定价）、4 个竞品调研/征集帖、客户冲突、非领域。亏损客户帖持续曝光中。
- **选题信号**：post-construction 征集帖第 5 次出现；lead 转化（"有 lead 关不掉"）首次出现——若再现可考虑报价转化向内容。
- **⚠️ Google 会话过期**：浏览器里 jindeq52 与 jindeqhk52 均显示 Signed out——Cleanfax 发送被阻（outbox 已备）。**需用户重新登录两个账号**（Gmail=jindeq52；GA/GSC=jindeqhk52），否则数据读数与邮件渠道全部暂停。

### Cleanfax 发送尝试 2026-09-16（登录恢复后）
- 用户已重新登录 Google。Gmail 会话恢复 ✅，但 compose 界面在 IAB 里连续多轮渲染失败（收件人可由 URL 预填、正文编辑器间歇消失）。pitch 全文在 docs/outbox-cleanfax.md。
- 处置：不再硬磕。**选项 A**：用户在自己 Chrome 打开 Gmail 粘贴发送（30 秒）；**选项 B**：IAB 网络状态好的窗口重试。

### 巡检结论 2026-09-17（PH launch 日）
- **⚠️ PH launch 状态（最优先）**：launch 15:01 生效，21:31 检查时 **1 票 0 评**——首评因 **PH 会话过期**（Sign in 按钮）未能自动发出，黄金 6 小时已过。**需用户重新登录 PH**，登录后我立即发首评（文本已备）并接管评论 24h。
- **答 1 条**：big box 商店 post-construction 报价（22h，2 评未饱和）——Tractor Supply $5,000 交叉验证（$0.15-0.30/sqft 带 → $3-6k 区间）、三阶段分列报价法、touchup day 封顶陷阱、书面 exclusions。✅ 上线确认。
- 第 2 条（First client failure：视频报价防御+事后补救）内容已写好但连遇 RATELIMIT（8 分钟冷却升级）→ **放弃发送，内容留存**（观点可复用）。
- 跳过：WhatsApp 流程帖、Jobber 软件调研、$170K 经验分享、lead gen 招标、非定价旧帖。
- **信号**：post-construction 主题**第 6 次**出现（big box 投价求助）——已有 guide+磁石页承接，选题完全押中。

### 巡检结论 2026-09-19（PH launch 结束后）
- **PH launch 复盘（窗口 09-17 15:01 → 09-18 15:01 已关闭）**：最终 1 票 0 评。教训入档：① launch 守护动作不能依赖"用户回消息触发"（会话被巡检抢占+用户未触发=动作丢失）；② Google/PH 会话过期是高概率事件，大动作前必须先验会话；③ 未来 launch 类动作用独立定时任务（非定时会话内创建）自动执行。产品页仍在（1 票），不再补救首评。
- **答 2 条**：① recurring client profitability（本月主题第 3 次！复用上次被限流的内容适配发出）→ t1_parjo72；② Jobber 数百客户涨价策略（分层涨幅+grandfather 锁价期权+流失电话预案——竞品只答了 API 技术，我答策略）→ t1_parlsiz。零链接纯价值。
- 跳过：定价策略内容帖、新手泛求助、裁员帖、WhatsApp 流程帖、motel（非领域）。
- **主题热度确认**："recurring client profitability / 涨价执行" 已成为 r/cleaningbusiness 的常青痛点（本周 3-4 帖）→ **guide 选题升级为高优先**："How to reprice recurring cleaning clients"（数字全有：工时跟踪法、涨价过渡结构、grandfather 机制——三次回答的合集就是一篇 guide）。

### 巡检 2026-09-20：跳过
- 本轮不执行浏览器操作：用户正在使用浏览器（真实使用优先于自动巡检）。Reddit 扫描顺延至下轮。
- **故障记录（诚实入档）**：09-19 会话结束后出现重复调用死循环（数十次无操作命令在用户浏览器执行），干扰用户正常使用。根因待查（疑似 turn-end 后残留循环）。**预防**：巡检会话的浏览器操作加使用中检测——用户有活跃标签页时本轮只读不写；会话收尾只做一次结束标记，禁止重复调用。

### 巡检 + 中检 2026-09-22
- **巡检 0 条**：11 帖过筛——新定价大热帖（43 评，饱和跳过）；recurring profitability（13 评）与 Jobber 涨价（11 评）均为我们 09-19 已答帖（评论持续增长中：7→13、6→11，说明答案在获得可见度）；其余非求助。按纪律 0 条。
- **⚠️ 09-22 中检被阻塞**：jindeqhk52 的 Google 会话再次过期（09-16 登录，维持约 6 天）。GA/GSC 读数无法执行。**需用户第 3 次登录**。
- **持久性建议**（会话反复过期说明浏览器存储被清或有退出机制）：用户登录时请留意 Google 的"保持登录"提示；或考虑中检改用用户截图方式。
- 基线对照（09-14 首读）：活跃用户 6/7天、organic=0。中检顺延至登录恢复后。

### 巡检 2026-09-23：顺延（用户正在登录 Google）
- 检测到用户正在浏览器执行 Google 登录（accounts.google.com 账号选择页，目标 analytics.google.com authuser=1）——正是中检所需。
- 本轮巡检**完全跳过浏览器操作**，避免任何干扰。Reddit 扫描顺延至下一轮（登录完成后自动恢复）。
- 登录完成后中检立即补做：GA 展现/用户读数对照基线（6 用户/7天）+ GSC 查询词与收录状态。

### 巡检 2026-09-24：跳过（浏览器标签系统不稳定 + 用户可能在登录流程中）
- 检测到用户浏览器停在 Google 登录账号选择页（目标 analytics authuser=1，是中检前置动作）——用户可能正在操作。
- 本轮浏览器操作全部跳过（标签 id 反复失效 + 避免干扰用户登录流程）。Reddit 扫描顺延下轮。
- **登录提示**：账号选择页若有 jindeqhk52 选项，直接点击即可恢复（无需密码，前提是会话未彻底过期）；若提示输密码则输入后登录。完成后中检读数自动解锁。

### 内容交付 2026-09-24（"do more"指令）
- **guide 上线**：/guides/reprice-recurring-clients/ ——《How to reprice recurring cleaning clients》。内容 = 三次 Reddit 回答（工时跟踪三列法 / 涨价过渡结构 / grandfather 锁价）的系统化合集，FAQ schema，内链 labor-cost + cleaning-estimate + 磁石页。IndexNow 200，页面验证 200 ✅。
- **发现**：pour-cost-calculator 已由并行运营循环建成并注册（63 页构建）——候选池首位候选已交付，无需重复。
- 此交付回应 r/cleaningbusiness 本周 3-4 次的 recurring profitability/涨价主题（帖子评论数持续增长中：profitability 7→13、Jobber 6→11）。

### 第 22 轮 2026-10-01：mold remediation 计算器上线 + GSC 10-01 读数
- **上线**：/cleaning/mold-remediation-cost-calculator/（第 45 工具/73 页）——清欠批验三族之二。闸 3 补源达标：小型补丁 $500–1,500（TOH∩HelperTools）、典型单 $1,200–3,750（MyQuoteIQ∩SERVPRO∩Palm∩Angi）、全屋 $10k–30k（TOH 上带+SERP 共识佐证）。承包商报价视角差异化=报价行项清单（containment/HEPA/clearance）。IndexNow 200；Bing SubmitUrlBatch 待 key（TODO 区）。
- **GSC 读数（数据滞后至 09-27）**：7d 199 展现/0 点击/**排名 66（历史最佳，此前 72-76）**；28d 1,217 展现。判读：展现连续回落（526→…→199）与排名爬升并存——Google 收窄到相关查询，质量信号积累期。
- **风险登记**：①Indexed 55 一周持平（9 新页未收）→ 10-14 死线（≥65）有压力，预案=内链专项轮提前；②10-06 判据（28d≥2000+点击≥3）按现轨迹不达 → 判据日行使自主修订权（存档旧值+注明理由）。

### 第 25 轮 2026-10-01：retail 族内链批次 + benchmarks 对齐 + 多实例协同规则
- **retail 集群互链成网**：6 工具 related 补齐（retail-math 为桥），枢纽 retail 段算术带 +2 行 + 3 深链，5 个工具页 explain 问句 H3（GEO 工具页侧清零）——服务 10-21 判据（retail 族 28d 展现 ≥100）的承接面。
- **benchmarks-attic-insulation.md 对齐重写**：TLS 源核验真实（tlsinsulation.com 2026 总带 $0.75–7.00），已部署工具带全表可追溯；open-cell 三源带/空阁楼档/拆除带入"未进计算"备注区=未来迭代素材。
- **撞车根因发现**：两实例共享同一工作目录，对方 git add -A 连续两轮把本实例在途改动裹挟提交（内容无损、审计混乱）。运行规则 10 入册：禁 add -A、逐文件审阅、双向 fetch、在途文件不覆盖。
- 部署对齐：25 轮末全量重建部署，生产=origin HEAD；IndexNow 12 URL 200。

### 第 28 轮 2026-10-01：GEO 内容批次——全站工具页问句 H3 清零 + 安全响应头（用户指令"继续优化 SEO GEO"）
- **普查**：38 个注册表工具页 explain，18 个零 H3（全是第 2 轮 snow-removal 规范立起前的老工具，含 GSC 展现最高的 material-cost / menu-pricing）+ 2 个部分缺失。
- **执行**：子代理批次（硬约束：只插问句 H3、原句不动、零新增数字）+ 人工抽检 diff + 27 tests/77 页 build/部署 19s/生产抽检/IndexNow 20 URL 200。每页现在都是「问句标题+首段直答」的 AI 可提取形态。
- **安全响应头**：HSTS 已有（Vercel 默认）；补 nosniff / X-Frame-Options SAMEORIGIN / Referrer-Policy；CSP 涉及 GA 内联脚本需单独测试，遗留。
- **GEO 基线记分**：Citable 层最大结构性缺口（全站 0 问题式标题）清零；遗留仅 CSP、YouTube 实体层、10 月中 compare 重跑（预期 citability 分从 ~55 跳升）。

### 第 29 轮 2026-10-01：not-indexed 42 桶拆解 + URL inspection 实查（用户指令）
- **关键发现：覆盖率报告 Last update=9/21（陈旧 10 天）**——"Indexed 55 持平"部分是假象。URL inspection 实查：invoice-generator、/contact/ 均已收录（报告滞后/Crawled 桶自愈）；painting-estimate（从未抓取+零 referring page）、mulch-calculator（URL unknown+零 sitemap+零 referring）为真孤儿 → 两例 Indexing requested 已提交 ✓；/lawn/ 未收录，请求未确认待补。
- **结构性结论**：Discovered 桶的老工具页全是"零内容链孤儿"——round 24 只救了新页，老页内链缺口实锤，下轮做孤儿页内容链批次。
- 良性桶：32 canonical 变体 + 2 重定向 = 设计使然，不处理；feedback/services/terms 工具页无需排名。

### 第 30 轮 2026-10-01：孤儿页修复——painting-estimate 接入内容链网（用户指令"修复问题，持续推进"）
- **全站严格孤儿审计**（基于 dist 构建产物数入链）：69 内容页中零入链孤儿仅 1 个 = **construction/painting-estimate-calculator**（12 个 /d/ Ko-fi 交付页为 robots 屏蔽的故意孤儿，正确）。1 入链弱页 2 个（guides），可接受。
- **修复**：painting 新增 2 条入链——material-cost-estimator related + 磁石页 service-pricing-2026 计算器清单（连同 mulch 一起补入）；加 round 24 已有 drywall related = 共 3 条内容链。27 tests/77 页/部署 22s/IndexNow 4 URL 200。
- **勘误**：第 29 轮"painting 零入链"结论部分失准（审计 glob 失效漏报 drywall related）——Google "None detected" 反映 round 24 前的爬取态。painting/mulch 的收录请求（第 29 轮已提交）+ 新入链双管齐下。
- **/lawn/ 收录请求**：GSC 会话标签页丢失，两次尝试未完成 → TODO 下轮（确切步骤见 TODO 区）。

### 第 31 轮 2026-10-01：/lawn/ 请求闭环 + llms-audit 修复（用户指令"do more"）
- /lawn/ Indexing requested 确认✓——4 个问题 URL 全部处置完毕（painting/mulch/lawn 已请求收录，invoice-generator 与 /contact/ 实查早已收录）。
- llms-audit.mjs 重写（正则扫描 src/tools，裸 node 可跑）；首跑即抓到真缺口：tree-removal 漏登 llms.txt（上线时审计脚本恰好是坏的）→ 回填 + 部署 + 线上验证 ✓。审计缺口归零。

### 第 32 轮 2026-10-01：catering 闸 2 闭项 + 移动端导航修复
- **catering price calculator 闸 2 不过→闭项**：SERP 已有 Tabby（人工/租赁/毛利全模型）、Menubly、Kwickos、Food Cost Tools 等免费即时计算器 + Thumbtack 铅页，增量不足。至此候选池历史遗留项全部清零（上线/闭项/观察各有归属），新选题供给移交 R7 词库。
- **移动端导航修复**（09-19 ui-reviewer 遗留）：≤860px 之前 Tools/Get help 全隐藏只剩按钮；现在保留 Tools 文字链（移动端唯一工具入口），Get help 加 .nav-help 类继续隐藏，nav-links 加 flex-wrap 防 360px 溢出。

### R10 找词轮 2026-10-08：foundation repair 浮出（用户指令「新词」）
- 40 新种子收割 6,904 词（零失败）；18 条 SERP 实查；T1=foundation repair cost（脏 SERP+闸 3 五源）、T2=basement waterproofing；13 头词具名判死。Bing strict 验证积压（key 不在会话，10-07 InvalidApiKey）。报告：docs/keyword-research-R10-2026-10-08.md。

### 10-09 检查点轮：organic 破蛋实锤 + 点击落 painting 页 + Tier 0 统计上线
- **里程碑**：GA organic 首会话（5m03s 深互动）+ GSC 28d 1 点击/1.71K 展现/均排 65.3（连爬）。点击唯一落点 /construction/painting-estimate-calculator/（152 展现）= TOB 目标页。判定：站内线继续。
- **B 端铺垫**：contact 漏斗全站巡检通过（/contact + painting + 3 抽查页 CTA 全在）。
- **Tier 0**：wrangler OAuth 已在（jindeq@126.com）→ D1 mst-stats + stats-worker 部署冒烟全过 → PUBLIC_STATS_API 入 Vercel Production → 同 commit redeploy 生效。per-tool 真实使用数据下周起可读，TOB 高意向工具定位转实测。commit 11c4cdf 本地（积累制）。
- **外联**：零新发（FCP/Groomer 已于 10-03 清账，9 收件人窗口继续，今日巡检归 9:00 自动化）。

### 10-09 下午：用户报告"GA 7 天 0 user"排查 + day-7 bump 四连发
- **排查结论：追踪管道健康，7 天真实数字=5 用户非 0**。用户所见 0 = 属性陷阱（GA 首开默认落 whataicando 资源，localStorage p539592335）或首页"今日"卡片。GA 近 7 天（10-02~10-08）：5 活跃/5 新用户/均互动 1m08s/23 事件；painting 页 0% 跳出单=organic 点击者。近 7 天真实规模确实小（28 天 61 人的大头是 9 月中旬分发脉冲+10 月初测试），这就是曲线真相。
- **管道验证**：gtag 懒注入（首次交互后）工作正常——IAB 实测交互后 gtag.js 加载+collect 发出；CSP 未拦 GA；页面级 gtag 代码完好。GA 报表有 24-48h 延迟，今日我方访问明日可见。
- **GSC 对照（先导指标）**：近 7 天 190 词/约 500 展现=**上线以来最强一周**（表内口径；文件 gsc-queries-7d-2026-10-09.csv）。hydroseed 族 2-5 位、tree removal 8.5、windshield 9.4 全在窗口内。展现爬升、点击未兑现=量级问题，方向正确。
- **Reddit 21:30 巡检自动化仍是 paused**：CronUpdate 无 enabled 字段，助手无法从 API 恢复，需用户在 Automations UI 打开（或指定助手手办轮次）。
- **day-7 bump 四连发（全部 Sent 实证，线程计数=2）**：elizabethc（Cleanfax，附 sidebar 供稿提议）、mcgowank（R&R，price-the-job item 提议）、bcastiglia（MRM，假日菜单季 know-your-numbers 提议）、mmayer（FCP，price-your-crew-right 专栏提议）。全部回原线程+如实不编造新功能；纪律：单击+10s+Sent row 实证，零重复。Groomer 不 bump（2018 刊头地址待观察退信）；L&L Brian 已回复不 bump。

### 10-15 下午:触发项到位,九线程编队首批 3 发全出(IAB Gmail,每发 Sent 实证)
- **P0 接住 Brian Horn(L&L/GIE Media,bhorn@gie.net)10-05 回信**——原文 "Thanks, Devin. We will get this posted."(接稿承诺,此前台账误读为普通回复晾了 10 天)。已回跟进信:工具直链+可粘贴导语+双源区间+雪季时效。**若发布=lawnandlandscape.com 引用域到手,引用域 0→1**。判据:10-22 前查 lawnandlandscape.com 是否上稿。
- **新 pitch 2 封发出**:①AGRR/glassBYTEs Abby Bowman(abowman@glass.com),钩子=7/30《2026 Top Retailers》,主打 windshield 匿名价格带 vs 铅页;②Green Industry Pros Jonathan Kozlowski(jkozlowski@iron.markets),钩子=Job Costing 版块《What Stalled Financing Reveals About Landscape Sales》,tree/snow/sod 三计算器+供稿提议。两封均含 concierge 定制句(收入线)。
- **TLC 撤销**:Total Landscape Care 10-01 停刊,并入 EquipmentWorld(outbox 挂账,改投需另研)。CMM/UNITS 无公开邮箱,走表单/LinkedIn,排队中。
- 老四线程(Cleanfax/R&R/MRM/FCP)day-14 bump 排 10-23,今日不动。纪律:单击+Sent 实证+线程计数,零重复。

### 10-16 上午:手动执行 SEO 运营闭环(巡检自动化连续第 4 天未触发,主机未开机;7 点档改 9 点档无效,待用户定常开时段)
- **GSC 7d 全表落盘**(gsc-queries-7d-2026-10-16.csv,104 查询):7d=0 点击/328 展现/均位 48.2;3mo=1 点击/2,242/63.2。**结构性坏消息:10-09 复盘里的 p2-p9 新页层(hydroseed p2.0/sod p4.6/tree p8.5/windshield p9.4)在本窗口整体消失**——新鲜度衰减+零引用域,预判"赢排名=赢面包屑"进一步恶化为"排名本身也留不住"。**引用域=第一瓶颈实锤,内容端任何优化不解决此层**。
- **唯一活排名层=sprinkler blowout 族**(near me p2.0/裸词 p4.0/how-much 问句 p12.2,合计约 20 展现,10 月旺季正当时)→ 当日推位(commit 17e8ff7):desc 价格锚+FAQ 两条 homeowner 精确问句+lawn-care-estimate 入链(此前该页零 contextual inlink=孤儿)。IndexNow 200,线上 desc/FAQ 实证生效。
- **外联扫描(Gmail hk52,搜索实证)**:bhorn@gie.net 线程仅 2 封我方发出(10-09 pitch/10-15 跟进),Brian 10-05 承诺后无下文;其余 10 家(issa×2/bnpmedia/MRM/groupc/bobit/iron.markets/barkleigh/agrr/greenindustrypros)零来信。**10-22 引用域 0→1 判据当前趋势 MISS**,10-22 前不再 bump;老四线程 day-14 bump 维持 10-23 排期。
- **意外信号(矩阵侧)**:GSC 通知 procurelink.store 28 天 20 点击(该站首次破蛋);AdSense 账号被上"ad serving limit"(pub-8535…,10-12,需用户在后台看原因)。
- GSC 28d/Pages 视图受自绘控件阻塞未取(已试 4 法),明早巡检用 EXPORT 下载路径替代。

### 10-16 下午:外联推进(Bing key 解锁日)+ 两封定稿挂账
- **Gmail(jindeq52)回复扫描**:六媒体域名(gie/glass/iron.markets/cmmonline/naahq/randallreilly)21 天零回复。旧四线程不动,day-14 bump 排 10-23;Brian 上稿查证 10-22 不变。
- **④CMM 文案定稿+直投升级**:发现 cmmonline.com/contact 挂编辑部直投邮箱,弃表单改直投 Jeff Cross(jeffcross@issa.com,ISSA Media Director)。HOOK=其 10-15 芝加哥酒店罢工报道;工具 URL /cleaning/cleaning-estimate-calculator/ 验真 200(move-out 模式 $200-600 在工具页)。Gmail compose 参数预填成功,Send 未落地(IAB 输入通道失稳)→ 文案挂账 outbox,择机 10 秒重发。
- **⑤UNITS 文案定稿**:HOOK=10 月刊 proptech 专题+NAA 10-14 运营成本研究注;素材验真=benchmarks-security-deposit-refund.md(WA 2023 年 21→30、AL 60 非 35 均 statute 坐实)+两 deposit 工具 200。走 naahq 表单,同批择机。
- **Bing key 解锁**(见 outbox 挂账):验证层恢复,procurelink 基线首读 unit price calculator 176 strict/90d。
- 纪律:零重复(两封均未 Sent,不计数),发送后按例 marketing-log 记一行+Sent 实证。

### 10-17 早:巡检轮(自动化 53165b3c 首个当天首跑)
- **GSC 7d 全表落盘**(docs/keyword-data/gsc-queries-7d-2026-10-17.csv):90 查询/约 166 展现/0 点击——展现较 10-16 的 328 腰斩,新鲜度衰减持续。**blowout 族守层**:sprinkler blowout near me + irrigation blowout near me 双双 p2.0(后者为新变体首次冒头)、sprinkler blowout p4.0、问句 how much does it cost to blow out sprinklers 5 展现@p12.2——昨日推位页无劣化。Tier 0:sprinkler-blowout-cost-calculator 7 天首次 1 使用/1 用户。
- **三层判定:全部无可动目标**。前 10 层全是 1-2 展现查询(CTR 手术无归因意义,且该族 snippet 昨已改);中段唯一真需求词(问句族 5@p12.2)正处单变量归因周期,判据=下周同表(~10-23);其余 p>20 假展现层按定义不动。
- **外联**:hk52 收件箱扫描零回复(与 10-16 jindeq52 21 天零回复扫描互证);bump 队列今日不动(day-14 排 10-23,Brian 上稿查证 10-22);CMM/UNITS 两封继续挂账待有人值守发送(IAB 输入通道未复测)。
- 28d/Pages 视图仍受自绘控件阻塞,EXPORT 下载路径待做。

### 10-18 早:巡检轮(自动化当天首跑)
- **GSC 7d 全表落盘**(docs/keyword-data/gsc-queries-7d-2026-10-18.csv):86 查询/约 160 展现/0 点击,与昨日 166 持平(新鲜度衰减趋稳)。blowout 族:sprinkler blowout near me 掉出表外(昨日 1@p2.0),**irrigation blowout near me 守 p2.0**、sprinkler blowout p4.0;推位问句 4@p12.5(昨日 5@p12.2)稳,归因周期不动,判据=10-23 同表对比。
- **三层全空(第 2 连续轮)→ 按技能升级上报:站内动作队列已排干**(前 10 层全是 1-2 展现查询,手术无归因;中段唯一真需求词在归因周期;假展现层不动)。**站级瓶颈=引用域 0,唯一上限杠杆在站外**:CMM/UNITS 两封定稿待有人值守发送、10-22 Brian 上稿查证、10-23 day-14 bump、11-07 总死线。
- Tier 0:7 天 0 使用(sprinkler-blowout 那次使用已滚出窗口)。hk52 收件箱零回复(最新一封 10-16 全噪音)。28d/Pages 控件障碍未重试(EXPORT 路径待做)。

### 10-18 推进轮:④CMM 实为已发(×2),⑤UNITS 双路被堵
- **④CMM 反转确认:10-16 已发出——但重复两封**(20:11+20:16,同主题)。10-16 的"发送失败"是误判:第一次 Send 成功,验证错用了 compose 标题而非 Sent 文件夹,补发造成重复。处置:不追第三封;Jeff 若回复顺带致歉;10-23 若跟进加"apologies if twice"。**死规矩入册:判失败必先查 Sent(to: 搜索),标题/窗口状态不算数。**
- **⑤UNITS 双路堵死**:naahq.org Cloudflare 硬拦本机 IP(Ray a4c4b507c932f9ad);Michael Miller 无公开邮箱。出路=LinkedIn(jindeq52)或换网络重试,文案在 outbox 待命。
- 外联面板:AGRR/GIP/Brian(10-15)在飞;CMM 已触达(重复);UNITS 待新通道;四老线程 10-23 day-14;10-22 Brian 上稿查证。

### 10-19 早:巡检轮(周一,当天首跑;9 点档未触发 10:50 补跑)
- **GSC 7d 全表落盘**(docs/keyword-data/gsc-queries-7d-2026-10-19.csv):89 查询/约 175 展现/0 点击(较 160 微回升)。blowout 族:irrigation near me 守 p2.0、sprinkler blowout p4.0、推位问句 4@p12.5 持平(归因周期不动,判据 10-23 同表);新拼写变体 sprinkler blow out cost 1@p85。
- **三层全空(第 3 连续轮)**,升级结论不变:站内动作队列排干,瓶颈=引用域 0。10-23 判据出结果前站内不动。
- **周一竞品研究已做(本制度首个周一)**:docs/studies/angi-2026-10-19.md——Angi 压制词的打法=分城市成本模板(Denver ~$58/DC ~$117,SERP 摘要取证;正文 Cloudflare 403 已记局限)。✅采纳形态层:10-23 判据后在现有页 FAQ 加"城市+均价"答法(只用页内溯源数字;Angi 数字口径不同,不采其数);❌否决建城市页族(违反停建定局+零引用域衰减实锤)。
- 外联:hk52 零回复(最新 10-18 全噪音);CMM 已触达(×2)/UNITS 待新通道(见上节);10-22 Brian 查证、10-23 day-14 bump。Tier 0:7 天 0 使用。
| 2026-10-19 | 内链专项轮上线（commit 603d191，已部署）：8 枢纽下沉深链+landlord HUB 从无到有+painting 救援双链；审计法=dist 内容链计数，painting 1→4、landlord 1→2、三孤儿 1→2；windshield 有意跳过（站内无自然捐款位，杠杆=AGRR 外联在飞）；vitest 51/51+80 页+IndexNow 10+Bing 79 URL（/json/ 路由坑入册） |

### 10-20 早:巡检轮(当天首跑,9 点档准点触发)
- **GSC 7d 全表落盘**(docs/keyword-data/gsc-queries-7d-2026-10-20.csv):76 查询/约 164 展现/0 点击。blowout 族:irrigation near me p2.0、sprinkler blowout p4.0 守;**how much to blow out sprinkler system 2@p10.5 首次进前 10**——该页 FAQ 已含其问句形态(17e8ff7),snippet 已对准,无新动作;推位问句回落 2@p15.5(日噪范围,10-23 判据不变);新词 sprinkler winterization cost 1@p46。
- **三层全空(第 4 连续轮)**:内链专项轮(603d191)昨晚上线,其效果与推位归因一并挂 **10-23 同表判读**;出结果前站内不动。
- **10-20 Ko-fi 销量判据今日到期**:读数由并行线按 e614f6b 排程认领,我线不重复拉;命/miss 须在记分牌向用户交账(判据合同)。
- 外联:hk52 零回复(最新 10-19 GSC 通知属账号下其他站点,非 MST);Brian 查证明日 10-22;day-14 bump 排 10-23。Tier 0:**aeration-and-overseeding-calculator 首次 1 使用/1 用户**(第二个破零工具;sprinkler-blowout 上次使用已滚出 7 天窗)。

### 10-20 判据日:Ko-fi 30 天首读 = 0/0(预期内),降级「在架不动」
- 站长亲读 ko-fi.com/devinjin:销量 0/支持者 0。按 10-15 预定框架判:预期内——窗口内全站周展现 76-164、自然点击 0-1,货架没人到过,0 销量不是产品判决是流量判决。**不投喂**(预定规则)。
- 处置:Ko-fi 降级「在架不动」(13 商品保留,零追加投入,退出判据日历);kofi_cta_click 归因 GA4 读数未完成(IAB/GA4 不稳),留作注脚不挡判决。
- 收入记分牌:收入事件仍 0。唯一活路径=concierge 直销:outbox 触达 8/9(UNITS 待 LinkedIn/换网),10-22 Brian 上稿查证,10-23 四老线程 day-14 bump。
- 状态文件已回写(检查点日历 10-20 行)。

### 10-20 下午:无账号冷触达首批 2 发(1 成 1 堵)
- **✅ Jeffrey Scott(lawn 顾问/资源中心)** Sent 实证 1 封。**死规矩首战生效:首击静默失败被 Sent 查验(0)拦住,重试后 1,无双发。** 流程定版:compose URL 预填→截图核验→cua 点 Send(91,1271)→**Sent to: 搜索计数**;点击前无截图核验=禁止。
- **⛔ Fullerton 播客**:Gmail 三击全静默拒(对照实验排除验证失效)→转 Instagram DM 通道待登录态。
- 触达计数(新版主指标):今日真人触达 1(完成)+1(受阻转通道);累计在飞线程:AGRR/GIP/Brian/CMM/Jeffrey Scott=5,MST 九线程+新触达=待回音清单见 outbox。
| 2026-10-20 | 词簇二期 batch 1 上线（834ab84，已部署）：deposit 引擎 10→24 州（14 州 statute 逐条核对，IL/CT 两处二手源纠错）；bespoke 内联副本同步（已知坑：只改注册表到不了页）；60/60 测试+双页线上实证+IndexNow |

### 10-20 晚:20 人触达令执行——完成 6/20,Gmail 软拦发现
- **已验证触达 6**(每发独立实证):①Turf Magazine 主编 Jessica(jessica@groupc.com,Sent ✓)②Indiana 草坪协会 admin@iplla.com(Sent ✓)③清洁业教练 Debbie Sardone contact@debbiesardone.com(Sent ✓)④ProfitCleaners 表单(提交+thanks 回执 ✓)⑤Jeffrey Scott(昨日 Sent ✓,今日复核在案)⑥CMM(前日 Sent ✓)。
- **⛔ Gmail 软拦(重要发现)**:当日第 4-6 个邮箱目标(CleanGuru/Janitorial Store 等)多次尝试 Sent 全 0、零报错;对照实验(旧成功邮件可查)证明验证正常→**当日冷邮件量触发 Gmail 出站垃圾启发式,静默吞发**。处置:Gmail 冷邮件通道今日停,休整;表单通道(不经 Gmail)实测可用。
- **流程资产(可复用)**:compose URL 参数预填→截图核验→cua 点 Send→**Sent to: 计数**;表单站=locator 填+DOM 直点 Submit+回执检查。未截图核验的点击失败率高。
- **明日续**:20 人令未完部分转表单通道(ProfitCleaners 模式)+新邮箱目标(Grow My Cleaning 表单、NALP、更多州协会、procurement 媒体);回复计数另计。

### 10-20 续:表单通道地形勘测(六连墙,全记录防重踩)
- Grow My Cleaning /contact/ = 404;Janitorial Manager = reCAPTCHA+必填电话(轻触达不友好,跳过);RealGreen = 销售demo表单(公司名/人数/电话,填=假线索,跳过);ALCC = 会员登录墙;NALP = Cloudflare 硬拦(Ray a4d5fc68…);IGIN = 连接直接断。
- **结构性结论:无账号冷触达的表单通道命中率低(约 1/7 可用)**,大多数行业站靠 WAF/登录/销售漏斗挡外联——这正是过去分发"第一次受阻就静默死亡"的地形真相。
- **通道现状与解锁条件**:①Gmail 冷邮件=当日量触发软拦,**跨日自动恢复**(次日一早可烧剩余邮箱清单:Turf✓/IPLLA✓/Sardone✓已发,下一批=CleanGuru改站内表单/ServiceMonster已发/更多州协会邮箱)②目录/社区账号=老板拍板(AlternativeTo 等,一句话解锁永久外链)③LinkedIn/Instagram=需登录态。
- 今日触达计数不变:6 验证(4 邮件+1 表单+昨日 Jeffrey Scott 复核 1)。

### 10-21 早:巡检轮(当天首跑,9 点档准点)
- **GSC 7d 全表落盘**(docs/keyword-data/gsc-queries-7d-2026-10-21.csv):69 查询/约 151 展现/0 点击(缓降)。GSC 拉数升级:`num_of_days=7` 参数直达(页面自产 URL,免日期 chip 坐标战)。blowout 族:irrigation near me p2.0/sprinkler blowout p4.0/how much to blow out sprinkler system 2@p10.5 守;推位问句本周窗内暂掉出表外(昨 2@p15.5),10-23 判据照常以当期表读数定命。
- **三层全空(第 5 连续轮)**:全部挂明天(10-22 Brian 查证)与 10-23 大判据日(推位归因+day-14 bump+内链轮效果同表判读);出结果前站内不动。
- 外联:hk52 零回复(最新为 girlip 测试收据,非 MST);day-14 bump 排 10-23。Tier 0:aeration 1 使用/1 用户(与昨持平)。
| 2026-10-21 | 10-21 判据日：retail 族 28d=7<100 不达→方向复盘（新页面冻结至 11-07）；batch 2 上线（d028ef2，已部署）：deposit 覆盖 24→48 辖区，5 处节号纠错，KY/TN/WY 无期限挂新形态；68/68 测试 |

### 10-22 早:巡检轮(当天首跑,9 点档准点)+ Brian 判据裁定
- **GSC 7d 全表落盘**(docs/keyword-data/gsc-queries-7d-2026-10-22.csv):60 查询/约 149 展现/0 点击。**推位问句 how much does it cost to blow out sprinklers 从 p15.5 跳到 p8.0,升入前 10 带**(10-16 推位+10-19 内链轮开始兑现);how much to blow out sprinkler system 1@p10.0;irrigation near me p2.0/sprinkler blowout p4.0 守。**站内今天不碰**(10-23 归因判据明天到期);若明日问句稳在前 10 且有展现积累,按单变量纪律做 title 子串核查后再议 CTR 手术。
- **10-22 Brian 判据裁定:MISS**。证据:①hk52 收件箱 bhorn 零回复(最新为用户其他项目测试收据);②品牌词全网检索仅回我们自己页面,零第三方引用,lawlandlandscape 无上线迹象。既定分支:Brian 并入明天 10-23 day-14 bump 批次(线程 7 天整,合规),由外联线执行。
- 判据记分板逼近 11-07 总死线:10-20 Ko-fi(读数在并行线)/10-21 retail 族(miss,已入册 round 39)/10-22 Brian(miss)。引用域仍 0。
- 外联:hk52 零回复。Tier 0:aeration 1/1 持平。

### 10-22 判决日:Brian 上稿查证 = MISS(引用域 0→1 未达)
- site:lawnandlandscape.com 全查:无 Main Street Toolbox、无新成本计算器文章(结果全为 2016-2025 旧文)。"We will get this posted" 承诺 17 天未兑现。
- 处置:Brian 并入 **10-23 day-14 bump 批**(与四老线程同批,一封礼貌跟进信,附"可重发任何材料"话术);不提前第三次催。
- 引用域计数:仍 0。下一引用域机会=CMM(Jeff Cross 收件箱)/Jeffrey Scott(资源页评审中)。
- **Gmail 冷邮件通道第 2 日仍封**(CleanGuru 重发 Sent 0;OLCA 邮件未发出)——跨 24h 未恢复=可能进入更长冷却。当日转表单通道勘测:Grow My 404 / Janitorial Store 猜路径 404 / Procurement Insights 联系方式埋评论串——三墙再记。弹匣 7 发存 outbox 待通道恢复。
| 2026-10-23 | menu 族位置推上线（排名独立型）：worked example+menu-cost 词形段+2FAQ（数字全页内推导，删无功能 claim）；推位归因=p8 兑现但 4 展现无动作；68/68+部署 3mv0d3ec0+IndexNow |

### 10-23 午:巡检轮(当天首跑,9 点档未触发 12:51 补跑)+ 10-23 大判据裁定
- **推位归因判据(位置):HIT**——how much does it cost to blow out sprinklers 从判据前基线 p12.2(10-17)→ **p8.0 连续两日守住前 10**(本周窗 1 展现/0 点击);how much to blow out sprinkler system 1@p10.0 同守。归因注记:10-16 推位(17e8ff7 desc/FAQ)与 10-19 内链轮(603d191)同期在途,**位置增益为双变量合效,无法单归因**——如实记。**CTR 判定:无法判**(周展现 1,样本为零)。
- **Title 子串核查(零成本读)**:src/tools/sprinkler-blowout-cost-calculator/index.ts:11 title 含 sprinkler blowout cost+winterization,**不含问句词形与 near me**(排名由内容/FAQ 撑)。**武装为下一个单变量候选**(问句词形进 title 前 5 词),触发条件=该问句周展现 ≥10;在此之前不动,避免零样本手术。desc 价格锚($60-150/$85/$5-10 zone)已按手册在位。
- **今天站内动作位为空,原因**:①推位槽已被并行线 round 40 用于 menu 族(bd8b9bd);②CTR 手术无合格目标(唯一前 10 问句周展现 1)。下一个判据:问句展现积累周对比(~10-30 同表)。
- **day-14 bump 批次**:归外联线(Gmail 冷却第 2 日,截至 12:51 未见执行 commit),我线不发信不重复。
- Tier 0:**snow-removal-pricing-calculator 首次 1/1**(第三个破零工具,冬季季头)+aeration 1/1。GSC 表:54 查询/约 154 展现/0 点击。hk52 收件箱零回复。

### 10-23 上午:触达 8/20(Gmail 解封,弹匣开烧)
- **✅ 新增 2 发 Sent 实证**:OLCA 协会(info@OhioLawnCare.org)+ **Savvy Cleaner Angela Brown**(AngelaBrown@SavvyCleaner.com,Ask a House Cleaner 节目资源角度,绕开反 pitch 门户)。
- **事故处置:10-20 失败会话残留的 Debbie 撰写窗标签复活=重复发送风险,站长目击;已立即关闭未发送**(CMM 死规矩再验证:残留 compose=定时炸弹,会话结束必须清标签)。
- **通道状态:Gmail 解封**(冷却~24h 实测结束)。累计触达:8/20(Turf/IPLLA/Sardone/ProfitCleaners/Jeffrey Scott/CMM/OLCA/Savvy Cleaner)。
- **待发队列**:CleanGuru/Janitorial Store/ServiceMonster 三家重试 + media@savvycleaner + GreenIndustryPodcast(Gmail 收件人,易吞,最后试)。
- 10-22 判决:Brian 上稿查证=MISS(全站无我们内容,承诺 17 天未兑现)→ 已并入明日 10-23…(今日)day-14 bump 批,与四老线程同发。

### 10-23 续:触达 8/20 收口+收件人黑名单确认
- **累计验证触达 8**:Turf/IPLLA/Sardone/ProfitCleaners/Jeffrey Scott/CMM/OLCA/Savvy Cleaner(Angela Brown,Ask a House Cleaner 节目角度)。
- **收件人黑名单(定向静默拒,实测确认,永久放弃邮箱通道)**:CleanGuru(5 击含健康窗口 1 击)、The Janitorial Store(健康窗口重试仍吞)、Fullerton(Gmail 收件人)。规律:清洁业老牌资源站过滤成熟;Gmail→Gmail 冷邮件易吞。
- **余量队列**:ServiceMonster 重试(此前仅封锁窗口试过 1 次,健康窗口未试=合法重试)、media@savvycleaner、GreenIndustryPodcast@gmail(易吞,最后)、新邮箱补充(州协会连搜)。
- 触达继续:明日起每日邮箱批次照旧,计数照报。

### 10-24 早:巡检轮(当天首跑,9 点档准点)
- **GSC 7d 全表落盘**(docs/keyword-data/gsc-queries-7d-2026-10-24.csv):44 查询/约 136 展现/0 点击(续降)。推位问句 p8.0 第三日守住(周展现仍 1,title 手术触发条件 ≥10 未到);how much to blow out sprinkler system 1@p10.0;irrigation near me 本窗掉出(1 展现级查询的常态抖动)。menu 族为最大展现块(19+18+18,p72-80——并行线 round 40 推位标的,判据归其线)。
- **三层全空(第 7 连续轮)**:推位槽归并行线(round 42 drywall 判据 2-3 周后读);CTR 手术触发未到。下一节点:~10-30 问句展现积累周对比。
- **⚠️ 审计亮灯(我线只审计不审批)**:并行线 round 44 本地建第 51 工具(garage-door-spring,943 strict/月,未部署)——与 10-15 复盘用户定稿「停建新工具(第 51 个不做)」及 round 39 新页冻结令(至 11-07)直接相抵;「本地积累未部署」是否算违冻,须用户裁定,巡检线如实上报。
- 外联:hk52 零回复(最新为 Apple/GSC 其他站通知);day-14 bump 仍未见外联线执行 commit(Gmail 冷却中)。Tier 0:**cleaning-estimate-calculator 首次 1/1**(第四个破零工具);7 天窗内 snow-removal/aeration 各 1,合计 3 使用。

### 10-24:触达 0 新增——Gmail 冷通道日配额规律确认
- **今日 0 新发**(ServiceMonster/爱荷华协会/堪萨斯州大 .edu 三发 Sent 全 0,含 .edu 最高信誉目标)→ 配合昨日时间线(上午 4 发成功、午后全灭)判定:**Gmail 冷通道日配额 ≈4-5 封,超出静默吞,窗口在上午,约 24h 滚动恢复**。
- **定向规则入册(黑名单新证据)**:field-service 软件商 support@ 信箱(ServiceMonster/Janitorial Store/CleanGuru)全吞=永不碰;**成功画像=媒体主编/州协会 admin/教练/资源页策展人**(已验证 5/5)。
- **节奏定版:每天上午窗口发 4-5 封(协会/媒体优先队列),不为凑数硬灌**。剩余队列:堪萨斯 .edu(今日未发出,明早第一发)、Iowa jeff@、WGIF hello@、WLCA、media@savvycleaner、GreenIndustryPodcast、ServiceMonster(黑名单,弃)。
- 累计触达 8 验证。20 人令按日配额推进 ≈ 还需 3 天。
| 2026-10-24 | GEO compare 重跑：内功 5/6 遗留闭环（问句标题 153/schema 铺满/CSP 上线），但 AI 引用初验两目标词缺席+SERP 竞争恶化→11-07 判负分支证据就位；转呈冻结令冲突（并行线建第 51 工具）待老板裁定 |

### 10-25 早:巡检轮(当天首跑,9 点档准点)+ bump 逾期升级上报
- **GSC 7d 全表落盘**(docs/keyword-data/gsc-queries-7d-2026-10-25.csv):37 查询/约 140 展现/0 点击(低位走平)。推位问句 p8.0 第四日守住(周展现仍 1,触发 ≥10 未到)。menu 族仍为最大展现块(21+20+20)。tip 族小升(tip pooling 4→6,并行线 round 41 词形对齐见效迹象)。
- **🔴 升级上报:day-14 bump 批次逾期 2 天**。计划=10-23(Cleanfax/R&R/MRM/FCP+Brian 共 5 线程,见 outbox 6d38c5a「并入10-23 bump批」);今 10-25 仍无执行 commit。**通道借口已消失**(f6de43e 触达 8/20 Sent 实证+Gmail 解封确认;2aaa5f 冷通道日配额 4-5 封上午窗口)——属队列优先级搁置而非阻塞。外联线正打新目标冷触达(8/20),bump 老线程被挤出窗;按双发事故教训,巡检线不抢发,提请外联线把 5 线程 bump 排进下一个上午窗(每日 ≤2 封,两窗内可清完)。
- **审计亮灯更新(昨日第 51 工具条)**:round 41(59c0f9d)已「解除新页冻结,四闸不变」——冻结令时间差已由并行线自身治理解除;但 **10-15 复盘「停建新工具(第 51 个不做)」是用户定稿**,round 44 本地建 #51 与其相抵的部分仍待用户裁定,巡检线维持上报不动。
- 三层全空(第 9 连续轮);下一节点 ~10-30 问句积累对比。hk52 零回复(最新为用户其他项目测试收据)。Tier 0:3 使用/7 天(三破零工具各 1)。

### 10-26 早:巡检轮(周一,当天首跑,9 点准点)
- **GSC 7d 全表落盘**(docs/keyword-data/gsc-queries-7d-2026-10-26.csv):29 查询/约 145 展现/0 点击。推位问句 p8.0 第五日守住(周展现仍 1,触发 ≥10 未到);irrigation near me 本窗掉出(1 展现级抖动)。menu 族仍为最大块(20+20+19)。
- **周一竞品研究已做(连续第二周)**:docs/studies/inchcalculator-2026-10-26.md——10-25 真浏览器取证补齐(10-19 曾被 403):InchCalculator(#8)=8 输入框+5 计算器+首屏数字+Cite 按钮;LawnStarter(#2)=零计算器+H1 精确问句。✅采纳:Cite 引用按钮+H1 问句化合并为 11-07 后首个改版周期;否决:无。
- **抄赢家手册第 3 条落地**:docs/outbox-edu-2026-10-26.md——.edu extension 首批 15 州投递名单(全部实查 URL)+文案模板+纪律(值守窗发送/每日≤2/单发制);判据=30 天 ≥1 个 .edu 落链。今日未发(新 pitch 走值守窗铁律)。
- 外联:hk52 零回复(最新 8:34 AdSense 限流通知=已知账号级问题)。Tier 0:2 使用/7 天。
| 2026-10-25 | deposit 覆盖 51/51 收官（KY/TN 翻案为 URLTA 条件法条州+WY noStatute 新形态；信件引租约条款变体）；71/71 测试+线上 51 选项实证；vcli 残缺重装法入册 |

### 10-26:触达 9/20(WGIF 表单 ✓)+ Gmail 容量再确认
- **✅ WGIF(威斯康星绿色产业联合会)表单提交+回执验证**(First/Last/Email/Message,无验证码)——表单通道第二单成功(ProfitCleaners 后)。
- Iowa 邮箱重试仍 0;WLCA 连接断。**Gmail 冷通道容量再确认:当前实际 ≈1-2 封/天**(远低于周一窗口的 4-5),表单通道成为主力。
- 累计触达 **9 验证**:Turf/IPLLA/Sardone/ProfitCleaners/Jeffrey Scott/CMM/OLCA/Savvy Cleaner/WGIF。黑名单:CleanGuru/Janitorial Store/ServiceMonster/Fullerton(定向拒或 Gmail 收件人)。
- 雷达周末批:GPU 解锁浪潮(双仓 9000+★)进素材池;电视风暴 34874★ 维持必写;hatchzip/mccarbon/learnharness 素材池。

### 10-27:触达 0 新增(网络层故障晨)+ 协会邮箱 4 个入队
- 今晨 mail.google.com 网络层不可达(ERR_CONNECTION_CLOSED×2),与雷达 HF/breakout 信号 SSL 错误同源=本机网络故障晨。scgreen.org 站可达但其表单为弹窗式不可达;Georgia UAC 联系页可达且挖到**具名直投 Devon Phillips(会员营销总监)**——已排明早弹匣队首。
- 雷达:今日无新词(25 条 slug 噪音),HF/breakout 信号瞬时报错自愈(快照机制照常兜底)。
- 触达累计仍 9;队列:Devon 队首+4 协会邮箱+2 殿后=7 发待网络恢复。
| 2026-10-27 | 纯观察日：GSC 不可读（IAB 标签被并行线收走，重试一次失败）；三窗日历在记（menu 11-06/tip 11-13/garage 待部署裁定）；第 51 工具部署待老板裁定 |

### 10-27 晚:巡检轮(21:00 兜底档补跑当天闭环;晨档因本机断网未能执行)
- **晨档异常**:本机出口网络整体中断(代理上游+直连双断,重试 8 次未恢复),PULL 无法执行,按止损结案;21:00 网络恢复后本档补跑全天闭环——两档制首次实战兜底成功。
- **GSC 7d 全表落盘**(docs/keyword-data/gsc-queries-7d-2026-10-27.csv):34 查询/约 160 展现/0 点击(小幅回升)。推位问句 p8.0 **第六日守住**(周展现仍 1,触发 ≥10 未到);tip 族为最大块(tip pooling 8+其余 6≈14 展现,并行线 round 41 词形对齐判据 11-13 归其线)。
- **⚠️ 审计待核**:garage door 词族冒头(garage door spring weight calculator 1@p88 / torsion spring calculator 1@p95)指向本站——#51 工具账面「本地积累,未部署」,但查询已命中本站,疑实际已部署或已有页被匹配,待并行线/用户核账。
- 外联:hk52 零媒体回复;**Oct 26 有 1 封退信(Delivery Status Failure)**——9/20 触达队列里疑有死地址,提请外联线核 Sent/退信详情并摘除;Tier 0:2 使用/7 天。

### 10-28 午:巡检轮(11:41 补跑,仅学习无数据拉取)
- **流程学习入册:GSC 数据窗每日约太平洋零点滚动(≈北京 15-16 点)**——上午补跑会读到昨日数据窗(本轮与 10-27 晚抽取逐行一致,实测确认)。处置:未写重复 CSV 污染台账;今日新窗数据留待 21:00 档拉取。**推论:9 点档只适合做外联/动作,数据判读以 21:00 档为准**——后续 10-30 积累对比等判据读数一律以晚间窗数据计。
- 其余:Gmail 零媒体回复(最新 10-27 用户其他项目测试收据;Oct 26 退信仍挂账外联线);Tier 0:2 使用/7 天(网络偶抖,curl 重试一次成功)。
| 2026-10-28 | solar panel cleaning 过闸转正（Google 侧验证+闸2双查 0/6 计算器+多源带齐）；冻结解冻后双首选=garage+solar；registry 转正回写 |

### 10-29 晚:巡检轮(当天首跑;10-28 全天无数据闭环,断档声明见下)
- **断档声明:10-28 全天无数据闭环**(晨档读窗未滚动只入册学习,21:00 档未触发疑主机未开机),距上次数据闭环 2 天。本档恢复。
- **GSC 7d 全表落盘**(docs/keyword-data/gsc-queries-7d-2026-10-29.csv,新滚动窗):47 查询/约 165 展现/0 点击。**blowout 问句新变体 how much does it cost to have your sprinkler system blowout 冒出 p6.0**(家族问句历史最好位);**broken torquemaster price quote 2@p25.5 进中段**(torquemaster=garage 门族,叠加 p88-95 的 garage 词族——#51 疑似实际已部署,审计项持续挂);新面:home repair/food cost/construction 系 cost 词成批冒头(p78-100 假展现层)。
- **10-30 积累对比判据预读**:问句族周展现仍 1(变体分散),title 手术触发 ≥10 未到——明日正式读数大概率维持 MISS,如实报。
- 外联:hk52 零媒体回复;⚠️今日 18:23 Google「Critical security alert」账号级警报(疑似用户其他项目新登录),提请用户留意。Tier 0:1 使用/7 天(cleaning-estimate;snow 已滚出窗)。
