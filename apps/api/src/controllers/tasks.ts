import type { Request, Response } from "express";
import { supabase } from "@/supabase";
import { getSignedUrl } from "@/utils/storage/get-signed-url";
import { prisma } from "@workspace/db";
import { BadRequestError, NotFoundError } from "@workspace/exceptions";

export const createTask = async (req: Request, res: Response) => {
  const { params, body, files } = req;

  const project = await prisma.project.findUnique({
    where: { id: params.projectId },
  });

  if (!project) throw new BadRequestError("Project not found");

  const lastTaskInColumn = await prisma.task.findFirst({
    where: { projectId: project.id, status: body.status },
    orderBy: { position: "desc" },
  });

  const newPosition = lastTaskInColumn ? (lastTaskInColumn.position ?? 0) + 1 : 0;

  const task = await prisma.task.create({
    data: {
      ...body,
      position: newPosition,
      ...(body.assignees &&
        body.assignees.length > 0 && {
          assignees: {
            create: body.assignees.map((userId: string) => ({
              user: { connect: { id: userId } },
            })),
          },
        }),
    },
  });

  const uploadedFiles: { path: string; originalName: string }[] = [];

  if (Array.isArray(files) && files.length > 0) {
    for (const file of files) {
      const filePath = `tasks/${task.id}/${Date.now()}-${file.originalname}`;

      const { data, error } = await supabase.storage
        .from("task-assets")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) throw new BadRequestError(error.message);

      uploadedFiles.push({ path: data.path, originalName: file.originalname });

      await prisma.taskAsset.create({
        data: {
          taskId: task.id,
          path: data.path,
          name: file.originalname,
          type: file.mimetype,
          size: file.size,
        },
      });
    }
  }

  res.status(201).json({ task, assets: uploadedFiles, success: true });
};

export const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  const task = await prisma.task.findUnique({ where: { id: taskId } });

  if (!task) {
    throw new BadRequestError("Task not found");
  }

  const assetsToDelete = await prisma.taskAsset.findMany({
    where: {
      taskId,
    },
    select: { id: true, path: true },
  });

  await prisma.task.delete({ where: { id: taskId } });

  if (assetsToDelete.length > 0) {
    const filePaths = assetsToDelete.map((asset) => asset.path);

    const { error: deleteError } = await supabase.storage.from("task-assets").remove(filePaths);

    if (deleteError) {
      throw new BadRequestError(deleteError.message);
    }
  }

  res.json({ task, success: true });
};

export const moveTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const { newStatus, newPosition } = req.body;

  const task = await prisma.task.findUnique({ where: { id: taskId } });

  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  const tasksInColumn = await prisma.task.findMany({
    where: { projectId: task.projectId, status: newStatus, id: { not: taskId } },
    orderBy: { position: "asc" },
  });

  const updatedTasks = [
    ...tasksInColumn.slice(0, newPosition),
    task,
    ...tasksInColumn.slice(newPosition),
  ].map((task, index) => ({ id: task.id, position: index }));

  await Promise.all(
    updatedTasks.map(({ id, position }) =>
      prisma.task.update({
        where: { id },
        data: { position, status: id === taskId ? newStatus : undefined },
      }),
    ),
  );

  res.json({ success: true });
};

export const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { body, files } = req;

  const task = await prisma.task.findUnique({ where: { id: taskId } });

  if (!task) {
    throw new NotFoundError("Task not found");
  }

  let assetsToDelete: { id: string; path: string }[] = [];

  if (body.removedAssetIds && body.removedAssetIds.length > 0) {
    const removedIds = Array.isArray(body.removedAssetIds)
      ? body.removedAssetIds
      : [body.removedAssetIds];

    assetsToDelete = await prisma.taskAsset.findMany({
      where: {
        id: { in: removedIds },
        taskId,
      },
      select: { id: true, path: true },
    });
  }

  const uploadedFiles: { path: string; originalName: string; type: string; size: number }[] = [];

  if (Array.isArray(files) && files.length > 0) {
    for (const file of files) {
      const filePath = `tasks/${taskId}/${Date.now()}-${file.originalname}`;

      const { data, error } = await supabase.storage
        .from("task-assets")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) throw new BadRequestError(error.message);

      uploadedFiles.push({
        path: data.path,
        originalName: file.originalname,
        type: file.mimetype,
        size: file.size,
      });
    }
  }

  const updatedTask = await prisma.$transaction(async (prisma) => {
    if (assetsToDelete.length > 0) {
      await prisma.taskAsset.deleteMany({
        where: {
          id: { in: assetsToDelete.map((a) => a.id) },
          taskId,
        },
      });
    }

    if (body.removedAssigneeIds && body.removedAssigneeIds.length > 0) {
      const removedIds = Array.isArray(body.removedAssigneeIds)
        ? body.removedAssigneeIds
        : [body.removedAssigneeIds];

      await prisma.taskAssignee.deleteMany({
        where: {
          taskId,
          userId: { in: removedIds },
        },
      });
    }

    if (body.assignees) {
      await prisma.taskAssignee.deleteMany({
        where: { taskId },
      });

      if (body.assignees.length > 0) {
        await prisma.taskAssignee.createMany({
          data: body.assignees.map((userId: string) => ({
            taskId,
            userId,
          })),
        });
      }
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
        priority: body.priority,
        startDate: body.startDate,
        dueDate: body.dueDate,
      },
      include: {
        assignees: {
          include: { user: true },
        },
        assets: true,
      },
    });

    if (uploadedFiles.length > 0) {
      await prisma.taskAsset.createMany({
        data: uploadedFiles.map((file) => ({
          taskId,
          path: file.path,
          name: file.originalName,
          type: file.type,
          size: file.size,
        })),
      });
    }

    return updatedTask;
  });

  if (assetsToDelete.length > 0) {
    const filePaths = assetsToDelete.map((asset) => asset.path);

    const { error: deleteError } = await supabase.storage.from("task-assets").remove(filePaths);

    if (deleteError) {
      throw new BadRequestError(deleteError.message);
    }
  }

  res.json({
    task: updatedTask,
    success: true,
    uploadedFiles: uploadedFiles,
    deletedFiles: assetsToDelete,
  });
};

export const getTasksByProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  const tasks = await prisma.task.findMany({
    where: {
      projectId: projectId,
    },
    include: {
      assignees: {
        include: {
          user: true,
        },
      },
      assets: true,
    },
  });

  const tasksWithSignedUrls = await Promise.all(
    tasks.map(async (task) => {
      const assetsWithUrls = await Promise.all(
        task.assets.map(async (asset) => {
          return await getSignedUrl(asset);
        }),
      );

      return { ...task, assets: assetsWithUrls };
    }),
  );

  return res.status(200).json({ tasks: tasksWithSignedUrls });
};
