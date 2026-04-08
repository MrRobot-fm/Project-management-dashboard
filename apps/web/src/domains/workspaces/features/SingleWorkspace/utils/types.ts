export type ProjectFilter = "all" | "active" | "blocked" | "completed";
export type ProjectStatus =
  | "TODO"
  | "INIT"
  | "PLANNING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "BLOCKED"
  | "DONE";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "BLOCKED" | "DONE";

export type ProjectTaskItem = {
  id: string;
  title: string;
  status: TaskStatus;
  updatedAt: string;
};

export type ProjectMemberItem = {
  id: string;
  name: string;
  logo: string | null;
};

export type ProjectListItem = {
  id: string;
  name: string;
  logo: string | null;
  description: string | null;
  status: ProjectStatus;
  updatedAt: string;
  createdAt: string;
  tasks: ProjectTaskItem[];
  members: ProjectMemberItem[];
};

export type WorkspaceSummaryItem = {
  label: string;
  value: string;
  description: string;
};

export type RecentActivityItem = {
  id: string;
  title: string;
  status: TaskStatus;
  updatedAt: string;
  projectId: string;
  projectName: string;
};

export type TeamSnapshotItem = {
  id: string;
  name: string;
  logo: string | null;
  projectCount: number;
};
