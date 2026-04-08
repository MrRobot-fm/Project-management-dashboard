import type { Project } from "@/domains/shared/types/api-get-project-by-id";
import { IconFolder, IconTrash } from "@tabler/icons-react";
import { Edit } from "lucide-react";
import type { DropdownItem } from "../types";

export const getProjectDropdownItems = (
  project: Project,
  handlers: {
    onEdit: (project: Project) => void;
    onDelete: (project: Project) => void;
  }
): DropdownItem[] => [
  {
    icon: <IconFolder />,
    label: "Open",
    href: `/workspaces/${project.workspaceId}/projects/${project.id}`,
    isLink: true
  },
  {
    icon: <Edit />,
    label: "Edit",
    action: () => handlers.onEdit(project),
    isLink: false
  },
  {
    icon: <IconTrash />,
    label: "Delete",
    action: () => handlers.onDelete(project),
    isDestructive: true,
    isLink: false
  }
];
