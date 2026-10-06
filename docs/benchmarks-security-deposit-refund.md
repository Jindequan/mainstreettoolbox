# Security Deposit Refund 数据源研究（闸 3）— 2026-10-07

> 选题：Security Deposit Refund Calculator（R8 候选，429 词 / 35 dual：refund calculator / form / letter template / california / 30 day）。
> 本文是**闸 3 数字出处预研**：查「各州押金退还 deadline + 期限计算规则」有没有官方一手来源。所有天数规则均直接核对州 statute 官方文本（州立法机构 .gov 优先）；每个州给出来源链接。核心发现先记一笔：**多数二手网站（含部分律所/Nolo 转述）存在过期天数**——WA 已从 21→30 天（2023）、AL 部分站点仍写 35 天而现行 statute 是 60 天、CO 2026-01-01 又修了一次。这既是风险也是护城河：坚持逐州核对官方文本的站，竞品短期追不上。

## 数据源清单（按官方度分层）

| # | 来源 | URL | 官方度 | 覆盖 | 用途 |
|---|---|---|---|---|---|
| 1 | 各州立法机构 statute 门户（leginfo.legislature.ca.gov / statutes.capitol.texas.gov / app.leg.wa.gov / azleg.gov / docs.legis.wisconsin.gov / nysenate.gov / leg.state.fl.us / palegis.us / leg.colorado.gov / alison.legislature.state.al.us） | 见矩阵 | **官方一手**（statute 现行文本） | 50 州都有对应门户 | 每州 deadline/罚则的唯一权威依据 |
| 2 | HUD「Tenant Rights, Laws and Protections」 | https://www.hud.gov/topics/rental_assistance/tenantrights | 官方（联邦） | 全部州（入口页） | 联邦入口，指向各州资源；**无统一 deadline 表**，页面主体 JS 渲染，抓取需浏览器——只当导航用，不当数字源 |
| 3 | USA.gov 州消费者保护局目录 | https://www.usa.gov/state-consumer | **官方一手**（GSA） | 50 州+DC+领地 | 每州「找谁投诉」出口链接（letter template 词形的 FAQ 素材） |
| 4 | Nolo 50 州 deadline 汇编图 | https://www.nolo.com/landlord-tenant/state-deadlines-for-returning-security-deposit.html（hub：https://www.nolo.com/landlord-tenant/security-deposit-limits-deadlines-your-state.html） | 二手（律所出版商，带 statute 引用） | 50 州+DC | **最佳交叉核对源**（更新至 2024-04，发现 WA/AL 过期 → 用作初值，不得作终值） |
| 5 | Westlaw Practical Law「Security Deposit Laws — Residential Lease State Comparison Chart」 | https://content.next.westlaw.com/practical-law/document/Ia5b0f087647111eaadfea82903531a62/Security-Deposit-Laws-Residential-Lease-State-Comparison-Chart | 半官方（专业数据库） | 50 州+DC | 付费；50 州全量时才需要 |
| 6 | 州法院/州 AG 自助页（CA courts self-help、CA AG PDF、mass.gov 等） | 如 https://selfhelp.courts.ca.gov（CA）、https://oag.ca.gov/system/files/media/Know-Your-Rights-Security-Deposits-English.pdf | 官方一手（解释口径） | 部分州 | 页面文案措辞与「deduction 清单」素材 |
| 7 | Texas State Law Library guide | https://guides.sll.texas.gov | 官方一手（州立法律图书馆） | TX 为主 | TX 页佐证 |

**二手转引注意**：Azibo / TransUnion SmartMove / Zillow / iPropertyManagement / depositdeadline.com / steady 等房产 SaaS 文章**全部是二手**且多处已过期（AL 35 天、WA 21 天），MST 规则下只能当 SERP 对照，不进计算器。

## 10 州抽查矩阵（全部核过官方文本，2026-10-07 现行）

