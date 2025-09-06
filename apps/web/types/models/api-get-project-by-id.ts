import type {
  ProjectPriority,
  ProjectStatus,
  TaskPriority,
  TaskStatus,
  UserRole,
} from "@workspace/db";

export interface ProjectMember {
  id: string;
  name: string;
  email: string;
  logo: string | null;
  role: UserRole;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  position: number | null;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  dueDate: string;
  assignees: Assignee[];
  // labels: Label[];
  assets: Assets[];
}

// interface Label {
//   id: string;
//   name: string;
//   color: string;
// }

interface Assets {
  id: string;
  taskId: string;
  path: string;
  name: string;
  size: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface Assignee {
  taskId: string;
  userId: string;
  user: {
    email: string;
    name: string;
    logo: string | null;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  logo: string | null;
  status: ProjectStatus;
  priority: ProjectPriority;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
  members: ProjectMember[];
  tasks: Task[];
}

export interface ApiGetProjectByIdResponseModel {
  project: Project | undefined;
}
