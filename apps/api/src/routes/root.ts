import { Router } from "express";
import { apiStatusRouter } from "@/routes/api-status";
import { authRouter } from "@/routes/auth";
import { projectsRouter, workspaceProjectsRouter } from "@/routes/projects";
import { usersRouter } from "@/routes/users";
import { workspacesRouter } from "@/routes/workspaces";

export const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", usersRouter);
rootRouter.use("/", apiStatusRouter);
rootRouter.use("/workspaces", workspacesRouter);
rootRouter.use("/projects", projectsRouter);
rootRouter.use("/workspaces/:workspaceId/project", workspaceProjectsRouter);
