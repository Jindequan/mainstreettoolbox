// SDK 工厂 — 站点代码唯一入口：getSDK()
// 适配器选择规则：
//   local    — 默认。L1 全部功能可用（usage 走 worker 或静默），无后端依赖。
//   supabase — M2：PUBLIC_SAASCORE_URL 存在时启用（账户/文档/权益落地）。
//   core     — 预留：将来自建统一 Core 时新增适配器，站点代码零改动。
import type { MstSDK, SDKAdapter } from './types';
import { createLocalSDK } from './local';

export type { MstSDK, SDKAdapter, UsageCounts, SdkDoc, SdkUser } from './types';

export function adapterName(): SDKAdapter {
  return import.meta.env.PUBLIC_SAASCORE_URL ? 'supabase' : 'local';
}

export function getSDK(): MstSDK {
  // M2: if (adapterName() === 'supabase') return createSupabaseSDK(env);
  return createLocalSDK();
}
