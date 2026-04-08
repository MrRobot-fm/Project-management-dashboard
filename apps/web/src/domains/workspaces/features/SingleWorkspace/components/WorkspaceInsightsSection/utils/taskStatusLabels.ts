import type { TaskStatus } from "@workspace/db";

export const taskStatusLabels: Record<TaskStatus, string> = {
  TODO: "To do",
  IN_PROGRESS: "In progress",
  DONE: "Completed",
  BLOCKED: "Blocked"
};
