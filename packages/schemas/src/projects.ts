import { z } from "zod";

export const CreateProjectsSchema = z.object({
  name: z
    .string()
    .min(2, "The name must be at least 3 characters long")
    .max(100, "The name must not exceed 100 characters"),
  description: z
    .string()
    .min(2, "The description must be at least 3 characters long")
    .max(100, "The description must not exceed 100 characters")
    .optional(),
  logo: z.union([z.string().url(), z.instanceof(File)]).optional()
});

export const UpdateProjectSchema = CreateProjectsSchema.partial();
