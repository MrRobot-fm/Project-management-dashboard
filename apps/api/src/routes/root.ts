import { Router } from "express";
import { apiStatusRouter } from "./api-status";
import { authRouter } from "./auth";
import { usersRouter } from "@/routes/users";

export const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", usersRouter);
rootRouter.use("/", apiStatusRouter);
