// Mock 数据 - 15 座城市完整生活成本数据
// 当 Supabase 未配置时作为降级数据使用

// 城市列表（用于城市选择器、对比页等）
export const CITIES_MOCK = [
  { slug: "beijing", name: "北京", province: "北京", population: "2180万", avg_salary: 12000 },
  { slug: "shanghai", name: "上海", province: "上海", population: "2480万", avg_salary: 11500 },
  { slug: "guangzhou", name: "广州", province: "广东", population: "1880万", avg_salary: 9500 },
  { slug: "shenzhen", name: "深圳", province: "广东", population: "1760万", avg_salary: 11000 },
  { slug: "hangzhou", name: "杭州", province: "浙江", population: "1220万", avg_salary: 10500 },
  { slug: "chengdu", name: "成都", province: "四川", population: "2120万", avg_salary: 8200 },
  { slug: "wuhan", name: "武汉", province: "湖北", population: "1360万", avg_salary: 8500 },
  { slug: "nanjing", name: "南京", province: "江苏", population: "950万", avg_salary: 9800 },
  { slug: "xian", name: "西安", province: "陕西", population: "1300万", avg_salary: 7800 },
  { slug: "chongqing", name: "重庆", province: "重庆", population: "3210万", avg_salary: 7500 },
  { slug: "suzhou", name: "苏州", province: "江苏", population: "1270万", avg_salary: 9200 },
  { slug: "tianjin", name: "天津", province: "天津", population: "1380万", avg_salary: 8800 },
  { slug: "changsha", name: "长沙", province: "湖南", population: "1040万", avg_salary: 8000 },
  { slug: "zhengzhou", name: "郑州", province: "河南", population: "1260万", avg_salary: 7200 },
  { slug: "qingdao", name: "青岛", province: "山东", population: "1020万", avg_salary: 7800 },
];

// 对比页使用的数据 key 列表
export const COMPARE_LABELS = [
  "rent_center", "rent_suburb", "rent_share", "utilities", "house_price",
  "lunch", "dinner_mid", "takeout", "grocery", "coffee", "beer", "water",
  "transport_monthly", "taxi_start", "taxi_km", "bike_monthly", "parking", "gas",
  "movie", "gym", "scenic", "internet",
  "kindy_public", "kindy_private", "tutoring",
  "clinic", "medicine", "checkup", "dental",
];

