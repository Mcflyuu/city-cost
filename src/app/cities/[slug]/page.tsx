import { getCityDetail } from "@/lib/supabase";
import { MOCK_CITIES } from "@/lib/mock-data";

function ConfidenceBadge({ confidence }: { confidence: string }) {
  const map: Record<string, { bg: string; label: string; dots: string }> = {
    high:   { bg: "bg-green-100 text-green-700",  label: "高置信度", dots: "●●●" },
    medium: { bg: "bg-yellow-100 text-yellow-700", label: "中置信度", dots: "●●○" },
    low:    { bg: "bg-red-100 text-red-700",        label: "低置信度", dots: "●○○" },
  };
  const cfg = map[confidence] || map.medium;
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.bg}`} title={cfg.label}>
      {cfg.dots}
    </span>
  );
}

const CAT_COLORS: Record<string, string> = {
  "居住": "blue",
  "餐饮": "green",
  "交通": "amber",
  "娱乐": "purple",
  "教育": "teal",
  "医疗": "red",
};

const CAT_BG: Record<string, string> = {
  blue:   "bg-blue-50",
  green:  "bg-green-50",
  amber:  "bg-amber-50",
  purple: "bg-purple-50",
  teal:   "bg-teal-50",
  red:    "bg-red-50",
};

export default async function CityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. 优先尝试 Supabase
  let cityData: any = null;
  let useSupabase = false;

  const detail = await getCityDetail(slug);
  if (detail && detail.city) {
    useSupabase = true;
    cityData = detail;
  } else {
    // 2. 降级到静态 Mock 数据
    cityData = MOCK_CITIES[slug] ?? null;
  }

  if (!cityData) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-5xl mb-4">🏙️</p>
        <p className="text-lg mb-2">暂未收录该城市数据</p>
        <p className="text-sm mb-6">欢迎成为第一个贡献者！</p>
        <a href="/submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 no-underline">
          贡献数据
        </a>
      </div>
    );
  }

  // ---- 数据适配：统一成渲染格式 ----
  let city: any;
  let categories: { title: string; color: string; items: any[] }[];
  let avgSalary: number;

  if (useSupabase) {
    city = detail!.city;
    avgSalary = city.avg_salary ?? 0;
    categories = detail!.categories.map((cat: any) => ({
      title: `${cat.icon ?? ""} ${cat.name}`,
      color: CAT_COLORS[cat.name] ?? "blue",
      items: cat.items.map((dp: any) => ({
        name:       dp.data_items?.name ?? "—",
        value:      Number(dp.value),
        unit:       dp.data_items?.unit ?? "",
        confidence: dp.confidence,
        source:     dp.source ?? "",
      })),
    }));
  } else {
    // Mock 格式
    city = cityData;
    avgSalary = cityData.avg_salary ?? 0;
    categories = cityData.categories ?? [];
  }

  // ---- 估算月度生活成本 ----
  const rentVal     = categories[0]?.items?.[0]?.value ?? 0;
  const foodVal     = (categories[1]?.items?.[2]?.value ?? 0) * 60;
  const transVal    = categories[2]?.items?.[0]?.value ?? 0;
  const gymVal      = categories[3]?.items?.[1]?.value ?? 0;
  const medVal      = (categories[5]?.items?.[0]?.value ?? 0) * 2;
  const monthlyCost = rentVal + foodVal + transVal + gymVal + medVal;
  const disposable  = avgSalary - monthlyCost;

  return (
    <div>
      {/* 数据来源标记 */}
      {useSupabase && (
        <div className="mb-4 flex items-center gap-2 text-xs text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
          <span>✓</span>
          <span>数据来自 Supabase 数据库，实时更新</span>
        </div>
      )}

      {/* 城市头部 */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-wrap items-end gap-4 mb-4">
          <h1 className="text-3xl font-bold">{useSupabase ? city.name : cityData.name}</h1>
          <span className="text-sm text-gray-500">{useSupabase ? city.province : cityData.province}</span>
          <span className="text-sm text-gray-500">
            人口 {useSupabase ? city.population : cityData.population}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">平均月薪（税后）</p>
            <p className="text-xl font-bold text-blue-700">
              {avgSalary ? `¥${avgSalary.toLocaleString()}` : "暂无数据"}
            </p>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">预估月生活成本</p>
            <p className="text-xl font-bold text-orange-700">
              {monthlyCost > 0 ? `¥${monthlyCost.toLocaleString()}` : "—"}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${disposable >= 0 ? "bg-green-50" : "bg-red-50"}`}>
            <p className="text-xs text-gray-500">预估可支配收入</p>
            <p className={`text-xl font-bold ${disposable >= 0 ? "text-green-700" : "text-red-700"}`}>
              {monthlyCost > 0 && avgSalary ? `¥${disposable.toLocaleString()}` : "—"}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">数据更新时间</p>
            <p className="text-sm font-medium">2026年6月</p>
          </div>
        </div>
      </div>

      {/* 各分类数据 */}
      {categories.map((cat) => {
        const colorKey = cat.color || "blue";
        const bgClass = CAT_BG[colorKey] || "bg-blue-50";
        return (
          <div key={cat.title} className="bg-white rounded-lg shadow-sm border mb-4 overflow-hidden">
            <div className={`px-6 py-3 ${bgClass} border-b`}>
              <h2 className="text-lg font-semibold">{cat.title}</h2>
            </div>
            {cat.items.length === 0 ? (
              <p className="px-6 py-4 text-sm text-gray-400">暂无数据</p>
            ) : (
              <div className="divide-y">
                {cat.items.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="px-6 py-3 flex items-center gap-4 hover:bg-gray-50"
                  >
                    <span className="flex-1 text-sm">{item.name}</span>
                    <span className="font-semibold text-base tabular-nums">
                      {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                      {" "}
                      <span className="text-xs text-gray-500 font-normal">{item.unit}</span>
                    </span>
                    <span
                      title={item.source}
                      className="text-xs text-gray-400 hidden md:inline max-w-[180px] truncate"
                    >
                      {item.source}
                    </span>
                    <ConfidenceBadge confidence={item.confidence} />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* 贡献入口 */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-blue-800">知道更准确的数据？</p>
          <p className="text-xs text-blue-600 mt-1">欢迎提交你的本地生活成本数据，帮助更多人做决策</p>
        </div>
        <a
          href={`/submit?city=${slug}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 no-underline whitespace-nowrap"
        >
          贡献数据
        </a>
      </div>

      <p className="text-xs text-gray-400 text-center mt-6">
        数据来源：链家、美团、大众点评、官方统计及用户贡献 · 数据仅供参考
      </p>
    </div>
  );
}
