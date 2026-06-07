"use client";

import { useState } from "react";

const CATEGORIES = [
  {
    name: "居住",
    fields: ["市中心一居室月租（元）", "郊区一居室月租（元）", "合租单间月租（元）", "水电燃气网月均（元）"],
  },
  {
    name: "餐饮",
    fields: ["普通午餐（元/餐）", "外卖均价（元/单）", "超市菜篮子周均（元）", "咖啡均价（元）"],
  },
  {
    name: "交通",
    fields: ["公交月卡（元/月）", "打车起步价（元）", "共享单车月费（元）", "汽油价格（元/升）"],
  },
  {
    name: "娱乐",
    fields: ["电影票（元）", "健身房月费（元/月）", "网费宽带（元/月）"],
  },
  {
    name: "医疗",
    fields: ["普通门诊挂号费（元）", "常见药品均价（元）", "体检套餐均价（元）"],
  },
];

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [city, setCity] = useState("");

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold mb-2">提交成功！</h2>
        <p className="text-gray-600 mb-6">感谢你的贡献，数据审核通过后将出现在城市页面中。</p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-blue-600 hover:underline text-sm"
        >
          继续提交其他数据 →
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">贡献本地生活成本数据</h1>
      <p className="text-gray-600 mb-6 text-sm">
        你提交的数据将帮助更多人了解这座城市的真实生活成本。每条数据都会经过审核后才会公开显示。
      </p>

      <form
        className="space-y-6 bg-white p-6 rounded-lg border"
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: 接入 Supabase 后这里写入数据库
          setSubmitted(true);
        }}
      >
        {/* 城市选择 */}
        <div>
          <label className="block text-sm font-medium mb-1">城市 *</label>
          <select
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">请选择城市...</option>
            {["北京", "上海", "广州", "深圳", "杭州", "成都", "武汉", "南京", "西安", "重庆", "苏州", "天津", "长沙", "郑州", "青岛"].map(
              (c) => (
                <option key={c} value={c}>{c}</option>
              )
            )}
          </select>
        </div>

        {/* 各分类数据填写 */}
        {CATEGORIES.map((cat) => (
          <div key={cat.name}>
            <h3 className="text-sm font-semibold text-gray-700 mb-2 border-t pt-4">{cat.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cat.fields.map((label) => (
                <div key={label}>
                  <label className="block text-xs text-gray-500 mb-1">{label}</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="留空表示未知"
                    className="w-full border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 联系方式（可选） */}
        <div>
          <label className="block text-sm font-medium mb-1">联系方式（可选，仅用于数据核实）</label>
          <input
            type="text"
            placeholder="微信 / 邮箱"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 w-full sm:w-auto"
        >
          提交数据
        </button>
      </form>
    </div>
  );
}
