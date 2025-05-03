import type { Request, Response } from "express";
import { uploadFile } from "@/utils/storage";
import { prisma } from "@workspace/db";
import { BadRequestError, UnauthorizedError } from "@workspace/exceptions";
import { randomUUID } from "crypto";

export const createProject = async (req: Request, res: Response) => {
  const { body, params, file, user } = req;

  if (!user) {
    throw new UnauthorizedError("User can't create the project  ");
  }

  const projectId = randomUUID();

  let publicUrl: string | null = null;

  if (file) {
    publicUrl = await uploadFile({
      bucket: "project-logo",
      file: file,
      projectId,
    });
  }

  const project = await prisma.$transaction(async (tx) => {
    const createdProject = await tx.project.create({
      data: {
        id: projectId,
        name: body.name,
        description: body.description,
        logo: publicUrl,
        workspaceId: params.workspaceId,
      },
    });

    await tx.projectMember.create({
      data: {
        projectId: createdProject.id,
        userId: user.id,
        workspaceId: params.workspaceId,
      },
    });
    return createdProject;
  });

  res.status(201).json({ project, success: true });
};

export const getProjects = async (_: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    include: {
      members: {
        include: {
          user: {
            omit: {
              password: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
      tasks: true,
    },
  });

  res.status(200).json({ projects });
};

export const getProjectById = async (req: Request, res: Response) => {
  const { params } = req;

  if (!params?.projectId) {
    throw new BadRequestError("Project ID is required");
  }

  const project = await prisma.project.findFirst({
    where: {
      id: params.projectId,
    },
    include: {
      members: {
        include: {
          user: {
            omit: {
              password: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
      tasks: true,
    },
  });

  res.status(200).json({ project });
};

export const updateProject = async (req: Request, res: Response) => {
  const { params, body, user, file } = req;

  if (!user) {
    throw new UnauthorizedError("User can't update this project");
  }

  if (!params?.projectId) {
    throw new BadRequestError("Project ID is required");
  }

  let publicUrl: string | null = null;

  if (file) {
    publicUrl = await uploadFile({
      bucket: "project-logo",
      file: file,
      projectId: params.projectId,
    });
  }

  const project = await prisma.project.update({
    where: {
      id: params.projectId,
    },
    data: {
      ...body,
      logo: publicUrl,
    },
  });

  res.status(200).json({ project });
};

export const deleteProject = async (req: Request, res: Response) => {
  const { params } = req;

  if (!params?.projectId) {
    throw new BadRequestError("Project ID is required");
  }

  const project = await prisma.project.delete({
    where: {
      id: params.projectId,
    },
  });

  res.status(200).json({ project, success: true });
};
