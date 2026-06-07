import { getCities } from "@/lib/supabase";

// 静态降级数据 - 当 Supabase 未配置时使用
const FALLBACK_CITIES = [
  { id: 1,  slug: "beijing",   name: "北京", province: "北京", population: "2180万", avg_salary: 12000, created_at: "", updated_at: "" },
  { id: 2,  slug: "shanghai",  name: "上海", province: "上海", population: "2480万", avg_salary: 11500, created_at: "", updated_at: "" },
  { id: 3,  slug: "guangzhou", name: "广州", province: "广东", population: "1880万", avg_salary: 9500,  created_at: "", updated_at: "" },
  { id: 4,  slug: "shenzhen",  name: "深圳", province: "广东", population: "1760万", avg_salary: 11000, created_at: "", updated_at: "" },
  { id: 5,  slug: "hangzhou",  name: "杭州", province: "浙江", population: "1220万", avg_salary: 10500, created_at: "", updated_at: "" },
  { id: 6,  slug: "chengdu",   name: "成都", province: "四川", population: "2120万", avg_salary: 8200,  created_at: "", updated_at: "" },
  { id: 7,  slug: "wuhan",     name: "武汉", province: "湖北", population: "1360万", avg_salary: 8500,  created_at: "", updated_at: "" },
  { id: 8,  slug: "nanjing",   name: "南京", province: "江苏", population: "950万",  avg_salary: 9800,  created_at: "", updated_at: "" },
  { id: 9,  slug: "xian",      name: "西安", province: "陕西", population: "1300万", avg_salary: 7800,  created_at: "", updated_at: "" },
  { id: 10, slug: "chongqing", name: "重庆", province: "重庆", population: "3210万", avg_salary: 7500,  created_at: "", updated_at: "" },
  { id: 11, slug: "suzhou",    name: "苏州", province: "江苏", population: "1270万", avg_salary: 9200,  created_at: "", updated_at: "" },
  { id: 12, slug: "tianjin",   name: "天津", province: "天津", population: "1380万", avg_salary: 8800,  created_at: "", updated_at: "" },
  { id: 13, slug: "changsha",  name: "长沙", province: "湖南", population: "1040万", avg_salary: 8000,  created_at: "", updated_at: "" },
  { id: 14, slug: "zhengzhou", name: "郑州", province: "河南", population: "1260万", avg_salary: 7200,  created_at: "", updated_at: "" },
  { id: 15, slug: "qingdao",   name: "青岛", province: "山东", population: "1020万", avg_salary: 7800,  created_at: "", updated_at: "" },
];

export default async function CitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ province?: string; q?: string }>;
}) {
  const { province, q: rawQ } = await searchParams;
  const q = rawQ?.toLowerCase();

  // 从 Supabase 读取，失败则用静态降级数据
  let cities = await getCities();
  if (!cities || cities.length === 0) {
    cities = FALLBACK_CITIES;
  }

  const provinces = [...new Set(cities.map((c) => c.province))].sort();

  const filtered = cities.filter((c) => {
    if (province && c.province !== province) return false;
    if (q && !c.name.includes(q) && !c.province.includes(q)) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">城市列表</h1>
        <span className="text-sm text-gray-500">已收录 {cities.length} 座城市</span>
      </div>

      {/* 搜索 & 筛选 */}
      <form className="flex flex-wrap gap-3 mb-6" method="get">
        <input
          name="q"
          type="text"
          placeholder="搜索城市名..."
          defaultValue={q}
          className="border rounded-lg px-4 py-2 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          name="province"
          defaultValue={province ?? ""}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">全部省份</option>
          {provinces.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
          筛选
        </button>
        {(province || q) && (
          <a href="/cities" className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">
            清除筛选
          </a>
        )}
      </form>

      {/* 城市卡片网格 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((city) => (
          <a
            key={city.slug}
            href={`/cities/${city.slug}`}
            className="bg-white p-4 rounded-lg border hover:border-blue-400 hover:shadow-sm transition-all no-underline block group"
          >
            <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600">{city.name}</h3>
            <p className="text-xs text-gray-500 mb-2">{city.province} · {city.population}</p>
            {city.avg_salary && (
              <p className="text-xs text-gray-600">
                月薪 <span className="font-medium text-gray-800">¥{city.avg_salary.toLocaleString()}</span>
              </p>
            )}
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🏙️</p>
          <p>没有找到匹配的城市</p>
        </div>
      )}
    </div>
  );
}
