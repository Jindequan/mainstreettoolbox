import { describe, expect, it } from 'vitest';
import { addBusinessDays, addMonthsClamped, computeDeadline, later } from './engine';

// 边界用例：月末钳位、跨年、取后规则、AZ 工作日跳周末、FL 双轨、WI 缺省触发
describe('security deposit deadline engine', () => {
  it('CA: vacate +21 calendar days', () => {
    expect(computeDeadline('CA', { vacate: '2026-03-15' }).deadline).toBe('2026-04-05');
  });

  it('NY: +14 crosses the year boundary', () => {
    expect(computeDeadline('NY', { vacate: '2026-12-20' }).deadline).toBe('2027-01-03');
  });

  it('TX: surrender +30 across a 31-day month', () => {
    expect(computeDeadline('TX', { vacate: '2026-08-05' }).deadline).toBe('2026-09-04');
  });

  it('WA: takes the later of termination and move-out', () => {
    expect(computeDeadline('WA', { vacate: '2026-05-10', termination: '2026-05-01' }).deadline).toBe('2026-06-09');
    expect(computeDeadline('WA', { vacate: '2026-05-15', termination: '2026-05-31' }).deadline).toBe('2026-06-30');
  });

  it('CO: one calendar month clamped to month end (Jan 31 → Feb 28)', () => {
    expect(computeDeadline('CO', { vacate: '2026-01-31', termination: '2026-01-15' }).deadline).toBe('2026-02-28');
  });

  it('CO: 60-day lease-extension cap is the later of trigger +60', () => {
    const r = computeDeadline('CO', { vacate: '2026-01-31', termination: '2026-01-15' });
    expect(r.alt?.date).toBe('2026-04-01');
  });

  it('AZ: 14 business days skip weekends, demand can move the trigger', () => {
    // 2026-07-01 是周三；14 个工作日（跳周六日）= 2026-07-21
    expect(addBusinessDays('2026-07-01', 14)).toBe('2026-07-21');
    // demand 比 termination/vacate 更晚 → 触发日取 demand
    const r = computeDeadline('AZ', { vacate: '2026-06-20', termination: '2026-06-25', demand: '2026-07-01' });
    expect(r.triggerDate).toBe('2026-07-01');
    expect(r.deadline).toBe('2026-07-21');
  });

  it('AL: later of termination and possession +60 crosses the year', () => {
    expect(computeDeadline('AL', { vacate: '2025-12-20', termination: '2025-12-01' }).deadline).toBe('2026-02-18');
  });

  it('FL: no-claim refunds in 15 days, claim switches to the 30-day notice clock', () => {
    const noClaim = computeDeadline('FL', { vacate: '2026-02-01', termination: '2026-02-01', intendsClaim: false });
    expect(noClaim.deadline).toBe('2026-02-16');
    const claim = computeDeadline('FL', { vacate: '2026-02-01', termination: '2026-02-01', intendsClaim: true });
    expect(claim.deadline).toBe('2026-03-03');
    expect(claim.alt?.date).toBe('2026-03-18');
  });

  it('WI: falls back to the vacate date when no termination date is given', () => {
    expect(computeDeadline('WI', { vacate: '2026-06-01' }).deadline).toBe('2026-06-22');
    expect(computeDeadline('WI', { vacate: '2026-06-01', termination: '2026-05-20' }).deadline).toBe('2026-06-10');
  });

  it('PA: later of termination and surrender +30', () => {
    expect(computeDeadline('PA', { vacate: '2026-04-10', termination: '2026-04-30' }).deadline).toBe('2026-05-30');
  });

  // ── 二期 14 州（2026-10-20 statute 核对批次）──
  it('IL: +45 days (2024 amended value) with a separate 30-day statement deadline as alt', () => {
    const r = computeDeadline('IL', { vacate: '2026-03-15' });
    expect(r.deadline).toBe('2026-04-29');
    expect(r.alt?.label).toContain('statement');
    expect(r.alt?.date).toBe('2026-04-14');
  });

  it('MA: termination of tenancy +30', () => {
    expect(computeDeadline('MA', { vacate: '2026-06-01', termination: '2026-05-20' }).deadline).toBe('2026-06-19');
  });

  it('NJ: lease termination +30', () => {
    expect(computeDeadline('NJ', { vacate: '2026-02-10', termination: '2026-02-28' }).deadline).toBe('2026-03-30');
  });

  it('CT: 21 days under Public Act 23-207', () => {
    expect(computeDeadline('CT', { vacate: '2026-07-01' }).deadline).toBe('2026-07-22');
  });

  it('OH: later of termination and possession +30', () => {
    expect(computeDeadline('OH', { vacate: '2026-04-10', termination: '2026-04-30' }).deadline).toBe('2026-05-30');
  });

  it('IN: +45 days from the later trigger', () => {
    expect(computeDeadline('IN', { vacate: '2026-01-15', termination: '2026-01-31' }).deadline).toBe('2026-03-17');
  });

  it('SC: demand moves the trigger like AZ — latest of three events', () => {
    const r = computeDeadline('SC', { vacate: '2026-06-20', termination: '2026-06-25', demand: '2026-07-01' });
    expect(r.triggerDate).toBe('2026-07-01');
    expect(r.deadline).toBe('2026-07-31');
  });

  it('MN: +21 days from termination', () => {
    expect(computeDeadline('MN', { vacate: '2026-05-31' }).deadline).toBe('2026-06-21');
  });

  it('MD and VA: +45 days — MD from end of tenancy (termination), VA from termination date', () => {
    // MD「end of the tenancy」按租约终止日起算：termination 1-20 → +45 = 3-06
    expect(computeDeadline('MD', { vacate: '2026-02-01', termination: '2026-01-20' }).deadline).toBe('2026-03-06');
    // 无 termination 时回退 vacate：2-01 + 45 = 3-18
    expect(computeDeadline('MD', { vacate: '2026-02-01' }).deadline).toBe('2026-03-18');
    expect(computeDeadline('VA', { vacate: '2026-02-01' }).deadline).toBe('2026-03-18');
  });

  it('helper: later() and addMonthsClamped() behave on edges', () => {
    expect(later('2026-01-01')).toBe('2026-01-01');
    expect(later('2026-01-01', '2026-03-01')).toBe('2026-03-01');
    expect(addMonthsClamped('2026-03-31', 1)).toBe('2026-04-30');
    expect(addMonthsClamped('2028-01-31', 1)).toBe('2028-02-29'); // 闰年
  });
});
