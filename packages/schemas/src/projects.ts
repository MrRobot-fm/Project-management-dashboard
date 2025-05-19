import { z } from "zod";

export const CreateProjectsSchema = z.object({
  name: z
    .string()
    .min(2, "The name must be at least 2 characters long")
    .max(100, "The name must not exceed 100 characters"),
  description: z
    .string()
    .transform(val => (val.trim() === "" ? undefined : val))
    .optional()
    .refine(
      val => val === undefined || (val.length >= 2 && val.length <= 100),
      {
        message: "The description must be between 2 and 100 characters"
      }
    ),

  logo: z
    .union([z.string().url(), z.instanceof(File), z.literal(null)])
    .optional()
    .transform(val => (val === "" ? undefined : val))
});

export type CreateProjectType = z.infer<typeof CreateProjectsSchema>;
export type CreateProjectTypeFlatten = z.inferFlattenedErrors<
  typeof CreateProjectsSchema
>["fieldErrors"];

export const UpdateProjectSchema = CreateProjectsSchema.partial();

export type UpdateProjectType = z.infer<typeof UpdateProjectSchema>;

export type UpdateProjectTypeFlatten = z.inferFlattenedErrors<
  typeof UpdateProjectSchema
>["fieldErrors"];
