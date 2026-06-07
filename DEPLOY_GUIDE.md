# 城市生活成本数据库 - Vercel 部署指南

## 方式一：GitHub + Vercel（推荐）

### 步骤 1：在 GitHub 创建仓库

1. 打开 [https://github.com/new](https://github.com/new)
2. 仓库名填写：`city-cost`
3. 可见性选 `Public`（Private 也可以，Vercel 免费版需授权）
4. 点击 **Create repository**

### 步骤 2：推送本地代码

在终端执行以下命令：

```bash
cd F:\WorkBuddy\202607软件开发\city-cost
git remote add origin https://github.com/YOUR_USERNAME/city-cost.git
git branch -M main
git push -u origin main
```

> 将 `YOUR_USERNAME` 替换为你的 GitHub 用户名。

### 步骤 3：登录 Vercel 并导入项目

1. 打开 [https://vercel.com/new](https://vercel.com/new)
2. 点击 **Import Git Repository**
3. 选择 `city-cost` 仓库
4. 在配置页面：
   - **Framework Preset**: 保持默认（Next.js）
   - **Environment Variables**: 添加以下两项
     - `NEXT_PUBLIC_SUPABASE_URL` → `https://qztieybetureqwjqngot.supabase.co`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → `YOUR_SUPABASE_ANON_KEY_HERE`
5. 点击 **Deploy**

等待 1-2 分钟，部署完成后 Vercel 会给你分配一个 `xxx.vercel.app` 域名。

---

## 方式二：Vercel CLI 部署（无需 GitHub）

### 安装 Vercel CLI

```bash
npm i -g vercel
```

### 登录并部署

```bash
cd F:\WorkBuddy\202607软件开发\city-cost
vercel login
vercel --prod
```

CLI 会提示你输入环境变量，添加：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 验证部署

部署成功后，访问你的域名并测试以下页面：
- `/` → 首页
- `/cities` → 城市列表
- `/cities/beijing` → 北京详情
- `/compare` → 城市对比

成功接通 Supabase 后，北京详情页顶部会显示：
> ✅ 数据来自 Supabase 数据库，实时更新
