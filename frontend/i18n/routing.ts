import { defaultLocale, locales, type Locale } from "./config";

const localePattern = new RegExp(`^/(${locales.join("|")})(/|$)`);

/**
 * Strips the locale prefix from a pathname.
 * `/fa/products/1` → `/products/1`
 */
export function stripLocaleFromPathname(pathname: string): string {
  const withoutLocale = pathname.replace(localePattern, "/");
  return withoutLocale === "" ? "/" : withoutLocale;
}

/**
 * Prefixes a pathname with the given locale.
 * `/products` + `fa` → `/fa/products`
 */
export function prefixPathnameWithLocale(
  pathname: string,
  locale: Locale = defaultLocale,
): string {
  const normalized =
    pathname.startsWith("/") ? pathname : `/${pathname}`;
  const stripped = stripLocaleFromPathname(normalized);

  if (stripped === "/") {
    return `/${locale}`;
  }

  return `/${locale}${stripped}`;
}

/**
 * Replaces the locale segment in an existing localized pathname.
 * `/en/about` + `fa` → `/fa/about`
 */
export function replaceLocaleInPathname(
  pathname: string,
  locale: Locale,
): string {
  return prefixPathnameWithLocale(stripLocaleFromPathname(pathname), locale);
}
