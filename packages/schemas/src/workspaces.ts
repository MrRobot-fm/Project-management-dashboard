import { z } from "zod";

export const CreateWorkspaceSchema = z.object({
  name: z
    .string()
    .min(3, "The name must be at least 3 characters long")
    .max(100, "The name must not exceed 100 characters")
});
