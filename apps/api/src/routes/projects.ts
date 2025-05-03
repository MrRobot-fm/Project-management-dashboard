import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "@/controllers/projects";
import { authMiddleware } from "@/middlewares/auth";
import { verifyProjectPermissions } from "@/middlewares/permissions";
import { upload } from "@/middlewares/upload-file";

export const projectsRouter = Router();

projectsRouter.get("/", [authMiddleware], getProjects);

projectsRouter.post(
  "/:workspaceId",
  [authMiddleware, upload.single("logo")],
  createProject,
);

projectsRouter.get("/:projectId", getProjectById);

projectsRouter.put(
  "/:projectId",
  [authMiddleware, verifyProjectPermissions, upload.single("logo")],
  updateProject,
);

projectsRouter.delete(
  "/:projectId",
  [authMiddleware, verifyProjectPermissions],
  deleteProject,
);
