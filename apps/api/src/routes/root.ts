import { usersRouter } from "@/routes/users";
import { Router } from "express";

export const rootRouter: Router = Router();

rootRouter.use("/users", usersRouter);
