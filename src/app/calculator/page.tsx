"use client";

import { useState, useMemo } from "react";
import { calculateMonthlyTax } from "@/lib/tax";
import { calculateFullResult, extractCityCostFromMock } from "@/lib/calculator";
import type { Lifestyle, FamilyType, CalculatorResult } from "@/lib/calculator";

const CITIES = [
  { slug: "beijing", name: "北京" },
  { slug: "shanghai", name: "上海" },
  { slug: "guangzhou", name: "广州" },
  { slug: "shenzhen", name: "深圳" },
  { slug: "hangzhou", name: "杭州" },
  { slug: "chengdu", name: "成都" },
  { slug: "wuhan", name: "武汉" },
  { slug: "nanjing", name: "南京" },
  { slug: "xian", name: "西安" },
  { slug: "chongqing", name: "重庆" },
  { slug: "suzhou", name: "苏州" },
  { slug: "tianjin", name: "天津" },
  { slug: "changsha", name: "长沙" },
  { slug: "zhengzhou", name: "郑州" },
  { slug: "qingdao", name: "青岛" },
];

const LIFESTYLE_OPTIONS: { value: Lifestyle; label: string; desc: string }[] = [
  { value: "frugal", label: "节俭型", desc: "合租/远郊、自己做饭、少娱乐" },
  { value: "moderate", label: "中等型", desc: "郊区一居室、偶尔外食、适度娱乐" },
  { value: "comfortable", label: "舒适型", desc: "市中心一居室、经常下馆子、丰富娱乐" },
];

const FAMILY_OPTIONS: { value: FamilyType; label: string }[] = [
  { value: "single", label: "单身" },
  { value: "couple", label: "情侣/夫妻" },
  { value: "family1", label: "有1个孩子" },
  { value: "family2", label: "有2个孩子" },
];

function formatMoney(n: number) {
  return "¥" + n.toLocaleString("zh-CN");
}

