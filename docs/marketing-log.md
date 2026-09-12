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

### 巡检结论 2026-09-12
- **0 条评论（纪律执行）**：11 帖过筛无合格目标——已答 2 帖排除；其余为经验分享/取消政策/消费者投诉/薪酬（非服务定价）/竞品调研/非领域话题。不硬凑。
- IndexNow 无待提交项（白天已提交 4 个新 URL 并验证 ALL_OK）。

### 巡检结论 2026-09-11
- 答 2 条（上限 3 内）；跳过：员工薪酬帖（领域边缘+措辞混乱）、客户生病取消帖（非定价）、2 个竞品调研帖（不碰）、酒类保险（非领域）、草坪设备（非定价）。
- **选题信号**：新建工程清洁（post-construction）两周内出现 3 次（酒店投标、post-construction 专创业夫妻、住宅新建）→ 潜在 guide 选题："How to bid post-construction cleaning"。
- **操作经验**：old.reddit 连续快速发评会触发 RATELIMIT（约 6 分钟冷却），DOM click 静默失败即限流征兆；正确姿势是 fetch POST /api/comment（带 uh modhash + api_type=json），返回可验证的 t1_id。
