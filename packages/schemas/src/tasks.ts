import { z } from "zod";

const TaskPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);
const TaskStatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

export const CreateTaskSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(300, { message: "Description must be at most 300 characters" })
    .optional(),

  startDate: z
    .string()
    .refine(val => !isNaN(Date.parse(val)), { message: "Invalid start date" }),
  dueDate: z
    .string()
    .refine(val => !isNaN(Date.parse(val)), { message: "Invalid due date" }),
  priority: TaskPriorityEnum,
  status: TaskStatusEnum,
  assignees: z.array(z.string()).optional(),
  assets: z.array(z.instanceof(File)).optional()
});

export const EditTaskSchema = CreateTaskSchema.partial();

export type CreateTaskValidation = z.infer<typeof CreateTaskSchema>;

export type EditTaskValidation = z.infer<typeof EditTaskSchema>;