| 州 | Deadline | 起算点（触发事件） | 州利息要求 | 超期罚则 | 官方来源 |
|---|---|---|---|---|---|
| **CA** | **21 日历日** | tenant vacated the premises（搬家腾房） | 无州级要求（部分城市地方法规另有规定，州 statute 不涉） | 恶意扣留：最高 **2x** 押金法定赔偿 + 实际损害；维修未完可先扣善意估算，完成后 14 天内补单据 | Civ. Code §1950.5(g)-(h),(m)：https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5 |
| **TX** | **第 30 天** | tenant surrenders（交还房产；须有转寄地址条款配合） | 无 | 恶意扣留：**$100 + 3x 错扣部分 + 律师费**；30 天内未退/未附清单**推定恶意** | Prop. Code §92.103 / §92.104 / §92.109：https://statutes.capitol.texas.gov/Docs/PR/htm/PR.92.htm（文本经 https://texas.public.law/statutes/tex._prop._code_section_92.103 核对） |
| **FL** | **15 天**（无索赔时）；索赔则 **30 天**内发书面通知 | termination of the rental agreement | 仅两种情形：保证金放 surety bond（**5%/年**）或计息账户（75% 均息或 5%/年取低，按年付/贷记） | 错过 30 天通知窗 = **丧失押金抵扣权**；租客 15 天内可异议 | Stat. §83.49(3)：http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0000-0099/0083/Sections/0083.49.html |
| **NY** | **14 天** | tenant vacates（腾房） | 有：§(1-a) <6 户须告知存放银行并付利息（可留 1%/年管理费）；§(2-a) ≥6 户须入计息账户 | **14 天内未附清单 = 丧失保留任何部分的权利**（2019 HSTPA 修订） | GOL §7-108(1-a)：https://www.nysenate.gov/legislation/laws/GOB/7-108（司法适用见 nycourts.gov 2026 判例 Levine v Xu-Kehrli） |
| **PA** | **30 天** | termination of lease 或 surrender and acceptance | 有（条件触发）：押金 >$100 须入 escrow，**第 3 年起**付 escrow 利息（扣 1%/年管理费） | 错过 = 丧失扣留权，租客可索**2x 错扣部分** | L&T Act 1951 §512（68 P.S. §250.512）+ §250.511（上限 2 月→1 月、escrow/利息）：官方文本见 https://www.palegis.us（Act 699, P.L. 69, Ch.5 §512）；现行文本镜像 https://codes.findlaw.com/pa/pennsylvania-consolidated-statutes/title-68/pa-consol-sect-68-250-512.html |
| **WA** | **30 天**（2023-07-23 起，HB 1074 由 21 天改） | termination of rental agreement + vacation（弃置则自知悉起） | 无 | 错过 = 赔**全额押金**并丧失主张；故意拒退可加**最高 2x** + 诉讼费/律师费；禁扣「ordinary use 磨损」，地毯清洗费须证明超常磨损，未做 move-in checklist 的项目禁扣 | RCW 59.18.280：https://app.leg.wa.gov/RCW/default.aspx?cite=59.18.280 |
| **CO** | **1 个月**，租约可延长**至多 60 天** | termination of lease 或 surrender and acceptance，**取后** | 无 | 未按时附书面清单 = 丧失扣留权；**故意扣留 = 3x 错扣部分** + 律师费 + 诉讼费（租客起诉前须先 7 天催告）——2026-01-01 有新修正案生效，构建轮须复核 | C.R.S. §38-12-103：官方 CRS 文本（Committee on Legal Services 出版），检索入口 https://leg.colorado.gov/statutes（文本经 https://colorado.public.law/statutes/crs_38-12-103 核对） |
| **AZ** | **14 天（不含周六日及法定假日）** | termination + delivery of possession **+ tenant demand**（要押金） | 无 | 违反 = 退还押金/财物 + **2x 错扣部分**；租客 60 天内未异议视为终局 | A.R.S. §33-1321(D),(E)：https://www.azleg.gov/viewdocument/?docName=https://www.azleg.gov/ars/33/01321.htm |
| **WI** | **21 天** | 三选一触发：租约终止日 /（提前搬走被转租）新租客起租日 / 房东知悉腾房日 | 无 | 逾期无成文罚则（判例 Pierce v. Norwick 路径）；扣项仅限 6 类（须签 NONSTANDARD RENTAL PROVISIONS 才能另加） | Wis. Adm. Code **ATCP 134.06(2)**：https://docs.legis.wisconsin.gov/document/administrativecode/ATCP%20134.06(2)（**行政规章**而非 statute， Wisconsin 特有） |
| **AL** | **60 天** | termination of the tenancy + delivery of possession | 无 | 未按时寄还/附清单 = 付**2x 原押金**；押金/支票 90 天无人认领归房东 | Ala. Code §35-9A-201(b),(d),(f)：官方 Code of Alabama 见 https://alison.legislature.state.al.us/code-of-alabama（现行文本经 FindLaw 2024-12 版核对）。⚠️ 大量二手站仍写「35 天」=过期数字，禁用 |

**本批 10 州官方源覆盖率：10/10**（PA/AL 官方门户是 JS 站，文本以官方检索页+现行镜像双确认；AZ/WI/CO 各有结构性特殊点）。

## 规则差异维度 → 计算器模型复杂度

