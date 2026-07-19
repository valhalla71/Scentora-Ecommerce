"use client";

import { DirectionProvider } from "@/components/ui/direction";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { CommerceProvider } from "@/components/providers/commerce-provider";
import { localeDirection, type Locale } from "@/i18n/config";

type AppProvidersProps = {
  children: React.ReactNode;
  locale: Locale;
};

export function AppProviders({ children, locale }: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CommerceProvider>
        <DirectionProvider direction={localeDirection[locale]}>
          {children}
        </DirectionProvider>
      </CommerceProvider>
    </ThemeProvider>
  );
}
