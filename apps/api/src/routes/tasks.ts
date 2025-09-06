import { Router } from "express";
import { deleteTask, moveTask, updateTask } from "@/controllers/tasks";
import { authMiddleware } from "@/middlewares/auth";
import multer from "multer";

export const tasksRouter = Router();

const uploadAssets = multer({ storage: multer.memoryStorage() });

tasksRouter.delete("/:taskId", [authMiddleware], deleteTask);
tasksRouter.put("/:taskId", [authMiddleware, uploadAssets.array("assets[]", 10)], updateTask);

tasksRouter.put("/:taskId/move", [authMiddleware], moveTask);
