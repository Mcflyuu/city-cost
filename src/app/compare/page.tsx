import { getCities, getCityDetail } from "@/lib/supabase";
import { CITIES_MOCK, COMPARE_LABELS } from "@/lib/mock-data";

interface ComparePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams;

  // 统一处理 cities 参数（可能为 string | string[] | undefined）
  let selected: string[] = [];
  const raw = params.cities;
  if (typeof raw === "string") {
    selected = raw.split(",").filter(Boolean);
  } else if (Array.isArray(raw)) {
    selected = raw.filter(Boolean);
  } else {
    selected = ["beijing", "shenzhen", "chengdu"];
  }
  selected = selected.slice(0, 4);

  // 获取所有可用城市
  const allCities = await getCities().catch(() => CITIES_MOCK);

  // 并行获取选中城市的完整数据
  const cityDataMap: Record<
    string,
    {
      name: string;
      data: Record<string, number>;
    }
  > = {};

  await Promise.all(
    selected.map(async (slug) => {
      const city = allCities.find((c: any) => c.slug === slug);
      if (!city) return;

      const detail = await getCityDetail(slug).catch(() => null);
      if (detail && detail.data) {
        const data: Record<string, number> = {};
        detail.data.forEach((group: any) => {
          group.items.forEach((item: any) => {
            data[item.label] = item.value;
          });
        });
        cityDataMap[slug] = { name: city.name, data };
      } else {
        // Mock 降级
        const mock = COMPARE_LABELS.reduce((acc: Record<string, number>, key) => {
          acc[key] = Math.round(Math.random() * 5000 + 1000);
          return acc;
        }, {});
        cityDataMap[slug] = { name: city.name, data: mock };
      }
    })
  );

  const labels = COMPARE_LABELS;
  const labelNames: Record<string, string> = {
    rent_center: "市中心一居室月租（元）",
    rent_suburb: "郊区一居室月租（元）",
    rent_share: "合租单间月租（元）",
    utilities: "水电燃气网费（元/月）",
    house_price: "购房均价（元/㎡）",
    lunch: "普通午餐（元/餐）",
    dinner_mid: "中档餐厅双人套餐（元）",
    takeout: "外卖均价（元）",
    grocery: "超市菜篮子（元/周）",
    coffee: "咖啡（元/杯）",
    beer: "啤酒（元/瓶）",
    water: "瓶装水（元/瓶）",
    transport_monthly: "公交地铁月卡（元/月）",
    taxi_start: "出租车起步价（元）",
    taxi_km: "出租车每公里（元）",
    bike_monthly: "共享单车月费（元）",
    parking: "停车费（元/天）",
    gas: "汽油价格（元/升）",
    movie: "电影票（元）",
    gym: "健身房月费（元）",
    scenic: "景区门票均价（元）",
    internet: "宽带月费（元）",
    kindy_public: "公立幼儿园（元/月）",
    kindy_private: "私立幼儿园（元/月）",
    tutoring: "补习班均价（元/课时）",
    clinic: "普通门诊挂号（元）",
    medicine: "常见药品均价（元）",
    checkup: "体检套餐（元）",
    dental: "牙科洗牙（元）",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">城市生活成本对比</h1>

      {/* 城市选择器 */}
      <form className="bg-white p-4 rounded-lg border mb-6" method="get">
        <p className="text-sm text-gray-600 mb-3">选择 2-4 座城市对比：</p>
        <div className="flex flex-wrap gap-3 mb-4">
          {allCities.map((city: any) => {
            const checked = selected.includes(city.slug);
            return (
              <label
                key={city.slug}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="cities"
                  value={city.slug}
                  defaultChecked={checked}
                  className="accent-blue-600"
                />
                {city.name}
              </label>
            );
          })}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          开始对比
        </button>
      </form>

      {selected.length < 2 && (
        <p className="text-amber-600 bg-amber-50 p-3 rounded mb-4 text-sm">
          请至少选择 2 座城市
        </p>
      )}

      {selected.length >= 2 && (
        <div className="space-y-6">
          {labels.map((key) => {
            const values = Object.entries(cityDataMap)
              .filter(([slug]) => selected.includes(slug))
              .map(([slug, info]) => ({
                city: info.name,
                slug,
                value: info.data[key] ?? 0,
              }));

            const validValues = values.filter((v) => v.value > 0);
            const max = validValues.length > 0 ? Math.max(...validValues.map((v) => v.value)) : 1;
            const min = validValues.length > 0 ? Math.min(...validValues.map((v) => v.value)) : 0;

            return (
              <div key={key} className="bg-white rounded-lg border overflow-hidden">
                <div className="px-6 py-3 bg-gray-50 border-b font-medium text-sm">
                  {labelNames[key] || key}
                </div>
                <div className="divide-y">
                  {values.map((v) => {
                    const isMax = v.value === max && selected.length > 1 && v.value > 0;
                    const isMin = v.value === min && selected.length > 1 && v.value > 0;
                    return (
                      <div
                        key={v.city}
                        className="px-6 py-3 flex items-center justify-between text-sm"
                      >
                        <span className="font-medium w-20">{v.city}</span>
                        <div className="flex-1 mx-4">
                          {v.value > 0 ? (
                            <div
                              className={`h-2 rounded-full ${isMax ? "bg-red-200" : isMin ? "bg-green-200" : "bg-gray-200"}`}
                              style={{
                                width: `${(v.value / max) * 100}%`,
                                minWidth: "8px",
                              }}
                            />
                          ) : (
                            <span className="text-gray-300 text-xs">暂无数据</span>
                          )}
                        </div>
                        <span
                          className={`w-24 text-right font-semibold ${isMax ? "text-red-600" : isMin ? "text-green-600" : ""}`}
                        >
                          {v.value > 0 ? v.value.toLocaleString() : "--"}
                          <span className="text-xs text-gray-400 font-normal ml-1">
                            元
                          </span>
                        </span>
                      </div>
                    );
                  })}
                  {validValues.length > 1 && (
                    <div className="px-6 py-2 text-xs text-gray-400 bg-gray-50">
                      💡 最低：
                      <span className="text-green-600">{min.toLocaleString()}</span>
                      ，最高：
                      <span className="text-red-600">{max.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* 汇总结论 */}
          <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">📊 对比小结</h3>
            <p className="text-sm text-blue-700">
              在对比的 {selected.length} 座城市中：
            </p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              {selected.map((slug) => {
                const info = cityDataMap[slug];
                if (!info) return null;
                const rent = info.data["rent_center"] || 0;
                const lunch = info.data["lunch"] || 25;
                const transport = info.data["transport_monthly"] || 200;
                const gym = info.data["gym"] || 200;
                const total = rent + lunch * 60 + transport + gym;
                return (
                  <li key={slug}>
                    <span className="font-semibold">{info.name}</span>：基础月开销约
                    <span className="font-semibold"> {total.toLocaleString()} 元</span>
                    （房租 {rent.toLocaleString()} + 餐饮约 {lunch * 60} + 交通 {transport} + 健身 {gym}）
                  </li>
                );
              })}
            </ul>
            {selected.length >= 2 && (() => {
              let minCity = "";
              let minCost = Infinity;
              selected.forEach((slug) => {
                const info = cityDataMap[slug];
                if (!info) return;
                const rent = info.data["rent_center"] || 0;
                const lunch = info.data["lunch"] || 25;
                const transport = info.data["transport_monthly"] || 200;
                const gym = info.data["gym"] || 200;
                const total = rent + lunch * 60 + transport + gym;
                if (total < minCost) {
                  minCost = total;
                  minCity = info.name;
                }
              });
              return (
                <p className="text-sm text-blue-700 mt-3 pt-3 border-t border-blue-100">
                  🏆 综合来看，<span className="font-semibold">{minCity}</span> 的基础生活成本相对最低（约 {minCost.toLocaleString()} 元/月）。
                </p>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
