import { Inter, Vazirmatn } from "next/font/google";

import type { Locale } from "@/i18n/config";

/** Primary sans-serif for English (LTR) content. */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Primary sans-serif for Persian (RTL) content. */
export const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

/** Both font variables are applied on `<html>`; active font is selected via `[dir]`. */
export const fontVariables = `${inter.variable} ${vazirmatn.variable}`;

export function getLocaleFontFamily(locale: Locale): string {
  return locale === "fa"
    ? "var(--font-vazirmatn), ui-sans-serif, system-ui, sans-serif"
    : "var(--font-inter), ui-sans-serif, system-ui, sans-serif";
}
