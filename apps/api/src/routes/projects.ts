import { Router } from "express";
import {
  addProjectMember,
  changeMemberRole,
  createProject,
  deleteProject,
  deleteProjectLogo,
  getProjectById,
  getProjects,
  getWorkspaceProjects,
  removeProjectMember,
  updateProject,
  updateProjectLogo,
} from "@/controllers/projects";
import { createTask } from "@/controllers/tasks";
import { authMiddleware } from "@/middlewares/auth";
import { verifyProjectPermissions, verifyWorkspacePermissions } from "@/middlewares/permissions";
import { upload } from "@/middlewares/upload-file";
import { validateBody } from "@/middlewares/validate-body";
import { CreateProjectsSchema, UpdateProjectSchema } from "@workspace/schemas";
import multer from "multer";

export const projectsRouter = Router();

const uploadAssets = multer({ storage: multer.memoryStorage() });

projectsRouter.get("/", [authMiddleware], getProjects);

projectsRouter.get("/:projectId", [authMiddleware], getProjectById);

projectsRouter.put(
  "/:projectId",
  [authMiddleware, verifyProjectPermissions, validateBody(UpdateProjectSchema)],
  updateProject,
);

projectsRouter.delete("/:projectId", [authMiddleware, verifyProjectPermissions], deleteProject);
projectsRouter.delete(
  "/:projectId/logo",
  [authMiddleware, verifyProjectPermissions],
  deleteProjectLogo,
);
projectsRouter.post(
  "/:projectId/logo",
  [authMiddleware, verifyProjectPermissions, upload.single("logo")],
  updateProjectLogo,
);

projectsRouter.post(
  "/:projectId/tasks",
  [authMiddleware, uploadAssets.array("assets[]", 10)],
  createTask,
);

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
