"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "./preferences/LocaleProvider";
import { localizedHref } from "@/lib/i18n";

export default function LocalizedLink({
  href,
  ...props
}: ComponentProps<typeof Link>) {
  const { locale } = useLocale();
  return (
    <Link
      {...props}
      href={typeof href === "string" ? localizedHref(locale, href) : href}
    />
  );
}
