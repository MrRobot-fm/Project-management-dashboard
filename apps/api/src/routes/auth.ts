import { Router } from "express";
import { loginController, signUpController } from "@/controllers/auth";

export const authRouter = Router();

authRouter.post("/signup", signUpController);
authRouter.post("/login", loginController);
