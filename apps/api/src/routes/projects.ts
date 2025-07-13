import { Router } from "express";
import {
  addProjectMember,
  changeMemberRole,
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  getWorkspaceProjects,
  removeProjectMember,
  updateProject,
} from "@/controllers/projects";
import { authMiddleware } from "@/middlewares/auth";
import { verifyProjectPermissions, verifyWorkspacePermissions } from "@/middlewares/permissions";
import { upload } from "@/middlewares/upload-file";
import { validateBody } from "@/middlewares/validate-body";
import { CreateProjectsSchema, UpdateProjectSchema } from "@workspace/schemas";

export const projectsRouter = Router();

projectsRouter.get("/", [authMiddleware], getProjects);

projectsRouter.get("/:projectId", [authMiddleware], getProjectById);

projectsRouter.put(
  "/:projectId",
  [
    authMiddleware,
    verifyProjectPermissions,
    upload.single("logo"),
    validateBody(UpdateProjectSchema),
  ],
  updateProject,
);

projectsRouter.delete("/:projectId", [authMiddleware, verifyProjectPermissions], deleteProject);

projectsRouter.post("/:projectId/members", [authMiddleware], addProjectMember);
projectsRouter.put("/:projectId/members/:userId", [authMiddleware], changeMemberRole);
projectsRouter.delete("/:projectId/members/:userId", [authMiddleware], removeProjectMember);

export const workspaceProjectsRouter = Router({ mergeParams: true });

workspaceProjectsRouter.get("/", [authMiddleware], getWorkspaceProjects);

workspaceProjectsRouter.post(
  "/",
  [
    authMiddleware,
    verifyWorkspacePermissions,
    upload.single("logo"),
    validateBody(CreateProjectsSchema),
  ],
  createProject,
);
