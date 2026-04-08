import type { RecentActivityItem } from "@/domains/workspaces/features/SingleWorkspace";
import { formatRelativeDate } from "@/domains/workspaces/utils";
import { Link } from "@tanstack/react-router";
import { taskStatusLabels } from "../utils/taskStatusLabels";

interface RecentActivityListProps {
  workspaceId: string;
  items: RecentActivityItem[];
}

export const RecentActivityList = ({
  workspaceId,
  items
}: RecentActivityListProps) => {
  return (
    <div className="divide-y divide-neutral-200/70">
      {items.map(activity => (
        <Link
          key={activity.id}
          to="/workspaces/$workspaceId/projects/$projectId"
          params={{ workspaceId, projectId: activity.projectId }}
          className="group flex items-center justify-between gap-3 px-4 py-4 transition-colors hover:bg-neutral-50"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-neutral-900 transition-colors group-hover:text-neutral-950">
              {activity.title}
            </p>
            <p className="mt-1 text-xs leading-5 text-neutral-500">
              {activity.projectName} · {taskStatusLabels[activity.status]}
            </p>
          </div>
          <span className="shrink-0 text-xs font-medium text-neutral-500 transition-colors group-hover:text-neutral-700">
            {formatRelativeDate(activity.updatedAt)}
          </span>
        </Link>
      ))}
    </div>
  );
};
