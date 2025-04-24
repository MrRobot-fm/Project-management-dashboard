import { Router } from "express";
import {
  createWorkspace,
  getWorkspaces,
  insertUserIntoWorkspace,
} from "@/controllers/workspaces";
import { authMiddleware } from "@/middlewares/auth";

export const workspacesRouter = Router();

workspacesRouter.get("/", [authMiddleware], getWorkspaces);
workspacesRouter.post("/", [authMiddleware], createWorkspace);
workspacesRouter.post(
  "/:workspaceId/members",
  [authMiddleware],
  insertUserIntoWorkspace,
);
