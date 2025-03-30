import type { NextFunction, Request, Response } from "express";
import { setCookie } from "@/utils//set-cookie";
import { createJwtToken } from "@/utils/create-jwt-token";
import { verifyJwtToken } from "@/utils/verify-jwt-token";
import { prisma } from "@workspace/db";
import { UnauthorizedError } from "@workspace/exceptions";

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    throw new UnauthorizedError("Token not found. Access denied");
  }

  const payload = verifyJwtToken({
    token: refreshToken,
    secretOrPublicKey: process.env.JWT_REFRESH_SECRET as string,
  });

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
  });

  if (!user) {
    throw new UnauthorizedError("Invalid refresh token. Access denied");
  }

  const newToken = createJwtToken({
    userId: user.id,
    secretOrPrivateKey: process.env.JWT_SECRET as string,
  });

  setCookie({ res, cookieName: "jwt_token", cookieValue: newToken });

  req.user = user;

  next();
};
