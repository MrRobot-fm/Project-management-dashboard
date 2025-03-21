import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "@/controllers/users";

export const usersRouter: Router = Router();

usersRouter.post("/", createUser);
usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);
