import { describe, it, expect } from 'vitest';
import { calcMenuPrice, calcFoodCostPct, calcMarkupMargin, calcBreakEven, roundPrice, gaugeVerdict } from './price';
import { calcTipOut, calcMenuMatrix, calcScaler } from './split';
import { calcCleaningEstimate, calcContractorRate } from './quote';
import { calcLineDoc, calcDiscountVolume } from './doc';

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
    // cost = 4.40 + 0.50 = 4.90 → raw 16.33 → 16.95 → fc = 4.90/16.95 = 28.9% (ok)
    const r = calcMenuPrice({ shared: '0.50', targetPct: '30', rounding: '95' }, 4.4, priceParams);
    expect(r.primary.value).toBe('$16.95');
    expect(r.verdict.level).toBe('ok');
  });
  it('flags danger when the resulting food cost exceeds the warn ceiling', () => {
    // target 60% → raw 15.00 (no rounding) → fc = 9/15 = 60% > 40 → bad
    const r = calcMenuPrice({ shared: '0', targetPct: '60', rounding: 'none' }, 9.0, priceParams);
    expect(r.primary.value).toBe('$15.00');
    expect(r.verdict.level).toBe('bad');
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
  it('markup mode accepts rates above 95% (retail keystone & beyond)', () => {
    const r = calcMarkupMargin({ cost: '10', mode: 'markup', rate: '200' }, { primaryLabel: 'Price', copy: { info: '{m} markup = {g} margin' } });
    expect(r.primary.value).toBe('$30.00'); // 200% markup on $10 —— 不得被 clamp 成 1.95×
    expect(r.verdict.text).toContain('200.0%');
    expect(r.verdict.text).toContain('66.7%');
  });
  it('margin mode still clamps below 100%', () => {
    const r = calcMarkupMargin({ cost: '10', mode: 'margin', rate: '99' }, { primaryLabel: 'Price', copy: { info: '{m} markup = {g} margin' } });
    expect(r.primary.value).toBe('$200.00'); // margin 95% → cost/(1-0.95)
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

describe('calcMenuMatrix (Kasavana–Smith: 销量加权 CM + 70% 人气阈值)', () => {
  const params = {
    primaryLabel: 'Stars',
    copy: { ok: '{s} stars — good menu', warn: '{p} plowhorses drag margins', bad: 'all low performers', needMore: 'add dishes' },
  };
  it('classifies quadrants by weighted CM and 70% threshold', () => {
    // totalSold=265, weightedCM=(11*100+10*60+8*85+5*20)/265≈9.36, thr=25%*0.7=17.5%
    // Burger m11/37.7% → Star; Salad m10/22.6% → Star; Pasta m8/32.1% → Plowhorse; Tofu m5/7.5% → Dog
    const rows = [
      { dish: 'Burger', price: '16', cost: '5', sold: '100' },
      { dish: 'Salad', price: '14', cost: '4', sold: '60' },
      { dish: 'Pasta', price: '16', cost: '8', sold: '85' },
      { dish: 'Tofu', price: '15', cost: '10', sold: '20' },
    ];
    const r = calcMenuMatrix(rows, params);
    expect(r.primary.value).toBe('2 / 4');
    expect(r.secondary?.map((s) => s.value)).toEqual(['2', '1', '0', '1']);
    expect(r.verdict.level).toBe('ok');
  });
  it('warns when plowhorses dominate', () => {
    // weightedCM=(2*100+2*90+10*10)/200=2.4, thr=23.3% → A/B Plowhorse, C Puzzle
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

describe('calcCleaningEstimate', () => {
  const params = {
    primaryLabel: 'Suggested quote',
    rates: { base: 50, bed: 20, bath: 30 },
    healthyBand: [90, 338] as [number, number],
    copy: { info: 'info' },
  };
  it('prices a standard one-time 3bd/2ba clean', () => {
    // base 50 + 3*20 + 2*30 = 170 → ±band → 153 – 195.50
    const r = calcCleaningEstimate({ type: 'standard', bedrooms: '3', bathrooms: '2', freq: 'onetime' }, params);
    expect(r.primary.value).toBe('$153.00 – $195.50');
  });
  it('applies the frequency discount for weekly clients', () => {
    const onetime = calcCleaningEstimate({ type: 'standard', bedrooms: '3', bathrooms: '2', freq: 'onetime' }, params);
    const weekly = calcCleaningEstimate({ type: 'standard', bedrooms: '3', bathrooms: '2', freq: 'weekly' }, params);
    const mid = (s: string) => parseFloat(s.replace(/[^0-9.]/g, ''));
    expect(mid(weekly.primary.value)).toBeLessThan(mid(onetime.primary.value)); // 0.82 倍
  });
});

describe('calcContractorRate', () => {
  it('back-solves the billable rate from target income', () => {
    const params = {
      primaryLabel: 'Billable rate',
      benchmarks: { healthy: [35, 90], warnUpTo: 150 },
      copy: { ok: 'ok', warnLow: 'low', warnHigh: 'high' },
    };
    // gross = 60000/0.75 + 500*12 = 86000 → /(30*52) = 55.13
    const r = calcContractorRate({ targetIncome: '60000', billableHours: '30', overhead: '500', taxPct: '25' }, params);
    expect(r.primary.value).toBe('$55.13');
  });
});

describe('calcLineDoc', () => {
  const params = {
    primaryLabel: 'Invoice total',
    rowKeys: { name: 'service', amount: 'amount' },
    copy: { docTitle: 'Invoice', info: 'i', footnote: 'f' },
  };
  it('totals all line amounts and skips unnamed rows in the doc body', () => {
    const rows = [
      { service: 'Deep clean', amount: '185' },
      { service: 'Oven', amount: '40' },
      { service: '', amount: '7' },
    ];
    const r = calcLineDoc({ client: 'ACME' }, rows, params);
    expect(r.primary.value).toBe('$232.00');
    expect(r.doc?.rows).toHaveLength(2);
    expect(r.doc?.total?.value).toBe('$232.00');
    expect(r.doc?.fields?.[0]).toEqual({ label: 'Prepared for', value: 'ACME' });
  });
});

describe('calcDiscountVolume', () => {
  const params = { primaryLabel: 'More sales needed', copy: { text: '{l} for {d}', info: 'enter numbers' } };
  it('computes the required volume lift', () => {
    // 40% margin, 15% off → 15/(40-15) = 60% more units
    const r = calcDiscountVolume({ margin: '40', discount: '15' }, params);
    expect(r.primary.value).toBe('+60%');
  });
  it('returns infinite lift when discount eats the whole margin', () => {
    const r = calcDiscountVolume({ margin: '20', discount: '20' }, params);
    expect(r.primary.value).toBe('—');
  });
});
