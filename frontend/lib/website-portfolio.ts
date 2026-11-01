import type { Locale } from "./i18n";

export type WebsiteSample = {
  id: string;
  name: Record<Locale, string>;
  category: string;
  headline: string;
  theme: "company" | "studio" | "shop" | "stay" | "product";
  url: string | null;
  previewScripts?: boolean;
};

// Add the remaining sample website URL when it is supplied.
// URLs render live previews. No screenshot asset is required when adding a sample.
// Sample 1 renders its server HTML/CSS and native video without the client-side cookie overlay.
export const websitePortfolio: WebsiteSample[] = [
  { id: "01", name: { ko: "예술의 감각을 담은 뮤지엄 브랜드 사이트", en: "An art-inspired museum brand website" }, category: "Art & Museum", headline: "Ideas into impact.", theme: "company", url: "https://sample1.freakmakers.co.kr/", previewScripts: false },
  { id: "02", name: { ko: "편안함과 신뢰를 전하는 덴탈 브랜드 사이트", en: "A welcoming dental brand website" }, category: "Dental & Clinic", headline: "A different perspective.", theme: "studio", url: "https://sample2.freakmakers.co.kr/" },
  { id: "03", name: { ko: "든든한 일상을 약속하는 금융 브랜드 사이트", en: "A reassuring financial brand website" }, category: "Finance & Insurance", headline: "Objects for everyday.", theme: "shop", url: "https://sample3.freakmakers.co.kr/" },
  { id: "04", name: { ko: "새로운 가능성을 여는 렌탈 브랜드 사이트", en: "A forward-looking rental brand website" }, category: "Rental & Business", headline: "Room to slow down.", theme: "stay", url: "https://sample4.freakmakers.co.kr/" },
  { id: "05", name: { ko: "다음 브랜드 사이트, 준비 중이에요.", en: "Our next brand website is on its way." }, category: "Coming soon", headline: "Make room for better work.", theme: "product", url: null },
];
