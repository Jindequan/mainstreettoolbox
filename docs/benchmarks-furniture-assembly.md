# Benchmarks — Furniture assembly（预研，2026-09-30）

状态：**基准预研完成，T2 构建待音量验证**（Bing WMT 窗口恢复后跑 "furniture assembly cost" 官方数字；R6 词族全部 bing 单源：assembler near me cost/rates、how much to assemble furniture 等）。验证过闸 → per-item 计算器；判弱族 → 吸收进 handyman 预设（现 $80/件锚点校准为阶梯）。

## 核心基准（≥2 源交叉）

| 项目 | 区间 | 来源 |
|---|---|---|
| 单件总带（按大小） | **$50–550**（small $50–150 / medium $70–450 / large $100–550 / XL $350–1,000） | HomeGuide（2024-08 更新） |
| 典型单 job 成交 | **$105–150** | Thumbtack（median ~$105；quote 型 $120–150） |
| 小件起步 | ~$139 flat 起；平均时薪 ~$50/hr | TaskRabbit（tasker 自定价+平台费 15–22%） |
| handyman 时薪 | $50–80/hr（组装 job 均值 $85–200） | HomeGuide |

## 按件阶梯（HomeGuide 详表——**单源**，聚合带已被上面多源印证）

| 家具 | 组装价 |
|---|---|
| 椅子 | $50–150 |
| 桌子 | $50–450 |
| 床架 | $70–160 |
| 沙发 | $80–160 |
| 书架/搁架 | $80–150 |
| 斗柜/媒体柜 | $100–350 |
| 衣柜/步入式 | $150–450 |
| 办公家具 | $100–1,000 |
| L 型大桌 | $350–550 |

零售商打包价：Amazon $50–300 / IKEA $50–450 / Wayfair $90–450（HomeGuide 单源；IKEA 实际走 TaskRabbit 按件报价）。

## 加价项

- 同 visit 多件折扣：普遍存在但无统一比例 → 定性进 FAQ
- 旧件/包装清运：+$5–50（HomeGuide 单源）
- 搬运磕墙修复：$100–400（drywall 修复区间，与已有工具互链）
- 小费 $10–20 非义务（HomeGuide）

## 计算器模型草案（验证过闸后用）

家具类型 select（8 档取自阶梯表）× 件数（同 visit 折扣定性提示）→ 输出低/高带 + 时薪换算参考行。批量折扣不进系数（单源无比例），以"第二件起单价常下调"文案承接。

来源：homeguide.com/costs/furniture-assembly-cost（2024-08）；thumbtack furniture assembly pages；taskrabbit.com（rates + fee 结构）。

## 验证层判读（2026-09-30，Bing WMT API 批验）

**未过闸**：cost 头词及全部 cost 变体 strict=0/90d（数据 docs/keyword-data/bing-api-2026-09-30.md）。家族层意图不在价格信息（near-me/品牌/设备主导）→ **不建独立计算器 URL**；基准数字转作对应行业预设（handyman/cleaning）素材。待 GSC 侧出现直指量再复议。
