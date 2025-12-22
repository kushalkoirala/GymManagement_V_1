import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const searchParams = url.searchParams.toString();

  // Full path including query params
  const path = `${url.pathname}${searchParams ? `?${searchParams}` : ""}`;

  const hostname = request.headers.get("host");

  if (!hostname) {
    return NextResponse.next();
  }

  // 1. Skip Next.js internals, APIs, and static assets
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/static") ||
    url.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Detect localhost vs production
  const isLocalhost = hostname.includes("localhost");

  const hostParts = hostname.replace(":3000", "").split(".");
  let subdomain: string | null = null;

  // 3. Extract subdomain
  if (isLocalhost) {
    // tenant.localhost
    if (hostParts.length > 1) {
      subdomain = hostParts[0];
    }
  } else {
    // tenant.domain.com
    if (hostParts.length > 2) {
      subdomain = hostParts[0];
    }
  }

  // 4. Rewrite if valid tenant
  if (subdomain && subdomain !== "www") {
    return NextResponse.rewrite(
      new URL(`/${subdomain}${path}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
