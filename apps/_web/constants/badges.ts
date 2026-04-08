import type { ProjectPriority, ProjectStatus, TaskStatus, UserRole } from "@workspace/db";

export const statusBadgeData: { id: string | number; value: ProjectStatus; label?: string }[] = [
  {
    id: 1,
    value: "INIT",
  },
  {
    id: 2,
    value: "PLANNING",
  },
  {
    id: 3,
    value: "BLOCKED",
  },
  {
    id: 4,
    value: "IN_PROGRESS",
  },
  {
    id: 5,
    value: "COMPLETED",
  },
  {
    id: 6,
    value: "CANCELLED",
  },
];

export const taskStatusBadgeData: { id: string | number; value: TaskStatus; label?: string }[] = [
  {
    id: 1,
    value: "TODO",
  },
  {
    id: 2,
    value: "IN_PROGRESS",
  },
  {
    id: 3,
    value: "DONE",
  },
];

export const priorityBadgeData: { id: string | number; value: ProjectPriority; label?: string }[] =
  [
    {
      id: 1,
      value: "LOW",
    },
    {
      id: 2,
      value: "MEDIUM",
    },
    {
      id: 3,
      value: "HIGH",
    },
    {
      id: 4,
      value: "CRITICAL",
    },
  ];

export const roleBadgeData: { id: string | number; value: UserRole; label?: string }[] = [
  {
    id: 1,
    value: "ADMIN",
  },
  {
    id: 2,
    value: "COLLABORATOR",
  },
  {
    id: 3,
    value: "EDITOR",
  },
  // {
  //   id: 4,
  //   value: "OWNER",
  // },
];
