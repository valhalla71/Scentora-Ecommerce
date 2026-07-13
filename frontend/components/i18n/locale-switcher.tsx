"use client";

import Link from "next/link";
import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import { replaceLocaleInPathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  currentLocale: Locale;
  label: string;
};

export function LocaleSwitcher({ currentLocale, label }: LocaleSwitcherProps) {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" aria-label={label}>
            <Languages />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            className={cn(locale === currentLocale && "bg-accent")}
            render={
              <Link href={replaceLocaleInPathname(pathname, locale)}>
                {localeLabels[locale]}
              </Link>
            }
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
