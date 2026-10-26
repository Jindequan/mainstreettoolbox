// Security Deposit Demand Letter — 词形承接引擎（R8 词族 "security deposit refund" 534 strict/635 broad，
// 2026-10-09 批验转正；状态文件词簇二期第 1 件）。
// 法条数字零新增：州限期/罚则/清单义务全部复用 refund-calculator 的十州引擎（其头注有逐州 statute 复核记录），
// 本引擎只做信件层运算：追讨金额、逾期天数、语气升级（窗口内 civility / 逾期引罚则）。

import {
  computeDeadline,
  type DepositInput,
  type DepositResult,
  type Slug,
} from '../security-deposit-refund-calculator/engine';

export interface LetterInput {
  state: Slug;
  vacate: string;                 // YYYY-MM-DD
  termination?: string;           // YYYY-MM-DD（可选）
  demand?: string;                // YYYY-MM-DD（AZ 法定要件）
  letterDate: string;             // YYYY-MM-DD；空/非法 → 回退到法定截止日（视为当天寄出）
  deposit: number;
  statementReceived: 'none' | 'statement';
  deductionAmount: number;        // 仅 statementReceived='statement' 时生效
}

export interface LetterResult {
  deadline: DepositResult;
  demanded: number;               // 实际追讨金额 = 押金 −（已收到清单时的）扣款
  overdueDays: number;            // >0 = 信寄出时已逾期
  daysLeft: number;               // >0 = 距截止日的剩余天数（与 overdueDays 互斥）
  escalate: boolean;              // 逾期 → 信中点名法定后果
  noStatute?: boolean;            // 州无成文期限（WY）：信件引租约条款而非法条日
}

const MS_DAY = 86_400_000;
const ISO = /^\d{4}-\d{2}-\d{2}$/;

/** 模板空位：姓名/地址未填时输出填行式下划线，保持打印可用 */
export const blank = (v: string | undefined): string =>
  v && v.trim() ? v.trim() : '____________';

export function buildLetter(input: LetterInput): LetterResult | { error: 'missing-vacate' } {
  if (!input.vacate || !ISO.test(input.vacate)) return { error: 'missing-vacate' };

  const deadline = computeDeadline(input.state, {
    vacate: input.vacate,
    termination: input.termination && ISO.test(input.termination) ? input.termination : undefined,
    demand: input.demand && ISO.test(input.demand) ? input.demand : undefined,
  } satisfies DepositInput);

  const deposit = Math.max(0, input.deposit || 0);
  const deduction =
    input.statementReceived === 'statement' ? Math.max(0, input.deductionAmount || 0) : 0;
  const demanded = Math.max(0, deposit - deduction);

  // 无成文期限州（WY）：跳过日期数学——信件引租约条款，无从逾期也无从倒计时
  if (deadline.noStatute) {
    return { deadline, demanded, overdueDays: 0, daysLeft: 0, escalate: false, noStatute: true };
  }

  const letterDate = input.letterDate && ISO.test(input.letterDate)
    ? input.letterDate
    : deadline.deadline; // 空信件日期 = 卡着截止日寄出
  const diff = Math.round((Date.parse(letterDate) - Date.parse(deadline.deadline)) / MS_DAY);

  return {
    deadline,
    demanded,
    overdueDays: Math.max(0, diff),
    daysLeft: Math.max(0, -diff),
    escalate: diff > 0,
  };
}
