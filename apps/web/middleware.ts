import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { refreshToken } from "@/services/auth/refresh-token";

export async function middleware(req: NextRequest) {
  if (process.env.NODE_ENV === "test") {
    return NextResponse.next(); // Salta la logica del middleware nei test
  }

  const token = req.cookies.get("jwt_token")?.value;

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
    "/((?!login|signup|api|_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|css|js|txt|xml|json|webmanifest)).*)",
  ],
};
