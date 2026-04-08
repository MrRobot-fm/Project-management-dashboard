import type { Request, Response } from "express";
import { getBasePath, removeExistingFiles, uploadFile } from "@/utils/storage";
import { getSignedUrl } from "@/utils/storage/get-signed-url";
import { prisma } from "@workspace/db";
import { BadRequestError, NotFoundError, UnauthorizedError } from "@workspace/exceptions";
import { randomUUID } from "crypto";

const touchWorkspace = (workspaceId: string) =>
  prisma.workspace.update({
    where: { id: workspaceId },
    data: { updatedAt: new Date() },
  });

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
        role: "OWNER",
      },
    });

    await tx.workspace.update({
      where: { id: params.workspaceId },
      data: { updatedAt: new Date() },
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

  const formattedProjects = projects.map((project) => ({
    ...project,
    members: project.members.map((member) => ({
      ...member.user,
      role: member.role,
    })),
  }));

  res.status(200).json({ projects: formattedProjects });
};

export const getWorkspaceProjects = async (req: Request, res: Response) => {
  const { params, user } = req;

  const projects = await prisma.project.findMany({
    where: {
      workspaceId: params.workspaceId,
      members: {
        some: {
          userId: user?.id,
        },
      },
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
    orderBy: {
      createdAt: "asc",
    },
  });

  const formattedProjects = projects.map((project) => ({
    ...project,
    members: project.members.map((member) => ({
      ...member.user,
      role: member.role,
    })),
  }));

  res.status(200).json({ projects: formattedProjects });
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
        orderBy: {
          createdAt: "asc",
        },
      },
      tasks: {
        include: {
          assignees: {
            include: {
              user: {
                omit: {
                  password: true,
                },
              },
            },
          },
          assets: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!project) throw new NotFoundError("No projects found");

  const tasksWithSignedUrls = await Promise.all(
    project.tasks.map(async (task) => {
      const assetsWithUrls = await Promise.all(
        task.assets.map(async (asset) => {
          return await getSignedUrl(asset);
        }),
      );

      return { ...task, assets: assetsWithUrls };
    }),
  );

  const formattedProject = {
    ...project,
    tasks: tasksWithSignedUrls,
    members: project?.members.map((member) => ({
      ...member.user,
      role: member.role,
    })),
  };

  res.status(200).json({ project: formattedProject });
};

export const updateProject = async (req: Request, res: Response) => {
  const { params, body, user } = req;

  if (!user) {
    throw new UnauthorizedError("User can't update this project");
  }

  if (!params?.projectId) {
    throw new BadRequestError("Project ID is required");
  }

  const project = await prisma.$transaction(async (tx) => {
    const updatedProject = await tx.project.update({
      where: {
        id: params.projectId,
      },
      data: {
        ...body,
      },
    });

    await tx.workspace.update({
      where: { id: updatedProject.workspaceId },
      data: { updatedAt: new Date() },
    });

    return updatedProject;
  });

  res.status(200).json({ project, success: true });
};

export const deleteProject = async (req: Request, res: Response) => {
  const { params } = req;

  if (!params?.projectId) {
    throw new BadRequestError("Project ID is required");
  }

  const project = await prisma.$transaction(async (tx) => {
    const deletedProject = await tx.project.delete({
      where: {
        id: params.projectId,
      },
    });

    await tx.workspace.update({
      where: { id: deletedProject.workspaceId },
      data: { updatedAt: new Date() },
    });

    return deletedProject;
  });

  res.status(200).json({ project, success: true });
};

export const addProjectMember = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { workspaceId, userId, role } = req.body;

  const addedMembers = await prisma.$transaction(async (tx) => {
    const members = await Promise.all(
      userId.map(async (userId: string) => {
        const existingMembers = await tx.workspaceMember.findFirst({
          where: { userId, workspaceId },
        });

        if (!existingMembers) {
          await tx.workspaceMember.create({
            data: {
              workspaceId,
              userId,
              role,
            },
          });
        }

        const projectMember = await tx.projectMember.create({
          data: {
            projectId,
            userId,
            workspaceId,
            role,
          },
        });

        return projectMember;
      }),
    );

    await tx.workspace.update({
      where: { id: workspaceId },
      data: { updatedAt: new Date() },
    });

    return members;
  });

  res.status(201).json({ members: addedMembers, success: true });
};

export const changeMemberRole = async (req: Request, res: Response) => {
  const { projectId, userId } = req.params;
  const { workspaceId, role } = req.body;

  const updateMemberRole = await prisma.$transaction(async (tx) => {
    await tx.workspaceMember.updateMany({
      where: {
        workspaceId,
        userId,
      },
      data: {
        role,
      },
    });

    const projectMember = await tx.projectMember.updateManyAndReturn({
      where: {
        projectId,
        userId,
      },
      data: {
        role,
      },
    });

    await tx.workspace.update({
      where: { id: workspaceId },
      data: { updatedAt: new Date() },
    });

    return projectMember;
  });

  res.status(201).json({ members: updateMemberRole, success: true });
};

export const removeProjectMember = async (req: Request, res: Response) => {
  const { projectId, userId } = req.params;

  const projectMember = await prisma.$transaction(async (tx) => {
    const deletedMember = await tx.projectMember.delete({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    await tx.workspace.update({
      where: { id: deletedMember.workspaceId },
      data: { updatedAt: new Date() },
    });

    return deletedMember;
  });

  res.status(200).json({ member: projectMember, success: true });
};

export const deleteProjectLogo = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  if (!projectId) {
    throw new BadRequestError("Project ID is required");
  }

  const basePath = getBasePath({ projectId });

  if (!basePath) throw new NotFoundError("Project logo not found");

  await removeExistingFiles("project-logo", basePath);

  const project = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      logo: null,
    },
  });

  await touchWorkspace(project.workspaceId);

  res.status(200).json({ success: true });
};

export const updateProjectLogo = async (req: Request, res: Response) => {
  const { params, file } = req;

  if (!params.projectId) {
    throw new BadRequestError("Project ID is required");
  }

  if (!file) {
    throw new BadRequestError("File is required");
  }

  const publicUrl = await uploadFile({
    bucket: "project-logo",
    file: file,
    projectId: params.projectId,
  });

  const project = await prisma.project.update({
    where: {
      id: params.projectId,
    },
    data: {
      logo: publicUrl,
    },
  });

  await touchWorkspace(project.workspaceId);

  res.status(200).json({ success: true });
};
