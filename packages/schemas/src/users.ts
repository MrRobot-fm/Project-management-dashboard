import { z } from "zod";

export const UserSchema = z.object({
  name: z
    .string()
    .min(2, "The name must be at least 2 characters long")
    .max(100, "The name must not exceed 100 characters").optional(),
  email: z.string().email("Invalid email address").optional()
});

export type UserValidationType = z.infer<typeof UserSchema>;
