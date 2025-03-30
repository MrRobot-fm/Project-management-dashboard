import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "@/controllers/users";
import { authMiddleware } from "@/middlewares/auth";

export const usersRouter: Router = Router();

usersRouter.post("/", createUser);
usersRouter.get("/", [authMiddleware], getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.put("/:id", [authMiddleware], updateUser);
usersRouter.delete("/:id", [authMiddleware], deleteUser);
