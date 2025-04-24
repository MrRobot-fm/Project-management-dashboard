import { Router } from "express";
import {
  createWorkspace,
  deleteWorkspace,
  getWorkspaces,
  insertUserIntoWorkspace,
} from "@/controllers/workspaces";
import { authMiddleware } from "@/middlewares/auth";
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
workspacesRouter.post(
  "/:workspaceId/members",
  [authMiddleware],
  insertUserIntoWorkspace,
);
