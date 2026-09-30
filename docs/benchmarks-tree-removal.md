# Benchmarks — Tree removal (2026-09-30)

验证层：**Bing WMT API 直验（2026-09-30 解锁）**——"tree removal cost" **996 strict /90d（US）**，族内 "tree service near me free estimate" 701、"stump removal" 854、"tree removal service" 502，near-me 本地意图主导但价格/估价意图明确可承接。数据：`keyword-data/bing-api-2026-09-30.md`（本文件附录有族全表）。R6 批验 36 族中最强，接棒 dumpster。

## 核心基准（≥2 源交叉）

### 按树高（per tree）

| 档位 | 区间 | 来源 |
|---|---|---|
| 小树 <30 ft | **$200–500** | HomeGuide 200–500 · Lawn Love 285–435 · TreeCostEstimator 200–450 · Rapid Eye 150–450 |
| 中树 30–60 ft | **$450–1,200** | TCE 450–900 · Rapid Eye 450–1,200 · HomeGuide 500–1,500 · Lawn Love 435–870 |
| 大树 60–80 ft | **$850–1,600** | HG 850–2,000 · TCE 900–1,600 · LL 870–1,160 |
| 特高 80+ ft | **$1,500–4,000** | TCE 1,600–4,000+ · LL 1,160–2,000 · Thumbtack 大树 976–4,117（上限口径杂，上限标注单源） |

### 综合与费率

| 项目 | 区间 | 来源 |
|---|---|---|
| 典型单棵区间 | **$385–1,070** | LawnStarter 与 Lawn Love 两源同带 |
| 全国均价 | $630（LS）/ $850（LL） | 两源并陈，取 $630–850 |
| 每英尺 | **$10–14.50 / ft** | LS $10–14 · LL $9.50–14.50 |
| 每英亩清场 | **$850–6,000** | LS 与 LL 两源同带 |

### 附加项

| 项目 | 区间 | 来源 |
|---|---|---|
| 树桩磨除 stump grinding | **$150–450** | LS $158–450；LL 树桩移除 $180–525 |
| 树桩全除 stump removal（含根） | **$175–525** | LS $175–516（均价 $326）· LL $180–525 |
| 倒伏树 fallen（比立树便宜） | **$85–300** | LS $85–300 · LL $90–300 |
| 紧急/风暴加价 | $450–3,000 | LL 单源 → 只进 verdict/explain 定性 + FAQ 带出处 |
| 障碍加成（近屋/电线） | up to +50% | LS 单源 → 定性 |
| 清运 debris hauling | $50–90 | LS 单源 → FAQ 定性 |

## 不进计算（单源/口径混）

- 树种差价（LS：palm 725/oak 775/pine 925/maple 1,150）→ 口径=按类型均高回填，与高度档重叠，不双计
- permit、crane 吊除、travel fee（LL $50–200）→ FAQ 定性提及
- emergency 上限、accessibility +50% → 乘数区间保守取值并在 explain 标注

## 判读记录

- 同批判弱（strict<500 或 0）：pest control 288、gutter cleaning 217、water heater install 215、junk removal 205、tv mounting/furniture assembly/carpet cleaning cost 全 0 → 各自进预设/不建独立工具，待 Google 侧 GSC 数据复核
- "moving cost" 0 strict / 7,429 broad：宽泛意图噪声，不追
