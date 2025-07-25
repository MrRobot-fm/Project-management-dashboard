import { Router } from "express";
import {
  createUser,
  deleteUser,
  deleteUserLogo,
  getAllUsers,
  getCurrentUser,
  getUserById,
  searchUsers,
  updateUser,
  updateUserLogo,
} from "@/controllers/users";
import { authMiddleware } from "@/middlewares/auth";
import { verifyUserPermissions } from "@/middlewares/permissions";
import { upload } from "@/middlewares/upload-file";

export const usersRouter: Router = Router();

usersRouter.post("/", createUser);
usersRouter.get("/", [authMiddleware], getAllUsers);
usersRouter.get("/me", [authMiddleware], getCurrentUser);
usersRouter.get("/search/:projectId", [authMiddleware], searchUsers);
usersRouter.get("/:id", [authMiddleware], getUserById);
usersRouter.put("/:id", [authMiddleware, verifyUserPermissions], updateUser);
usersRouter.delete("/:id", [authMiddleware], deleteUser);
usersRouter.delete("/:id/logo", [authMiddleware, verifyUserPermissions], deleteUserLogo);
usersRouter.post(
  "/:id/logo",
  [authMiddleware, verifyUserPermissions, upload.single("logo")],
  updateUserLogo,
);
