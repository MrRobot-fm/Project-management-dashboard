import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(4).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(20)
});

export const registerUserSchemaWithRepeatPassword = registerUserSchema
  .extend({
    repeatPassword: z.string().min(6).max(20)
  })
  .refine(data => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"]
  });

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20)
});
