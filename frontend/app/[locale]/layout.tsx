import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppProviders } from "@/components/providers/app-providers";
import { SiteShell } from "@/components/layout/site-shell";
import { getLocaleHtmlAttributes } from "@/components/i18n/locale-html-attributes";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { fontVariables } from "@/lib/fonts";

import "../globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Scentora",
    default: "Scentora",
  },
  description: "Scentora — multilingual storefront",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);
  const htmlAttributes = getLocaleHtmlAttributes({ locale });

  return (
    <html
      lang={htmlAttributes.lang}
      dir={htmlAttributes.dir}
      className={`${fontVariables} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <AppProviders locale={locale}>
          <SiteShell locale={locale} dictionary={dictionary}>
            {children}
          </SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