export const MOCK_CITIES: Record<string, any> = {
  beijing: {
    name: "北京", province: "北京", population: "2180万", avg_salary: 12000,
    categories: [
      { title: "🏠 居住", color: "blue", items: [
        { name: "市中心一居室月租", value: 7500, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "郊区一居室月租", value: 4500, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "合租单间月租", value: 3200, unit: "元/月", confidence: "medium", source: "用户提交 12 条" },
        { name: "水电燃气网（月均）", value: 380, unit: "元/月", confidence: "high", source: "官方统计" },
        { name: "购房均价", value: 62000, unit: "元/㎡", confidence: "high", source: "贝壳 2026Q1" },
      ]},
      { title: "🍜 餐饮", color: "green", items: [
        { name: "普通午餐", value: 25, unit: "元/餐", confidence: "high", source: "美团 2026Q1" },
        { name: "中档餐厅双人套餐", value: 180, unit: "元", confidence: "medium", source: "大众点评 2026Q1" },
        { name: "外卖均价", value: 35, unit: "元/单", confidence: "high", source: "美团/饿了么" },
        { name: "超市菜篮子（周均）", value: 320, unit: "元/周", confidence: "medium", source: "用户提交" },
        { name: "咖啡（瑞幸中杯）", value: 16, unit: "元", confidence: "high", source: "官方定价" },
        { name: "啤酒（超市500ml）", value: 6, unit: "元", confidence: "high", source: "京东均价" },
        { name: "瓶装水500ml", value: 2, unit: "元", confidence: "high", source: "便利店均价" },
      ]},
      { title: "🚇 交通", color: "amber", items: [
        { name: "地铁/公交月卡", value: 260, unit: "元/月", confidence: "high", source: "北京地铁官方" },
        { name: "打车起步价", value: 13, unit: "元", confidence: "high", source: "滴滴官方" },
        { name: "打车每公里价", value: 2.5, unit: "元/km", confidence: "high", source: "滴滴官方" },
        { name: "共享单车月费", value: 25, unit: "元/月", confidence: "high", source: "美团/哈啰" },
        { name: "停车费（市中心/天）", value: 60, unit: "元/天", confidence: "medium", source: "用户提交" },
        { name: "汽油价格", value: 8.2, unit: "元/升", confidence: "high", source: "发改委 2026.06" },
      ]},
      { title: "🎬 娱乐", color: "purple", items: [
        { name: "电影票（均价）", value: 55, unit: "元", confidence: "high", source: "猫眼 2026Q1" },
        { name: "健身房月费", value: 280, unit: "元/月", confidence: "medium", source: "大众点评" },
        { name: "景区门票（均价）", value: 40, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "网费（宽带100M）", value: 100, unit: "元/月", confidence: "high", source: "运营商官方" },
      ]},
      { title: "🎓 教育", color: "teal", items: [
        { name: "公立幼儿园月费", value: 750, unit: "元/月", confidence: "high", source: "北京市教委" },
        { name: "私立幼儿园月费", value: 3500, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "补习班（/课时）", value: 200, unit: "元/课时", confidence: "medium", source: "用户提交" },
      ]},
      { title: "🏥 医疗", color: "red", items: [
        { name: "普通门诊挂号费", value: 50, unit: "元", confidence: "high", source: "北京市医保局" },
        { name: "常见药品（退烧药）", value: 25, unit: "元", confidence: "high", source: "京东健康均价" },
        { name: "体检套餐均价", value: 500, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "牙科洗牙均价", value: 200, unit: "元", confidence: "medium", source: "大众点评" },
      ]},
    ],
  },

  shanghai: {
    name: "上海", province: "上海", population: "2480万", avg_salary: 11500,
    categories: [
      { title: "🏠 居住", color: "blue", items: [
        { name: "市中心一居室月租", value: 7800, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "郊区一居室月租", value: 4800, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "合租单间月租", value: 3500, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "水电燃气网（月均）", value: 360, unit: "元/月", confidence: "high", source: "官方统计" },
        { name: "购房均价", value: 65000, unit: "元/㎡", confidence: "high", source: "贝壳 2026Q1" },
      ]},
      { title: "🍜 餐饮", color: "green", items: [
        { name: "普通午餐", value: 28, unit: "元/餐", confidence: "high", source: "美团 2026Q1" },
        { name: "中档餐厅双人套餐", value: 200, unit: "元", confidence: "medium", source: "大众点评" },
        { name: "外卖均价", value: 38, unit: "元/单", confidence: "high", source: "美团/饿了么" },
        { name: "超市菜篮子（周均）", value: 300, unit: "元/周", confidence: "medium", source: "用户提交" },
        { name: "咖啡（瑞幸中杯）", value: 16, unit: "元", confidence: "high", source: "官方定价" },
        { name: "啤酒（超市500ml）", value: 6.5, unit: "元", confidence: "high", source: "超市均价" },
        { name: "瓶装水500ml", value: 2, unit: "元", confidence: "high", source: "便利店均价" },
      ]},
      { title: "🚇 交通", color: "amber", items: [
        { name: "地铁/公交月卡", value: 250, unit: "元/月", confidence: "high", source: "上海地铁官方" },
        { name: "打车起步价", value: 14, unit: "元", confidence: "high", source: "滴滴官方" },
        { name: "打车每公里价", value: 2.5, unit: "元/km", confidence: "high", source: "滴滴官方" },
        { name: "共享单车月费", value: 25, unit: "元/月", confidence: "high", source: "美团/哈啰" },
        { name: "停车费（市中心/天）", value: 70, unit: "元/天", confidence: "medium", source: "用户提交" },
        { name: "汽油价格", value: 8.1, unit: "元/升", confidence: "high", source: "发改委 2026.06" },
      ]},
      { title: "🎬 娱乐", color: "purple", items: [
        { name: "电影票（均价）", value: 55, unit: "元", confidence: "high", source: "猫眼 2026Q1" },
        { name: "健身房月费", value: 320, unit: "元/月", confidence: "medium", source: "大众点评" },
        { name: "景区门票（均价）", value: 50, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "网费（宽带100M）", value: 100, unit: "元/月", confidence: "high", source: "运营商官方" },
      ]},
      { title: "🎓 教育", color: "teal", items: [
        { name: "公立幼儿园月费", value: 600, unit: "元/月", confidence: "high", source: "上海市教委" },
        { name: "私立幼儿园月费", value: 4000, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "补习班（/课时）", value: 220, unit: "元/课时", confidence: "medium", source: "用户提交" },
      ]},
      { title: "🏥 医疗", color: "red", items: [
        { name: "普通门诊挂号费", value: 50, unit: "元", confidence: "high", source: "上海市医保局" },
        { name: "常见药品（退烧药）", value: 25, unit: "元", confidence: "high", source: "京东健康均价" },
        { name: "体检套餐均价", value: 550, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "牙科洗牙均价", value: 220, unit: "元", confidence: "medium", source: "大众点评" },
      ]},
    ],
  },

  hangzhou: {
    name: "杭州", province: "浙江", population: "1220万", avg_salary: 10500,
    categories: [
      { title: "🏠 居住", color: "blue", items: [
        { name: "市中心一居室月租", value: 5500, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "郊区一居室月租", value: 3200, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "合租单间月租", value: 2500, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "水电燃气网（月均）", value: 320, unit: "元/月", confidence: "high", source: "官方统计" },
        { name: "购房均价", value: 33000, unit: "元/㎡", confidence: "high", source: "贝壳 2026Q1" },
      ]},
      { title: "🍜 餐饮", color: "green", items: [
        { name: "普通午餐", value: 22, unit: "元/餐", confidence: "high", source: "美团 2026Q1" },
        { name: "中档餐厅双人套餐", value: 160, unit: "元", confidence: "medium", source: "大众点评" },
        { name: "外卖均价", value: 32, unit: "元/单", confidence: "high", source: "美团/饿了么" },
        { name: "超市菜篮子（周均）", value: 280, unit: "元/周", confidence: "medium", source: "用户提交" },
        { name: "咖啡（瑞幸中杯）", value: 16, unit: "元", confidence: "high", source: "官方定价" },
        { name: "啤酒（超市500ml）", value: 5.5, unit: "元", confidence: "high", source: "超市均价" },
        { name: "瓶装水500ml", value: 2, unit: "元", confidence: "high", source: "便利店均价" },
      ]},
      { title: "🚇 交通", color: "amber", items: [
        { name: "地铁/公交月卡", value: 210, unit: "元/月", confidence: "high", source: "杭州地铁官方" },
        { name: "打车起步价", value: 12, unit: "元", confidence: "high", source: "滴滴官方" },
        { name: "打车每公里价", value: 2.2, unit: "元/km", confidence: "high", source: "滴滴官方" },
        { name: "共享单车月费", value: 25, unit: "元/月", confidence: "high", source: "美团/哈啰" },
        { name: "停车费（市中心/天）", value: 50, unit: "元/天", confidence: "medium", source: "用户提交" },
        { name: "汽油价格", value: 8.1, unit: "元/升", confidence: "high", source: "发改委 2026.06" },
      ]},
      { title: "🎬 娱乐", color: "purple", items: [
        { name: "电影票（均价）", value: 50, unit: "元", confidence: "high", source: "猫眼 2026Q1" },
        { name: "健身房月费", value: 250, unit: "元/月", confidence: "medium", source: "大众点评" },
        { name: "景区门票（均价）", value: 60, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "网费（宽带100M）", value: 90, unit: "元/月", confidence: "high", source: "运营商官方" },
      ]},
      { title: "🎓 教育", color: "teal", items: [
        { name: "公立幼儿园月费", value: 500, unit: "元/月", confidence: "high", source: "杭州市教委" },
        { name: "私立幼儿园月费", value: 3000, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "补习班（/课时）", value: 180, unit: "元/课时", confidence: "medium", source: "用户提交" },
      ]},
      { title: "🏥 医疗", color: "red", items: [
        { name: "普通门诊挂号费", value: 30, unit: "元", confidence: "high", source: "浙江省医保局" },
        { name: "常见药品（退烧药）", value: 22, unit: "元", confidence: "high", source: "京东健康均价" },
        { name: "体检套餐均价", value: 450, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "牙科洗牙均价", value: 180, unit: "元", confidence: "medium", source: "大众点评" },
      ]},
    ],
  },

  shenzhen: {
    name: "深圳", province: "广东", population: "1760万", avg_salary: 11000,
    categories: [
      { title: "🏠 居住", color: "blue", items: [
        { name: "市中心一居室月租", value: 6500, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "郊区一居室月租", value: 4200, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "合租单间月租", value: 2800, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "水电燃气网（月均）", value: 350, unit: "元/月", confidence: "high", source: "官方统计" },
        { name: "购房均价", value: 55000, unit: "元/㎡", confidence: "high", source: "贝壳 2026Q1" },
      ]},
      { title: "🍜 餐饮", color: "green", items: [
        { name: "普通午餐", value: 25, unit: "元/餐", confidence: "high", source: "美团 2026Q1" },
        { name: "中档餐厅双人套餐", value: 190, unit: "元", confidence: "medium", source: "大众点评" },
        { name: "外卖均价", value: 38, unit: "元/单", confidence: "high", source: "美团/饿了么" },
        { name: "超市菜篮子（周均）", value: 290, unit: "元/周", confidence: "medium", source: "用户提交" },
        { name: "咖啡（瑞幸中杯）", value: 16, unit: "元", confidence: "high", source: "官方定价" },
        { name: "啤酒（超市500ml）", value: 6, unit: "元", confidence: "high", source: "超市均价" },
        { name: "瓶装水500ml", value: 2, unit: "元", confidence: "high", source: "便利店均价" },
      ]},
      { title: "🚇 交通", color: "amber", items: [
        { name: "地铁/公交月卡", value: 200, unit: "元/月", confidence: "high", source: "深圳地铁官方" },
        { name: "打车起步价", value: 12, unit: "元", confidence: "high", source: "滴滴官方" },
        { name: "打车每公里价", value: 2.4, unit: "元/km", confidence: "high", source: "滴滴官方" },
        { name: "共享单车月费", value: 25, unit: "元/月", confidence: "high", source: "美团/哈啰" },
        { name: "停车费（市中心/天）", value: 55, unit: "元/天", confidence: "medium", source: "用户提交" },
        { name: "汽油价格", value: 8.0, unit: "元/升", confidence: "high", source: "发改委 2026.06" },
      ]},
      { title: "🎬 娱乐", color: "purple", items: [
        { name: "电影票（均价）", value: 50, unit: "元", confidence: "high", source: "猫眼 2026Q1" },
        { name: "健身房月费", value: 300, unit: "元/月", confidence: "medium", source: "大众点评" },
        { name: "景区门票（均价）", value: 35, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "网费（宽带100M）", value: 90, unit: "元/月", confidence: "high", source: "运营商官方" },
      ]},
      { title: "🎓 教育", color: "teal", items: [
        { name: "公立幼儿园月费", value: 600, unit: "元/月", confidence: "high", source: "深圳市教委" },
        { name: "私立幼儿园月费", value: 3800, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "补习班（/课时）", value: 200, unit: "元/课时", confidence: "medium", source: "用户提交" },
      ]},
      { title: "🏥 医疗", color: "red", items: [
        { name: "普通门诊挂号费", value: 30, unit: "元", confidence: "high", source: "深圳市医保局" },
        { name: "常见药品（退烧药）", value: 23, unit: "元", confidence: "high", source: "京东健康均价" },
        { name: "体检套餐均价", value: 480, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "牙科洗牙均价", value: 200, unit: "元", confidence: "medium", source: "大众点评" },
      ]},
    ],
  },

  guangzhou: {
    name: "广州", province: "广东", population: "1880万", avg_salary: 9500,
    categories: [
      { title: "🏠 居住", color: "blue", items: [
        { name: "市中心一居室月租", value: 4800, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "郊区一居室月租", value: 3000, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "合租单间月租", value: 2200, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "水电燃气网（月均）", value: 320, unit: "元/月", confidence: "high", source: "官方统计" },
        { name: "购房均价", value: 30000, unit: "元/㎡", confidence: "high", source: "贝壳 2026Q1" },
      ]},
      { title: "🍜 餐饮", color: "green", items: [
        { name: "普通午餐", value: 20, unit: "元/餐", confidence: "high", source: "美团 2026Q1" },
        { name: "中档餐厅双人套餐", value: 150, unit: "元", confidence: "medium", source: "大众点评" },
        { name: "外卖均价", value: 30, unit: "元/单", confidence: "high", source: "美团/饿了么" },
        { name: "超市菜篮子（周均）", value: 260, unit: "元/周", confidence: "medium", source: "用户提交" },
        { name: "咖啡（瑞幸中杯）", value: 16, unit: "元", confidence: "high", source: "官方定价" },
        { name: "啤酒（超市500ml）", value: 5.5, unit: "元", confidence: "high", source: "超市均价" },
        { name: "瓶装水500ml", value: 2, unit: "元", confidence: "high", source: "便利店均价" },
      ]},
      { title: "🚇 交通", color: "amber", items: [
        { name: "地铁/公交月卡", value: 190, unit: "元/月", confidence: "high", source: "广州地铁官方" },
        { name: "打车起步价", value: 12, unit: "元", confidence: "high", source: "滴滴官方" },
        { name: "打车每公里价", value: 2.2, unit: "元/km", confidence: "high", source: "滴滴官方" },
        { name: "共享单车月费", value: 25, unit: "元/月", confidence: "high", source: "美团/哈啰" },
        { name: "停车费（市中心/天）", value: 45, unit: "元/天", confidence: "medium", source: "用户提交" },
        { name: "汽油价格", value: 7.9, unit: "元/升", confidence: "high", source: "发改委 2026.06" },
      ]},
      { title: "🎬 娱乐", color: "purple", items: [
        { name: "电影票（均价）", value: 48, unit: "元", confidence: "high", source: "猫眼 2026Q1" },
        { name: "健身房月费", value: 260, unit: "元/月", confidence: "medium", source: "大众点评" },
        { name: "景区门票（均价）", value: 40, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "网费（宽带100M）", value: 90, unit: "元/月", confidence: "high", source: "运营商官方" },
      ]},
      { title: "🎓 教育", color: "teal", items: [
        { name: "公立幼儿园月费", value: 500, unit: "元/月", confidence: "high", source: "广州市教委" },
        { name: "私立幼儿园月费", value: 3000, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "补习班（/课时）", value: 180, unit: "元/课时", confidence: "medium", source: "用户提交" },
      ]},
      { title: "🏥 医疗", color: "red", items: [
        { name: "普通门诊挂号费", value: 25, unit: "元", confidence: "high", source: "广东省医保局" },
        { name: "常见药品（退烧药）", value: 22, unit: "元", confidence: "high", source: "京东健康均价" },
        { name: "体检套餐均价", value: 420, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "牙科洗牙均价", value: 180, unit: "元", confidence: "medium", source: "大众点评" },
      ]},
    ],
  },

  chengdu: {
    name: "成都", province: "四川", population: "2120万", avg_salary: 8200,
    categories: [
      { title: "🏠 居住", color: "blue", items: [
        { name: "市中心一居室月租", value: 3500, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "郊区一居室月租", value: 2200, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "合租单间月租", value: 1600, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "水电燃气网（月均）", value: 290, unit: "元/月", confidence: "high", source: "官方统计" },
        { name: "购房均价", value: 18000, unit: "元/㎡", confidence: "high", source: "贝壳 2026Q1" },
      ]},
      { title: "🍜 餐饮", color: "green", items: [
        { name: "普通午餐", value: 18, unit: "元/餐", confidence: "high", source: "美团 2026Q1" },
        { name: "中档餐厅双人套餐", value: 130, unit: "元", confidence: "medium", source: "大众点评" },
        { name: "外卖均价", value: 28, unit: "元/单", confidence: "high", source: "美团/饿了么" },
        { name: "超市菜篮子（周均）", value: 230, unit: "元/周", confidence: "medium", source: "用户提交" },
        { name: "咖啡（瑞幸中杯）", value: 16, unit: "元", confidence: "high", source: "官方定价" },
        { name: "啤酒（超市500ml）", value: 5, unit: "元", confidence: "high", source: "超市均价" },
        { name: "瓶装水500ml", value: 1.5, unit: "元", confidence: "high", source: "便利店均价" },
      ]},
      { title: "🚇 交通", color: "amber", items: [
        { name: "地铁/公交月卡", value: 180, unit: "元/月", confidence: "high", source: "成都地铁官方" },
        { name: "打车起步价", value: 10, unit: "元", confidence: "high", source: "滴滴官方" },
        { name: "打车每公里价", value: 2.0, unit: "元/km", confidence: "high", source: "滴滴官方" },
        { name: "共享单车月费", value: 25, unit: "元/月", confidence: "high", source: "美团/哈啰" },
        { name: "停车费（市中心/天）", value: 40, unit: "元/天", confidence: "medium", source: "用户提交" },
        { name: "汽油价格", value: 8.0, unit: "元/升", confidence: "high", source: "发改委 2026.06" },
      ]},
      { title: "🎬 娱乐", color: "purple", items: [
        { name: "电影票（均价）", value: 45, unit: "元", confidence: "high", source: "猫眼 2026Q1" },
        { name: "健身房月费", value: 220, unit: "元/月", confidence: "medium", source: "大众点评" },
        { name: "景区门票（均价）", value: 50, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "网费（宽带100M）", value: 80, unit: "元/月", confidence: "high", source: "运营商官方" },
      ]},
      { title: "🎓 教育", color: "teal", items: [
        { name: "公立幼儿园月费", value: 400, unit: "元/月", confidence: "high", source: "四川省教委" },
        { name: "私立幼儿园月费", value: 2500, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "补习班（/课时）", value: 150, unit: "元/课时", confidence: "medium", source: "用户提交" },
      ]},
      { title: "🏥 医疗", color: "red", items: [
        { name: "普通门诊挂号费", value: 20, unit: "元", confidence: "high", source: "四川省医保局" },
        { name: "常见药品（退烧药）", value: 20, unit: "元", confidence: "high", source: "京东健康均价" },
        { name: "体检套餐均价", value: 380, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "牙科洗牙均价", value: 160, unit: "元", confidence: "medium", source: "大众点评" },
      ]},
    ],
  },

  wuhan: {
    name: "武汉", province: "湖北", population: "1360万", avg_salary: 8500,
    categories: [
      { title: "🏠 居住", color: "blue", items: [
        { name: "市中心一居室月租", value: 3200, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "郊区一居室月租", value: 2000, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "合租单间月租", value: 1500, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "水电燃气网（月均）", value: 280, unit: "元/月", confidence: "high", source: "官方统计" },
        { name: "购房均价", value: 16000, unit: "元/㎡", confidence: "high", source: "贝壳 2026Q1" },
      ]},
      { title: "🍜 餐饮", color: "green", items: [
        { name: "普通午餐", value: 15, unit: "元/餐", confidence: "high", source: "美团 2026Q1" },
        { name: "中档餐厅双人套餐", value: 120, unit: "元", confidence: "medium", source: "大众点评" },
        { name: "外卖均价", value: 26, unit: "元/单", confidence: "high", source: "美团/饿了么" },
        { name: "超市菜篮子（周均）", value: 220, unit: "元/周", confidence: "medium", source: "用户提交" },
        { name: "咖啡（瑞幸中杯）", value: 16, unit: "元", confidence: "high", source: "官方定价" },
        { name: "啤酒（超市500ml）", value: 5, unit: "元", confidence: "high", source: "超市均价" },
        { name: "瓶装水500ml", value: 1.5, unit: "元", confidence: "high", source: "便利店均价" },
      ]},
      { title: "🚇 交通", color: "amber", items: [
        { name: "地铁/公交月卡", value: 170, unit: "元/月", confidence: "high", source: "武汉地铁官方" },
        { name: "打车起步价", value: 11, unit: "元", confidence: "high", source: "滴滴官方" },
        { name: "打车每公里价", value: 2.0, unit: "元/km", confidence: "high", source: "滴滴官方" },
        { name: "共享单车月费", value: 25, unit: "元/月", confidence: "high", source: "美团/哈啰" },
        { name: "停车费（市中心/天）", value: 35, unit: "元/天", confidence: "medium", source: "用户提交" },
        { name: "汽油价格", value: 8.1, unit: "元/升", confidence: "high", source: "发改委 2026.06" },
      ]},
      { title: "🎬 娱乐", color: "purple", items: [
        { name: "电影票（均价）", value: 45, unit: "元", confidence: "high", source: "猫眼 2026Q1" },
        { name: "健身房月费", value: 200, unit: "元/月", confidence: "medium", source: "大众点评" },
        { name: "景区门票（均价）", value: 45, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "网费（宽带100M）", value: 80, unit: "元/月", confidence: "high", source: "运营商官方" },
      ]},
      { title: "🎓 教育", color: "teal", items: [
        { name: "公立幼儿园月费", value: 450, unit: "元/月", confidence: "high", source: "湖北省教委" },
        { name: "私立幼儿园月费", value: 2800, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "补习班（/课时）", value: 150, unit: "元/课时", confidence: "medium", source: "用户提交" },
      ]},
      { title: "🏥 医疗", color: "red", items: [
        { name: "普通门诊挂号费", value: 25, unit: "元", confidence: "high", source: "湖北省医保局" },
        { name: "常见药品（退烧药）", value: 20, unit: "元", confidence: "high", source: "京东健康均价" },
        { name: "体检套餐均价", value: 380, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "牙科洗牙均价", value: 160, unit: "元", confidence: "medium", source: "大众点评" },
      ]},
    ],
  },

  nanjing: {
    name: "南京", province: "江苏", population: "950万", avg_salary: 9800,
    categories: [
      { title: "🏠 居住", color: "blue", items: [
        { name: "市中心一居室月租", value: 4500, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "郊区一居室月租", value: 2800, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "合租单间月租", value: 2000, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "水电燃气网（月均）", value: 310, unit: "元/月", confidence: "high", source: "官方统计" },
        { name: "购房均价", value: 28000, unit: "元/㎡", confidence: "high", source: "贝壳 2026Q1" },
      ]},
      { title: "🍜 餐饮", color: "green", items: [
        { name: "普通午餐", value: 20, unit: "元/餐", confidence: "high", source: "美团 2026Q1" },
        { name: "中档餐厅双人套餐", value: 150, unit: "元", confidence: "medium", source: "大众点评" },
        { name: "外卖均价", value: 30, unit: "元/单", confidence: "high", source: "美团/饿了么" },
        { name: "超市菜篮子（周均）", value: 260, unit: "元/周", confidence: "medium", source: "用户提交" },
        { name: "咖啡（瑞幸中杯）", value: 16, unit: "元", confidence: "high", source: "官方定价" },
        { name: "啤酒（超市500ml）", value: 5.5, unit: "元", confidence: "high", source: "超市均价" },
        { name: "瓶装水500ml", value: 2, unit: "元", confidence: "high", source: "便利店均价" },
      ]},
      { title: "🚇 交通", color: "amber", items: [
        { name: "地铁/公交月卡", value: 200, unit: "元/月", confidence: "high", source: "南京地铁官方" },
        { name: "打车起步价", value: 11, unit: "元", confidence: "high", source: "滴滴官方" },
        { name: "打车每公里价", value: 2.1, unit: "元/km", confidence: "high", source: "滴滴官方" },
        { name: "共享单车月费", value: 25, unit: "元/月", confidence: "high", source: "美团/哈啰" },
        { name: "停车费（市中心/天）", value: 40, unit: "元/天", confidence: "medium", source: "用户提交" },
        { name: "汽油价格", value: 8.1, unit: "元/升", confidence: "high", source: "发改委 2026.06" },
      ]},
      { title: "🎬 娱乐", color: "purple", items: [
        { name: "电影票（均价）", value: 48, unit: "元", confidence: "high", source: "猫眼 2026Q1" },
        { name: "健身房月费", value: 240, unit: "元/月", confidence: "medium", source: "大众点评" },
        { name: "景区门票（均价）", value: 50, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "网费（宽带100M）", value: 85, unit: "元/月", confidence: "high", source: "运营商官方" },
      ]},
      { title: "🎓 教育", color: "teal", items: [
        { name: "公立幼儿园月费", value: 550, unit: "元/月", confidence: "high", source: "江苏省教委" },
        { name: "私立幼儿园月费", value: 3200, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "补习班（/课时）", value: 170, unit: "元/课时", confidence: "medium", source: "用户提交" },
      ]},
      { title: "🏥 医疗", color: "red", items: [
        { name: "普通门诊挂号费", value: 30, unit: "元", confidence: "high", source: "江苏省医保局" },
        { name: "常见药品（退烧药）", value: 22, unit: "元", confidence: "high", source: "京东健康均价" },
        { name: "体检套餐均价", value: 420, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "牙科洗牙均价", value: 180, unit: "元", confidence: "medium", source: "大众点评" },
      ]},
    ],
  },

  xian: {
    name: "西安", province: "陕西", population: "1300万", avg_salary: 7800,
    categories: [
      { title: "🏠 居住", color: "blue", items: [
        { name: "市中心一居室月租", value: 2500, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "郊区一居室月租", value: 1600, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "合租单间月租", value: 1200, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "水电燃气网（月均）", value: 260, unit: "元/月", confidence: "high", source: "官方统计" },
        { name: "购房均价", value: 13000, unit: "元/㎡", confidence: "high", source: "贝壳 2026Q1" },
      ]},
      { title: "🍜 餐饮", color: "green", items: [
        { name: "普通午餐", value: 14, unit: "元/餐", confidence: "high", source: "美团 2026Q1" },
        { name: "中档餐厅双人套餐", value: 100, unit: "元", confidence: "medium", source: "大众点评" },
        { name: "外卖均价", value: 24, unit: "元/单", confidence: "high", source: "美团/饿了么" },
        { name: "超市菜篮子（周均）", value: 200, unit: "元/周", confidence: "medium", source: "用户提交" },
        { name: "咖啡（瑞幸中杯）", value: 16, unit: "元", confidence: "high", source: "官方定价" },
        { name: "啤酒（超市500ml）", value: 4.5, unit: "元", confidence: "high", source: "超市均价" },
        { name: "瓶装水500ml", value: 1.5, unit: "元", confidence: "high", source: "便利店均价" },
      ]},
      { title: "🚇 交通", color: "amber", items: [
        { name: "地铁/公交月卡", value: 160, unit: "元/月", confidence: "high", source: "西安地铁官方" },
        { name: "打车起步价", value: 9, unit: "元", confidence: "high", source: "滴滴官方" },
        { name: "打车每公里价", value: 1.8, unit: "元/km", confidence: "high", source: "滴滴官方" },
        { name: "共享单车月费", value: 25, unit: "元/月", confidence: "high", source: "美团/哈啰" },
        { name: "停车费（市中心/天）", value: 30, unit: "元/天", confidence: "medium", source: "用户提交" },
        { name: "汽油价格", value: 8.2, unit: "元/升", confidence: "high", source: "发改委 2026.06" },
      ]},
      { title: "🎬 娱乐", color: "purple", items: [
        { name: "电影票（均价）", value: 42, unit: "元", confidence: "high", source: "猫眼 2026Q1" },
        { name: "健身房月费", value: 180, unit: "元/月", confidence: "medium", source: "大众点评" },
        { name: "景区门票（均价）", value: 80, unit: "元", confidence: "high", source: "官方定价" },
        { name: "网费（宽带100M）", value: 80, unit: "元/月", confidence: "high", source: "运营商官方" },
      ]},
      { title: "🎓 教育", color: "teal", items: [
        { name: "公立幼儿园月费", value: 400, unit: "元/月", confidence: "high", source: "陕西省教委" },
        { name: "私立幼儿园月费", value: 2200, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "补习班（/课时）", value: 130, unit: "元/课时", confidence: "medium", source: "用户提交" },
      ]},
      { title: "🏥 医疗", color: "red", items: [
        { name: "普通门诊挂号费", value: 20, unit: "元", confidence: "high", source: "陕西省医保局" },
        { name: "常见药品（退烧药）", value: 18, unit: "元", confidence: "high", source: "京东健康均价" },
        { name: "体检套餐均价", value: 320, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "牙科洗牙均价", value: 150, unit: "元", confidence: "medium", source: "大众点评" },
      ]},
    ],
  },

  chongqing: {
    name: "重庆", province: "重庆", population: "3210万", avg_salary: 7500,
    categories: [
      { title: "🏠 居住", color: "blue", items: [
        { name: "市中心一居室月租", value: 2800, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "郊区一居室月租", value: 1800, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "合租单间月租", value: 1300, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "水电燃气网（月均）", value: 270, unit: "元/月", confidence: "high", source: "官方统计" },
        { name: "购房均价", value: 12000, unit: "元/㎡", confidence: "high", source: "贝壳 2026Q1" },
      ]},
      { title: "🍜 餐饮", color: "green", items: [
        { name: "普通午餐", value: 15, unit: "元/餐", confidence: "high", source: "美团 2026Q1" },
        { name: "中档餐厅双人套餐", value: 110, unit: "元", confidence: "medium", source: "大众点评" },
        { name: "外卖均价", value: 26, unit: "元/单", confidence: "high", source: "美团/饿了么" },
        { name: "超市菜篮子（周均）", value: 210, unit: "元/周", confidence: "medium", source: "用户提交" },
        { name: "咖啡（瑞幸中杯）", value: 16, unit: "元", confidence: "high", source: "官方定价" },
        { name: "啤酒（超市500ml）", value: 5, unit: "元", confidence: "high", source: "超市均价" },
        { name: "瓶装水500ml", value: 1.5, unit: "元", confidence: "high", source: "便利店均价" },
      ]},
      { title: "🚇 交通", color: "amber", items: [
        { name: "地铁/公交月卡", value: 160, unit: "元/月", confidence: "high", source: "重庆地铁官方" },
        { name: "打车起步价", value: 10, unit: "元", confidence: "high", source: "滴滴官方" },
        { name: "打车每公里价", value: 1.9, unit: "元/km", confidence: "high", source: "滴滴官方" },
        { name: "共享单车月费", value: 25, unit: "元/月", confidence: "high", source: "美团/哈啰" },
        { name: "停车费（市中心/天）", value: 35, unit: "元/天", confidence: "medium", source: "用户提交" },
        { name: "汽油价格", value: 8.1, unit: "元/升", confidence: "high", source: "发改委 2026.06" },
      ]},
      { title: "🎬 娱乐", color: "purple", items: [
        { name: "电影票（均价）", value: 43, unit: "元", confidence: "high", source: "猫眼 2026Q1" },
        { name: "健身房月费", value: 190, unit: "元/月", confidence: "medium", source: "大众点评" },
        { name: "景区门票（均价）", value: 50, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "网费（宽带100M）", value: 80, unit: "元/月", confidence: "high", source: "运营商官方" },
      ]},
      { title: "🎓 教育", color: "teal", items: [
        { name: "公立幼儿园月费", value: 380, unit: "元/月", confidence: "high", source: "重庆市教委" },
        { name: "私立幼儿园月费", value: 2500, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "补习班（/课时）", value: 140, unit: "元/课时", confidence: "medium", source: "用户提交" },
      ]},
      { title: "🏥 医疗", color: "red", items: [
        { name: "普通门诊挂号费", value: 20, unit: "元", confidence: "high", source: "重庆市医保局" },
        { name: "常见药品（退烧药）", value: 18, unit: "元", confidence: "high", source: "京东健康均价" },
        { name: "体检套餐均价", value: 360, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "牙科洗牙均价", value: 160, unit: "元", confidence: "medium", source: "大众点评" },
      ]},
    ],
  },

  suzhou: {
    name: "苏州", province: "江苏", population: "1270万", avg_salary: 9200,
    categories: [
      { title: "🏠 居住", color: "blue", items: [
        { name: "市中心一居室月租", value: 4200, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "郊区一居室月租", value: 2600, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "合租单间月租", value: 1900, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "水电燃气网（月均）", value: 300, unit: "元/月", confidence: "high", source: "官方统计" },
        { name: "购房均价", value: 22000, unit: "元/㎡", confidence: "high", source: "贝壳 2026Q1" },
      ]},
      { title: "🍜 餐饮", color: "green", items: [
        { name: "普通午餐", value: 20, unit: "元/餐", confidence: "high", source: "美团 2026Q1" },
        { name: "中档餐厅双人套餐", value: 150, unit: "元", confidence: "medium", source: "大众点评" },
        { name: "外卖均价", value: 30, unit: "元/单", confidence: "high", source: "美团/饿了么" },
        { name: "超市菜篮子（周均）", value: 260, unit: "元/周", confidence: "medium", source: "用户提交" },
        { name: "咖啡（瑞幸中杯）", value: 16, unit: "元", confidence: "high", source: "官方定价" },
        { name: "啤酒（超市500ml）", value: 5.5, unit: "元", confidence: "high", source: "超市均价" },
        { name: "瓶装水500ml", value: 2, unit: "元", confidence: "high", source: "便利店均价" },
      ]},
      { title: "🚇 交通", color: "amber", items: [
        { name: "地铁/公交月卡", value: 180, unit: "元/月", confidence: "high", source: "苏州地铁官方" },
        { name: "打车起步价", value: 11, unit: "元", confidence: "high", source: "滴滴官方" },
        { name: "打车每公里价", value: 2.0, unit: "元/km", confidence: "high", source: "滴滴官方" },
        { name: "共享单车月费", value: 25, unit: "元/月", confidence: "high", source: "美团/哈啰" },
        { name: "停车费（市中心/天）", value: 40, unit: "元/天", confidence: "medium", source: "用户提交" },
        { name: "汽油价格", value: 8.1, unit: "元/升", confidence: "high", source: "发改委 2026.06" },
      ]},
      { title: "🎬 娱乐", color: "purple", items: [
        { name: "电影票（均价）", value: 47, unit: "元", confidence: "high", source: "猫眼 2026Q1" },
        { name: "健身房月费", value: 230, unit: "元/月", confidence: "medium", source: "大众点评" },
        { name: "景区门票（均价）", value: 60, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "网费（宽带100M）", value: 85, unit: "元/月", confidence: "high", source: "运营商官方" },
      ]},
      { title: "🎓 教育", color: "teal", items: [
        { name: "公立幼儿园月费", value: 500, unit: "元/月", confidence: "high", source: "江苏省教委" },
        { name: "私立幼儿园月费", value: 3000, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "补习班（/课时）", value: 160, unit: "元/课时", confidence: "medium", source: "用户提交" },
      ]},
      { title: "🏥 医疗", color: "red", items: [
        { name: "普通门诊挂号费", value: 30, unit: "元", confidence: "high", source: "江苏省医保局" },
        { name: "常见药品（退烧药）", value: 22, unit: "元", confidence: "high", source: "京东健康均价" },
        { name: "体检套餐均价", value: 400, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "牙科洗牙均价", value: 180, unit: "元", confidence: "medium", source: "大众点评" },
      ]},
    ],
  },

  tianjin: {
    name: "天津", province: "天津", population: "1380万", avg_salary: 8800,
    categories: [
      { title: "🏠 居住", color: "blue", items: [
        { name: "市中心一居室月租", value: 3800, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "郊区一居室月租", value: 2400, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "合租单间月租", value: 1700, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "水电燃气网（月均）", value: 300, unit: "元/月", confidence: "high", source: "官方统计" },
        { name: "购房均价", value: 18000, unit: "元/㎡", confidence: "high", source: "贝壳 2026Q1" },
      ]},
      { title: "🍜 餐饮", color: "green", items: [
        { name: "普通午餐", value: 18, unit: "元/餐", confidence: "high", source: "美团 2026Q1" },
        { name: "中档餐厅双人套餐", value: 130, unit: "元", confidence: "medium", source: "大众点评" },
        { name: "外卖均价", value: 28, unit: "元/单", confidence: "high", source: "美团/饿了么" },
        { name: "超市菜篮子（周均）", value: 240, unit: "元/周", confidence: "medium", source: "用户提交" },
        { name: "咖啡（瑞幸中杯）", value: 16, unit: "元", confidence: "high", source: "官方定价" },
        { name: "啤酒（超市500ml）", value: 5.5, unit: "元", confidence: "high", source: "超市均价" },
        { name: "瓶装水500ml", value: 1.5, unit: "元", confidence: "high", source: "便利店均价" },
      ]},
      { title: "🚇 交通", color: "amber", items: [
        { name: "地铁/公交月卡", value: 180, unit: "元/月", confidence: "high", source: "天津地铁官方" },
        { name: "打车起步价", value: 12, unit: "元", confidence: "high", source: "滴滴官方" },
        { name: "打车每公里价", value: 2.1, unit: "元/km", confidence: "high", source: "滴滴官方" },
        { name: "共享单车月费", value: 25, unit: "元/月", confidence: "high", source: "美团/哈啰" },
        { name: "停车费（市中心/天）", value: 40, unit: "元/天", confidence: "medium", source: "用户提交" },
        { name: "汽油价格", value: 8.2, unit: "元/升", confidence: "high", source: "发改委 2026.06" },
      ]},
      { title: "🎬 娱乐", color: "purple", items: [
        { name: "电影票（均价）", value: 47, unit: "元", confidence: "high", source: "猫眼 2026Q1" },
        { name: "健身房月费", value: 210, unit: "元/月", confidence: "medium", source: "大众点评" },
        { name: "景区门票（均价）", value: 40, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "网费（宽带100M）", value: 90, unit: "元/月", confidence: "high", source: "运营商官方" },
      ]},
      { title: "🎓 教育", color: "teal", items: [
        { name: "公立幼儿园月费", value: 500, unit: "元/月", confidence: "high", source: "天津市教委" },
        { name: "私立幼儿园月费", value: 2800, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "补习班（/课时）", value: 150, unit: "元/课时", confidence: "medium", source: "用户提交" },
      ]},
      { title: "🏥 医疗", color: "red", items: [
        { name: "普通门诊挂号费", value: 30, unit: "元", confidence: "high", source: "天津市医保局" },
        { name: "常见药品（退烧药）", value: 22, unit: "元", confidence: "high", source: "京东健康均价" },
        { name: "体检套餐均价", value: 400, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "牙科洗牙均价", value: 180, unit: "元", confidence: "medium", source: "大众点评" },
      ]},
    ],
  },

  changsha: {
    name: "长沙", province: "湖南", population: "1040万", avg_salary: 8000,
    categories: [
      { title: "🏠 居住", color: "blue", items: [
        { name: "市中心一居室月租", value: 2800, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "郊区一居室月租", value: 1800, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "合租单间月租", value: 1300, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "水电燃气网（月均）", value: 270, unit: "元/月", confidence: "high", source: "官方统计" },
        { name: "购房均价", value: 12000, unit: "元/㎡", confidence: "high", source: "贝壳 2026Q1" },
      ]},
      { title: "🍜 餐饮", color: "green", items: [
        { name: "普通午餐", value: 15, unit: "元/餐", confidence: "high", source: "美团 2026Q1" },
        { name: "中档餐厅双人套餐", value: 110, unit: "元", confidence: "medium", source: "大众点评" },
        { name: "外卖均价", value: 26, unit: "元/单", confidence: "high", source: "美团/饿了么" },
        { name: "超市菜篮子（周均）", value: 210, unit: "元/周", confidence: "medium", source: "用户提交" },
        { name: "咖啡（瑞幸中杯）", value: 16, unit: "元", confidence: "high", source: "官方定价" },
        { name: "啤酒（超市500ml）", value: 5, unit: "元", confidence: "high", source: "超市均价" },
        { name: "瓶装水500ml", value: 1.5, unit: "元", confidence: "high", source: "便利店均价" },
      ]},
      { title: "🚇 交通", color: "amber", items: [
        { name: "地铁/公交月卡", value: 160, unit: "元/月", confidence: "high", source: "长沙地铁官方" },
        { name: "打车起步价", value: 10, unit: "元", confidence: "high", source: "滴滴官方" },
        { name: "打车每公里价", value: 1.9, unit: "元/km", confidence: "high", source: "滴滴官方" },
        { name: "共享单车月费", value: 25, unit: "元/月", confidence: "high", source: "美团/哈啰" },
        { name: "停车费（市中心/天）", value: 30, unit: "元/天", confidence: "medium", source: "用户提交" },
        { name: "汽油价格", value: 8.0, unit: "元/升", confidence: "high", source: "发改委 2026.06" },
      ]},
      { title: "🎬 娱乐", color: "purple", items: [
        { name: "电影票（均价）", value: 43, unit: "元", confidence: "high", source: "猫眼 2026Q1" },
        { name: "健身房月费", value: 190, unit: "元/月", confidence: "medium", source: "大众点评" },
        { name: "景区门票（均价）", value: 45, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "网费（宽带100M）", value: 80, unit: "元/月", confidence: "high", source: "运营商官方" },
      ]},
      { title: "🎓 教育", color: "teal", items: [
        { name: "公立幼儿园月费", value: 380, unit: "元/月", confidence: "high", source: "湖南省教委" },
        { name: "私立幼儿园月费", value: 2500, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "补习班（/课时）", value: 140, unit: "元/课时", confidence: "medium", source: "用户提交" },
      ]},
      { title: "🏥 医疗", color: "red", items: [
        { name: "普通门诊挂号费", value: 20, unit: "元", confidence: "high", source: "湖南省医保局" },
        { name: "常见药品（退烧药）", value: 20, unit: "元", confidence: "high", source: "京东健康均价" },
        { name: "体检套餐均价", value: 360, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "牙科洗牙均价", value: 160, unit: "元", confidence: "medium", source: "大众点评" },
      ]},
    ],
  },

  zhengzhou: {
    name: "郑州", province: "河南", population: "1260万", avg_salary: 7200,
    categories: [
      { title: "🏠 居住", color: "blue", items: [
        { name: "市中心一居室月租", value: 2500, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "郊区一居室月租", value: 1600, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "合租单间月租", value: 1100, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "水电燃气网（月均）", value: 260, unit: "元/月", confidence: "high", source: "官方统计" },
        { name: "购房均价", value: 11000, unit: "元/㎡", confidence: "high", source: "贝壳 2026Q1" },
      ]},
      { title: "🍜 餐饮", color: "green", items: [
        { name: "普通午餐", value: 13, unit: "元/餐", confidence: "high", source: "美团 2026Q1" },
        { name: "中档餐厅双人套餐", value: 100, unit: "元", confidence: "medium", source: "大众点评" },
        { name: "外卖均价", value: 23, unit: "元/单", confidence: "high", source: "美团/饿了么" },
        { name: "超市菜篮子（周均）", value: 200, unit: "元/周", confidence: "medium", source: "用户提交" },
        { name: "咖啡（瑞幸中杯）", value: 16, unit: "元", confidence: "high", source: "官方定价" },
        { name: "啤酒（超市500ml）", value: 4.5, unit: "元", confidence: "high", source: "超市均价" },
        { name: "瓶装水500ml", value: 1.5, unit: "元", confidence: "high", source: "便利店均价" },
      ]},
      { title: "🚇 交通", color: "amber", items: [
        { name: "地铁/公交月卡", value: 150, unit: "元/月", confidence: "high", source: "郑州地铁官方" },
        { name: "打车起步价", value: 9, unit: "元", confidence: "high", source: "滴滴官方" },
        { name: "打车每公里价", value: 1.8, unit: "元/km", confidence: "high", source: "滴滴官方" },
        { name: "共享单车月费", value: 25, unit: "元/月", confidence: "high", source: "美团/哈啰" },
        { name: "停车费（市中心/天）", value: 30, unit: "元/天", confidence: "medium", source: "用户提交" },
        { name: "汽油价格", value: 8.1, unit: "元/升", confidence: "high", source: "发改委 2026.06" },
      ]},
      { title: "🎬 娱乐", color: "purple", items: [
        { name: "电影票（均价）", value: 42, unit: "元", confidence: "high", source: "猫眼 2026Q1" },
        { name: "健身房月费", value: 180, unit: "元/月", confidence: "medium", source: "大众点评" },
        { name: "景区门票（均价）", value: 40, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "网费（宽带100M）", value: 75, unit: "元/月", confidence: "high", source: "运营商官方" },
      ]},
      { title: "🎓 教育", color: "teal", items: [
        { name: "公立幼儿园月费", value: 380, unit: "元/月", confidence: "high", source: "河南省教委" },
        { name: "私立幼儿园月费", value: 2200, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "补习班（/课时）", value: 130, unit: "元/课时", confidence: "medium", source: "用户提交" },
      ]},
      { title: "🏥 医疗", color: "red", items: [
        { name: "普通门诊挂号费", value: 20, unit: "元", confidence: "high", source: "河南省医保局" },
        { name: "常见药品（退烧药）", value: 18, unit: "元", confidence: "high", source: "京东健康均价" },
        { name: "体检套餐均价", value: 320, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "牙科洗牙均价", value: 150, unit: "元", confidence: "medium", source: "大众点评" },
      ]},
    ],
  },

  qingdao: {
    name: "青岛", province: "山东", population: "1020万", avg_salary: 7800,
    categories: [
      { title: "🏠 居住", color: "blue", items: [
        { name: "市中心一居室月租", value: 3200, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "郊区一居室月租", value: 2000, unit: "元/月", confidence: "high", source: "链家 2026Q1" },
        { name: "合租单间月租", value: 1500, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "水电燃气网（月均）", value: 280, unit: "元/月", confidence: "high", source: "官方统计" },
        { name: "购房均价", value: 17000, unit: "元/㎡", confidence: "high", source: "贝壳 2026Q1" },
      ]},
      { title: "🍜 餐饮", color: "green", items: [
        { name: "普通午餐", value: 18, unit: "元/餐", confidence: "high", source: "美团 2026Q1" },
        { name: "中档餐厅双人套餐", value: 130, unit: "元", confidence: "medium", source: "大众点评" },
        { name: "外卖均价", value: 27, unit: "元/单", confidence: "high", source: "美团/饿了么" },
        { name: "超市菜篮子（周均）", value: 230, unit: "元/周", confidence: "medium", source: "用户提交" },
        { name: "咖啡（瑞幸中杯）", value: 16, unit: "元", confidence: "high", source: "官方定价" },
        { name: "啤酒（超市500ml）", value: 5, unit: "元", confidence: "high", source: "超市均价" },
        { name: "瓶装水500ml", value: 2, unit: "元", confidence: "high", source: "便利店均价" },
      ]},
      { title: "🚇 交通", color: "amber", items: [
        { name: "地铁/公交月卡", value: 170, unit: "元/月", confidence: "high", source: "青岛地铁官方" },
        { name: "打车起步价", value: 11, unit: "元", confidence: "high", source: "滴滴官方" },
        { name: "打车每公里价", value: 2.0, unit: "元/km", confidence: "high", source: "滴滴官方" },
        { name: "共享单车月费", value: 25, unit: "元/月", confidence: "high", source: "美团/哈啰" },
        { name: "停车费（市中心/天）", value: 35, unit: "元/天", confidence: "medium", source: "用户提交" },
        { name: "汽油价格", value: 8.1, unit: "元/升", confidence: "high", source: "发改委 2026.06" },
      ]},
      { title: "🎬 娱乐", color: "purple", items: [
        { name: "电影票（均价）", value: 45, unit: "元", confidence: "high", source: "猫眼 2026Q1" },
        { name: "健身房月费", value: 200, unit: "元/月", confidence: "medium", source: "大众点评" },
        { name: "景区门票（均价）", value: 60, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "网费（宽带100M）", value: 80, unit: "元/月", confidence: "high", source: "运营商官方" },
      ]},
      { title: "🎓 教育", color: "teal", items: [
        { name: "公立幼儿园月费", value: 450, unit: "元/月", confidence: "high", source: "山东省教委" },
        { name: "私立幼儿园月费", value: 2800, unit: "元/月", confidence: "medium", source: "用户提交" },
        { name: "补习班（/课时）", value: 150, unit: "元/课时", confidence: "medium", source: "用户提交" },
      ]},
      { title: "🏥 医疗", color: "red", items: [
        { name: "普通门诊挂号费", value: 25, unit: "元", confidence: "high", source: "山东省医保局" },
        { name: "常见药品（退烧药）", value: 20, unit: "元", confidence: "high", source: "京东健康均价" },
        { name: "体检套餐均价", value: 380, unit: "元", confidence: "medium", source: "用户提交" },
        { name: "牙科洗牙均价", value: 170, unit: "元", confidence: "medium", source: "大众点评" },
      ]},
    ],
  },
};
