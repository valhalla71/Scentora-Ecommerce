import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { textVariants } from "@/lib/design-system/typography";

type FooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Footer({ locale, dictionary }: FooterProps) {
  const { layout, common } = dictionary;
  const year = new Date().getFullYear();
  const isRTL = locale === "fa";

  const mainLinks = [
    { href: "/", label: layout.nav.home },
    { href: "/catalog", label: "Products" },
    { href: "/about", label: layout.nav.about },
  ] as const;

  const legalLinks = [
    { href: "/privacy", label: layout.footer.privacy },
    { href: "/terms", label: layout.footer.terms },
    { href: "/contact", label: "Contact" },
  ] as const;

  return (
    <footer
      data-slot="footer"
      className="mt-auto border-t border-border/60 bg-muted/30"
    >
      <Container className="py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div>
              <p className={cn(textVariants({ variant: "h4" }), "mb-2")}>
                {common.siteName}
              </p>
              <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground leading-relaxed")}>
                {layout.footer.tagline}
              </p>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="space-y-4">
            <p className={cn(textVariants({ variant: "label" }), "text-foreground")}>
              Navigation
            </p>
            <nav className="flex flex-col gap-2">
              {mainLinks.map((item) => (
                <Link
                  key={item.href}
                  href={localizeHref(item.href, locale)}
                  className={cn(
                    textVariants({ variant: "bodySm" }),
                    "text-muted-foreground transition-colors hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <p className={cn(textVariants({ variant: "label" }), "text-foreground")}>
              Legal
            </p>
            <nav className="flex flex-col gap-2">
              {legalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={localizeHref(item.href, locale)}
                  className={cn(
                    textVariants({ variant: "bodySm" }),
                    "text-muted-foreground transition-colors hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <p className={cn(textVariants({ variant: "label" }), "text-foreground")}>
              Contact
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@scentora.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@scentora.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>123 Scent Street<br />Perfume City, PC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/60 my-8" />

        {/* Bottom Section */}
        <div className={cn(
          "flex flex-col md:flex-row md:items-center md:justify-between gap-4",
          isRTL && "text-end"
        )}>
          <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
            {layout.footer.copyright.replace("{year}", String(year))}
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5c-.563-.074-2.326-.267-4.275-.267-4.073 0-6.845 2.438-6.845 6.939v2.328z" />
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.45 9 2 11-7.46a4.3 4.3 0 000-4.54" />
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="currentColor"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
