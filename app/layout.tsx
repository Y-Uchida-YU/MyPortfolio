import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif", weight: "400", style: ["normal", "italic"], subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: "Yuta Uchida — Web Designer & Developer",
  description:
    "業界の空気を、サイトの手ざわりに。企画・デザイン・フロントエンド実装まで一貫して手がける内田裕太のポートフォリオ。制作実績12件。",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Yuta Uchida — Web Designer & Developer",
    description: "制作実績 2026 — EC / 採用 / コーポレート / スポーツ / 飲食 / 医療の12サイト",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Yuta Uchida Selected Works 2026" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className={`${sans.variable} ${mono.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
