# 工具清单 v2 — 付费 SaaS 功能的免费替代矩阵

> 战略：把付费 SaaS 卖给中小企业的「工具形态」功能（填表→文档/计算），重做成免费、纯静态、零后端运维的 Workbench。
> 架构复用：Menu Workbench 已验证的模式 = 数据集 + 方法论分析 + 排版打印输出 + CSV/JSON 进出 + localStorage 版本管理。每个新 Workbench = 新数据模型 + 新模板 + 分析模块。
> 调研日期 2026-09-05（三路并行，定价均为官网实测）。v2

---

## 1. 选品标准（在 v1 五条之上新增两条）

6. **付费证据**：有 SaaS 正在为同一功能向 SMB 收钱（定价锚点 = 营销话术 + 需求证明）
7. **零运维红线**：不需要后端/实时数据/合规存储；用户自填税率而非我们维护税率表；法规类只做"self-help document preparation"（用户自填事实 + 明示 not legal advice），不做州别条款推荐

## 2. SaaS 替代矩阵（按优先级排序）

### Wave A — 证据最强 × 竞争最空

| # | 工具 | 付费证据（锚点） | SERP 空隙 | 免费版范围 | 运维 |
|---|------|----------------|----------|-----------|------|
| **A1** | **Recipe Costing Workbench**（餐饮） | MarketMan **$249/mo**（招牌功能 Real-Time Recipe Costing）、Recipe Costing Software $175/mo、MenuCalc ~$99 | **只有死 Excel/PDF**（RestaurantOwner 会员墙、Spreadsheet123），无交互工具 | 配料数据库 + 每菜谱成本卡（份量×损耗×单价）+ food cost% 诊断 + 打印成本卡 + CSV 进出 | 零 |
| **A2** | **Estimate / Invoice Workbench**（保洁/草坪/维修） | Jobber $29-529/mo（免费层限 5 份报价/月，超量收钱）；Housecall Pro $59-329 | 竞品全门控：在线编辑必须注册；TemplateLab 只有死 PDF | 行项目+用户自填税率+客户档案(localStorage)+报价/发票一键切换+打印级 PDF+CSV；Jobber 已验证"免费模板→订阅"漏斗，我们砍掉门控 | 零（税率用户自填） |
| **A3** | **Booth Rental Agreement Builder**（美业） | LawDepot **$35-59/份**、Etsy $1.75-7.50/份有量、GlossGenius $48 / Boulevard Forms add-on $65/mo | eForms/LegalTemplates 有静态版但 Q&A 向导+注册门控 | 填空式协议（双方信息/工位/租金/期限/条款勾选）→ 打印手签；**定位 self-help document preparation，页脚 not legal advice** | 零 |
| **A4** | **Inventory Count Workbench**（餐饮+零售） | Restaurant365 **$289-469/店/mo**；MarketMan $249 | Smartsheet/Cin7 只有静态模板，无自动汇总 | qty×price 行项 → 自动金额/分类小计/总值 → COGS 快照 → CSV 导出 → 下次盘点加载上次价格 | 零 |

### Wave B — 证据强 × 需长尾切入

| # | 工具 | 付费证据 | 竞争与切入 | 运维 |
|---|------|---------|-----------|------|
| B1 | **Service Price List Builder**（美业） | Canva 主导但需设计能力+注册；Etsy 付费 | 复用 Menu Workbench 排版引擎，数据模型换成服务项+时长+价格；输出排版价目表 | 零 |
| B2 | **Cleaning Checklist Builder** | Connecteam $29/mo、ZenMaid | 差异化=可勾选+按房间/频率生成+打印 PDF；静态免费版全是死 PDF | 零 |
| B3 | **Service Contract Generator**（保洁/草坪/维修三变体） | PandaDoc $19-49/mo、DocuSign $120/年起 | eForms 系占 SERP，长尾 "cleaning contract template for {niche}"；同 A3 法律边界 | 零 |
| B4 | **Consignment Split Sheet**（零售/手作） | Etsy 付费模板 | **SERP 蓝海**（调研确认最弱竞争） | 零 |
| B5 | **Prep List Builder**（餐饮） | Jolt ~$90/mo | par→备货量计算+打印；SEO 引流定位 | 零 |

### 明确不做（本次调研确认）

| 不做 | 理由 |
|------|------|
| Tip pool 计算器扩展 | Kickfin/Ferry/Agendrix 等 fintech 已铺满免费交互版，SEO 拥挤 |
| 温度记录表/开关店 checklist | 纸笔场景为主，只做内容引流不做产品 |
| 在线调度/支付/eSign/OCR/POS 集成 | 必须后端，违背零运维红线 |
| 排班发布同步 | 发布/通知必须后端；只保留 printable 模板 |
| 税率计算/工资单 | 法规维护地狱（v1 已裁决） |

## 3. 定价锚点（营销话术库，全部官网实测）

- Recipe Costing：免费替代 MarketMan $249/mo 的招牌功能 → "the $2,988/yr feature, free"
- Estimate/Invoice：替代 Jobber Core $29/mo（免费层 5 份/月的限制墙）→ "unlimited quotes, no account"
- Booth Rental：替代 LawDepot $35-59/份 → "free, editable, printable"
- Inventory：替代 R365 $289/mo 的盘点模块
- 综合：单店 back-office 一项功能 = MarketMan $249 + Jolt $90 ≈ **$340/mo，年省 ~$4,000**

## 4. 工程复用：Workbench 平台化

Menu Workbench 抽象为通用骨架 `WorkbenchKit`：数据 schema（zod）+ localStorage 命名空间 + 版本快照 + normalize 迁移 + 打印管线（@page per 纸型）+ CSV/JSON IO + 分析面板组件。每个新 Workbench 只写：数据模型、行业模板（排版）、分析规则。
- Recipe Costing / Inventory Count 共享「食材/行项×价格→汇总」内核
- Estimate / Invoice / Work Order 共享「客户+行项+税」内核
- Booth Rental / Service Contract 共享「填空协议→打印」内核
- Price List 复用 Menu 排版引擎

## 5. 建设顺序（并入总路线图）

| 阶段 | 内容 | 说明 |
|---|---|---|
| M1.5（进行中） | Menu Workbench（已完成 v2） | WorkbenchKit 原型 |
| **M2 前插 A1** | Recipe Costing Workbench | 同行业流量复用最强，$249 锚点 |
| M2 | 账户面（不变）+ A2 Estimate/Invoice Workbench | 进入 cleaning/lawn 垂直的先头部队 |
| M3 | Stripe + A3 Booth Rental Builder | 美业蓝海+LawDepot 锚点 |
| M4-M5 | A4 Inventory + Wave B 按数据排 | 计算器 Wave 2-4 并行 |

**变现结构不变**：工具永久免费零门控（L1 铁律）→ Pro 存云端文档/模板库广度 → affiliate（免费用户长大要调度/支付时导 Jobber/Housecall/GlossGenius，$200-1250/单）。
