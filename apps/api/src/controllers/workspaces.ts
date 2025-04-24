import type { Request, Response } from "express";
import { prisma } from "@workspace/db";
import { BadRequestError, UnauthorizedError } from "@workspace/exceptions";

export const createWorkspace = async (req: Request, res: Response) => {
  const { user, body } = req;

  if (!user) {
    throw new UnauthorizedError("User can't create workspace");
  }

  const workspace = await prisma.$transaction(async (tx) => {
    const createdWorkspace = await tx.workspace.create({
      data: {
        name: body.name,
        ownerId: user.id,
      },
    });

    await tx.workspaceMember.create({
      data: {
        workspaceId: createdWorkspace.id,
        userId: user.id,
        role: "OWNER",
      },
    });

    return createdWorkspace;
  });

  res.status(201).json({ workspace, success: true });
};

export const getWorkspaces = async (req: Request, res: Response) => {
  const { user } = req;

  if (!user) {
    throw new UnauthorizedError("User can't get workspaces");
  }

  const workspaces = await prisma.workspace.findMany({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      members: {
        select: {
          role: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  const formattedWorkspaces = workspaces.map((workspace) => ({
    ...workspace,
    members: workspace.members.map((member) => ({
      ...member.user,
      role: member.role,
    })),
  }));

  res.status(200).json({ workspaces: formattedWorkspaces });
};

export const insertUserIntoWorkspace = async (req: Request, res: Response) => {
  const { body, params } = req;

  if (!body?.userId || !params?.workspaceId) {
    throw new BadRequestError("User ID and Workspace ID are required");
  }

  const { userId } = body;
  const { workspaceId } = params;

  const workspaceMember = await prisma.workspaceMember.create({
    data: {
      workspaceId,
      userId,
      role: "COLLABORATOR",
    },
  });

  res.status(201).json({ workspaceMember, success: true });
};

export const deleteWorkspace = async (req: Request, res: Response) => {
  const { params } = req;

  if (!params?.workspaceId) {
    throw new BadRequestError("Workspace ID is required");
  }

  const { workspaceId } = params;

  const workspace = await prisma.workspace.delete({
    where: {
      id: workspaceId,
    },
  });

  res.status(204).json({ workspace, success: true });
};
