import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase 环境变量未配置，部分功能将使用静态数据。");
}

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// ===================== 类型定义 =====================

export interface City {
  id: number;
  slug: string;
  name: string;
  province: string;
  population: string | null;
  avg_salary: number | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string | null;
  color: string | null;
}

export interface DataItem {
  id: number;
  category_id: number;
  name: string;
  unit: string;
  sort_order: number;
}

export interface DataPoint {
  id: number;
  city_id: number;
  data_item_id: number;
  value: number;
  confidence: "high" | "medium" | "low";
  source: string | null;
  source_type: string;
  verified: boolean;
  submitted_by: string | null;
  created_at: string;
  updated_at: string;
  data_items?: DataItem;
}

export interface CityDetail {
  city: City;
  categories: (Category & { items: (DataPoint & { data_items: DataItem })[] })[];
}

// ===================== API 函数 =====================

/** 获取所有城市列表 */
export async function getCities(): Promise<City[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .order("name", { ascending: true });
  if (error) {
    console.error("获取城市列表失败：", error.message);
    return [];
  }
  return data ?? [];
}

/** 按 slug 获取单个城市 */
export async function getCityBySlug(slug: string): Promise<City | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    console.error("获取城市失败：", error.message);
    return null;
  }
  return data;
}

/** 获取某城市完整生活成本数据 */
export async function getCityDetail(slug: string): Promise<CityDetail | null> {
  if (!supabase) return null;

  const city = await getCityBySlug(slug);
  if (!city) return null;

  // 获取所有分类
  const { data: categories, error: catError } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true });
  if (catError) {
    console.error("获取分类失败：", catError.message);
    return null;
  }

  // 获取该城市所有数据项
  const { data: dataPoints, error: dpError } = await supabase
    .from("data_points")
    .select("*, data_items(*)")
    .eq("city_id", city.id)
    .eq("verified", true);
  if (dpError) {
    console.error("获取数据失败：", dpError.message);
    return null;
  }

  // 按分类组装
  const result = (categories ?? []).map((cat) => ({
    ...cat,
    items: (dataPoints ?? []).filter((dp: any) => dp.data_items?.category_id === cat.id),
  }));

  return { city, categories: result };
}

/** 获取多城市对比数据 */
export async function getCitiesCompare(slugs: string[]): Promise<CityDetail[]> {
  const results: CityDetail[] = [];
  for (const slug of slugs) {
    const detail = await getCityDetail(slug);
    if (detail) results.push(detail);
  }
  return results;
}

/** 提交用户贡献数据 */
export async function submitContribution(data: {
  city_id: number;
  data_item_id: number;
  value: number;
  submitted_by?: string;
  contact?: string;
}) {
  if (!supabase) return { error: "Supabase 未配置" };
  const { error } = await supabase.from("contributions").insert([data]);
  return { error };
}
