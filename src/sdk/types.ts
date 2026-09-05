// SaaS Core SDK — 类型契约（docs/技术架构-v1.1 §10）
//
// 分层原则：
//   L1 工具页（零后端铁律）→ SDK（四能力接口）→ 适配器（local / worker / supabase / 自建 core）
// 站点代码只依赖本接口。今天实现 local+worker；M2 加 supabase 适配器；
// 将来若自建统一 Core，只换适配器实现，站点代码零改动。

export interface UsageCounts {
  since: string;
  days: number;
  counts: { slug: string; uses: number; users: number }[];
}

/** 能力 1：使用统计（M1 已实现 — worker 适配器） */
export interface UsageCapability {
  /** 记一次工具使用（实现方负责去重/防刷） */
  beacon(slug: string): void;
  /** 近 N 天各工具使用量；无数据返回 null */
  counts(days?: number): Promise<UsageCounts | null>;
}

export interface SdkUser { id: string; email: string }

/** 能力 2：账户（M2 实现 — supabase 适配器；magic link only） */
export interface AuthCapability {
  user(): Promise<SdkUser | null>;
  signIn(email: string): Promise<void>;
  signOut(): Promise<void>;
}

export type DocKind = 'menu' | 'calc_result' | 'client' | 'client_doc';
export interface SdkDoc {
  id: string;
  kind: DocKind;
  label: string;
  schemaVersion: number;
  payload: unknown;
  updatedAt: number;
}

/** 能力 3：文档存取（M2 实现 — saved_items/clients 实体化的统一入口） */
export interface DocumentsCapability {
  list(kind: DocKind): Promise<SdkDoc[]>;
  put(kind: DocKind, doc: Omit<SdkDoc, 'updatedAt'>): Promise<void>;
  remove(kind: DocKind, id: string): Promise<void>;
}

/** 能力 4：订阅权益（M3 实现 — Stripe + entitlements 表） */
export interface EntitlementsCapability {
  plan(): Promise<'free' | 'pro'>;
  /** Pro 功能门禁统一走这里：limits()['saved_items'] 等 */
  limits(): Promise<Record<string, number>>;
}

export interface MstSDK {
  usage: UsageCapability;
  auth: AuthCapability;
  documents: DocumentsCapability;
  entitlements: EntitlementsCapability;
}

/** 适配器注册名：'local'（L1 默认）| 'supabase'（M2）| 'core'（自建，将来） */
export type SDKAdapter = 'local' | 'supabase' | 'core';
