"use client";

import { useParams } from "next/navigation";

import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config";

/**
 * Returns the active locale from the `[locale]` route segment.
 * Client components should use this instead of parsing `window.location`.
 */
export function useLocale(): Locale {
  const params = useParams<{ locale?: string }>();
  const paramLocale = params.locale;

  if (paramLocale && isValidLocale(paramLocale)) {
    return paramLocale;
  }

  return defaultLocale;
}
