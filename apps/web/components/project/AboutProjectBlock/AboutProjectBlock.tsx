import { Avatar } from "@/components/Avatar";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import type { ProjectMember } from "@/types/models/api-get-project-by-id";
import { formatDate } from "@/utils/format-date";
import type { Project } from "@workspace/db";

interface AboutProjectBlockProps {
  project: Project & { members: ProjectMember[] };
}

export const AboutProjectBlock = ({ project }: AboutProjectBlockProps) => {
  const projectOwner = project?.members.find((member) => member.role === "OWNER");

  const formattedDate = formatDate({ date: project.createdAt });

  const projectInfoField = [
    { key: "status", label: "Project status" },
    { key: "priority", label: "Priority" },
    { key: "creator", label: "Created by" },
    { key: "date", label: "Created date" },
  ];

  const InfoField = ({ type }: { type: string }) => {
    switch (type) {
      case "status":
        return <StatusBadge status={project.status} />;
      case "priority":
        return <PriorityBadge priority={project.priority} />;
      case "creator":
        return (
          <div className="flex gap-1 items-center">
            <Avatar image={projectOwner?.logo} fallback={projectOwner?.name} className="size-5" />
            <span className="text-xs font-medium">{projectOwner?.name}</span>
          </div>
        );
      case "date":
        return <span className="text-xs">{formattedDate}</span>;

      default:
        return null;
    }
  };
  return (
    <div className="p-6 rounded-md border border-neutral-100 shadow flex flex-col gap-2">
      <h3 className="font-medium text-md">About project</h3>
      <ul className="flex flex-col text-sm text-neutral-600">
        {projectInfoField.map((item) => (
          <li key={item.key} className="flex justify-between py-2">
            {item.label}
            <InfoField type={item.key} />
          </li>
        ))}
      </ul>
    </div>
  );
};
