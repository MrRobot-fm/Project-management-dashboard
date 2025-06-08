import React from "react";
import { Avatar } from "@/components/Avatar";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import type { Project } from "@/types/models/api-get-project-by-id";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

interface AboutProjectBlockProps {
  project: Project;
}

export const AboutProjectBlock = ({ project }: AboutProjectBlockProps) => {
  const projectOwner = project?.members.find((member) => member.role === "OWNER");

  const date = new Date(project?.createdAt ?? "");

  const formatted = format(date, "dd MMMM yyyy", { locale: enUS });

  const metadataItems = [
    { key: "status", label: "Project status" },
    { key: "priority", label: "Priority" },
    { key: "creator", label: "Created by" },
    { key: "date", label: "Created date" },
  ];

  const renderMetaItem = (key: string) => {
    switch (key) {
      case "status":
        return <StatusBadge status={project.status} />;

      case "priority":
        return <PriorityBadge />;

      case "creator":
        return (
          <div className="flex gap-1 items-center">
            <Avatar image={projectOwner?.logo} className="size-5" />
            <span className="text-xs font-medium">{projectOwner?.name}</span>
          </div>
        );

      case "date":
        return <span className="text-xs">{formatted}</span>;

      default:
        return null;
    }
  };
  return (
    <div className="p-6 rounded-md border border-neutral-100 flex flex-col gap-2">
      <h3 className="font-semibold text-md">About project</h3>
      <ul className="flex flex-col text-sm text-neutral-600">
        {metadataItems.map((item) => (
          <li key={item.key} className="flex justify-between py-2">
            {item.label}
            {renderMetaItem(item.key)}
          </li>
        ))}
      </ul>
    </div>
  );
};
