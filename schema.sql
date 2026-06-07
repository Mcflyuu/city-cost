-- ============================================================
-- 城本 CityCost 数据库 Schema
-- 运行方式：在 Supabase SQL Editor 中执行
-- ============================================================

-- 1. 城市表
CREATE TABLE IF NOT EXISTS cities (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  province    TEXT NOT NULL,
  population  TEXT,
  avg_salary  INTEGER,           -- 平均税后月薪（元）
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 数据分类表（居住/餐饮/交通...）
CREATE TABLE IF NOT EXISTS categories (
  id    SERIAL PRIMARY KEY,
  name  TEXT UNIQUE NOT NULL,      -- e.g. "居住", "餐饮"
  icon  TEXT,                       -- emoji or icon class
  color TEXT                        -- tailwind color ramp name
);

-- 3. 数据项定义表（每个分类下有哪些指标）
CREATE TABLE IF NOT EXISTS data_items (
  id          SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,         -- e.g. "市中心一居室月租"
  unit        TEXT NOT NULL,         -- e.g. "元/月", "元"
  sort_order  INTEGER DEFAULT 0
);

-- 4. 核心数据表：各城市各指标的数值
CREATE TABLE IF NOT EXISTS data_points (
  id              SERIAL PRIMARY KEY,
  city_id         INTEGER REFERENCES cities(id) ON DELETE CASCADE,
  data_item_id    INTEGER REFERENCES data_items(id) ON DELETE CASCADE,
  value           NUMERIC(12,2),
  confidence      TEXT DEFAULT 'medium',  -- 'high' | 'medium' | 'low'
  source          TEXT,                    -- 数据来源描述
  source_type     TEXT DEFAULT 'user',    -- 'official' | 'crawler' | 'user' | 'ai'
  verified        BOOLEAN DEFAULT false,  -- 是否经过人工审核
  submitted_by    TEXT,                   -- 提交者标识（可选）
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(city_id, data_item_id, source_type)
);

-- 5. 薪资数据表
CREATE TABLE IF NOT EXISTS salary_data (
  id           SERIAL PRIMARY KEY,
  city_id      INTEGER REFERENCES cities(id) ON DELETE CASCADE,
  industry     TEXT,                  -- e.g. "互联网", "金融", "应届生"
  avg_salary   INTEGER,              -- 平均税后月薪（元）
  sample_size  INTEGER,              -- 样本量
  source       TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 6. 用户贡献记录表（用于积分/审核）
CREATE TABLE IF NOT EXISTS contributions (
  id            SERIAL PRIMARY KEY,
  city_id       INTEGER REFERENCES cities(id) ON DELETE CASCADE,
  data_item_id  INTEGER REFERENCES data_items(id) ON DELETE CASCADE,
  value         NUMERIC(12,2),
  submitted_by  TEXT,                -- 用户标识（微信/openid）
  contact       TEXT,                -- 联系方式（可选，仅用于核实）
  status        TEXT DEFAULT 'pending',  -- 'pending' | 'approved' | 'rejected'
  review_note   TEXT,                -- 审核备注
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 索引
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_data_points_city    ON data_points(city_id);
CREATE INDEX IF NOT EXISTS idx_data_points_item    ON data_points(data_item_id);
CREATE INDEX IF NOT EXISTS idx_data_points_verified ON data_points(verified);
CREATE INDEX IF NOT EXISTS idx_contributions_status ON contributions(status);
CREATE INDEX IF NOT EXISTS idx_contributions_city   ON contributions(city_id);

-- ============================================================
-- 种子数据：分类 + 数据项
-- ============================================================
INSERT INTO categories (name, icon, color) VALUES
  ('居住', '🏠', 'blue'),
  ('餐饮', '🍜', 'green'),
  ('交通', '🚇', 'amber'),
  ('娱乐', '🎬', 'purple'),
  ('教育', '🎓', 'teal'),
  ('医疗', '🏥', 'red')
ON CONFLICT (name) DO NOTHING;

-- 居住类数据项
INSERT INTO data_items (category_id, name, unit, sort_order) VALUES
  (1, '市中心一居室月租', '元/月', 1),
  (1, '郊区一居室月租', '元/月', 2),
  (1, '合租单间月租', '元/月', 3),
  (1, '水电燃气网月均', '元/月', 4),
  (1, '购房均价', '元/㎡', 5)
ON CONFLICT DO NOTHING;

-- 餐饮类数据项
INSERT INTO data_items (category_id, name, unit, sort_order) VALUES
  (2, '普通午餐（快餐/食堂）', '元/餐', 1),
  (2, '中档餐厅双人套餐', '元', 2),
  (2, '外卖均价', '元/单', 3),
  (2, '超市菜篮子周均', '元/周', 4),
  (2, '咖啡（瑞幸中杯）', '元', 5),
  (2, '啤酒（超市500ml）', '元', 6),
  (2, '瓶装水500ml', '元', 7)
ON CONFLICT DO NOTHING;

-- 交通类数据项
INSERT INTO data_items (category_id, name, unit, sort_order) VALUES
  (3, '地铁/公交月卡', '元/月', 1),
  (3, '打车起步价', '元', 2),
  (3, '打车每公里价', '元/km', 3),
  (3, '共享单车月费', '元/月', 4),
  (3, '停车费（市中心/天）', '元/天', 5),
  (3, '汽油价格', '元/升', 6)
ON CONFLICT DO NOTHING;

-- 娱乐类数据项
INSERT INTO data_items (category_id, name, unit, sort_order) VALUES
  (4, '电影票（均价）', '元', 1),
  (4, '健身房月费', '元/月', 2),
  (4, '景区门票（均价）', '元', 3),
  (4, '网费（宽带100M/月）', '元/月', 4)
ON CONFLICT DO NOTHING;

-- 教育类数据项
INSERT INTO data_items (category_id, name, unit, sort_order) VALUES
  (5, '公立幼儿园月费', '元/月', 1),
  (5, '私立幼儿园月费', '元/月', 2),
  (5, '补习班均价（/课时）', '元/课时', 3)
ON CONFLICT DO NOTHING;

-- 医疗类数据项
INSERT INTO data_items (category_id, name, unit, sort_order) VALUES
  (6, '普通门诊挂号费', '元', 1),
  (6, '常见药品（退烧药/盒）', '元', 2),
  (6, '体检套餐均价', '元', 3),
  (6, '牙科洗牙均价', '元', 4)
ON CONFLICT DO NOTHING;

-- ============================================================
-- 种子城市数据（15 城）
-- ============================================================
INSERT INTO cities (slug, name, province, population, avg_salary) VALUES
  ('beijing',   '北京', '北京',   '2180万', 12000),
  ('shanghai',  '上海', '上海',   '2480万', 11500),
  ('guangzhou', '广州', '广东',   '1880万', 9500),
  ('shenzhen',  '深圳', '广东',   '1760万', 11000),
  ('hangzhou',   '杭州', '浙江',   '1220万', 10500),
  ('chengdu',    '成都', '四川',   '2120万', 8200),
  ('wuhan',      '武汉', '湖北',   '1360万', 8500),
  ('nanjing',    '南京', '江苏',   '950万',  9800),
  ('xian',       '西安', '陕西',   '1300万', 7800),
  ('chongqing',  '重庆', '重庆',   '3210万', 7500),
  ('suzhou',     '苏州', '江苏',   '1270万', 9200),
  ('tianjin',    '天津', '天津',   '1380万', 8800),
  ('changsha',   '长沙', '湖南',   '1040万', 8000),
  ('zhengzhou',  '郑州', '河南',   '1260万', 7200),
  ('qingdao',    '青岛', '山东',   '1020万', 7800)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- 北京种子数据（示例）
-- ============================================================
-- 居住
INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified)
SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true
FROM cities c, data_items di,
     (VALUES
        (1, 7500, 'high', '链家 2026Q1'),
        (2, 4500, 'high', '链家 2026Q1'),
        (3, 3200, 'medium', '用户提交 12 条'),
        (4, 380,  'high', '官方统计 + 用户验证'),
        (5, 62000,'high', '贝壳 2026Q1')
     ) AS v(item_sort, val, conf, src)
WHERE c.slug = 'beijing' AND di.category_id = 1 AND di.sort_order = v.item_sort
ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE
  SET value = EXCLUDED.value, confidence = EXCLUDED.confidence, source = EXCLUDED.source, updated_at = NOW();

-- 餐饮
INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified)
SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true
FROM cities c, data_items di,
     (VALUES
        (1, 25,  'high',   '美团数据 2026Q1'),
        (2, 180, 'medium', '大众点评 2026Q1'),
        (3, 35,  'high',   '美团/饿了么 2026Q1'),
        (4, 320, 'medium', '用户提交 8 条'),
        (5, 16,  'high',   '官方定价'),
        (6, 6,   'high',   '京东/淘宝均价'),
        (7, 2,   'high',   '便利店均价')
     ) AS v(item_sort, val, conf, src)
WHERE c.slug = 'beijing' AND di.category_id = 2 AND di.sort_order = v.item_sort
ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE
  SET value = EXCLUDED.value, confidence = EXCLUDED.confidence, source = EXCLUDED.source, updated_at = NOW();

-- 交通
INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified)
SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true
FROM cities c, data_items di,
     (VALUES
        (1, 260, 'high', '北京地铁官方'),
        (2, 13,  'high', '滴滴官方'),
        (3, 2.5, 'high', '滴滴官方'),
        (4, 25,  'high', '美团/哈啰官方'),
        (5, 60,  'medium', '用户提交'),
        (6, 8.2, 'high', '发改委 2026.06')
     ) AS v(item_sort, val, conf, src)
