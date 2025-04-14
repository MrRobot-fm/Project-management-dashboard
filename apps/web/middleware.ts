import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { refreshToken } from "@/services/auth/refresh-token";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("jwt_token")?.value;

  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  if (token) {
    return NextResponse.next();
  }

  const response = await refreshToken(req);
  if (response) {
    return response;
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|css|js|txt|xml|json|webmanifest)).*)",
  ],
};
