"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import {
  serverThemeSnapshot,
  setTheme,
  subscribeToTheme,
  themeSnapshot,
} from "@/lib/theme";
import styles from "./PreferencesControls.module.css";

export default function PreferencesControls() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const theme = useSyncExternalStore(
    subscribeToTheme,
    themeSnapshot,
    serverThemeSnapshot,
  );
  const languageHref =
    locale === "en"
      ? pathname.replace(/^\/en(?=\/|$)/, "") || "/"
      : pathname === "/"
        ? "/en"
        : `/en${pathname}`;
  return (
    <div className={styles.controls}>
      <Link
        href={languageHref}
        hrefLang={locale === "ko" ? "en" : "ko"}
        lang={locale === "ko" ? "en" : "ko"}
        className={styles.language}
        aria-label={locale === "ko" ? "EN (English)" : "한국어"}
      >
        {locale === "ko" ? "EN" : "한국어"}
      </Link>
      <button
        type="button"
        className={styles.theme}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label={locale === "ko" ? "다크 모드" : "Dark mode"}
        aria-pressed={theme === "dark"}
        title={
          locale === "ko"
            ? theme === "dark"
              ? "라이트 모드로 전환"
              : "다크 모드로 전환"
            : theme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
        }
      >
        {theme === "light" ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
          </svg>
        )}
      </button>
    </div>
  );
}
