// 生活方式成本计算器
// 根据用户选择的生活方式，动态调整各项生活成本

export type Lifestyle = "frugal" | "moderate" | "comfortable";
export type FamilyType = "single" | "couple" | "family1" | "family2";

export interface CityCostData {
  rent_center: number;
  rent_suburb: number;
  rent_share: number;
  utilities: number;
  lunch: number;
  restaurant: number;
  delivery: number;
  grocery: number;
  transport_monthly: number;
  movie: number;
  gym: number;
  internet: number;
  kindergarten_public: number;
  kindergarten_private: number;
  medical_outpatient: number;
  medical_checkup: number;
  avg_salary: number;
}

/** 生活方式系数 */
const LIFESTYLE_MULTIPLIERS: Record<Lifestyle, Record<string, number>> = {
  frugal: {
    rent: 0.7,        // 合租或远郊
    food: 0.6,        // 自己做饭为主
    transport: 0.8,   // 公共交通
    entertainment: 0.3,
    education: 0.5,
    medical: 0.8,
    other: 0.7,
  },
  moderate: {
    rent: 1.0,
    food: 1.0,
    transport: 1.0,
    entertainment: 1.0,
    education: 1.0,
    medical: 1.0,
    other: 1.0,
  },
  comfortable: {
    rent: 1.5,        // 市中心一居室
    food: 1.8,        // 经常下馆子、点外卖
    transport: 1.3,   // 偶尔打车
    entertainment: 2.0,
    education: 1.5,
    medical: 1.2,
    other: 1.3,
  },
};

/** 家庭类型系数 */
const FAMILY_MULTIPLIERS: Record<FamilyType, { food: number; transport: number; entertainment: number; education: number; medical: number; other: number }> = {
  single: { food: 1, transport: 1, entertainment: 1, education: 0, medical: 1, other: 1 },
  couple: { food: 1.8, transport: 1.3, entertainment: 1.6, education: 0, medical: 1.3, other: 1.5 },
  family1: { food: 2.5, transport: 1.5, entertainment: 1.3, education: 1, medical: 1.8, other: 2 },
  family2: { food: 3.2, transport: 1.6, entertainment: 1.4, education: 2, medical: 2.2, other: 2.5 },
};

export interface CostBreakdown {
  housing: number;
  food: number;
  transport: number;
  entertainment: number;
  education: number;
  medical: number;
  other: number;
  total: number;
}

export interface CalculatorResult {
  grossSalary: number;
  netSalary: number;
  monthlyCost: CostBreakdown;
  disposableIncome: number;
  disposableRatio: number;
  savingsPotential: number;  // 年储蓄潜力
  qualityScore: number;      // 生活品质指数 0-100
}

/**
 * 计算某城市某生活方式下的生活成本
 */
export function calculateLivingCost(
  cityData: CityCostData,
  lifestyle: Lifestyle,
  familyType: FamilyType
): CostBreakdown {
  const lifeMul = LIFESTYLE_MULTIPLIERS[lifestyle];
  const famMul = FAMILY_MULTIPLIERS[familyType];

  // 住房
  let housing = 0;
  if (lifestyle === "comfortable") {
    housing = cityData.rent_center + cityData.utilities;
  } else if (lifestyle === "moderate") {
    housing = cityData.rent_suburb + cityData.utilities;
  } else {
    housing = cityData.rent_share + cityData.utilities * 0.5;
  }
  housing *= lifeMul.rent;

  // 餐饮
  const food = (
    cityData.lunch * 22 +          // 工作日午餐
    cityData.delivery * 8 +         // 周末外卖/外食
    cityData.grocery * 4 +          // 每周超市
    cityData.restaurant * 2         // 每月中档餐厅
  ) * lifeMul.food * famMul.food;

  // 交通
  const transport = (
    cityData.transport_monthly +    // 公共交通月卡
    (lifestyle === "comfortable" ? 200 : lifestyle === "moderate" ? 80 : 0)  // 打车预算
  ) * lifeMul.transport * famMul.transport;

  // 娱乐
  const entertainment = (
    cityData.movie * 2 +
    cityData.gym +
    cityData.internet +
    (lifestyle === "comfortable" ? 500 : lifestyle === "moderate" ? 200 : 50)
  ) * lifeMul.entertainment * famMul.entertainment;

  // 教育
  const education = familyType.startsWith("family")
    ? (cityData.kindergarten_public * (lifestyle === "frugal" ? 1 : 0) +
       cityData.kindergarten_private * (lifestyle !== "frugal" ? 1 : 0)) *
      lifeMul.education * famMul.education
    : 0;

  // 医疗
  const medical = (
    cityData.medical_outpatient * 0.5 +
    cityData.medical_checkup / 12
  ) * lifeMul.medical * famMul.medical;

  // 其他（日用品、服装、通讯等）
  const other = (300 + cityData.internet) * lifeMul.other * famMul.other;

  return {
    housing: Math.round(housing),
    food: Math.round(food),
    transport: Math.round(transport),
    entertainment: Math.round(entertainment),
    education: Math.round(education),
    medical: Math.round(medical),
    other: Math.round(other),
    total: Math.round(housing + food + transport + entertainment + education + medical + other),
  };
}

