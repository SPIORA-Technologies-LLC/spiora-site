import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

// The default language (Russian) is served at the root ("/", "/privacy");
// other languages live under their prefix ("/en", "/en/privacy").
// Pages are built under app/[lang], so root paths are rewritten to "/ru/...".
const prefixed = locales.filter((locale) => locale !== defaultLocale);

function hasPrefix(pathname: string, locale: string) {
  return pathname === `/${locale}` || pathname.startsWith(`/${locale}/`);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (prefixed.some((locale) => hasPrefix(pathname, locale))) {
    return NextResponse.next();
  }

  if (hasPrefix(pathname, defaultLocale)) {
    // Generated assets such as /ru/opengraph-image are served as-is.
    if (pathname.includes("opengraph-image")) return NextResponse.next();
    // Old links to /ru/... go to the same page at the root.
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
