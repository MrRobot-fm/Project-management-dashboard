import { z } from "zod";

export const RegisterUserSchema = z.object({
  name: z.string().min(4).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(20)
});

export const RegisterUserSchemaWithRepeatPassword = RegisterUserSchema.extend({
  repeatPassword: z.string().min(6).max(20)
}).refine(data => data.password === data.repeatPassword, {
  message: "Passwords do not match",
  path: ["repeatPassword"]
});

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20)
});
