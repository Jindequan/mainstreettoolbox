import { describe, expect, it } from 'vitest';
import securityDeposit from './security-deposit-refund-calculator';
import pourCost from './pour-cost-calculator';
import windshield from './windshield-replacement-cost-calculator';
import { num } from '../lib/types';

describe('tool registry contracts', () => {
  it('turns deposit statutory rules into the same renderable result contract as other tools', () => {
    const select = securityDeposit.fields.find((field) => field.id === 'state');
    expect(select?.options?.length).toBeGreaterThan(20);
    expect(select?.options?.every((option) => option.value.length === 2 && !!option.label)).toBe(true);

    const ny = securityDeposit.compute({ state: 'NY', vacate: '2026-07-01' });
    expect(ny.primary.value).toBe('2026-07-15');
    expect(ny.verdict.level).toBe('info');
    expect(ny.secondary?.some((row) => row.label === 'Relevant statute')).toBe(true);
  });

  it('preserves string-valued form fields for pour cost calculations', () => {
    const r = pourCost.compute({ category: 'spirits', drinkCost: '2.15', menuPrice: '12' }, [], pourCost.params);
    expect(r.primary.value).toBe('17.9%');
    expect(r.verdict.level).toBe('ok');
    expect(num({ malicious: 1 })).toBe(0);
  });

  it('keeps the automotive pricing tool in its actual industry rather than masquerading as a generic calculator', () => {
    expect(windshield.industry).toBe('auto');
    expect(windshield.slug).toBe('windshield-replacement-cost-calculator');
  });
});
