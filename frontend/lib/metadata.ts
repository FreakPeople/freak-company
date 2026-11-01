import type { Metadata } from "next";
import type { Locale } from "./i18n";

export function siteMetadata(
  locale: Locale,
  page: "home" | "company" | "websites" = "home",
): Metadata {
  const en = locale === "en";
  const title =
    page === "websites"
      ? en
        ? "Website collection | Freak Makers"
        : "홈페이지 포트폴리오 | Freak Makers"
      : page === "company"
      ? en
        ? "About us | Freak Makers"
        : "회사소개 | Freak Makers"
      : en
        ? "Freak Makers | Websites, platforms & SaaS"
        : "Freak Makers | 웹사이트·플랫폼·SaaS 개발 파트너";
  const description = page === "websites"
    ? en
      ? "Explore five website concepts from Freak Makers, from company websites and brand experiences to shops and service landing pages."
      : "기업 홈페이지부터 브랜드 사이트, 라이프스타일 숍과 서비스 랜딩 페이지까지. 프릭의 다섯 가지 홈페이지 콘셉트를 살펴보세요."
    : en
    ? "Turn your idea into a working digital product. Talk directly with our developers about websites, platforms, SaaS, MVPs, and QA."
    : "아이디어를 실제 서비스로 만드는 프릭. 웹사이트, 플랫폼, SaaS, MVP 제작부터 QA까지 개발자와 직접 이야기하세요.";
  const path = page === "websites"
    ? "/websites"
    : page === "company" ? "/introduce" : "/";
  return {
    title,
    description,
    alternates: {
      languages: { ko: path, en: path === "/" ? "/en" : `/en${path}` },
    },
    openGraph: {
      title,
      description,
      locale: en ? "en_US" : "ko_KR",
      alternateLocale: en ? "ko_KR" : "en_US",
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}
