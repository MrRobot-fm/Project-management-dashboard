import { z } from "zod";

export const CreateWorkspaceSchema = z.object({
  name: z
    .string()
    .min(2, "The name must be at least 2 characters long")
    .max(100, "The name must not exceed 100 characters"),
  logo: z
    .union([z.string().url(), z.instanceof(File), z.literal(null)])
    .optional()
    .transform(val => (val === "" ? undefined : val))
});
