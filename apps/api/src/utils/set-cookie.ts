import type { CookieOptions, Response } from "express";

export const setCookie = ({
  res,
  cookieName,
  cookieValue,
  cookieOpts,
}: {
  res: Response;
  cookieName: string;
  cookieValue: string;
  cookieOpts?: CookieOptions;
}) => {
  res.cookie(cookieName, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 10000,
    ...cookieOpts,
  });
};
