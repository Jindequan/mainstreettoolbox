// E1 报价引擎族 — cleaning / lawn / contractor rate 等行业化估价工具
import { clamp, money, num, type EngineResult } from '../lib/types';
import { makeGauge } from './price';

/** Cleaning Estimate — 房间数×类型×频率 → 价格区间 + 工时 */
export function calcCleaningEstimate(values: Record<string, string>, params: any): EngineResult {
  const beds = clamp(num(values.bedrooms), 0, 10);
  const baths = clamp(num(values.bathrooms), 0, 6);
  const typeMult: Record<string, number> = { standard: 1, deep: 1.5, moveout: 1.4 };
  const freqMult: Record<string, number> = { onetime: 1, weekly: 0.82, biweekly: 0.9 };
  const base = params.rates.base + beds * params.rates.bed + baths * params.rates.bath;
  const est = base * (typeMult[values.type] ?? 1) * (values.type === 'moveout' ? 1 : (freqMult[values.freq] ?? 1));
  const hours = (1.5 + beds * 0.6 + baths * 0.75) * (values.type === 'standard' ? 1 : 1.4);
  const low = est * 0.9, high = est * 1.15;
  const copy = params.copy as Record<string, string>;
  const freqLabel: Record<string, string> = { onetime: 'one-time', weekly: 'weekly', biweekly: 'biweekly' };
  return {
    primary: { label: params.primaryLabel as string, value: `${money(low)} – ${money(high)}` },
    secondary: [
      { label: 'Estimated time', value: `${hours.toFixed(1)} hrs for a team of one` },
      { label: 'Per hour', value: money(est / hours) },
    ],
    gauge: makeGauge(clamp(est, 60, 350), 60, 350, params.healthyBand as [number, number]),
    verdict: { level: 'info', text: copy.info.replace('{type}', values.type ?? 'standard').replace('{f}', freqLabel[values.freq ?? 'onetime'] ?? 'one-time') },
  };
}

/** Lawn Mowing Price — 面积×地形×频率 → 单次/月度 */
export function calcMowingPrice(values: Record<string, string>, params: any): EngineResult {
  const sqft = clamp(num(values.lotSize), 500, 100000);
  const terrainMult: Record<string, number> = { flat: 1, slope: 1.15, steep: 1.3 };
  let visit = sqft * params.ratePerSqft * (terrainMult[values.terrain] ?? 1);
  const freq = values.frequency ?? 'weekly';
  if (freq === 'biweekly') visit *= 1.15;
  if (freq === 'onetime') visit *= 1.3;
  const visitsPerMonth = freq === 'weekly' ? 4.33 : freq === 'biweekly' ? 2.17 : 1;
  const perVisit = Math.round(visit);
  const monthly = perVisit * visitsPerMonth;
  const b = params.benchmarks as { healthy: [number, number]; warnUpTo: number };
  const copy = params.copy as Record<string, string>;
  let level: 'ok' | 'warn' | 'bad' = 'ok';
  let text = copy.ok.replace('{v}', money(perVisit));
  if (perVisit < b.healthy[0]) { level = 'warn'; text = copy.warnLow.replace('{v}', money(perVisit)); }
  else if (perVisit > b.warnUpTo) { level = 'warn'; text = copy.warnHigh.replace('{v}', money(perVisit)); }
  return {
    primary: { label: params.primaryLabel as string, value: money(perVisit) },
    secondary: [
      { label: 'Per month', value: money(monthly) + (freq !== 'onetime' ? ` (${freq})` : '') },
      { label: 'Per season (8 months)', value: money(monthly * 8) },
      { label: 'Rate', value: `$${(perVisit / sqft).toFixed(3)} / sq ft` },
    ],
    gauge: makeGauge(clamp(perVisit, 20, 120), 20, 120, b.healthy),
    verdict: { level, text },
  };
}

/** Contractor Hourly Rate — 目标收入反推报价时薪 */
export function calcContractorRate(values: Record<string, string>, params: any): EngineResult {
  const target = num(values.targetIncome);
  const billable = clamp(num(values.billableHours), 5, 60);
  const overhead = num(values.overhead);
  const taxPct = clamp(num(values.taxPct), 5, 45) / 100;
  const annualOverhead = overhead * 12;
  const grossNeeded = target / (1 - taxPct) + annualOverhead;
  const rate = grossNeeded / (billable * 52);
  const copy = params.copy as Record<string, string>;
  const b = params.benchmarks as { healthy: [number, number]; warnUpTo: number };
  let level: 'ok' | 'warn' | 'bad' = 'ok';
  let text = copy.ok.replace('{v}', money(rate));
  if (rate > b.warnUpTo) { level = 'warn'; text = copy.warnHigh.replace('{v}', money(rate)); }
  else if (rate < b.healthy[0]) { level = 'warn'; text = copy.warnLow.replace('{v}', money(rate)); }
  return {
    primary: { label: params.primaryLabel as string, value: money(rate) },
    secondary: [
      { label: 'Billable hours / week', value: `${billable} h` },
      { label: 'Gross to clear target', value: money(grossNeeded) + '/yr' },
      { label: 'Overhead adds', value: money(annualOverhead / (billable * 52)) + ' to every billable hour' },
    ],
    gauge: makeGauge(clamp(rate, 15, 150), 15, 150, b.healthy),
    verdict: { level, text },
  };
}
