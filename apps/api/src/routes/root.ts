import { Router } from "express";
import { apiStatusRouter } from "./api-status";
import { usersRouter } from "@/routes/users";

export const rootRouter: Router = Router();

rootRouter.use("/users", usersRouter);
rootRouter.use("/", apiStatusRouter);
