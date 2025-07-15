import type { Request, Response } from "express";
import { uploadFile } from "@/utils/storage";
import { prisma } from "@workspace/db";
import { BadRequestError, NotFoundError, UnauthorizedError } from "@workspace/exceptions";
import { hashSync } from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
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
  const { body, params, file, user } = req;

  if (!user) {
    throw new UnauthorizedError("User can't update workspace");
  }

  let publicUrl: string | null = null;

  if (file) {
    publicUrl = await uploadFile({
      bucket: "user-logo",
      file,
      userId: user?.id,
    });
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: params.id,
    },
    data: {
      ...body,
      logo: publicUrl,
    },
  });

  res.status(200).json({ user: updatedUser, success: true });
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

export const searchUsers = async (req: Request, res: Response) => {
  const { query } = req.query;
  const { projectId } = req.params;

  if (!req.user?.id) throw new UnauthorizedError("Unauthorized");

  if (typeof query !== "string") {
    throw new BadRequestError("Query parameter is required");
  }

  const currentUserId = req.user.id;

  const projectMembers = await prisma.projectMember.findMany({
    where: {
      projectId: projectId,
    },
    select: {
      userId: true,
    },
  });

  const projectMemberIds = projectMembers.map((member) => member.userId);
  const excludedUserIds = [...projectMemberIds, currentUserId];

  const users = await prisma.user.findMany({
    where: {
      AND: [
        {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ],
        },
        { id: { notIn: excludedUserIds } },
      ],
    },
  });

  res.status(200).json(users);
};
