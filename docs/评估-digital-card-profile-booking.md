# 评估：电子名片 / 企业主页 / Store 预约（2026-09-14）

> 用户提问：为中小企业主做电子名片、企业主页与分享、store 预约服务，能不能做？
> 结论先行：**预约 = 不做；名片/主页 = 现在不做，进 M2 观察区**。依据如下。

## 一、竞品格局（调研日 2026-09-14）

### 电子名片
- **免费无注册 vCard+QR 生成器已扎堆**：QR Planet、goqr.me、GuestCam、TQRCG、EZQR、GenQRCode、ME-QR 等 8+ 家，均"no account / no watermark / 无过期"
- **托管式卡片页免费层**：Blinq、HiHello、Popl、Wave Connect 四强，免费层含 QR 分享、模板、（部分）分析
- **闸 2 判定：通用款不过闸** —— "又一个名片生成器"没有增量

### 企业主页（link-in-bio / profile page）
- Linktree 免费层、Carrd、About.me 覆盖通用需求
- **本地商家的"主页"事实标准是 Google Business Profile**：免费、自带搜索/地图曝光，任何自建主页工具在"被找到"这个核心价值上都打不过它
- **闸 2 判定：不过闸**

### Store 预约
- **Square Appointments 免费层**：solo $0/月，含 24/7 在线预约、Google/Outlook 日历同步、自动提醒、no-show 保护、客户档案、收款——solo 场景被免费层全覆盖（付费 $49/$149 是团队功能）
- Booksy $29.99/月起（美业垂直，无免费层）；Housecall Pro / Jobber / ZenMaid / Setmore 垄断 home services 与通用预约
- **闸 2 判定：无增量**，且正面撞上 Square/Booksy 数十亿美元级玩家

## 二、架构代价（关键约束）

站点红线是 **L1 零后端**（静态、断网可算、零运维、零成本）。三个方向对它的冲击完全不同：

| 能力 | 零后端可行？ | 说明 |
|---|---|---|
| vCard 文件 + QR 码生成 | ✅ 完全可行 | 纯前端（.vcf 下载 + 本地 QR 库），与现有工具同模式 |
| 可分享的名片/主页页 | ⚠️ 勉强 | 数据编码进 URL hash 可行（分享链接即数据），但链接丑长、SEO 为零；要体验好就必须上后端（每用户一页 = 动态数据） |
| 预约系统 | ❌ 不可能 | 日历、时段状态、通知、取消、双向同步——需要完整 SaaS 基建（账号+后端+推送），与零后端铁律根本冲突 |

## 三、结论

1. **预约服务：不做。** 没有增量（Square 免费层已覆盖 solo 全场景），工程上要求推翻零后端架构，商业上是与巨头正面战争。这条清晰否决。
2. **通用电子名片 / 通用主页：不做。** 闸 2 不过——免费无注册工具已扎堆，Linktree/GBP 覆盖余下需求。做了就是"随随便便都做"的反面教材。
3. **垂直观察区（M2 后再议）**：唯一有真实差异化的形态是 **"本地服务业工具箱主页"** —— 用户在 M2 有了账号后，把保存的价目表、常用计算器和联系方式合成一个可分享页（清洁工 Joe 的页面：价目表 + 内嵌报价计算器 + 一键存联系方式的 vCard QR）。那时它是账号价值的自然产物（数据已在服务端），而不是独立硬上的新产品。**触发条件：M2 账号系统上线 且 有用户反馈要"把工具结果分享给客户"的聚合页。** 记入候选池观察，不排期。

## 四、这个方向给我们的正面启发

"卡片/主页/预约"背后的真需求是：**小服务商想有一个"体面地把自己展示给客户"的东西**。我们已经在服务这个需求的报价端（计算器、发票、价目表、checklist）。与其建新平台，不如继续把这条线做深——已过闸的 pour cost、aeration 候选就是这个方向的正确延伸。

## 附：调研来源

- 名片竞品：qr-code-generator.com、qrplanet.com、goqr.me、guestcam.co、the-qrcode-generator.com、ezqr.ca、genqrcode.com、me-qr.com、canva.com、blinq.me/blog/best-digital-business-cards
- 预约竞品：squareup.com/us/en/appointments（免费层 $0 solo）、biz.booksy.com（$29.99/mo 单人）、housecallpro.com、jobber.com、setmore.com
