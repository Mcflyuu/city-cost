// 中国个人所得税计算器（2026 年标准）

/**
 * 月度个税累进税率表（综合所得适用）
 * 起征点：5000元/月
 */
const MONTHLY_TAX_BRACKETS = [
  { limit: 3000, rate: 0.03, deduction: 0 },
  { limit: 12000, rate: 0.10, deduction: 210 },
  { limit: 25000, rate: 0.20, deduction: 1410 },
  { limit: 35000, rate: 0.25, deduction: 2660 },
  { limit: 55000, rate: 0.30, deduction: 4410 },
  { limit: 80000, rate: 0.35, deduction: 7160 },
  { limit: Infinity, rate: 0.45, deduction: 15160 },
];

/**
 * 五险一金缴纳比例（按城市粗略估算）
 */
const INSURANCE_RATES: Record<string, { pension: number; medical: number; unemployment: number; housing: number; maxBase: number }> = {
  // 北京：养老 8% + 医疗 2% + 失业 0.5% + 公积金 12%
  beijing: { pension: 0.08, medical: 0.02, unemployment: 0.005, housing: 0.12, maxBase: 33891 },
  // 上海：养老 8% + 医疗 2% + 失业 0.5% + 公积金 7%
  shanghai: { pension: 0.08, medical: 0.02, unemployment: 0.005, housing: 0.07, maxBase: 36549 },
  // 广州：养老 8% + 医疗 2% + 失业 0.2% + 公积金 12%
  guangzhou: { pension: 0.08, medical: 0.02, unemployment: 0.002, housing: 0.12, maxBase: 33786 },
  // 深圳：养老 8% + 医疗 2% + 失业 0.5% + 公积金 5%
  shenzhen: { pension: 0.08, medical: 0.02, unemployment: 0.005, housing: 0.05, maxBase: 41190 },
  // 杭州：养老 8% + 医疗 2% + 失业 0.5% + 公积金 12%
  hangzhou: { pension: 0.08, medical: 0.02, unemployment: 0.005, housing: 0.12, maxBase: 38390 },
  // 其他城市默认
  default: { pension: 0.08, medical: 0.02, unemployment: 0.005, housing: 0.10, maxBase: 30000 },
};

export interface TaxResult {
  grossSalary: number;      // 税前月薪
  insurance: number;        // 五险一金个人缴纳
  taxableIncome: number;    // 应纳税所得额
  tax: number;              // 个税
  netSalary: number;        // 税后到手
  netSalaryAnnual: number;  // 税后年薪
}

export interface Deductions {
  rentDeduction: number;       // 住房租金专项扣除（元/月）
  childDeduction: number;      // 子女教育（元/月/孩）
  elderlyDeduction: number;    // 赡养老人（元/月）
  eduDeduction: number;        // 继续教育（元/月）
}

/**
 * 计算月度个税
 * @param grossSalary 税前月薪
 * @param citySlug 城市 slug
 * @param deductions 专项附加扣除
 */
export function calculateMonthlyTax(
  grossSalary: number,
  citySlug: string,
  deductions: Deductions = { rentDeduction: 0, childDeduction: 0, elderlyDeduction: 0, eduDeduction: 0 }
): TaxResult {
  const rate = INSURANCE_RATES[citySlug] || INSURANCE_RATES.default;
  
  // 五险一金缴费基数（不超过上限，不低于下限 60%）
  const base = Math.min(grossSalary, rate.maxBase);
  
  // 五险一金个人缴纳部分
  const insurance = base * (rate.pension + rate.medical + rate.unemployment + rate.housing);
  
  // 专项附加扣除合计
  const totalDeductions = 
    deductions.rentDeduction + 
    deductions.childDeduction + 
    deductions.elderlyDeduction + 
    deductions.eduDeduction;
  
  // 应纳税所得额 = 税前工资 - 起征点(5000) - 五险一金 - 专项扣除
  const taxableIncome = Math.max(0, grossSalary - 5000 - insurance - totalDeductions);
  
  // 按累进税率计算个税
  let tax = 0;
  let remaining = taxableIncome;
  let prevLimit = 0;
  
  for (const bracket of MONTHLY_TAX_BRACKETS) {
    const bracketSize = bracket.limit - prevLimit;
    if (remaining <= 0) break;
    const taxableInBracket = Math.min(remaining, bracketSize);
    tax += taxableInBracket * bracket.rate;
    remaining -= taxableInBracket;
    prevLimit = bracket.limit;
  }
  
  // 更精确的速算扣除数方式
  if (taxableIncome > 0) {
    const bracket = MONTHLY_TAX_BRACKETS.find(b => taxableIncome <= b.limit) || MONTHLY_TAX_BRACKETS[MONTHLY_TAX_BRACKETS.length - 1];
    tax = taxableIncome * bracket.rate - bracket.deduction;
    tax = Math.max(0, tax);
  }
  
  const netSalary = grossSalary - insurance - tax;
  
  return {
    grossSalary,
    insurance: Math.round(insurance),
    taxableIncome: Math.round(taxableIncome),
    tax: Math.round(tax),
    netSalary: Math.round(netSalary),
    netSalaryAnnual: Math.round(netSalary * 12),
  };
}

/**
 * 快速估算：不填专项扣除的简化版
 */
export function quickTaxEstimate(grossSalary: number, citySlug: string): TaxResult {
  return calculateMonthlyTax(grossSalary, citySlug);
}

/**
 * 获取住房租金专项扣除标准（按城市规模）
 */
export function getRentDeduction(citySlug: string): number {
  // 一线城市 1500/月，其他城市 1100/月
  const tier1 = ['beijing', 'shanghai', 'guangzhou', 'shenzhen'];
  return tier1.includes(citySlug) ? 1500 : 1100;
}
