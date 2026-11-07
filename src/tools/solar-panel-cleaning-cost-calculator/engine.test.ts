import { describe, expect, it } from 'vitest';
import solar from './index';

const p = solar.params;

// 带的出处见 docs/benchmarks-solar-panel-cleaning.md；断言值=每块清洗价×面板数、$150 上门钳位、
// access=hard 整单钳位进 $500–1,000（SolarCleanHub）三条规则逐点核算。
describe('solar-panel-cleaning-cost-calculator', () => {
  it('default state (medium/typical/easy) prices $160–500 per visit', () => {
    const r = solar.compute({ systemSize: 'medium', condition: 'typical', access: 'easy' }, [], p);
    expect(r.primary.value).toBe('$160.00 – $500.00 per visit');
  });

  it('small light array rides the $150 visit minimum', () => {
    const r = solar.compute({ systemSize: 'small', condition: 'light', access: 'easy' }, [], p);
    expect(r.primary.value).toBe('$150.00 – $225.00 per visit');
  });

  it('large heavy array reaches the top of the per-panel band', () => {
    const r = solar.compute({ systemSize: 'large', condition: 'heavy', access: 'easy' }, [], p);
    expect(r.primary.value).toBe('$390.00 – $800.00 per visit');
  });

  it('hard access clamps the job into the $500–1,000 SolarCleanHub band', () => {
    const r = solar.compute({ systemSize: 'medium', condition: 'typical', access: 'hard' }, [], p);
    expect(r.primary.value).toBe('$500.00 – $1,000.00 per visit');
    const easy = r.secondary?.find((s) => s.label === 'Same array, easy access');
    expect(easy?.value).toBe('$160.00 – $500.00 per visit');
  });

  it('small hard array still lands in the hard-access band', () => {
    const r = solar.compute({ systemSize: 'small', condition: 'light', access: 'hard' }, [], p);
    expect(r.primary.value).toBe('$500.00 – $1,000.00 per visit');
  });

  it('per-panel secondary stays inside the sourced HomeGuide band', () => {
    const r = solar.compute({ systemSize: 'medium', condition: 'typical', access: 'easy' }, [], p);
    const pp = r.secondary?.find((s) => s.label === 'Per panel, installed clean');
    expect(pp?.value).toBe('$10.00 – $20.00 (HomeGuide ∩ SolarReviews)');
  });

  it('unknown field values fall back to the typical/medium defaults', () => {
    const r = solar.compute({ systemSize: 'xl', condition: 'muddy', access: 'helicopter' }, [], p);
    expect(r.primary.value).toBe('$160.00 – $500.00 per visit');
  });

  it('meta discipline: description ≤160 chars with both anchors inside the first 80', () => {
    expect(solar.description.length).toBeLessThanOrEqual(160);
    const anchorEnd = solar.description.indexOf('$150–500') + '$150–500'.length;
    expect(anchorEnd).toBeLessThanOrEqual(80);
    expect(solar.description.indexOf('$10–20')).toBeLessThan(solar.description.indexOf('$150–500'));
  });
});
