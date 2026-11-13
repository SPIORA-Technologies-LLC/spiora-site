import { NextResponse, type NextRequest } from "next/server";

// English is served at the root ("/", "/privacy"); Russian lives under "/ru".
// Pages are built under app/[lang], so root paths are rewritten to "/en/...".
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/ru" || pathname.startsWith("/ru/")) {
    return NextResponse.next();
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    // Generated assets such as /en/opengraph-image are served as-is.
    if (pathname.includes("opengraph-image")) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
