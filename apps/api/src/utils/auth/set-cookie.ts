import type { CookieOptions, Request, Response } from "express";

export const setCookie = ({
  req,
  res,
  cookieName,
  cookieValue,
  cookieOpts,
}: {
  req?: Request;
  res: Response;
  cookieName: string;
  cookieValue: string;
  cookieOpts?: CookieOptions;
}) => {
  const origin = req?.headers.origin ?? "";
  const isLocalhost = origin.includes("localhost");

  res.cookie(cookieName, cookieValue, {
    httpOnly: true,
    secure: !isLocalhost,
    sameSite: isLocalhost ? "lax" : "none",
    ...cookieOpts,
  });
};
