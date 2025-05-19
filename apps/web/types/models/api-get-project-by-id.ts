import type { TaskPriority, TaskStatus, UserRole } from "@workspace/db";

interface Member {
  id: string;
  name: string;
  email: string;
  logo: string | null;
  role: UserRole;
}

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  position: number | null;
  assigneeId: string | null;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  assignee?: Assignee;
  labels: Label[];
}

interface Label {
  id: string;
  name: string;
  color: string;
}

interface Assignee {
  id: string;
  name: string;
  email: string;
  logo: string | null;
}

interface Project {
  id: string;
  name: string;
  description: string | null;
  logo: string | null;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
  members: Member[];
  tasks: Task[];
}

export interface ApiGetProjectByIdResponseModel {
  project: Project | undefined;
}