function ResultCard({
  cityName,
  result,
  isBest,
}: {
  cityName: string;
  result: CalculatorResult;
  isBest?: boolean;
}) {
  const costs = result.monthlyCost;
  const items = [
    { label: "住房", value: costs.housing, color: "#3b82f6" },
    { label: "餐饮", value: costs.food, color: "#22c55e" },
    { label: "交通", value: costs.transport, color: "#f59e0b" },
    { label: "娱乐", value: costs.entertainment, color: "#a855f7" },
    { label: "教育", value: costs.education, color: "#14b8a6" },
    { label: "医疗", value: costs.medical, color: "#ef4444" },
    { label: "其他", value: costs.other, color: "#6b7280" },
  ];

  const maxBar = Math.max(...items.map((i) => i.value), 1);

  return (
    <div className={`bg-white rounded-lg border p-5 ${isBest ? "border-blue-400 ring-1 ring-blue-200" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">{cityName}</h3>
        {isBest && (
          <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded">
            最优选择
          </span>
        )}
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-green-50 rounded p-3 text-center">
          <div className="text-xs text-gray-500 mb-1">税后月薪</div>
          <div className="text-lg font-bold text-green-600">{formatMoney(result.netSalary)}</div>
        </div>
        <div className="bg-orange-50 rounded p-3 text-center">
          <div className="text-xs text-gray-500 mb-1">月生活成本</div>
          <div className="text-lg font-bold text-orange-600">{formatMoney(costs.total)}</div>
        </div>
        <div className="bg-blue-50 rounded p-3 text-center">
          <div className="text-xs text-gray-500 mb-1">可支配收入</div>
          <div className="text-lg font-bold text-blue-600">{formatMoney(result.disposableIncome)}</div>
        </div>
      </div>

      {/* 可支配收入占比 */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>可支配收入占比</span>
          <span className={result.disposableRatio > 30 ? "text-green-600 font-medium" : result.disposableRatio > 10 ? "text-orange-600" : "text-red-600"}>
            {result.disposableRatio}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${result.disposableRatio > 30 ? "bg-green-500" : result.disposableRatio > 10 ? "bg-orange-500" : "bg-red-500"}`}
            style={{ width: `${Math.min(result.disposableRatio, 100)}%` }}
          />
        </div>
      </div>

      {/* 生活品质指数 */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>生活品质指数</span>
          <span className="font-medium">{result.qualityScore}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="h-2.5 rounded-full bg-purple-500"
            style={{ width: `${result.qualityScore}%` }}
          />
        </div>
      </div>

      {/* 成本明细条形图 */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-600 mb-2">月度成本明细</div>
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-10">{item.label}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(item.value / maxBar) * 100}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
            <span className="text-xs text-gray-600 w-14 text-right">{formatMoney(item.value)}</span>
          </div>
        ))}
      </div>

      {/* 年储蓄潜力 */}
      <div className="mt-4 pt-4 border-t text-sm text-gray-500">
        预估年储蓄潜力：
        <span className={result.savingsPotential > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
          {formatMoney(result.savingsPotential)}
        </span>
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  const [selectedCities, setSelectedCities] = useState<string[]>(["beijing", "hangzhou"]);
  const [salary, setSalary] = useState<number>(15000);
  const [lifestyle, setLifestyle] = useState<Lifestyle>("moderate");
  const [familyType, setFamilyType] = useState<FamilyType>("single");
  const [showTaxDetail, setShowTaxDetail] = useState(false);

  const results = useMemo(() => {
    const map: Record<string, { cityName: string; result: CalculatorResult; tax: any }> = {};
    for (const slug of selectedCities) {
      const cityData = extractCityCostFromMock(slug);
      const cityName = CITIES.find((c) => c.slug === slug)?.name ?? slug;
      if (!cityData) continue;
      const tax = calculateMonthlyTax(salary, slug);
      const result = calculateFullResult(cityData, salary, tax.netSalary, lifestyle, familyType);
      map[slug] = { cityName, result, tax };
    }
    return map;
  }, [selectedCities, salary, lifestyle, familyType]);

  const bestCitySlug = useMemo(() => {
    let best = "";
    let maxDisposable = -Infinity;
    for (const [slug, data] of Object.entries(results)) {
      if (data.result.disposableIncome > maxDisposable) {
        maxDisposable = data.result.disposableIncome;
        best = slug;
      }
    }
    return best;
  }, [results]);

  function toggleCity(slug: string) {
    setSelectedCities((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= 4) return prev;
      return [...prev, slug];
    });
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">💰 可支配收入计算器</h1>
      <p className="text-gray-500 mb-8">
        输入你的税前月薪，看在各城市能过什么样的生活——税后到手、生活开销、还能剩多少。
      </p>

      {/* 输入面板 */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 月薪 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">税前月薪（元）</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={0}
              step={500}
            />
            <div className="flex gap-2 mt-2">
              {[8000, 12000, 15000, 20000, 30000].map((s) => (
                <button
                  key={s}
                  onClick={() => setSalary(s)}
                  className={`text-xs px-2 py-1 rounded ${salary === s ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {s >= 10000 ? s / 10000 + "万" : s}
                </button>
              ))}
            </div>
          </div>

          {/* 生活方式 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">生活方式</label>
            <div className="space-y-2">
              {LIFESTYLE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setLifestyle(opt.value)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm border ${
                    lifestyle === opt.value
                      ? "border-blue-400 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium">{opt.label}</div>
                  <div className="text-xs text-gray-500">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 家庭类型 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">家庭情况</label>
            <div className="grid grid-cols-2 gap-2">
              {FAMILY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFamilyType(opt.value)}
                  className={`px-3 py-2 rounded-md text-sm border text-center ${
                    familyType === opt.value
                      ? "border-blue-400 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 城市选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              选择城市对比（最多4个）
            </label>
            <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto">
              {CITIES.map((city) => (
                <button
                  key={city.slug}
                  onClick={() => toggleCity(city.slug)}
                  className={`text-xs px-2 py-1.5 rounded border ${
                    selectedCities.includes(city.slug)
                      ? "border-blue-400 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 个税详情 */}
      <div className="mb-6">
        <button
          onClick={() => setShowTaxDetail(!showTaxDetail)}
          className="text-sm text-blue-600 hover:underline"
        >
          {showTaxDetail ? "收起" : "展开"}个税计算详情
        </button>
        {showTaxDetail && selectedCities.length > 0 && (
          <div className="mt-3 bg-gray-50 rounded-lg border p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="text-left py-2 pr-4">城市</th>
                  <th className="text-right py-2 px-4">税前</th>
                  <th className="text-right py-2 px-4">五险一金</th>
                  <th className="text-right py-2 px-4">应纳税所得额</th>
                  <th className="text-right py-2 px-4">个税</th>
                  <th className="text-right py-2 px-4">税后到手</th>
                </tr>
              </thead>
              <tbody>
                {selectedCities.map((slug) => {
                  const data = results[slug];
                  if (!data) return null;
                  return (
                    <tr key={slug} className="border-b border-gray-100">
                      <td className="py-2 pr-4 font-medium">{data.cityName}</td>
                      <td className="text-right py-2 px-4">{formatMoney(data.tax.grossSalary)}</td>
                      <td className="text-right py-2 px-4 text-gray-500">{formatMoney(data.tax.insurance)}</td>
                      <td className="text-right py-2 px-4 text-gray-500">{formatMoney(data.tax.taxableIncome)}</td>
                      <td className="text-right py-2 px-4 text-orange-600">{formatMoney(data.tax.tax)}</td>
                      <td className="text-right py-2 px-4 font-medium text-green-600">{formatMoney(data.tax.netSalary)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 结果对比 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedCities.map((slug) => {
          const data = results[slug];
          if (!data) return null;
          return (
            <ResultCard
              key={slug}
              cityName={data.cityName}
              result={data.result}
              isBest={slug === bestCitySlug && selectedCities.length > 1}
            />
          );
        })}
      </div>

      {selectedCities.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          请至少选择一个城市进行对比
        </div>
      )}
    </div>
  );
}
