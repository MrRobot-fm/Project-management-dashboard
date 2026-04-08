import { Avatar } from "@/domains/shared/components/Avatar";
import { type ProjectListItem } from "@/domains/workspaces/features/SingleWorkspace";
import { formatDate } from "@/domains/workspaces/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ProjectStatusPill } from "./ProjectStatusPill";

interface ProjectItemProps {
  workspaceId: string;
  project: ProjectListItem;
}

export const ProjectItem = ({ workspaceId, project }: ProjectItemProps) => {
  return (
    <Link
      key={project.id}
      to="/workspaces/$workspaceId/projects/$projectId"
      params={{ workspaceId, projectId: project.id }}
      className="group flex flex-col gap-4 px-4 py-5 transition-all hover:bg-neutral-50 md:flex-row md:items-start md:justify-between"
    >
      <div className="flex min-w-0 items-start gap-4">
        <Avatar
          image={project.logo}
          fallback={project.name}
          size="3xl"
          shape="square"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="truncate text-lg font-semibold text-neutral-900 transition-colors group-hover:text-neutral-950">
              {project.name}
            </h3>
            <ProjectStatusPill status={project.status} />
          </div>
          <p className="mt-1 line-clamp-2 max-w-2xl wrap-break-word text-sm leading-6 text-neutral-600">
            {project.description || "No description yet for this project."}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-neutral-500">
            <span>{project.tasks.length} tasks</span>
            <span>{project.members.length} members</span>
            <span>Updated {formatDate(project.updatedAt)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors group-hover:text-neutral-900">
        Open project
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
};