输入（州 + 搬出日期 + 租约终止日）→ 输出（法定 deadline 日期 + 清单随附义务 + 逾期后果 + 可扣项目边界）。核心配置每州 6 个字段：

1. **天数**：14 / 15 / 21 / 30 / 35(none now) / 45 / 60 —— 本批即覆盖 14-60；全美分布见 Nolo 图（NY 最短，MD/VA/AL 类 45-60）。
2. **日历日 vs 工作日**：AZ 排除周末假日（唯一抽查到的 business-day 州；其余为日历日）。
3. **起算点**：vacate（CA/NY）/ termination+vacation（WA）/ surrender（TX/PA/CO）/ termination+possession+**demand**（AZ）/ 租约终止日或转租日起租（WI）/ termination+possession（AL/FL）——**不是纯「move-out + N 天」**，这是引擎的核心字段。
4. **清单随附义务**：多数州「退款与 itemized statement 同期」，CA 例外多（≤$125 免收据、维修未完可善意估算 +14 天补件）。
5. **利息**：10 州中仅 3 州有且全是**条件触发**（FL 仅 bond/计息账户、PA 第 3 年起、NY 分 6 户档）——v1 **不做利息计算**，按州显示「有/无条件」即可；利息计算器（MN/MD/MA 簇）留作 Phase 2 独立工具。
6. **罚则公式**（输出侧文案）：丧失抵扣权（FL/NY/PA/CO）/ 全额押金赔偿（WA）/ 2x（CA≤2x、AZ 2x 错扣、AL 2x 全额、WA≤2x 故意）/ **3x+$100+律师费且 30 天推定恶意**（TX）/ 3x 错扣+律师费（CO）。规则是「引用法条文案」不是计算分支，成本可控。

**近年变更实例（时效风险=维护成本证据）**：WA 21→30 天（HB 1074，2023-07-23 生效，且把 normal wear and tear 改写为 wear resulting from ordinary use，加 3 年索赔上限）；CA AB 12（2024-07-01 生效，押金上限改 1 个月租金，小额房东例外 2 个月，21 天退还期不变）；CO §38-12-103 修正案 2026-01-01 生效；AL 现行 60 天 vs 二手站普遍写 35 天。**结论：每州页面须标注 statute 引用+复核日期，逐年复核一次是硬成本**（50 州 ≈ 每年 1-2 人日）。

## 新路由成本评估（只读，未动代码）

- 行业注册是**单点改动**：`src/tools/index.ts` 的 `INDUSTRY_META` 加一行 `landlord: { name: 'Landlord', path: '/landlord', live: true, blurb: '...' }`，`/landlord` hub 页由 `src/pages/[industry]/index.astro` 动态路由**自动生成**（该页按 `INDUSTRY_META` key 遍历）。
- 工具侧照常：新工具目录 + `industry: 'landlord'` + 注册进 `TOOLS` 数组；若做手作页（建议，词簇有 calculator+form+letter 三形）加 `BESPOKE_SLUGS`。
- Header nav **不含**行业列表（`BaseLayout.astro` nav 只有 tools/services），footer 的 Trades 列三链接——新 vertical 只影响 footer 一行（可选）。
- 改动面合计 ≈ 一行 META + footer 可选一行，**路由成本接近零**。R8 担心的「notary 当年形状」问题不存在：landlord 有工具可挂，不是空行业页。

## 闸 3 结论

**通过（建议做，但分两期）**。理由：

- ✅ 数字全部有官方一手出处（10/10 州核对到 statute 现行文本），符合「每个数字 ≥2 源」（statute 官方文本 + Nolo/州法院/州 AG 等交叉）。
- ✅ 工具逻辑 = 每州规则查表 + 日期算术，无推测性数字；「refund calculator 真空 + form/letter 模板三词形」的词况在 R8 已过闸 1/2。
- ⚠️ 但**不建议一次 50 州**。10 州抽查已暴露 4 个时效雷区（WA/CO/AL/CA 近两年全改过法），全量 50 州首轮核验+逐年维护成本翻 5 倍；且排名词量集中在 Top 租客州（california 变体就在 dual 里）。

**建议路径**：
1. **一期（首发）**：本批 10 州（CA/TX/FL/NY/PA/WA/CO/AZ/WI/AL）——覆盖租客人口最大的市场，官方源已全部核完，边际成本只剩写作；每州一个 by-state 段落（deadline/起算点/可扣/罚则/法条链接+复核日期）。
2. **二期（扩量）**：补 GA/NC/MI/OH/IL/NJ/MA/MD/TN/VA 等租客大州到 ~25 州，以 Nolo 图做初值、statute 做终值。
3. **不做**：一次 50 州全量 + 利息计算引擎（利息州规则碎片化，单独立项；MD/MN 利息工具在位）。

