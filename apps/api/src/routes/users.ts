import { Router } from "express";
import { createUser, getUserById } from "@/controllers/users";

export const usersRouter: Router = Router();

usersRouter.post("/", createUser);
usersRouter.get("/:id", getUserById);
