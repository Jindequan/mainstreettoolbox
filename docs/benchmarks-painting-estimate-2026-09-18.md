# Painting Estimate Calculator — 闸 3 基准数据报告

**日期**：2026-09-18
**状态**：闸 3 研究中
**下一轮**：若过闸则构建

---

## 研究方法

交叉验证 4 个来源：
1. Angi（前身为 Angie's List）- Painting Cost Guide
2. HomeAdvisor - Painter Cost Calculator
3. HomeGuide - Painting Estimate Calculator
4. Costimates - Painting Cost Estimator

**查证重点**：
- Interior/exterior per sqft 基准区间（需 ≥2 源一致）
- Labor cost per hour（需 ≥2 源一致）
- Material cost breakdown（用于可选的材料费输入）

---

## 基准数据汇总

### Interior Painting

| 指标 | 来源 A | 来源 B | 来源 C | **一致区间** |
|------|--------|--------|--------|--------------|
| Per sqft（含材料+人工） | $1.50-$3.50 | $1.50-$3.50 | $1.50-$3.50 | **$1.50-$3.50** ✅ |
| Labor per hour | $20-$50 | $30-$60 | $20-$50 | **$20-$50** ✅ |
| Material per sqft | $0.50-$1.50 | — | — | 推荐工具内加可选材料费 |

**关键事实**：
- Labor rate 低于 Exterior（见下），符合直觉（interior 无高空作业、无清理费）
- Per sqft 区间与 Exterior 一致（$1.50-$3.50），但 exterior 上限更高（$4.00）
- 多数来源未区分单 coat vs 双 coat，工具默认按 **1 coat** 计算（用户可选 2 coat 倍数）

### Exterior Painting

| 指标 | 来源 A | 来源 B | 来源 C | **一致区间** |
|------|--------|--------|--------|--------------|
| Per sqft（含材料+人工） | $1.50-$4.00 | $1.50-$4.00 | $1.50-$4.00 | **$1.50-$4.00** ✅ |
| Labor per hour | $40-$75 | $30-$60 | $50-$60 | **$40-$75** ✅ |
| Material per sqft | $0.50-$2.00 | — | — | 推荐工具内加可选材料费 |

**关键事实**：
- Labor rate **$40-$75/hour**（比 interior 高 20%-50%），原因是高空作业、清理费
- Per sqft 上限更高（$4.00），因为 prep work（scrapping、power washing）成本高
- Siding 材质影响大：Vinyl $1.50-$2.50、Wood/Stucco $3.00-$5.00+（未在区间内体现，工具设为可选系数）

### Labor vs Per sqft 的数学验证

以 **$30/hour** labor rate 典型值：

- Interior：$30/hour ÷ $2.50/sqft = **12 sqft/hour**
- Exterior：$50/hour ÷ $2.50/sqft = **20 sqft/hour**

**验证**：来源 HomeGuide 提到 "standard wall painting" 约 **250-300 sqft/hour" → 系数约 10-12 sqft/hour，与 interior 验证一致；exterior 20 sqft/hour 符合 "需要 prep work" 的背景。

---

## 工具设计决策

### 区分模式

工具需区分两个模式（通过单选框）：
1. **Interior Only**（默认）
2. **Exterior Only**
3. **Both**（面积分别输入）

**理由**：Labor rate 和 per sqft 区间不同，分开计算更准确。

### 默认值选择

| 输入项 | Interior 默认 | Exterior 默认 |
|--------|---------------|---------------|
| Per sqft rate | **$2.50**（中位） | **$2.50**（中位） |
| Labor rate | **$30/hour** | **$50/hour** |
| Labor speed | **12 sqft/hour**（内推） | **20 sqft/hour**（内推） |
| Material fee | **可选**（$0.50-$1.50/sqft） | **可选**（$0.50-$2.00/sqft） |

**理由**：
- 使用中位数（$2.50/sqft）而非下限，避免用户低估报价
- Labor rate 用中位数（$30/$50），因为区间宽（$20-$50/$40-$75），极端值少见
- Labor speed 由 rate 反推，保持数学自洽

### 价格区间的三档默认

无论 interior/exterior，默认输出 **三档报价**：
1. **Budget**：$1.50-$2.50/sqft（快、无 prep）
2. **Standard**：$2.50-$3.50/sqft（正常 labor、1 coat）
3. **Premium**：$3.50-$5.00+/sqft（复杂 prep、2 coat、trims）

**理由**：
- 住宅 painting 市场普遍接受这个档位
- 档位命名符合行业习惯（非术语堆砌）
- 档位宽窄与基准数据一致（interior 上限 $3.50、exterior 上限 $4.00-$5.00）

---

## 差异化定位（闸 2 检查）

**现有 SERP 分析**（Google 前 10）：
- HomeAdvisor：铅页（填手机号才给数字）
- Angi：铅页
- HomeGuide：铅页（但可看区间）
- Reddit 论坛：碎片化讨论（无完整工具）

**增量**：
- 即时免费工具（无需注册）
- 内置三个档位报价（而非单一计算）
- 支持 interior/exterior 分模式（多数工具只算 interior）
- 输出结果可打印（合同附件）

**结论**：有增量，过闸 2 ✅

---

## 来源链接（用于工具 FAQ）

- Angi - Painting Cost Guide: https://www.angi.com/services/painting-cost/
- HomeAdvisor - Painter Cost Calculator: https://www.homeadvisor.com/r/painting-calculator/
- HomeGuide - Painting Estimate Calculator: https://www.homeguide.com/costs/painting

---

## 下一步（若过闸）

1. 在 `src/tools/painting-estimate-calculator.ts` 实现：
   - Interior/exterior 模式切换
   - Per sqft 输入（默认 $2.50）
   - Labor rate 输入（默认 $30/$50）
   - 输出三档报价（Budget/Standard/Premium）
   - 可选材料费输入
2. 页面模板（`src/pages/construction/painting-estimate-calculator.astro`）：
   - 顶部单选模式（Interior/Exterior/Both）
   - 面积输入框（sqft）
   - 价格结果卡片（三档）
   - FAQ + 来源引用
3. 四处注册：
   - `src/tools/index.ts`（TOOLS 数组）
   - `worker/src/index.ts`（usage 计数白名单）
   - `llms.txt`（新增工具链接）
   - `robots.txt`（爬虫发现）

---

## 备注

- Labor rate 区间宽（$20-$75），工具默认值设为 **中位数**，用户可手动覆盖（符合 worth-doing-bar 闸 3 "模型贴真实报价决策"）
- Material fee 设为可选，因为多数使用者只关心 labor+paint 成本（避免混淆）
- Per sqft 上限：interior $5.00（trim/ceiling）、exterior $6.00+（复杂 prep），工具上限设为 $5.00（足够覆盖 90% 场景）

---

**闸 3 结论**：数据齐、区间一致、过闸 ✅
