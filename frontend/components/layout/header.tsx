import Link from "next/link";
import { Languages, ShoppingCart, User } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/navigation";
import { zIndex } from "@/lib/design-system/tokens";
import { cn } from "@/lib/utils";

type HeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const actionLabels: Record<
  Locale,
  { cart: string; account: string }
> = {
  en: { cart: "Shopping cart", account: "Account" },
  fa: { cart: "سبد خرید", account: "حساب کاربری" },
};

export function Header({ locale, dictionary }: HeaderProps) {
  const { layout, common } = dictionary;
  const labels = actionLabels[locale];

  const navItems = [
    { href: "/", label: layout.nav.home },
    { href: "/about", label: layout.nav.about },
  ] as const;

  return (
    <header
      data-slot="header"
      className={cn(
        "sticky top-0 border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60",
      )}
      style={{ zIndex: zIndex.header }}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-6 md:gap-8">
          <Link
            href={localizeHref("/", locale)}
            className="truncate font-semibold tracking-tight transition-colors hover:text-primary"
          >
            <span className="text-xl text-foreground">{common.siteName}</span>
          </Link>

          <nav
            aria-label={layout.nav.primary}
            className="hidden items-center gap-0.5 md:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localizeHref(item.href, locale)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={layout.actions.changeLanguage}
            className="text-muted-foreground"
          >
            <Languages aria-hidden="true" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={labels.cart}
            className="text-muted-foreground"
          >
            <ShoppingCart aria-hidden="true" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={labels.account}
            className="text-muted-foreground"
          >
            <User aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </header>
  );
}
