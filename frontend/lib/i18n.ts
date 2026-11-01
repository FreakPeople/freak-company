import english from "./messages.en.json";

export type Locale = "ko" | "en";
const normalize = (text: string) =>
  text
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
const messages = Object.fromEntries(
  Object.entries(english).map(([ko, en]) => [normalize(ko), en]),
);

export function translate(locale: Locale, text: string): string {
  return locale === "en" ? (messages[normalize(text)] ?? text) : text;
}

export function localizedHref(locale: Locale, href: string): string {
  if (locale !== "en" || !href.startsWith("/") || href.startsWith("//"))
    return href;
  if (href === "/") return "/en";
  if (href.startsWith("/#")) return `/en${href.slice(1)}`;
  return `/en${href}`;
}