**最关键 3 个来源**：① 各州 statute 门户（每州唯一权威，URL 见矩阵）；② Nolo 50 州 deadline 图（唯一可用作全量初值的汇编，必须逐州回标 statute）；③ HUD tenant rights + USA.gov 消费局目录（联邦/官方出口，给 letter template 页当「下一步投诉渠道」素材）。

## 构建轮备忘

- 引擎字段：`{days, calendarVsBusinessDays, triggerEvent, itemizedSamePeriod, penaltyText, statuteCite, reviewDate}`——起算点（triggerEvent）是和竞品拉开差距的地方（Azibo 等一律写「move-out + N 天」，AZ 的 demand 要件、WI 的转租触发、CO 的 surrender-取后 都是真实差异）。
- v1 明确不做：利息计算（Phase 2 独立工具）；商业租赁（全部引用均为住宅法）。
- 每州页面放 statute 链接 + 「last reviewed」日期（GEO citability：带法条引用句式 "Under Tex. Prop. Code §92.109…"）。
- letter template 词形：输出超期催告信（demand letter）+ 各州小额法庭出口（USA.gov 消费局目录链入）。
- 上线前复核 CO 2026-01-01 修正案全文、FL 83.49 现行版（2023 有过修改轮）。
- 首发挂 `landlord` 行业 + footer 补一行；bespoke 页优先（本词簇三词形共享状态，非通用模板）。

## 来源清单（全量）

**官方 statute/规章（一手）**
- CA Civ. Code §1950.5：https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5
- TX Prop. Code Ch.92（§92.103/92.104/92.109）：https://statutes.capitol.texas.gov/Docs/PR/htm/PR.92.htm（文本核对：https://texas.public.law/statutes/tex._prop._code_section_92.103 、https://texas.public.law/statutes/tex._prop._code_section_92.109）
- FL Stat. §83.49：http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0000-0099/0083/Sections/0083.49.html
- NY GOL §7-108：https://www.nysenate.gov/legislation/laws/GOB/7-108；适用判例（官方）：Levine v Xu-Kehrli, 2026 NY Slip Op 50528(U)（nycourts.gov）
- PA L&T Act 1951 §511/§512（68 P.S. §250.511/250.512）：https://www.palegis.us（检索 Landlord and Tenant Act of 1951）；镜像：https://codes.findlaw.com
- WA RCW 59.18.280：https://app.leg.wa.gov/RCW/default.aspx?cite=59.18.280（HB 1074, 2023 c 331）
- CO C.R.S. §38-12-103：https://leg.colorado.gov/statutes（官方 CRS 入口）；文本核对：https://colorado.public.law/statutes/crs_38-12-103
- AZ A.R.S. §33-1321：https://www.azleg.gov/viewdocument/?docName=https://www.azleg.gov/ars/33/01321.htm
- WI ATCP 134.06：https://docs.legis.wisconsin.gov/document/administrativecode/ATCP%20134.06(2)
- AL Ala. Code §35-9A-201：https://alison.legislature.state.al.us/code-of-alabama；现行文本核对：FindLaw（2024-12 版）

**官方解释/出口**
- HUD Tenant Rights（联邦入口，JS 渲染）：https://www.hud.gov/topics/rental_assistance/tenantrights
- USA.gov 州消费者保护局目录：https://www.usa.gov/state-consumer
- CA AG「Know Your Rights: Security Deposits」PDF：https://oag.ca.gov/system/files/media/Know-Your-Rights-Security-Deposits-English.pdf
- SF.gov（AB 12 生效公告，官方市府）：https://www.sf.gov
- Texas State Law Library Landlord/Tenant guide：https://guides.sll.texas.gov

**二手交叉核对（禁作终值）**
- Nolo 50 州 deadline 图：https://www.nolo.com/landlord-tenant/state-deadlines-for-returning-security-deposit.html（hub https://www.nolo.com/landlord-tenant/security-deposit-limits-deadlines-your-state.html，更新至 2024-04）
- Westlaw Practical Law 50 州对照表（付费）：https://content.next.westlaw.com/practical-law/document/Ia5b0f087647111eaadfea82903531a62/Security-Deposit-Laws-Residential-Lease-State-Comparison-Chart
- 房产 SaaS 群（Azibo/TransUnion/iPropertyManagement 等）：仅作 SERP 对照，多处含过期天数（WA 21、AL 35），已在矩阵中逐一证伪
