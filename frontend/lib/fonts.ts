import { Cormorant_Garamond, Geist, Vazirmatn } from "next/font/google";

import type { Locale } from "@/i18n/config";

/** Primary sans-serif for English (LTR) content. */
export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

/** Primary sans-serif for Persian (RTL) content. */
export const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

/** Luxury display serif for LTR headings — evokes a premium perfume-house feel. */
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

/** All font variables are applied on `<html>`; active fonts are selected via `[dir]`. */
export const fontVariables = `${geist.variable} ${vazirmatn.variable} ${cormorantGaramond.variable}`;

export function getLocaleFontFamily(locale: Locale): string {
  return locale === "fa"
    ? "var(--font-vazirmatn), ui-sans-serif, system-ui, sans-serif"
    : "var(--font-geist), ui-sans-serif, system-ui, sans-serif";
}