/**
 * 计算完整结果
 */
export function calculateFullResult(
  cityData: CityCostData,
  grossSalary: number,
  netSalary: number,
  lifestyle: Lifestyle,
  familyType: FamilyType
): CalculatorResult {
  const cost = calculateLivingCost(cityData, lifestyle, familyType);
  const disposable = netSalary - cost.total;
  const ratio = netSalary > 0 ? (disposable / netSalary) * 100 : 0;
  
  // 年储蓄潜力（假设储蓄率按剩余收入的 50%）
  const savingsPotential = Math.round(Math.max(0, disposable) * 12 * 0.5);
  
  // 生活品质指数（0-100）
  // 基于：可支配收入占比 + 生活方式等级 + 城市薪资水平
  let qualityScore = 0;
  if (netSalary > 0) {
    const disposableWeight = Math.min(ratio * 1.5, 40);
    const lifestyleWeight = lifestyle === "comfortable" ? 30 : lifestyle === "moderate" ? 20 : 10;
    const salaryWeight = Math.min((netSalary / (cityData.avg_salary || 8000)) * 20, 30);
    qualityScore = Math.round(disposableWeight + lifestyleWeight + salaryWeight);
    qualityScore = Math.min(100, Math.max(0, qualityScore));
  }

  return {
    grossSalary,
    netSalary,
    monthlyCost: cost,
    disposableIncome: Math.round(disposable),
    disposableRatio: Math.round(ratio * 10) / 10,
    savingsPotential,
    qualityScore,
  };
}

/**
 * 从 Mock 数据提取城市成本结构
 */
export function extractCityCostFromMock(citySlug: string): CityCostData | null {
  const data = require("./mock-data").MOCK_CITIES[citySlug];
  if (!data) return null;

  const find = (catTitle: string, itemName: string) => {
    const cat = data.categories.find((c: any) => c.title.includes(catTitle));
    const item = cat?.items.find((i: any) => i.name.includes(itemName));
    return item?.value ?? 0;
  };

  return {
    rent_center: find("居住", "市中心"),
    rent_suburb: find("居住", "郊区"),
    rent_share: find("居住", "合租"),
    utilities: find("居住", "水电"),
    lunch: find("餐饮", "普通午餐"),
    restaurant: find("餐饮", "中档餐厅"),
    delivery: find("餐饮", "外卖"),
    grocery: find("餐饮", "超市"),
    transport_monthly: find("交通", "地铁"),
    movie: find("娱乐", "电影票"),
    gym: find("娱乐", "健身房"),
    internet: find("娱乐", "网费"),
    kindergarten_public: find("教育", "公立幼儿园"),
    kindergarten_private: find("教育", "私立幼儿园"),
    medical_outpatient: find("医疗", "门诊"),
    medical_checkup: find("医疗", "体检"),
    avg_salary: data.avg_salary ?? 8000,
  };
}
