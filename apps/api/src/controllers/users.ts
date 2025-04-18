import type { Request, Response } from "express";
import { prisma } from "@workspace/db";
import { NotFoundError } from "@workspace/exceptions";
import { hashSync } from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
      role,
    },
  });

  res.status(201).json({ user, success: true });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) {
    throw new NotFoundError(`User with ID: ${id} not found`);
  }

  res.status(200).json({ user });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const { user } = req;

  if (!user) {
    throw new NotFoundError("Current user not found");
  }

  const currentUser = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });

  res.status(200).json({ user: currentUser, success: true });
};

export const updateUser = async (req: Request, res: Response) => {
  const { body, params } = req;

  const user = await prisma.user.update({
    where: {
      id: params.id,
    },
    data: {
      ...body,
    },
  });

  res.status(200).json({ user });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  res.status(204).json({ user, success: true });
};
