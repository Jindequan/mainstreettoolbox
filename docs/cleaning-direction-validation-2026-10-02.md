# 清洁报价方向复核：高 V / 高 CPC / 低竞争尚未成立

日期：2026-10-02；目标市场：美国英文；触发：用户要求核实重做方向是否满足搜索流量与广告变现标准。

## 结论

撤回把清洁报价列为本站优先重做方向的推荐。它可以作为产品需求实验的候选，但未通过高搜索量、高广告价值、低 SEO 竞争的选题验证。既有三处文字/链接修正保留；不据此推进工作台与首页全面重做。

| 指标 | 证据 | 状态 |
|---|---|---|
| 高 V | 同日联想词库 721 词，其中 cleaning 字符串池 174；公开 GSC 查询有 cleaning estimate calculator 3 展现/82.33 位、house cleaning cost calculator 9 展现/65.56 位（28 天） | 有需求信号；没有美国市场搜索量结论。本站展现不是市场总量。环境没有 BING_WMT_API_KEY；没有读取 Keyword Planner |
| 高 CPC | 没有针对清洁报价/计算器意图的可引用 CPC 基准，也未读取本站 AdSense RPM | 未验证；不能将消费者找清洁服务的竞价用于业主找免费模板的词 |
| 低竞争 | 本轮客观抓取 DDG 美区自然结果前 10，见下 | 两个头词已有密集相关工具/模板；不能标低竞争 |
| 产品差异化 | FieldBid 提供自有人工、费用、目标毛利及客户分享 | 先前提出的成本→报价流程已有直接替代；没有访谈或复用证据 |

## 客观 SERP 复查

执行技能要求的 `serp-verify.mjs`，成功抓取两词，各 10 条自然结果。输出：`kw/cleaning-validation-2026-10-02/serp-verify-2026-10-02.json` 与 `.md`。

- **cleaning estimate calculator**：10/10 自动分类为工具，0 论坛。域依次为 cleanestimator.com、best-calculators.com、everycalculators.com、getjobber.com、everycalculators.com、calculatorsforhome.com、connecteam.com、cleaningestimatetools.com、getquotepro.ai、mytimecalculator.com。
- **house cleaning quote template**：10 条均为相关报价/估算模板供应页，0 论坛。域依次为 invoicemama.com、template.net、template.net、youraspire.com、getjobber.com、jotform.com、docelf.com、bookipi.com、invoicer.ai、invoicefly.com。

人工复核标签：**⚠️ 工具/模板位密集，头词不作为低竞争机会**。脚本的 OFFICIAL/brand 是启发式词匹配：不应把 calculatorsforhome.com、cleaningestimatetools.com 等据此写成政府或行业官方。存在小站不等于没有竞争；本次 DDG 排序也不冒充 Google 实际前十。

此前三个词抓取 FAILED 的记录保留；此次成功结果只更新上述两词。没有因此判死整个清洁行业或所有长尾，也不新建词族。

## 直接产品证据

[FieldBid 清洁估价页](https://fieldbidtools.com/cleaning-estimate-calculator)可见人数、工资、人工附加成本、耗材、间接费用、目标毛利率、频率等输入；结果包含单次/月度价格及客户分享。与原方案主干重合，不能声称已有差异化。

[Docelf 清洁报价模板](https://docelf.com/quote-template/house-cleaning)提供在线编辑、打印/PDF。[Jobber](https://www.getjobber.com/free-tools/estimate-template/cleaning/)免费估价模板同样是实际替代品。只核实功能页面，不据此估计其流量、域名权威或收益。

## 指标口径与下一步

Google Keyword Planner 的 Competition 表示广告主竞争，不是 SEO 难度；顶部竞价区间不是本站 AdSense CPC/RPM：[Google Ads 官方定义](https://support.google.com/google-ads/answer/3022575?hl=en)。本站广告收益需看收入与浏览形成的 [AdSense RPM](https://support.google.com/adsense/answer/190515?hl=en)。

后续选题比较表需要：同一国家/语言/时间窗的词族真实量级与季节性、标明意图与年份的广告价值来源、Google 与 DDG 实际前十的供给缺口、能实现且有来源的增量价值。Bing strict 与 Google 月搜索量分别标注，词族合计去重，broad 不充 strict；缺失字段写未知。用户要求的“高”标准没有数值定义，当前不擅自认定过关。

10 位清洁业主的完成/复用测试只能验证产品使用价值，不能验证搜索量、CPC 或 SEO 可打性。之前的两周工作台方案降为条件备选，不作为已定执行路线。

同日 721 词的三个以上意图簇、原始联想与前十候选仍保存在 `traffic-diagnosis-2026-10-02.md` 及 `kw/traffic-diagnosis-2026-10-02/`；这些是候选/需求信号，不改写为已通过高 V、高 CPC、低竞争的机会。
