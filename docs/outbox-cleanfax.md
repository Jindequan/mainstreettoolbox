# Outbox — 行业媒体外联（Cleanfax 首发 + 10-02 五波连发）

> ## 🔴 发信铁律（用户 10-02 死命令，先于一切发送动作）
> **"无论是否成功，你都应该先检查是否发送！而不是一直点击！"**
> 1. **点 Send 之前先查 Sent**：同收件人+同主题已存在 → 停手，绝不点击。
> 2. **单击一次，永不连点**——Gmail 点击延迟生效（实测 10 秒后入 Sent），双击=重复。
> 3. 点击后等 ≥10 秒。
> 4. **唯一可靠判据=Sent 出现 row "To: xxx"**；toast 与 composeGone 都会误报。
> 5. 实证缺失才重试**一次**；再失败即停转人工。第三次点击被禁止。
>
> **禁再发名单**：abowman@glass.com（误发 3 封）、editor@tcia.org（误发 2 封）。

> **2026-10-02 外联八连发（全部 jindeqhk52，用户死命令授权），已发送文件夹逐一核验：**
> 1. ✅ 13:58 Cleanfax — Elizabeth Christenson <elizabethc@issa.com>（ ISSA 旗下，清洗/restoration 读者）
> 2. ✅ ~14:05 Restoration & Remediation — Kayla McGowan <mcgowank@bnpmedia.com>（EIC；钩子=Annissa Coy 定价文+Q1 2026 市场趋势；推 mold 计算器+基准页）
> 3. ✅ ~14:08 Modern Restaurant Management — Barbara Castiglia <bcastiglia@modernrestaurantmanagement.com>（执行主编；钩子="Resilience in a Changing Restaurant Economy" 38% 成本数据；推 food-cost/recipe/labor/menu 四件套）
> 4. ✅ 14:12 Turf Magazine — Jessica Schwartz <jessica@groupc.com>（管理编辑；钩子="Benchmarking Your Snow Business" SIMA 基准报告；推 snow 定价器+冬季三件套，赶 10 月签约窗）
> 5. ✅ ~14:20 Lawn & Landscape — Brian Horn <bhorn@gie.net>（主编，邮箱十年在用；钩子=他们 "Number Crunching: Building a Business at Groundmaster" 雪季营收预算文；推 snow 定价器+冬季三件套）
> 6. ✅ ~14:25 Salon Today — 编辑部 <salontoday@bobit.com>（官网 contact-us 实证邮箱；钩子=他们 "2026 SALON TODAY 200: Compensation and Benefits" 40% commission 数据 + Mandy Pulse 转型故事；推 booth-rent-vs-commission 计算器+price list builder）
> 7. ✅ CMM — 编辑部 <cmmonline@issa.com>（ newsletter 页脚实证；钩子=他们自己的 "Janitorial Bidding and Estimating Cleaning Services" 专题 2-4% 设备成本口径；推 cleaning-estimate/invoice/checklist）
> 8. ✅ AGRR（Auto Glass Repair & Retail）/glassBYTEs — Abby Bowman <abowman@glass.com>（杂志社头版 masthead 实证；钩子=glassBYTEs 12-08 State Farm/Safelite TPA 分手报道；推 windshield 计算器——透明价格带 vs 引流 aggregator 定位+ADAS 校准加价带）
>
> **发信模板纪律（用户垃圾内容禁令下的合规形态）**：每封引用对方自己近期真实文章（发前 WebSearch 核实存在）+ 只推与读者职业直接相关的 2-4 个工具 + 主动提供可引用基准数据 + 提供免费供稿 + 明确"不要报酬不要链接"。四封全部定制，零模板群发。
>
> 9. ✅ TCIA（Tree Care Industry Magazine）— editor@tcia.org（旧刊实证地址+杂志 Contribute 页开放投稿；钩子=其 "how to price jobs so you actually make a profit" 公司专访+PHC 定价系列；推 tree-removal 计算器+供稿）。⚠️ 重复：误发 2 封（12:14+12:16，双击模式延迟生效所致），该地址已列入禁再发名单。
> 10. ✅ ForConstructionPros — Marina Mayer <mmayer@iron.markets>（Content Director，PACER Award 公开联络邮箱；钩子=其 "Labor a Constant Concern" labor burden 专题文+编辑公开邀约 pitch；推 contractor-hourly-rate 计算器+material estimator+供稿）。Sent 实证 ✓。**发送方法论突破：cua 坐标点击对部分 compose 持续失效，JS evaluate 触发 Send 按钮（单次）为可靠路径**。
> 11. ✅ Groomer to Groomer — Todd Shelly <todd@barkleigh.com>（Barkleigh Productions 总裁兼主编，2018 刊头；钩子=其行业增长报道+定价失配问题；推 grooming preset 价目表+profit-margin）。此前 6 次静默失败，JS 方法一次成功，Sent 实证 ✓。**注意：地址为 2018 年刊头信息，若退信需更新联系人后重试（禁重复发送，先查 Sent）。**
> ⚠️ **重复发送事故（10-02，诚实入档）**：abowman@glass.com 收到 3 封（1:17 全文/10:53 疑似空壳/10:55 全文）、editor@tcia.org 收到 2 封——根因=Gmail 点击延迟生效叠加"双击保险"习惯，无法撤回。**此两地址列入禁再发名单**；流程修正为：单击一次→等 10s+→Sent 实证→缺失才重试。
> ❌ **Groomer to Groomer（todd@barkleigh.com）6 次尝试全部静默失败**（0 发出/0 草稿/0 outbox，其他 9 收件人同流程全成功，疑似 Gmail 对该域名隐蔽拦截）——邮件全文见下，**待人工 2 分钟粘贴发送或下轮会话换路重试**；联系人信息为 2018 年刊头（Todd Shelly, Barkleigh Productions 总裁兼主编），可能已失效，发送前建议先核 groomertogroomer.com 现任编辑。

