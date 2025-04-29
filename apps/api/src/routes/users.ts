import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateUser,
} from "@/controllers/users";
import { authMiddleware } from "@/middlewares/auth";
import { verifyUserPermissions } from "@/middlewares/permissions";
import { upload } from "@/middlewares/upload-file";

export const usersRouter: Router = Router();

usersRouter.post("/", [authMiddleware], createUser);
usersRouter.get("/", [authMiddleware], getAllUsers);
usersRouter.get("/me", [authMiddleware], getCurrentUser);
usersRouter.get("/:id", [authMiddleware], getUserById);
usersRouter.put(
  "/:id",
  [authMiddleware, verifyUserPermissions, upload.single("logo")],
  updateUser,
);
usersRouter.delete("/:id", [authMiddleware], deleteUser);
