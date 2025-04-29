import type { NextFunction, Request, Response } from "express";
import {
  clearCookie,
  createJwtToken,
  refreshToken,
  setCookie,
} from "@/utils/auth";
import { prisma } from "@workspace/db";
import { NotFoundError, UnauthorizedError } from "@workspace/exceptions";
import { LoginUserSchema, RegisterUserSchema } from "@workspace/schemas";
import { compareSync, hashSync } from "bcrypt";

export const signUpController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  RegisterUserSchema.parse(req.body);

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

  LoginUserSchema.parse(req.body);

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
      expiresIn: "15m",
    },
  });
  const refreshToken = createJwtToken({
    userId: user.id,
    secretOrPrivateKey: process.env.JWT_REFRESH_SECRET as string,
    options: {
      expiresIn: "7d",
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: userPassword, ...userWithoutPassword } = user;

  res.status(200).json({ user: userWithoutPassword });
};

export const logoutController = async (req: Request, res: Response) => {
  const pastDate = new Date(0);

  if (req.cookies.jwt_token) {
    console.log("JWT token found in cookies");
    clearCookie({
      res,
      cookieName: "jwt_token",
      cookieOpts: {
        expires: pastDate,
      },
    });
  }

  if (req.cookies.refresh_token) {
    clearCookie({
      res,
      cookieName: "refresh_token",
      cookieOpts: {
        expires: pastDate,
      },
    });
  }

  res.status(200).json({ message: "Logged out successfully", success: true });
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await refreshToken(req, res);

  next();
};