WHERE c.slug = 'beijing' AND di.category_id = 3 AND di.sort_order = v.item_sort
ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE
  SET value = EXCLUDED.value, confidence = EXCLUDED.confidence, source = EXCLUDED.source, updated_at = NOW();

-- 娱乐
INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified)
SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true
FROM cities c, data_items di,
     (VALUES
        (1, 55, 'high',   '猫眼 2026Q1'),
        (2, 280,'medium', '大众点评 2026Q1'),
        (3, 40, 'medium', '用户提交'),
        (4, 100,'high',   '运营商官方')
     ) AS v(item_sort, val, conf, src)
WHERE c.slug = 'beijing' AND di.category_id = 4 AND di.sort_order = v.item_sort
ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE
  SET value = EXCLUDED.value, confidence = EXCLUDED.confidence, source = EXCLUDED.source, updated_at = NOW();

-- 教育
INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified)
SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true
FROM cities c, data_items di,
     (VALUES
        (1, 750,  'high',   '北京市教委 2025'),
        (2, 3500, 'medium', '用户提交 5 条'),
        (3, 200,  'medium', '用户提交')
     ) AS v(item_sort, val, conf, src)
WHERE c.slug = 'beijing' AND di.category_id = 5 AND di.sort_order = v.item_sort
ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE
  SET value = EXCLUDED.value, confidence = EXCLUDED.confidence, source = EXCLUDED.source, updated_at = NOW();

