import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

type SiteShellProps = {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
};

export function SiteShell({ locale, dictionary, children }: SiteShellProps) {
  return (
    <>
      <Header locale={locale} dictionary={dictionary} />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer locale={locale} dictionary={dictionary} />
    </>
  );
}
