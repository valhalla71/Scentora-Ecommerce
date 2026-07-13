import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Separator } from "@/components/ui/separator";
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

  const legalLinks = [
    { href: "/privacy", label: layout.footer.privacy },
    { href: "/terms", label: layout.footer.terms },
  ] as const;

  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <Container className="py-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <p className="text-lg font-semibold">{common.siteName}</p>
            <p className="text-sm leading-6 text-muted-foreground">
              {layout.footer.tagline}
            </p>
          </div>

          <nav
            aria-label={layout.footer.legal}
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            {legalLinks.map((item) => (
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

        <Separator className="my-8" />

        <p className="text-sm text-muted-foreground">
          {layout.footer.copyright.replace("{year}", String(year))}
        </p>
      </Container>
    </footer>
  );
}
