import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: "Yuta Uchida — Web Designer & Developer",
  description: "企画・デザイン・実装まで。業界ごとの体験を設計するWebポートフォリオ。",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Yuta Uchida — Web Designer & Developer",
    description: "作成サイト一覧 2026 — EC / Recruit / Blockchain / Sports",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Yuta Uchida Selected Works 2026" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
