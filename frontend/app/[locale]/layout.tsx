import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppProviders } from "@/components/providers/app-providers";
import { SiteShell } from "@/components/layout/site-shell";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getLocaleHtmlAttributes } from "@/components/i18n/locale-html-attributes";
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
  const { lang, dir } = getLocaleHtmlAttributes({ locale });

  return (
    <html lang={lang} dir={dir} className={`${fontVariables} antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <AppProviders locale={locale}>
          <SiteShell locale={locale} dictionary={dictionary}>
            {children}
          </SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
