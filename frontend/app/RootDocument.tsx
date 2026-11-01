import localFont from "next/font/local";
import Script from "next/script";
import "@/app/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LocaleProvider } from "@/components/preferences/LocaleProvider";
import { themeInitScript } from "@/lib/theme";
import type { Locale } from "@/lib/i18n";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
  display: "swap",
});

export default function RootDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={locale}
      className={pretendard.variable}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      {/* Extensions can inject body attributes before hydration. */}
      <body suppressHydrationWarning>
        <LocaleProvider locale={locale}>
          <a className="skip-link" href="#main-content">
            {locale === "ko" ? "본문으로 건너뛰기" : "Skip to main content"}
          </a>
          <Header />
          {children}
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
