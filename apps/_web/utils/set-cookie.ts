import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const setCookie = ({
  cookie,
  cookieName,
  cookieValue,
  cookieOpts,
}: {
  cookie: ReadonlyRequestCookies;
  cookieName: string;
  cookieValue: string;
  cookieOpts?: Partial<ResponseCookie>;
}) => {
  cookie.set(cookieName, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    ...cookieOpts,
  });
};
