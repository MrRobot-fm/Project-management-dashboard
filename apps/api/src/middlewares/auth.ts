import type { NextFunction, Request, Response } from "express";
import { refreshToken } from "@/utils/refresh-token";
import { verifyJwtToken } from "@/utils/verify-jwt-token";
import { prisma } from "@workspace/db";
import { UnauthorizedError } from "@workspace/exceptions";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.jwt_token;
  console.log(token);

  if (!token) {
    return refreshToken(req, res, next);
  }

  const payload = verifyJwtToken({
    token,
    secretOrPublicKey: process.env.JWT_SECRET as string,
  });

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
  });

  if (!user) {
    throw new UnauthorizedError("Unauthorized. Access denied");
  }

  req.user = user;

  next();
};