### 待发：Groomer to Groomer（全文备好）

> To: todd@barkleigh.com
> Subject: Free grooming price list tool for Groomer to Groomer readers

Hi Todd,

Groomer to Groomer's coverage of the industry's growth spurt keeps landing on the groomer's version of an old problem: pricing that was set by gut feel three years ago and never revisited, while costs moved.

I built Main Street Toolbox, a free set of trade calculators — no signup, no ads, everything computes in the browser. Two pieces fit groomers directly:

- Service Price List Builder (with a Dog Grooming preset) — bath/full groom/add-ons lines pre-anchored to published industry ranges, printable as a take-home price list
- Profit Margin Calculator — revenue vs costs, so a booth-renting groomer can see what a raise in prices actually does to their year

Happy to write a short contributed piece on building a price list that survives 2026 costs — what the published ranges are, and why groomers underprice the add-ons. No payment or link required.

Site: https://mainstreettoolbox.com/salon/service-price-list-builder/?trade=grooming

Thanks for the work you do,
Devin
mainstreettoolbox.com

---

> **待发队列**（钩子或邮箱未达标，按质量闸暂缓——凑不齐真实钩子不发）：
> - ForConstructionPros — EIC Marina Mayer（Muck Rack 实证）但 Iron.markets 邮箱模式未核实到本人；钩子待挖（需他们站内 estimating 专题文）。
> - JLC (Journal of Light Construction) — 无公开编辑邮箱；走联系页或按 byline 挖作者。
> - American Painting Contractor — EIC 疑似 Emily Howard 但无公开邮箱；走 apcmag.com 联系页。
> - Green Industry Pros / Total Landscape Care / PCT——待调研。
> - ~~Groomer to Groomer~~ → 已升级为"待人工发送"条目（见上）。

