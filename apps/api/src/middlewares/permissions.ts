import type { Request, Response, NextFunction } from "express";
import { prisma } from "@workspace/db";
import {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
} from "@workspace/exceptions";

export const verifyWorkspacePermissions = async (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const { user, params } = req;
  const { workspaceId } = params;

  if (!user || !user.id) {
    throw new UnauthorizedError("Authentication required");
  }

  if (!workspaceId) {
    throw new BadRequestError("Workspace ID is required");
  }

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      owner: {
        select: { id: true },
      },
      members: {
        where: { userId: user.id },
        select: { userId: true },
      },
    },
  });

  if (!workspace) {
    throw new NotFoundError("Workspace not found");
  }

  const isOwner = workspace.owner.id === user.id;
  const isMember = workspace.members.length > 0;

  if (!isOwner && !isMember) {
    throw new UnauthorizedError("User is not authorized to do this operations");
  }

  next();
};

export const verifyUserPermissions = async (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const { user: currentUser, params } = req;
  const { id } = params;

  if (!currentUser || !currentUser.id) {
    throw new UnauthorizedError("Authentication required");
  }

  if (!id) {
    throw new BadRequestError("User ID is required");
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const isCurrentUser = user.id === currentUser.id;

  if (!isCurrentUser) {
    throw new UnauthorizedError(
      "User is not authorized - you can only modify your own user data",
    );
  }

  next();
};

export const verifyProjectPermissions = async (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const { user, params } = req;
  const { projectId } = params;

  if (!user || !user.id) {
    throw new UnauthorizedError("Authentication required");
  }

  if (!projectId) {
    throw new BadRequestError("Project ID is required");
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      members: {
        where: { userId: user.id },
        select: { userId: true },
      },
    },
  });

  if (!project) {
    throw new NotFoundError("Project not found");
  }

  const isMember = project.members.length > 0;

  if (!isMember) {
    throw new UnauthorizedError(
      "User is not authorized to update this project",
    );
  }

  next();
};
