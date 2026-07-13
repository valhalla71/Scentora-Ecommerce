import type { Locale } from "./config";
import { prefixPathnameWithLocale } from "./routing";

type Href = string;

/**
 * Builds a locale-aware href for use in `<Link href={...}>` and `router.push()`.
 * External URLs and hash-only anchors are returned unchanged.
 */
export function localizeHref(href: Href, locale: Locale): string {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  return prefixPathnameWithLocale(href, locale);
}
