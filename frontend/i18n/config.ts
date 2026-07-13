/**
 * Central locale configuration.
 * Add new locales here — routing, middleware, and layouts derive from this file.
 */

export const locales = ["en", "fa"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fa: "فارسی",
};

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  fa: "rtl",
};

/** BCP 47 language tags used for SEO, Open Graph, and font subset selection. */
export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  fa: "fa",
};

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