> **每日自动巡检（10-02 建）**：cron automation-eff9e757，每天 9 点只读巡检外联回复（9 个收件人）+ 14 个观察词排名 + 展现/点击总量对照基线（1,280/0），中文简报。禁再发名单：abowman@glass.com、editor@tcia.org。
>
> ### 待发：ForConstructionPros（研究齐备，发送被 Gmail 静默拦截，10-03 首要动作）
> **状态**：mmayer@iron.markets 实证（PACER Award 公开联络邮箱）+ 钩子实锤（其 "Labor a Constant Concern" 文讨论 labor burden 且编辑公开邀约 pitch）。10-02 晚发送尝试：pre-check 通过（Sent 无重复）→ 单击 → 静默失败（无 Sent/无草稿/compose 消失），与 Groomer 同症状。**判定：Gmail 当日 10+ 发送触发静默限流，勿在同日重试**。次日会话第一动作=按发信铁律重发本邮件。
>
> To: mmayer@iron.markets
> Subject: Free crew-cost calculators — pitching a tools item per your invite
>
> Hi Marina,
>
> Your "Labor a Constant Concern for Construction Industry at Large" coverage dug into labor burden — and the article invited quick pitches, so here's one.
>
> I built Main Street Toolbox, a free set of trade calculators — no signup, no ads, everything computes in the browser. For contractors wrestling with crew costs and estimates:
>
> - Contractor Hourly Rate Calculator — turns base wage into a fully loaded billing rate: payroll taxes, workers' comp, benefits, overhead — the labor-burden math your piece described, made interactive
> - Material Cost Estimator — line-item material takeoffs with waste factors
> - Trade calculators for painting, drywall, dumpster rental and tree removal quotes
>
> Happy to write a contributed piece on labor burden in crew pricing — how unburdened wage vs billing rate confusion eats margin on every bid. No payment or link required.
>
> Site: https://mainstreettoolbox.com/construction/contractor-hourly-rate-calculator/
>
> Thanks for the work you do,
> Devin
> mainstreettoolbox.com
>
> **站内体检同步项（10-02）**：冬季三件套（snow/christmas/blowout）内链体检通过——lawn hub、首页、tools index 全覆盖，三页互链齐。
>
> **Gmail 自动化新增教训（10-02 晚，AGRR 卡壳复盘）**：①toast 文本会残留误报，**发送成功的唯一可靠判据=Sent 文件夹出现 "To: xxx" 行**；②compose 点击经常第一二次被吞，模式是"截图定位→点击→再点击"；③compose 卡死时 tab 会变得不可恢复，此时走「草稿箱 → 点行 → 右下角最小化药丸 → 展开按钮(↗) → Send」，Send 坐标每次布局不同必须 evaluate 实测（本次在 202,840）；④同一草稿会被多次 compose 会话自动存重复副本，发完去 Drafts 勾选→Discard drafts 清理。
>
> **Cleanfax 原始记录（2026-10-02 13:58 已发出）**：

## Subject
Free pricing calculators your cleaning-business readers might use

## Body

Hi Elizabeth,

I read "The Competitive Advantage Your Rivals Can't Buy" (Sept 7) — the trust-over-flash point lands, especially for operators competing against franchise truck wraps.

Quick heads-up that might fit a "free resources" item: I built Main Street Toolbox, a free set of trade-specific calculators for cleaning businesses — no signup, no ads, nothing stored; every result computes in the browser. For your readers specifically:

- Cleaning Estimate Calculator — price a job by rooms/type/frequency, with the industry band shown so owners can sanity-check their quote
- Invoice Generator — printable one-page invoices
- Deep Cleaning Checklist Generator — by-room, printable
- A 2026 pricing benchmarks page (cleaning, restoration-adjacent home services) with sourced ranges — handy if you ever need a citable number

Also happy to write a short guest piece on pricing psychology for solo cleaners — what the healthy bands actually are, and why hourly quoting punishes the fast. No payment or link required; I just want the tools in front of people who price jobs for a living.

Site: https://mainstreettoolbox.com/cleaning/

Thanks for the work you do,
Devin
mainstreettoolbox.com