-- 医疗
INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified)
SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true
FROM cities c, data_items di,
     (VALUES
        (1, 50, 'high',   '北京市医保局'),
        (2, 25, 'high',   '京东健康均价'),
        (3, 500,'medium', '用户提交'),
        (4, 200,'medium', '大众点评 2026Q1')
     ) AS v(item_sort, val, conf, src)
WHERE c.slug = 'beijing' AND di.category_id = 6 AND di.sort_order = v.item_sort
ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE
  SET value = EXCLUDED.value, confidence = EXCLUDED.confidence, source = EXCLUDED.source, updated_at = NOW();

-- 薪资数据（北京）
INSERT INTO salary_data (city_id, industry, avg_salary, sample_size, source) VALUES
  ((SELECT id FROM cities WHERE slug='beijing'), '互联网', 15000, 1200, 'Boss直聘 2026Q1'),
  ((SELECT id FROM cities WHERE slug='beijing'), '金融',   14000, 800,  'Boss直聘 2026Q1'),
  ((SELECT id FROM cities WHERE slug='beijing'), '应届生',  8500,  600,  '应届生求职网 2026'),
  ((SELECT id FROM cities WHERE slug='beijing'), '平均',   12000, 2600, '综合统计')
ON CONFLICT DO NOTHING;

-- ============================================================
-- 其余 14 城市数据（使用辅助函数批量插入）
-- ============================================================

