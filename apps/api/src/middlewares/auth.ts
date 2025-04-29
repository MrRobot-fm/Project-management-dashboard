import type { NextFunction, Request, Response } from "express";
import { verifyJwtToken } from "@/utils/auth";
import { prisma } from "@workspace/db";
import { UnauthorizedError } from "@workspace/exceptions";

export const authMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const token = req.cookies.jwt_token;

  if (!token) {
    throw new UnauthorizedError("Unauthorized. Please login again.");
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
