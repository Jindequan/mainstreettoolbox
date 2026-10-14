import { describe, expect, it } from 'vitest';
import { blank, buildLetter } from './engine';

// 信件层边界：逾期/窗口内互斥、金额钳位、非法日期回退、州引擎透传（AZ demand / FL 15 天 / WA 取后 / CO 月末钳）
const base = {
  state: 'CA' as const,
  vacate: '2026-07-01',
  letterDate: '2026-07-15',
  deposit: 1800,
  statementReceived: 'none' as const,
  deductionAmount: 0,
};

describe('demand letter engine', () => {
  it('within window: CA 21-day deadline leaves 7 days, no escalation', () => {
    const r = buildLetter(base);
    expect(r).not.toHaveProperty('error');
    if ('error' in r) return;
    expect(r.deadline.deadline).toBe('2026-07-22');
    expect(r.daysLeft).toBe(7);
    expect(r.overdueDays).toBe(0);
    expect(r.escalate).toBe(false);
    expect(r.demanded).toBe(1800);
  });

  it('overdue: letter past the deadline flips to escalation with day count', () => {
    const r = buildLetter({ ...base, letterDate: '2026-08-10' });
    if ('error' in r) throw new Error('unexpected error');
    expect(r.overdueDays).toBe(19);
    expect(r.daysLeft).toBe(0);
    expect(r.escalate).toBe(true);
  });

  it('letter dated exactly on the deadline is not overdue', () => {
    const r = buildLetter({ ...base, letterDate: '2026-07-22' });
    if ('error' in r) throw new Error('unexpected error');
    expect(r.escalate).toBe(false);
    expect(r.daysLeft).toBe(0);
  });

  it('statement deductions reduce the demand; over-claims clamp at zero', () => {
    const withStatement = buildLetter({ ...base, statementReceived: 'statement', deductionAmount: 600 });
    if ('error' in withStatement) throw new Error('unexpected error');
    expect(withStatement.demanded).toBe(1200);

    const overClaimed = buildLetter({ ...base, statementReceived: 'statement', deductionAmount: 2000 });
    if ('error' in overClaimed) throw new Error('unexpected error');
    expect(overClaimed.demanded).toBe(0);
  });

  it('deduction amounts are ignored when no statement was received', () => {
    const r = buildLetter({ ...base, statementReceived: 'none', deductionAmount: 9999 });
    if ('error' in r) throw new Error('unexpected error');
    expect(r.demanded).toBe(1800);
  });

  it('missing or malformed move-out date is a hard error, not NaN', () => {
    expect(buildLetter({ ...base, vacate: '' })).toEqual({ error: 'missing-vacate' });
    expect(buildLetter({ ...base, vacate: '07/01/2026' })).toEqual({ error: 'missing-vacate' });
  });

  it('malformed optional dates are dropped instead of poisoning the clock', () => {
    const r = buildLetter({ ...base, termination: 'end of lease', letterDate: 'July 15' });
    if ('error' in r) throw new Error('unexpected error');
    // 非法 letterDate 回退 = 卡截止日寄出；termination 丢弃不影响 CA（trigger=vacate）
    expect(r.escalate).toBe(false);
    expect(r.daysLeft).toBe(0);
    expect(r.deadline.deadline).toBe('2026-07-22');
  });

  it('Arizona: written demand moves the clock (business days)', () => {
    const r = buildLetter({
      ...base, state: 'AZ', vacate: '2026-06-20', demand: '2026-07-01', letterDate: '2026-07-15',
    });
    if ('error' in r) throw new Error('unexpected error');
    expect(r.deadline.deadline).toBe('2026-07-21');
    expect(r.daysLeft).toBe(6);
  });

  it('Florida no-claim path: 15-day refund window', () => {
    const r = buildLetter({ ...base, state: 'FL', vacate: '2026-02-01', letterDate: '2026-02-10' });
    if ('error' in r) throw new Error('unexpected error');
    expect(r.deadline.deadline).toBe('2026-02-16');
  });

  it('Washington takes the later of termination and move-out', () => {
    const r = buildLetter({ ...base, state: 'WA', vacate: '2026-05-10', termination: '2026-05-15', letterDate: '2026-05-20' });
    if ('error' in r) throw new Error('unexpected error');
    expect(r.deadline.triggerDate).toBe('2026-05-15');
    expect(r.deadline.deadline).toBe('2026-06-14');
  });

  it('Colorado month clamp: Jan 31 move-out lands Feb 28; Mar 5 letter is 5 days overdue', () => {
    const r = buildLetter({ ...base, state: 'CO', vacate: '2026-01-31', letterDate: '2026-03-05' });
    if ('error' in r) throw new Error('unexpected error');
    expect(r.deadline.deadline).toBe('2026-02-28');
    expect(r.overdueDays).toBe(5);
    expect(r.escalate).toBe(true);
  });

  it('blank() renders fill-in lines for missing names', () => {
    expect(blank('')).toBe('____________');
    expect(blank(undefined)).toBe('____________');
    expect(blank('  Jane Doe ')).toBe('Jane Doe');
  });
});