-- 辅助：批量插入城市数据点（按分类 + sort_order 匹配）
-- 上海
DO $$
DECLARE city_slug TEXT := 'shanghai';
BEGIN
  -- 居住
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified)
  SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true
  FROM cities c, data_items di,
       (VALUES (1,7800,'high','链家 2026Q1'),(2,4800,'high','链家 2026Q1'),(3,3500,'medium','用户提交'),(4,360,'high','官方统计'),(5,65000,'high','贝壳 2026Q1')) AS v(s,val,conf,src)
  WHERE c.slug=city_slug AND di.category_id=1 AND di.sort_order=v.s
  ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  -- 餐饮
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified)
  SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true
  FROM cities c, data_items di,
       (VALUES (1,28,'high','美团 2026Q1'),(2,200,'medium','大众点评'),(3,38,'high','美团/饿了么'),(4,300,'medium','用户提交'),(5,16,'high','官方定价'),(6,6.5,'high','超市均价'),(7,2,'high','便利店均价')) AS v(s,val,conf,src)
  WHERE c.slug=city_slug AND di.category_id=2 AND di.sort_order=v.s
  ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  -- 交通
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified)
  SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true
  FROM cities c, data_items di,
       (VALUES (1,250,'high','上海地铁官方'),(2,14,'high','滴滴官方'),(3,2.5,'high','滴滴官方'),(4,25,'high','美团/哈啰'),(5,70,'medium','用户提交'),(6,8.1,'high','发改委')) AS v(s,val,conf,src)
  WHERE c.slug=city_slug AND di.category_id=3 AND di.sort_order=v.s
  ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  -- 娱乐
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified)
  SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true
  FROM cities c, data_items di,
       (VALUES (1,55,'high','猫眼 2026Q1'),(2,320,'medium','大众点评'),(3,50,'medium','用户提交'),(4,100,'high','运营商')) AS v(s,val,conf,src)
  WHERE c.slug=city_slug AND di.category_id=4 AND di.sort_order=v.s
  ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  -- 教育
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified)
  SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true
  FROM cities c, data_items di,
       (VALUES (1,600,'high','上海市教委'),(2,4000,'medium','用户提交'),(3,220,'medium','用户提交')) AS v(s,val,conf,src)
  WHERE c.slug=city_slug AND di.category_id=5 AND di.sort_order=v.s
  ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  -- 医疗
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified)
  SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true
  FROM cities c, data_items di,
       (VALUES (1,50,'high','上海市医保局'),(2,25,'high','京东健康'),(3,550,'medium','用户提交'),(4,220,'medium','大众点评')) AS v(s,val,conf,src)
  WHERE c.slug=city_slug AND di.category_id=6 AND di.sort_order=v.s
  ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
END $$;

-- 广州
DO $$
DECLARE city_slug TEXT := 'guangzhou';
BEGIN
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,4800,'high','链家 2026Q1'),(2,3000,'high','链家 2026Q1'),(3,2200,'medium','用户提交'),(4,320,'high','官方统计'),(5,30000,'high','贝壳 2026Q1')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=1 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,20,'high','美团 2026Q1'),(2,150,'medium','大众点评'),(3,30,'high','美团/饿了么'),(4,260,'medium','用户提交'),(5,16,'high','官方定价'),(6,5.5,'high','超市均价'),(7,2,'high','便利店均价')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=2 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,190,'high','广州地铁官方'),(2,12,'high','滴滴官方'),(3,2.2,'high','滴滴官方'),(4,25,'high','美团/哈啰'),(5,45,'medium','用户提交'),(6,7.9,'high','发改委')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=3 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,48,'high','猫眼 2026Q1'),(2,260,'medium','大众点评'),(3,40,'medium','用户提交'),(4,90,'high','运营商')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=4 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,500,'high','广州市教委'),(2,3000,'medium','用户提交'),(3,180,'medium','用户提交')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=5 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,25,'high','广东省医保局'),(2,22,'high','京东健康'),(3,420,'medium','用户提交'),(4,180,'medium','大众点评')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=6 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
END $$;

-- 深圳
DO $$
DECLARE city_slug TEXT := 'shenzhen';
BEGIN
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,6500,'high','链家 2026Q1'),(2,4200,'high','链家 2026Q1'),(3,2800,'medium','用户提交'),(4,350,'high','官方统计'),(5,55000,'high','贝壳 2026Q1')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=1 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,25,'high','美团 2026Q1'),(2,190,'medium','大众点评'),(3,38,'high','美团/饿了么'),(4,290,'medium','用户提交'),(5,16,'high','官方定价'),(6,6,'high','超市均价'),(7,2,'high','便利店均价')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=2 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,200,'high','深圳地铁官方'),(2,12,'high','滴滴官方'),(3,2.4,'high','滴滴官方'),(4,25,'high','美团/哈啰'),(5,55,'medium','用户提交'),(6,8.0,'high','发改委')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=3 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,50,'high','猫眼 2026Q1'),(2,300,'medium','大众点评'),(3,35,'medium','用户提交'),(4,90,'high','运营商')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=4 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,600,'high','深圳市教委'),(2,3800,'medium','用户提交'),(3,200,'medium','用户提交')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=5 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,30,'high','深圳市医保局'),(2,23,'high','京东健康'),(3,480,'medium','用户提交'),(4,200,'medium','大众点评')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=6 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
END $$;

