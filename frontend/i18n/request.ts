import { headers } from "next/headers";
import { defaultLocale, isValidLocale, type Locale } from "./config";

const LOCALE_HEADER = "x-scentora-locale";

/**
 * Reads the active locale from the request header set by middleware.
 * Falls back to `defaultLocale` when the header is absent (e.g. static generation).
 */
export async function getRequestLocale(): Promise<Locale> {
  const headerStore = await headers();
  const locale = headerStore.get(LOCALE_HEADER);

  if (locale && isValidLocale(locale)) {
    return locale;
  }

  return defaultLocale;
}

export { LOCALE_HEADER };
