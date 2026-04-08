import { Avatar } from "@/domains/shared/components/Avatar";
import type { WorkspaceWithStats } from "@/domains/workspaces/api/types";
import { formatDate } from "@/domains/workspaces/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { WorkspacePill } from "./components/WorkspacePill";

interface WorkspaceListRowProps {
  workspace: WorkspaceWithStats;
  isLatest: boolean;
}

export const WorkspaceListRow = ({
  workspace,
  isLatest
}: WorkspaceListRowProps) => {
  return (
    <Link
      to="/workspaces/$workspaceId"
      params={{ workspaceId: workspace.id }}
      className="group flex flex-col gap-4 px-4 py-5 transition-all hover:bg-neutral-50 md:flex-row md:items-start md:justify-between"
    >
      <div className="flex min-w-0 items-start gap-4">
        <Avatar
          image={workspace.logo}
          fallback={workspace.name}
          size="3xl"
          shape="square"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="truncate text-lg font-semibold text-neutral-900 transition-colors group-hover:text-neutral-950">
              {workspace.name}
            </h3>
            <WorkspacePill
              label={isLatest ? "Latest update" : "Workspace"}
              tone={isLatest ? "emerald" : "sky"}
            />
          </div>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-neutral-600">
            Open this workspace to inspect project volume, recent updates, and
            working context.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-neutral-500">
            <span>{workspace.projectsCount} projects</span>
            <span>{workspace.tasksCount} tasks</span>
            <span>Updated {formatDate(workspace.updatedAt)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors group-hover:text-neutral-900">
        Open workspace
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
};
