import { prisma } from "@workspace/db";
import type { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });

  res.status(201).json({ user, success: true });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  res.status(200).json({ user });
};
