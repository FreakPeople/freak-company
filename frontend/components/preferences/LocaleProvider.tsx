"use client";

import { createContext, useContext, useMemo } from "react";
import { translate, type Locale } from "@/lib/i18n";

const LocaleContext = createContext<{
  locale: Locale;
  t: (text: string) => string;
}>({ locale: "ko", t: (text) => text });
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo(
    () => ({ locale, t: (text: string) => translate(locale, text) }),
    [locale],
  );
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
export function useLocale() {
  return useContext(LocaleContext);
}
