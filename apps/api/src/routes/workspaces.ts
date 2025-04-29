import { Router } from "express";
import {
  createWorkspace,
  deleteWorkspace,
  getWorkspaces,
  insertUserIntoWorkspace,
  updateWorkspace,
} from "@/controllers/workspaces";
import { authMiddleware } from "@/middlewares/auth";
import { verifyWorkspacePermissions } from "@/middlewares/permissions";
import { upload } from "@/middlewares/upload-file";
import { validateBody } from "@/middlewares/validate-body";
import { CreateWorkspaceSchema } from "@workspace/schemas";

export const workspacesRouter = Router();

workspacesRouter.get("/", [authMiddleware], getWorkspaces);
workspacesRouter.post(
  "/",
  [authMiddleware, validateBody(CreateWorkspaceSchema)],
  createWorkspace,
);
workspacesRouter.delete("/:workspaceId", [authMiddleware], deleteWorkspace);
workspacesRouter.put(
  "/:workspaceId",
  [authMiddleware, verifyWorkspacePermissions, upload.single("logo")],
  updateWorkspace,
);
workspacesRouter.post(
  "/:workspaceId/members",
  [authMiddleware],
  insertUserIntoWorkspace,
);
