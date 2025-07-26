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
import { validateBody } from "@/middlewares/validate-body";
import { UserSchema } from "@workspace/schemas";

export const usersRouter: Router = Router();

usersRouter.post("/", createUser);
usersRouter.get("/", [authMiddleware], getAllUsers);
usersRouter.get("/me", [authMiddleware], getCurrentUser);
usersRouter.get("/search/:projectId", [authMiddleware], searchUsers);
usersRouter.get("/:id", [authMiddleware], getUserById);
usersRouter.put(
  "/:id",
  [authMiddleware, verifyUserPermissions, validateBody(UserSchema)],
  updateUser,
);
usersRouter.delete("/:id", [authMiddleware], deleteUser);
usersRouter.delete("/:id/logo", [authMiddleware, verifyUserPermissions], deleteUserLogo);
usersRouter.post(
  "/:id/logo",
  [authMiddleware, verifyUserPermissions, upload.single("logo")],
  updateUserLogo,
);
