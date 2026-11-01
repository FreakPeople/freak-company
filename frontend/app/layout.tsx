import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Freak Makers | 웹사이트·플랫폼·SaaS 개발 파트너",
  description:
    "아이디어를 실제 서비스로 만드는 프릭. 웹사이트, 플랫폼, SaaS, MVP 제작부터 QA까지 개발자와 직접 이야기하세요.",
  openGraph: {
    title: "Freak Makers | 아이디어를 실제 서비스로",
    description:
      "웹사이트부터 플랫폼, SaaS까지. 기획과 개발을 함께하는 디지털 제품 제작 파트너.",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Freak Makers | 아이디어를 실제 서비스로",
    description: "웹사이트·플랫폼·SaaS·MVP 개발 파트너",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      {/* Browser extensions may inject body attributes (e.g. ap-style) before hydration. */}
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main-content">
          본문으로 건너뛰기
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
