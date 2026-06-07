// Mock 数据 - 用于对比页演示
const CITY_MAP: Record<string, any> = {
  beijing: {
    name: "北京",
    data: { rent: 7500, lunch: 25, transport: 260, movie: 55, gym: 280, medical: 50 },
  },
  shanghai: {
    name: "上海",
    data: { rent: 7200, lunch: 28, transport: 250, movie: 60, gym: 300, medical: 48 },
  },
  hangzhou: {
    name: "杭州",
    data: { rent: 4800, lunch: 22, transport: 200, movie: 45, gym: 220, medical: 45 },
  },
  chengdu: {
    name: "成都",
    data: { rent: 3200, lunch: 18, transport: 180, movie: 40, gym: 180, medical: 40 },
  },
  guangzhou: {
    name: "广州",
    data: { rent: 4500, lunch: 20, transport: 200, movie: 48, gym: 230, medical: 42 },
  },
  shenzhen: {
    name: "深圳",
    data: { rent: 6800, lunch: 26, transport: 220, movie: 52, gym: 280, medical: 52 },
  },
};

const CITY_KEYS = Object.keys(CITY_MAP);
const LABELS: Record<string, string> = {
  rent: "市中心一居室月租（元）",
  lunch: "普通午餐（元/餐）",
  transport: "公交月卡（元/月）",
  movie: "电影票（元）",
  gym: "健身房月费（元/月）",
  medical: "普通门诊（元/次）",
};

export default function ComparePage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const selected = (searchParams.cities ?? "beijing,shenzhen,chengdu")
    .split(",")
    .filter(Boolean)
    .slice(0, 4);

  const allKeys = Object.keys(LABELS);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">城市生活成本对比</h1>

      {/* 城市选择器 */}
      <form className="bg-white p-4 rounded-lg border mb-6" method="get">
        <p className="text-sm text-gray-600 mb-3">选择 2-4 座城市对比：</p>
        <div className="flex flex-wrap gap-3 mb-4">
          {CITY_KEYS.map((key) => {
            const checked = selected.includes(key);
            return (
              <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  name="cities"
                  value={key}
                  defaultChecked={checked}
                  className="accent-blue-600"
                />
                {CITY_MAP[key].name}
              </label>
            );
          })}
        </div>
        <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700">
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
          {allKeys.map((key) => {
            const values = selected.map((k) => ({
              city: CITY_MAP[k].name,
              value: CITY_MAP[k].data[key],
            }));
            const max = Math.max(...values.map((v) => v.value));
            const min = Math.min(...values.map((v) => v.value));

            return (
              <div key={key} className="bg-white rounded-lg border overflow-hidden">
                <div className="px-6 py-3 bg-gray-50 border-b font-medium text-sm">
                  {LABELS[key]}
                </div>
                <div className="divide-y">
                  {values.map((v) => {
                    const isMax = v.value === max && selected.length > 1;
                    const isMin = v.value === min && selected.length > 1;
                    return (
                      <div
                        key={v.city}
                        className="px-6 py-3 flex items-center justify-between text-sm"
                      >
                        <span className="font-medium w-20">{v.city}</span>
                        <div className="flex-1 mx-4">
                          <div
                            className={`h-2 rounded-full ${isMax ? "bg-red-200" : isMin ? "bg-green-200" : "bg-gray-200"}`}
                            style={{ width: `${(v.value / max) * 100}%`, minWidth: "8px" }}
                          />
                        </div>
                        <span className={`w-24 text-right font-semibold ${isMax ? "text-red-600" : isMin ? "text-green-600" : ""}`}>
                          {v.value.toLocaleString()}
                          <span className="text-xs text-gray-400 font-normal ml-1">
                            {key === "rent" ? "元/月" : key === "transport" ? "元/月" : key === "gym" ? "元/月" : "元"}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                  <div className="px-6 py-2 text-xs text-gray-400 bg-gray-50">
                    💡 {selected.length > 1 && (
                      <>
                        最低：<span className="text-green-600">{min.toLocaleString()}</span>
                        ，最高：<span className="text-red-600">{max.toLocaleString()}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* 汇总结论 */}
          <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">📊 对比小结</h3>
            <p className="text-sm text-blue-700">
              在对比的 {selected.length} 座城市中，
              <span className="font-semibold">{CITY_MAP[selected[0]]?.name}</span>
              的房租{" "}
              {CITY_MAP[selected[0]]?.data.rent > CITY_MAP[selected[1]]?.data.rent ? "高于" : "低于"}
              <span className="font-semibold">{CITY_MAP[selected[1]]?.name}</span>。
              综合来看，
              <span className="font-semibold">
                {CITY_MAP[selected.reduce((a, b) =>
                  CITY_MAP[a].data.rent + CITY_MAP[a].data.lunch * 60 + CITY_MAP[a].data.transport + CITY_MAP[a].data.gym <
                  CITY_MAP[b].data.rent + CITY_MAP[b].data.lunch * 60 + CITY_MAP[b].data.transport + CITY_MAP[b].data.gym
                    ? a
                    : b
                )]?.name}
              </span>{" "}
              生活成本相对最低。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