-- 杭州
DO $$
DECLARE city_slug TEXT := 'hangzhou';
BEGIN
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,5500,'high','链家 2026Q1'),(2,3200,'high','链家 2026Q1'),(3,2500,'medium','用户提交'),(4,320,'high','官方统计'),(5,33000,'high','贝壳 2026Q1')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=1 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,22,'high','美团 2026Q1'),(2,160,'medium','大众点评'),(3,32,'high','美团/饿了么'),(4,280,'medium','用户提交'),(5,16,'high','官方定价'),(6,5.5,'high','超市均价'),(7,2,'high','便利店均价')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=2 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,210,'high','杭州地铁官方'),(2,12,'high','滴滴官方'),(3,2.2,'high','滴滴官方'),(4,25,'high','美团/哈啰'),(5,50,'medium','用户提交'),(6,8.1,'high','发改委')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=3 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,50,'high','猫眼 2026Q1'),(2,250,'medium','大众点评'),(3,60,'medium','用户提交'),(4,90,'high','运营商')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=4 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,500,'high','杭州市教委'),(2,3000,'medium','用户提交'),(3,180,'medium','用户提交')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=5 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,30,'high','浙江省医保局'),(2,22,'high','京东健康'),(3,450,'medium','用户提交'),(4,180,'medium','大众点评')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=6 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
END $$;

-- 成都
DO $$
DECLARE city_slug TEXT := 'chengdu';
BEGIN
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,3500,'high','链家 2026Q1'),(2,2200,'high','链家 2026Q1'),(3,1600,'medium','用户提交'),(4,290,'high','官方统计'),(5,18000,'high','贝壳 2026Q1')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=1 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,18,'high','美团 2026Q1'),(2,130,'medium','大众点评'),(3,28,'high','美团/饿了么'),(4,230,'medium','用户提交'),(5,16,'high','官方定价'),(6,5,'high','超市均价'),(7,1.5,'high','便利店均价')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=2 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,180,'high','成都地铁官方'),(2,10,'high','滴滴官方'),(3,2.0,'high','滴滴官方'),(4,25,'high','美团/哈啰'),(5,40,'medium','用户提交'),(6,8.0,'high','发改委')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=3 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,45,'high','猫眼 2026Q1'),(2,220,'medium','大众点评'),(3,50,'medium','用户提交'),(4,80,'high','运营商')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=4 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,400,'high','四川省教委'),(2,2500,'medium','用户提交'),(3,150,'medium','用户提交')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=5 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified) SELECT c.id, di.id, v.val, v.conf, v.src, 'official', true FROM cities c, data_items di, (VALUES (1,20,'high','四川省医保局'),(2,20,'high','京东健康'),(3,380,'medium','用户提交'),(4,160,'medium','大众点评')) AS v(s,val,conf,src) WHERE c.slug=city_slug AND di.category_id=6 AND di.sort_order=v.s ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
END $$;

-- 其余城市（武汉、南京、西安、重庆、苏州、天津、长沙、郑州、青岛）使用简化插入
DO $$
DECLARE
  cities_data RECORD;
BEGIN
  -- 定义各城市的居住数据（市中心租金、郊区租金、合租、水电、购房均价）
  FOR cities_data IN
    SELECT * FROM (VALUES
      ('wuhan',    3200, 2000, 1500, 280, 16000),
      ('nanjing',  4500, 2800, 2000, 310, 28000),
      ('xian',     2500, 1600, 1200, 260, 13000),
      ('chongqing',2800, 1800, 1300, 270, 12000),
      ('suzhou',   4200, 2600, 1900, 300, 22000),
      ('tianjin',  3800, 2400, 1700, 300, 18000),
      ('changsha', 2800, 1800, 1300, 270, 12000),
      ('zhengzhou',2500, 1600, 1100, 260, 11000),
      ('qingdao',  3200, 2000, 1500, 280, 17000)
    ) AS t(slug, rent_center, rent_suburb, rent_share, utilities, house_price)
  LOOP
    INSERT INTO data_points (city_id, data_item_id, value, confidence, source, source_type, verified)
    SELECT c.id, di.id, v.val, 'medium', '综合数据 2026Q1', 'user', true
    FROM cities c, data_items di,
         (VALUES (1,cities_data.rent_center),(2,cities_data.rent_suburb),(3,cities_data.rent_share),(4,cities_data.utilities),(5,cities_data.house_price)) AS v(s,val)
    WHERE c.slug=cities_data.slug AND di.category_id=1 AND di.sort_order=v.s
    ON CONFLICT (city_id, data_item_id, source_type) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW();
  END LOOP;
END $$;

-- ============================================================
-- Row Level Security（可选，公开读，仅认证用户写）
-- ============================================================
ALTER TABLE data_points ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_data" ON data_points FOR SELECT USING (true);

ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_insert_contributions" ON contributions FOR INSERT WITH CHECK (true);
CREATE POLICY "admin_manage_contributions" ON contributions FOR ALL USING (auth.role() = 'service_role');

-- ============================================================
-- 完成提示
-- ============================================================
-- SELECT 'Schema 创建完成！' AS status;
