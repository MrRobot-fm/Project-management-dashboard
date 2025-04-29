import type { CookieOptions, Response } from "express";

export const clearCookie = ({
  res,
  cookieName,
  cookieOpts,
}: {
  res: Response;
  cookieName: string;
  cookieOpts?: CookieOptions;
}) => {
  res.clearCookie(cookieName, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    ...cookieOpts,
  });
};
