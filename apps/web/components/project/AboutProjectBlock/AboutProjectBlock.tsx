import type { ComponentProps } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { EditProjectDialog } from "../EditProjectDialog";
import { Avatar } from "@/components/Avatar";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import type { ProjectMember } from "@/types/models/api-get-project-by-id";
import { formatDate } from "@/utils/format-date";
import type { Project } from "@workspace/db";

interface AboutProjectBlockProps extends ComponentProps<"div"> {
  project: Project & { members: ProjectMember[] };
}

export const AboutProjectBlock = ({ project, className }: AboutProjectBlockProps) => {
  const projectOwner = project?.members.find((member) => member.role === "OWNER");

  const formattedDate = formatDate({ date: project.createdAt });

  const projectInfoField = [
    { key: "status", label: "Status" },
    { key: "creator", label: "Created by" },
    { key: "priority", label: "Priority" },
    { key: "date", label: "Created at" },
  ];

  const InfoField = ({ type }: { type: string }) => {
    switch (type) {
      case "status":
        return <StatusBadge status={project.status} />;
      case "priority":
        return <PriorityBadge priority={project.priority} />;
      case "creator":
        return (
          <div className="flex gap-1 items-center overflow-hidden">
            <Avatar size="md" image={projectOwner?.logo} fallback={projectOwner?.name} />
            <span className="text-xs font-medium truncate">{projectOwner?.name}</span>
          </div>
        );
      case "date":
        return <span className="text-xs">{formattedDate}</span>;

      default:
        return null;
    }
  };
  return (
    <div
      className={cn(
        "relative p-6 rounded-lg border border-neutral-200/70 shadow-neutral-100 shadow-md flex flex-col gap-4 h-full",
        className,
      )}
    >
      <div className="flex flex-col md:flex-row w-full flex-1 gap-8">
        <Avatar
          className="h-auto w-full max-w-3xs rounded-md hidden md:block"
          shape="square"
          image={project.logo}
          fallback={project.name}
        />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 text-sm text-neutral-600">
              <p>Name</p>
              <span className="text-sm font-medium">{project.name}</span>
            </div>
            <div className="flex flex-col gap-1 text-sm text-neutral-600">
              <p>Description</p>
              <p className="text-sm font-medium">
                {project.description ? project.description : "-"}
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-y-6 gap-x-4 md:gap-x-14 text-sm text-neutral-600 h-fit w-fit">
            {projectInfoField.map((item) => (
              <li key={item.key} className="flex flex-col gap-2 justify-between">
                {item.label}
                <InfoField type={item.key} />
              </li>
            ))}
          </ul>
        </div>
        <div className="block ml-auto sm:absolute top-6 right-6">
          <EditProjectDialog project={project} />
        </div>
      </div>
    </div>
  );
};
