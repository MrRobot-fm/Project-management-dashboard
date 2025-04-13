import { Router } from "express";
import {
  loginController,
  logoutController,
  refreshTokenController,
  signUpController,
} from "@/controllers/auth";

export const authRouter = Router();

authRouter.post("/logout", logoutController);
authRouter.post("/signup", signUpController);
authRouter.post("/login", loginController);
authRouter.post("/refresh", refreshTokenController);
