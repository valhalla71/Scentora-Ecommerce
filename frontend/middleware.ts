import { NextRequest, NextResponse } from "next/server";

import {
  defaultLocale,
  isValidLocale,
  locales,
  type Locale,
} from "@/i18n/config";
import { LOCALE_HEADER } from "@/i18n/request";

function negotiateLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language");

  if (!acceptLanguage) {
    return defaultLocale;
  }

  const preferred = acceptLanguage
    .split(",")
    .map((entry) => entry.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const language of preferred) {
    if (language.startsWith("fa")) {
      return "fa";
    }

    if (language.startsWith("en")) {
      return "en";
    }
  }

  return defaultLocale;
}

function extractLocaleFromPathname(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];

  if (segment && isValidLocale(segment)) {
    return segment;
  }

  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameLocale = extractLocaleFromPathname(pathname);

  if (pathnameLocale) {
    const response = NextResponse.next();
    response.headers.set(LOCALE_HEADER, pathnameLocale);
    return response;
  }

  const locale = negotiateLocale(request);
  const localizedUrl = request.nextUrl.clone();
  localizedUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(localizedUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - Next.js internals (_next)
     * - static files (images, fonts, favicon, etc.)
     */
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};

// Re-export for tests and tooling that need the locale list.
export { locales };
