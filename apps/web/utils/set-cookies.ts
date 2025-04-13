"server only";

import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextResponse } from "next/server";
import { parse } from "set-cookie-parser";

export function setCookiesFromResponse(
  res: NextResponse | ReadonlyRequestCookies,
  apiResponse: Response,
) {
  const response = res instanceof NextResponse ? res.cookies : res;

  const setCookieHeaders = apiResponse.headers.getSetCookie();

  if (setCookieHeaders) {
    const parsedCookies = parse(setCookieHeaders, { map: false });

    for (const cookie of parsedCookies) {
      response.set(cookie.name, cookie.value, {
        path: cookie.path ?? "/",
        httpOnly: cookie.httpOnly,
        sameSite: cookie.sameSite as "lax" | "strict" | "none" | undefined,
        secure: cookie.secure,
        expires: cookie.expires,
      });
    }
  }
}
