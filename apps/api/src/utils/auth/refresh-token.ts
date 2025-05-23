import type { Request, Response } from "express";
import { createJwtToken } from "@/utils/auth/create-jwt-token";
import { setCookie } from "@/utils/auth/set-cookie";
import { verifyJwtToken } from "@/utils/auth/verify-jwt-token";
import { prisma } from "@workspace/db";
import { UnauthorizedError } from "@workspace/exceptions";

export const refreshToken = async (req: Request, res: Response) => {
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

  setCookie({
    res,
    cookieName: "jwt_token",
    cookieValue: newToken,
    cookieOpts: {
      maxAge: 15 * 60 * 1000,
    },
  });

  req.user = user;

  res.status(200).json({ message: "Token refreshed successfully" });
};
