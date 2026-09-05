// 计算适配器注册表 — 客户端运行时与服务端首屏渲染共用（唯一计算来源，防漂移）
import { calcBreakEven, calcFoodCostPct, calcLaborCost, calcMarkupMargin, calcMenuPrice, calcPrimeCost, calcProfitMargin } from './price';
import { calcMenuMatrix, calcScaler, calcTipOut } from './split';
import { num, type Compute } from '../lib/types';

export const COMPUTES: Record<string, Compute> = {
  'menu-pricing-calculator': (values, rows, params) =>
    calcMenuPrice(values, rows.reduce((s, r) => s + num(r.cost as string), 0), params),
  'food-cost-percentage-calculator': (values, _rows, params) => calcFoodCostPct(values, params),
  'menu-engineering-matrix': (_values, rows, params) => calcMenuMatrix(rows, params),
  'tip-out-calculator': (values, rows, params) => calcTipOut(values, rows, params),
  'break-even-calculator': (values, _rows, params) => calcBreakEven(values, params),
  'labor-cost-calculator': (values, _rows, params) => calcLaborCost(values, params),
  'markup-vs-margin-calculator': (values, _rows, params) => calcMarkupMargin(values, params),
  'recipe-scaler': (values, rows, params) => calcScaler(values, rows, params),
  'prime-cost-calculator': (values, _rows, params) => calcPrimeCost(values, params),
  'profit-margin-calculator': (values, _rows, params) => calcProfitMargin(values, params),
};
