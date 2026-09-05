import type { RegisteredTool } from '../lib/types';

import menuPricing from './menu-pricing-calculator';
import foodCost from './food-cost-percentage-calculator';
import menuMatrix from './menu-engineering-matrix';
import tipOut from './tip-out-calculator';
import breakEven from './break-even-calculator';
import laborCost from './labor-cost-calculator';
import markupMargin from './markup-vs-margin-calculator';
import recipeScaler from './recipe-scaler';
import primeCost from './prime-cost-calculator';
import profitMargin from './profit-margin-calculator';
import cleaningEstimate from './cleaning-estimate-calculator';
import lawnMowing from './lawn-mowing-price-calculator';
import contractorRate from './contractor-hourly-rate-calculator';
import boothCommission from './booth-rent-commission-calculator';
import retailMarkup from './retail-markup-calculator';
import cleaningChecklist from './cleaning-checklist-builder';
import cleaningInvoice from './cleaning-invoice-generator';
import lawnEstimate from './lawn-care-estimate-generator';
import mulchCalc from './mulch-calculator';
import workOrder from './work-order-generator';
import materialCost from './material-cost-estimator';
import priceList from './service-price-list-builder';
import receiptGen from './receipt-generator';
import inventorySheet from './inventory-count-sheet';
import discountProfit from './discount-profit-calculator';

export const TOOLS: RegisteredTool[] = [
  menuPricing,
  foodCost,
  menuMatrix,
  tipOut,
  breakEven,
  laborCost,
  markupMargin,
  recipeScaler,
  primeCost,
  profitMargin,
  cleaningEstimate,
  lawnMowing,
  contractorRate,
  boothCommission,
  retailMarkup,
  cleaningChecklist,
  cleaningInvoice,
  lawnEstimate,
  mulchCalc,
  workOrder,
  materialCost,
  priceList,
  receiptGen,
  inventorySheet,
  discountProfit,
];

export const bySlug = (slug: string): RegisteredTool | undefined => TOOLS.find((t) => t.slug === slug);

/** 手作页面接管的路由（不产生动态模板页，见 pages/restaurant/*.astro） */
export const BESPOKE_SLUGS: ReadonlySet<string> = new Set([
  'tip-out-calculator',
  'food-cost-percentage-calculator',
  'menu-engineering-matrix',
]);

export const byIndustry = (industry: string): RegisteredTool[] => TOOLS.filter((t) => t.industry === industry);

export const INDUSTRY_META: Record<string, { name: string; path: string; live: boolean; blurb: string }> = {
  restaurant: { name: 'Restaurant', path: '/restaurant', live: true, blurb: 'Pricing, tips, costs and margins' },
  cleaning: { name: 'Cleaning', path: '/cleaning', live: true, blurb: 'Quotes & estimates' },
  lawn: { name: 'Lawn Care', path: '/lawn', live: true, blurb: 'Pricing by lot size' },
  construction: { name: 'Construction', path: '/construction', live: true, blurb: 'Rates & bids' },
  salon: { name: 'Salon & Barber', path: '/salon', live: true, blurb: 'Rent vs commission' },
  retail: { name: 'Retail', path: '/retail', live: true, blurb: 'Margin & markdowns' },
};

/** 服务端首屏渲染：从 fields/rows 默认值构建初始输入 */
export function defaultValues(tool: RegisteredTool): Record<string, string> {
  const v: Record<string, string> = {};
  for (const f of tool.fields) v[f.id] = f.default !== undefined ? String(f.default) : '';
  return v;
}
