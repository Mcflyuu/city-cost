export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">选择城市，先看真实生活成本</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          不看出租广告，不看官方均价。
          由本地人真实数据汇总，帮你判断哪座城市真正适合生活。
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/cities"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 no-underline"
          >
            查看城市列表
          </a>
          <a
            href="/compare"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 no-underline"
          >
            对比城市
          </a>
          <a
            href="/calculator"
            className="border border-green-600 text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 no-underline"
          >
            💰 算一算能剩多少
          </a>
        </div>
      </section>

      {/* 功能介绍 */}
      <section className="grid md:grid-cols-3 gap-6 py-12">
        {[
          {
            title: "6 大类 35 项指标",
            desc: "覆盖居住、餐饮、交通、娱乐、教育、医疗，全方位了解生活成本。",
          },
          {
            title: "城市横向对比",
            desc: "选 2-4 座城市并排比较，一眼看出差异所在。",
          },
          {
            title: "可支配收入计算器",
            desc: "输入税前月薪，看在各城市税后到手、生活开销、还能剩多少。",
          },
          {
            title: "数据置信度标注",
            desc: "每项数据标注来源和可信度，官方数据 > 多人验证 > 单人提交。",
          },
        ].map((item) => (
          <div key={item.title} className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 已覆盖城市 */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">已覆盖城市</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { name: "北京", slug: "beijing" },
              { name: "上海", slug: "shanghai" },
              { name: "广州", slug: "guangzhou" },
              { name: "深圳", slug: "shenzhen" },
              { name: "杭州", slug: "hangzhou" },
              { name: "成都", slug: "chengdu" },
              { name: "武汉", slug: "wuhan" },
              { name: "南京", slug: "nanjing" },
              { name: "西安", slug: "xian" },
              { name: "重庆", slug: "chongqing" },
              { name: "苏州", slug: "suzhou" },
              { name: "天津", slug: "tianjin" },
              { name: "长沙", slug: "changsha" },
              { name: "郑州", slug: "zhengzhou" },
              { name: "青岛", slug: "qingdao" },
            ].map((city) => (
              <a
                key={city.slug}
                href={`/cities/${city.slug}`}
                className="bg-white p-3 rounded border text-center hover:border-blue-400 hover:text-blue-600 no-underline block"
              >
                {city.name}
              </a>
            ))}
          </div>
      </section>
    </div>
  );
}
