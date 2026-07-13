import type { Metadata } from "next";

import type { Locale } from "./config";
import { getDictionary } from "./get-dictionary";

/**
 * Base metadata factory for locale-aware pages.
 * Call from `generateMetadata` inside `app/[locale]/**` routes.
 */
export async function createLocalizedMetadata(
  locale: Locale,
  overrides?: Metadata,
): Promise<Metadata> {
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.common.siteName,
    ...overrides,
  };
}
