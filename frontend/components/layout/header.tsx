import Link from "next/link";

import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/navigation";
import { zIndex } from "@/lib/design-system/tokens";
import { cn } from "@/lib/utils";

type HeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Header({ locale, dictionary }: HeaderProps) {
  const { layout, common } = dictionary;

  const navItems = [
    { href: "/", label: layout.nav.home },
    { href: "/about", label: layout.nav.about },
  ] as const;

  return (
    <header
      className={cn(
        "sticky top-0 border-b border-border/60 bg-background/80 backdrop-blur-md",
      )}
      style={{ zIndex: zIndex.header }}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-8">
          <Link
            href={localizeHref("/", locale)}
            className="truncate text-lg font-semibold tracking-tight"
          >
            {common.siteName}
          </Link>

          <nav
            aria-label={layout.nav.primary}
            className="hidden items-center gap-1 md:flex"
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

        <div className="flex shrink-0 items-center gap-1">
          <LocaleSwitcher
            currentLocale={locale}
            label={layout.actions.changeLanguage}
          />
          <ThemeToggle
            lightLabel={layout.theme.light}
            darkLabel={layout.theme.dark}
            systemLabel={layout.theme.system}
          />
        </div>
      </Container>
    </header>
  );
}
