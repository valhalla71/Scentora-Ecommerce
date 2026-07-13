import type { Locale } from "@/i18n/config";
import { localeDirection } from "@/i18n/config";

type LocaleHtmlAttributesProps = {
  locale: Locale;
};

/**
 * Documents the HTML attributes applied per locale in `[locale]/layout.tsx`.
 * Use as reference when adding locale-specific head metadata or font loading.
 */
export function getLocaleHtmlAttributes({ locale }: LocaleHtmlAttributesProps) {
  return {
    lang: locale,
    dir: localeDirection[locale],
  } as const;
}
