import type { Request, Response } from "express";
import { createJwtToken } from "@/utils/create-jwt-token";
import { setCookie } from "@/utils/set-cookie";
import { prisma } from "@workspace/db";
import { NotFoundError, UnauthorizedError } from "@workspace/exceptions";
import { compareSync, hashSync } from "bcrypt";

export const signUpController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });

  res.status(201).json({ success: true, user: newUser });
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  if (!compareSync(password, user.password)) {
    throw new UnauthorizedError("Invalid password");
  }

  const token = createJwtToken({
    userId: user.id,
    secretOrPrivateKey: process.env.JWT_SECRET as string,
    options: {
      expiresIn: "10s",
    },
  });
  const refreshToken = createJwtToken({
    userId: user.id,
    secretOrPrivateKey: process.env.JWT_REFRESH_SECRET as string,
    options: {
      expiresIn: "30s",
    },
  });

  setCookie({
    res,
    cookieName: "jwt_token",
    cookieValue: token,
    cookieOpts: {
      maxAge: 15 * 60 * 1000,
    },
  });
  setCookie({
    res,
    cookieName: "refresh_token",
    cookieValue: refreshToken,
    cookieOpts: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  });

  res.status(200).json({ user, token, refreshToken });
};
