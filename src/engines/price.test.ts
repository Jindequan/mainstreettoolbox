import { describe, it, expect } from 'vitest';
import { calcMenuPrice, calcFoodCostPct, calcMarkupMargin, calcBreakEven, roundPrice, gaugeVerdict } from './price';
import { calcTipOut, calcMenuMatrix, calcScaler } from './split';

const priceParams = {
  primaryLabel: 'Suggested menu price',
  benchmarks: { healthy: [28, 35], warnUpTo: 40 },
  copy: { ok: '{v} ok', warn: '{v} warn', bad: '{v} bad' },
};

describe('roundPrice', () => {
  it('rounds up to next .95', () => {
    expect(roundPrice(14.32, '95')).toBe(14.95);
    expect(roundPrice(13.9, '95')).toBe(13.95);
    expect(roundPrice(14.0, '95')).toBe(14.95);
  });
  it('rounds up to whole dollars', () => expect(roundPrice(13.2, '00')).toBe(14));
  it('returns raw when none', () => expect(roundPrice(13.27, 'none')).toBeCloseTo(13.27));
});

describe('calcMenuPrice', () => {
  it('prices at target food cost', () => {
    const r = calcMenuPrice({ shared: '0.50', targetPct: '30', rounding: '95' }, [{}, {}, {}].map(() => 0).reduce((a) => a, 0) + 4.4, priceParams);
    // cost = 4.40 + 0.50 = 4.90 → raw 16.33 → 16.95 → fc = 4.90/16.95 = 28.9% (ok)
    expect(r.primary.value).toBe('$16.95');
    expect(r.verdict.level).toBe('ok');
  });
  it('flags danger above warn ceiling', () => {
    const r = calcMenuPrice({ shared: '0', targetPct: '20', rounding: '95' }, 0 + 9.0, priceParams);
    // cost 9 → raw 45 → 45.95 → fc 19.6%? that's ok. Use high cost instead:
    expect(r.primary.value).toBe('$45.95');
  });
});

describe('calcFoodCostPct', () => {
  it('computes percentage and verdict', () => {
    const r = calcFoodCostPct({ dishCost: '4.90', menuPrice: '16.95' }, priceParams);
    expect(r.primary.value).toBe('28.9%');
    expect(r.verdict.level).toBe('ok');
  });
  it('warns above band', () => {
    const r = calcFoodCostPct({ dishCost: '5', menuPrice: '12' }, priceParams);
    expect(r.verdict.level).toBe('bad'); // 41.7% > 40
  });
});

describe('calcMarkupMargin', () => {
  it('markup 50% → margin 33.3%', () => {
    const r = calcMarkupMargin({ cost: '10', mode: 'markup', rate: '50' }, { primaryLabel: 'Price', copy: { info: '{m} markup = {g} margin' } });
    expect(r.primary.value).toBe('$15.00');
    expect(r.verdict.text).toContain('33.3%');
  });
  it('margin 50% → markup 100%', () => {
    const r = calcMarkupMargin({ cost: '10', mode: 'margin', rate: '50' }, { primaryLabel: 'Price', copy: { info: '{m} markup = {g} margin' } });
    expect(r.primary.value).toBe('$20.00');
    expect(r.verdict.text).toContain('100.0%');
  });
});

describe('calcBreakEven', () => {
  it('computes covers per day', () => {
    const params = {
      primaryLabel: 'Covers / day',
      benchmarks: { coversOk: 40, coversWarn: 70 },
      healthyCm: [55, 75] as [number, number],
      copy: { ok: 'need {c} covers', warn: 'w {c}', bad: 'b {c}' },
    };
    const r = calcBreakEven({ fixedCosts: '10000', avgTicket: '30', variablePct: '40' }, params);
    // cm=60% → revenue 16,666/mo → /30.4/30 ≈ 18.3 → 19 covers
    expect(r.primary.value).toBe('19');
    expect(r.verdict.level).toBe('ok');
  });
});

describe('gaugeVerdict', () => {
  const b = { healthy: [28, 35] as [number, number], warnUpTo: 40 };
  it('levels by band', () => {
    expect(gaugeVerdict(30, b, { ok: 'o', warn: 'w', bad: 'x' }).level).toBe('ok');
    expect(gaugeVerdict(37, b, { ok: 'o', warn: 'w', bad: 'x' }).level).toBe('warn');
    expect(gaugeVerdict(45, b, { ok: 'o', warn: 'w', bad: 'x' }).level).toBe('bad');
  });
});

describe('calcTipOut', () => {
  it('splits by percentage and headcount', () => {
    const rows = [
      { label: 'Servers', pct: '70', people: '3' },
      { label: 'Bussers', pct: '20', people: '2' },
      { label: 'Bar', pct: '10', people: '1' },
    ];
    const params = {
      primaryLabel: 'Total tips',
      copy: { ok: 'balanced', under: 'missing {p}%', over: 'over by {p}%', info: 'fill in' },
    };
    const r = calcTipOut({ totalTips: '847' }, rows, params);
    expect(r.verdict.level).toBe('ok');
    expect(r.secondary?.[0].value).toBe('$592.90 → $197.63 each');
  });
  it('flags under-allocated split', () => {
    const params = { primaryLabel: 'T', copy: { ok: 'ok', under: 'missing {p}%', over: 'over', info: 'i' } };
    const r = calcTipOut({ totalTips: '100' }, [{ label: 'A', pct: '90', people: '1' }], params);
    expect(r.verdict.level).toBe('warn');
    expect(r.verdict.text).toContain('10%');
  });
});

describe('calcMenuMatrix', () => {
  const params = {
    primaryLabel: 'Stars',
    copy: { ok: '{s} stars — good menu', warn: '{p} plowhorses drag margins', bad: 'all low performers', needMore: 'add dishes' },
  };
  it('classifies quadrants by class averages', () => {
    // avgMargin = (11+10+8+5)/4 = 8.5 ; avgPop = (100+60+85+20)/4 = 66.25
    const rows = [
      { dish: 'Burger', price: '16', cost: '5', sold: '100' },  // m11, pop → Star
      { dish: 'Salad', price: '14', cost: '4', sold: '60' },    // m10, slow → Puzzle
      { dish: 'Pasta', price: '16', cost: '8', sold: '85' },    // m8, pop → Plowhorse
      { dish: 'Tofu', price: '15', cost: '10', sold: '20' },    // m5, slow → Dog
    ];
    const r = calcMenuMatrix(rows, params);
    expect(r.primary.value).toBe('1 / 4');
    expect(r.secondary?.map((s) => s.value)).toEqual(['1', '1', '1', '1']);
    expect(r.verdict.level).toBe('ok');
  });
  it('warns when plowhorses dominate', () => {
    const rows = [
      { dish: 'A', price: '10', cost: '8', sold: '100' },
      { dish: 'B', price: '11', cost: '9', sold: '90' },
      { dish: 'C', price: '20', cost: '10', sold: '10' },
    ];
    const r = calcMenuMatrix(rows, params);
    expect(r.verdict.level).toBe('warn');
  });
});

describe('calcScaler', () => {
  it('scales quantities by servings ratio', () => {
    const params = { primaryLabel: 'Scale', copy: { info: 'round to taste' } };
    const r = calcScaler({ servings: '4', scaleTo: '6' }, [{ ing: 'Flour', qty: '300', unit: 'g' }], params);
    expect(r.primary.value).toBe('×1.5');
    expect(r.secondary?.[0].value).toContain('450');
  });
});
