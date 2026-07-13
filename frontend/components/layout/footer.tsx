import Link from "next/link";

import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/navigation";

type FooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Footer({ locale, dictionary }: FooterProps) {
  const { layout, common } = dictionary;
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "/", label: layout.nav.home },
    { href: "/about", label: layout.nav.about },
    { href: "/privacy", label: layout.footer.privacy },
    { href: "/terms", label: layout.footer.terms },
  ] as const;

  return (
    <footer
      data-slot="footer"
      className="mt-auto border-t border-border/60 bg-muted/30"
    >
      <Container className="py-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3 text-start">
            <p className="text-lg font-semibold tracking-tight">
              {common.siteName}
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              {layout.footer.tagline}
            </p>
          </div>

          <nav
            aria-label={layout.nav.primary}
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={localizeHref(item.href, locale)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="my-8 border-t border-border/60" />

        <p className="text-start text-sm text-muted-foreground">
          {layout.footer.copyright.replace("{year}", String(year))}
        </p>
      </Container>
    </footer>
  );
}
