import { Router } from "express";
import {
  createWorkspace,
  deleteWorkspace,
  deleteWorkspaceLogo,
  getWorkspaces,
  insertUserIntoWorkspace,
  updateWorkspace,
  updateWorkspaceLogo,
} from "@/controllers/workspaces";
import { authMiddleware } from "@/middlewares/auth";
import { verifyWorkspacePermissions } from "@/middlewares/permissions";
import { upload } from "@/middlewares/upload-file";
import { validateBody } from "@/middlewares/validate-body";
import { CreateWorkspaceSchema, UpdateWorkspaceSchema } from "@workspace/schemas";

export const workspacesRouter = Router();

workspacesRouter.get("/", [authMiddleware], getWorkspaces);
workspacesRouter.post(
  "/",
  [authMiddleware, upload.single("logo"), validateBody(CreateWorkspaceSchema)],
  createWorkspace,
);
workspacesRouter.delete("/:workspaceId", [authMiddleware], deleteWorkspace);
workspacesRouter.put(
  "/:workspaceId",
  [authMiddleware, verifyWorkspacePermissions, validateBody(UpdateWorkspaceSchema)],
  updateWorkspace,
);
workspacesRouter.post("/:workspaceId/members", [authMiddleware], insertUserIntoWorkspace);
workspacesRouter.delete("/:workspaceId/logo", [authMiddleware], deleteWorkspaceLogo);
workspacesRouter.post(
  "/:workspaceId/logo",
  [authMiddleware, verifyWorkspacePermissions, upload.single("logo")],
  updateWorkspaceLogo,
);
