# 城本 CityCost — Supabase 接入完整指南

## 前置条件

- 已有 [Supabase](https://supabase.com) 账号（免费注册）
- 本地已安装 Node.js（项目目录有 `node_modules`）

---

## 第一步：创建 Supabase 项目

1. 登录 https://supabase.com/dashboard
2. 点击 **New project**
3. 填写：
   - **Project name**：`city-cost`（或任意名称）
   - **Database Password**：设置一个强密码，**请保存好**
   - **Region**：选 `Northeast Asia (Tokyo)` 或 `Southeast Asia (Singapore)`（延迟最低）
4. 点击 **Create new project**，等待约 60 秒初始化完成

---

## 第二步：导入数据库 Schema

1. 进入你的项目，点击左侧菜单 **SQL Editor**
2. 点击右上角 **New query**
3. 打开本地文件 `F:\WorkBuddy\202607软件开发\city-cost\schema.sql`，**全选复制**内容
4. 粘贴到 SQL Editor，点击 **Run**（或按 `Ctrl+Enter`）
5. 等待执行完成，看到 `Success. No rows returned` 表示成功

> ⚠️ 如果出现 `ERROR: duplicate key value`，说明数据已存在，忽略即可。

**验证数据是否导入成功：**

在 SQL Editor 运行以下查询：
```sql
SELECT name, province, avg_salary FROM cities ORDER BY avg_salary DESC;
SELECT COUNT(*) as 数据点总数 FROM data_points;
```

应该看到 15 座城市和若干数据点。

---

## 第三步：获取 API 密钥

1. 在 Supabase 项目左侧，点击 **Settings**（⚙️）→ **API**
2. 复制以下两个值：
   - **Project URL**：格式类似 `https://xxxxxxxxxxxx.supabase.co`
   - **anon public key**：一长串 JWT Token

---

## 第四步：配置环境变量

在项目根目录 `F:\WorkBuddy\202607软件开发\city-cost\` 创建 `.env.local` 文件：

```bash
# 从 Supabase Settings > API 复制
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> **重要**：`.env.local` 已在 `.gitignore` 中，不会被提交到 Git，密钥安全。

---

## 第五步：本机启动验证

打开 PowerShell 或命令提示符，进入项目目录：

```powershell
cd F:\WorkBuddy\202607软件开发\city-cost
npm run dev
```

访问 http://localhost:3000

**验证 Supabase 是否接入成功：**

进入任意城市详情页（如 http://localhost:3000/cities/beijing），页面顶部应显示：

> ✓ **数据来自 Supabase 数据库，实时更新**

如果没有看到这个提示，说明连接失败，检查 `.env.local` 文件是否正确。

---

## 第六步：查看 & 管理数据

**在 Supabase 中浏览数据：**

- 左侧菜单 → **Table Editor** → 选择表名浏览
- 支持直接在界面里编辑数据

**添加更多城市数据：**

在 SQL Editor 里参考以下模板：

```sql
-- 插入新城市（以杭州为例，已有则跳过）
INSERT INTO cities (slug, name, province, population, avg_salary)
VALUES ('hangzhou', '杭州', '浙江', '1220万', 10500)
ON CONFLICT (slug) DO NOTHING;

-- 查看所有数据项的 ID（用于插入数据点）
SELECT di.id, c.name as 分类, di.name as 指标, di.unit
FROM data_items di
JOIN categories c ON c.id = di.category_id
ORDER BY di.category_id, di.sort_order;
```

---

## 第七步：部署到 Vercel（可选）

1. 把代码推到 GitHub：
   ```bash
   git init
   git add .
   git commit -m "初始化城市生活成本数据库"
   git remote add origin https://github.com/你的用户名/city-cost.git
   git push -u origin main
   ```
   > ⚠️ 确保 `.gitignore` 里有 `.env.local`，不要把密钥推上去！

2. 登录 https://vercel.com，点击 **Import Project**，选择你的 GitHub 仓库

3. 在 **Environment Variables** 里添加：
   - `NEXT_PUBLIC_SUPABASE_URL` = 你的 Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = 你的 anon key

4. 点击 **Deploy**，等待约 2 分钟

---

## 常见问题

### Q: 运行 schema.sql 报错 `relation "cities" already exists`？
A: 无需担心，SQL 里所有建表语句都用了 `IF NOT EXISTS`，已有的表不会被覆盖。

### Q: 城市详情页没显示 Supabase 标记，但也没报错？
A: 检查 `.env.local` 文件名是否正确（不是 `.env.local.example`），重启 `npm run dev`。

### Q: 如何关闭 Row Level Security（开发调试用）？
```sql
ALTER TABLE data_points DISABLE ROW LEVEL SECURITY;
ALTER TABLE contributions DISABLE ROW LEVEL SECURITY;
```
> 注意：生产环境不建议关闭 RLS。

### Q: 如何批量更新某城市的数据？
```sql
UPDATE data_points
SET value = 8000, updated_at = NOW()
WHERE city_id = (SELECT id FROM cities WHERE slug = 'hangzhou')
  AND data_item_id = (SELECT id FROM data_items WHERE name = '市中心一居室月租');
```

---

## 数据表结构速查

| 表名 | 说明 |
|------|------|
| `cities` | 城市基本信息（slug、名称、省份、平均薪资） |
| `categories` | 数据分类（居住/餐饮/交通/娱乐/教育/医疗） |
| `data_items` | 各分类下的具体指标定义 |
| `data_points` | 各城市各指标的数值（核心表） |
| `salary_data` | 各城市分行业薪资数据 |
| `contributions` | 用户提交的待审核数据 |

---

*文档生成时间：2026-06-07*
