import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "城本 - 城市生活成本数据库",
  description: "真实生活成本数据，帮你选择最适合的城市。覆盖全国主要城市，6大类35项生活成本指标。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-blue-600 no-underline">
              城本
            </a>
            <nav className="flex gap-6 text-sm text-gray-600">
              <a href="/cities" className="hover:text-blue-600 no-underline">城市列表</a>
              <a href="/compare" className="hover:text-blue-600 no-underline">城市对比</a>
              <a href="/calculator" className="hover:text-blue-600 no-underline font-medium text-blue-600">💰 收入计算器</a>
              <a href="/submit" className="hover:text-blue-600 no-underline">贡献数据</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="bg-white border-t mt-16">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500 text-center">
            © 2026 城本 CityCost · 数据仅供参考，以实际为准
          </div>
        </footer>
      </body>
    </html>
  );
}
