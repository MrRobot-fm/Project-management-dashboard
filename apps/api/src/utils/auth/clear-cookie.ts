import type { CookieOptions, Request, Response } from "express";

export const clearCookie = ({
  req,
  res,
  cookieName,
  cookieOpts,
}: {
  req?: Request;
  res: Response;
  cookieName: string;
  cookieOpts?: CookieOptions;
}) => {
  const origin = req?.headers.origin;
  const isLocalhost = origin?.includes("localhost") ?? false;

  res.clearCookie(cookieName, {
    httpOnly: true,
    secure: !isLocalhost,
    sameSite: isLocalhost ? "lax" : "none",
    ...cookieOpts,
  });
};
