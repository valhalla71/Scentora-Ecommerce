import Link from "next/link";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { useState } from "react";

import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
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
  { cart: string; account: string; login: string; register: string; search: string }
> = {
  en: {
    cart: "Shopping cart",
    account: "Account",
    login: "Login",
    register: "Register",
    search: "Search products",
  },
  fa: {
    cart: "سبد خرید",
    account: "حساب کاربری",
    login: "ورود",
    register: "ثبت نام",
    search: "جستجو",
  },
};

export function Header({ locale, dictionary }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { layout, common } = dictionary;
  const labels = actionLabels[locale];
  const isRTL = locale === "fa";

  const navItems = [
    { href: "/", label: layout.nav.home },
    { href: "/catalog", label: "Products" },
    { href: "/about", label: layout.nav.about },
  ] as const;

  return (
    <>
      <header
        data-slot="header"
        className={cn(
          "sticky top-0 border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60",
        )}
        style={{ zIndex: zIndex.header }}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <Link
              href={localizeHref("/", locale)}
              className="truncate font-semibold tracking-tight transition-colors hover:text-primary shrink-0"
            >
              <span className="text-xl text-foreground">{common.siteName}</span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              aria-label={layout.nav.primary}
              className="hidden items-center gap-0.5 lg:flex"
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

          {/* Right Side Actions */}
          <div className="flex shrink-0 items-center gap-0.5">
            {/* Search Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={labels.search}
              className="hidden md:flex text-muted-foreground"
            >
              <Search aria-hidden="true" className="w-5 h-5" />
            </Button>

            {/* Desktop Auth Links */}
            <div className="hidden items-center gap-1 lg:flex">
              <Link href={localizeHref("/login", locale)}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  {labels.login}
                </Button>
              </Link>

              <Link href={localizeHref("/register", locale)}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  {labels.register}
                </Button>
              </Link>
            </div>

            {/* Language Switcher */}
            <LocaleSwitcher
              currentLocale={locale}
              label={layout.actions.changeLanguage}
            />

            {/* Theme Toggle */}
            <ThemeToggle
              lightLabel={layout.theme.light}
              darkLabel={layout.theme.dark}
              systemLabel={layout.theme.system}
            />

            {/* Cart Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={labels.cart}
              className="text-muted-foreground relative"
            >
              <ShoppingCart aria-hidden="true" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
            </Button>

            {/* Account Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={labels.account}
              className="hidden md:flex text-muted-foreground"
            >
              <User aria-hidden="true" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Toggle menu"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X aria-hidden="true" />
              ) : (
                <Menu aria-hidden="true" />
              )}
            </Button>
          </div>
        </Container>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="border-t border-border/60 bg-background/95 backdrop-blur-sm lg:hidden animate-in fade-in slide-in-from-top-2"
            style={{ zIndex: zIndex.header - 1 }}
          >
            <Container className="py-4 space-y-2">
              {/* Mobile Nav Items */}
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={localizeHref(item.href, locale)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}

              {/* Divider */}
              <div className="border-t border-border/60 my-2" />

              {/* Mobile Auth Links */}
              <Link href={localizeHref("/login", locale)}>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {labels.login}
                </Button>
              </Link>

              <Link href={localizeHref("/register", locale)}>
                <Button
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {labels.register}
                </Button>
              </Link>
            </Container>
          </div>
        )}
      </header>
    </>
  );
}
