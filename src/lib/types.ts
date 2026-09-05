// 工具工厂类型契约 — 见 docs/技术架构-v1.md §4
// 每个工具 = config(声明) + engine(isomorphic compute)；页面/交互/SEO 由模板产出。

export type FieldType = 'money' | 'number' | 'slider' | 'select' | 'text';
export type Industry = 'restaurant' | 'cleaning' | 'lawn' | 'construction' | 'salon' | 'retail' | 'universal';

export interface FieldDef {
  id: string;
  label: string;
  kind: FieldType;
  default?: string | number;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface RowsDef {
  id: string;
  label: string;
  hint?: string;
  columns: { id: string; label: string; kind: 'text' | 'money' | 'number'; placeholder?: string; value?: string | number }[];
  preset: Record<string, string | number>[];
  addLabel: string;
  removable?: boolean;   // 默认 true；false 则隐藏删除按钮（行数固定的场景）
  addable?: boolean;     // 默认 true；false 则不显示 add 按钮
}

export interface FaqItem { q: string; a: string }

export interface VerdictCopy {
  ok: string;
  warn: string;
  bad: string;
}

export interface ToolConfig {
  slug: string;
  industry: Industry;
  name: string;            // 页面 H1 / 卡片名
  tagline: string;         // H1 下副标题（带承诺）
  title: string;           // <title>
  description: string;     // meta description
  fields: FieldDef[];
  rows?: RowsDef;
  params: Record<string, unknown>;          // 引擎参数 + 诊断文案模板
  result: { label: string; sub?: string };  // 结果卡标签
  explain: string;                          // below-fold 说明区 HTML（人工撰写）
  faq: FaqItem[];
  related: string[];                        // 其他工具 slug
}

// 引擎统一返回结构（服务端首屏渲染 + 客户端实时更新共用）
export interface GaugeSpec {
  value: number;              // 当前值（已换算到 min-max 量纲）
  min: number;
  max: number;
  healthy?: [number, number]; // 绿区
  unit?: string;              // '%' 等
}

/** 文档型工具的输出（发票/工单/清单/价目表等）——渲染进结果卡并随打印输出 */
export interface DocSpec {
  title: string;
  fields?: { label: string; value: string }[];
  rows?: { name: string; detail?: string; value: string }[];
  total?: { label: string; value: string };
  footnote?: string;
}

export interface EngineResult {
  primary: { label: string; value: string };
  secondary?: { label: string; value: string }[];
  gauge?: GaugeSpec;
  verdict: { level: 'ok' | 'warn' | 'bad' | 'info'; text: string };
  doc?: DocSpec;
}

export type Row = Record<string, string | number>;
export type Compute = (values: Record<string, string>, rows: Row[], params: Record<string, unknown>) => EngineResult;

/** 注册表条目 = 声明 + 计算函数（isomorphic：服务端首屏渲染与客户端实时更新共用） */
export interface RegisteredTool extends ToolConfig {
  compute: Compute;
}

// —— 数值小工具（引擎共用）——
export const num = (v: string | number | undefined): number => {
  const n = typeof v === 'number' ? v : parseFloat(String(v ?? '').replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : 0;
};
export const money = (v: number): string =>
  '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const pct = (v: number, digits = 1): string => `${v.toFixed(digits)}%`;
export const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));
