import type { ProjectStatus } from "@/domains/workspaces/features/SingleWorkspace";

const projectStatusLabels: Record<ProjectStatus, string> = {
  TODO: "To do",
  INIT: "Initialized",
  PLANNING: "Planning",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  BLOCKED: "Blocked",
  DONE: "Done"
};

const projectStatusToneClasses: Record<ProjectStatus, string> = {
  TODO: "border-amber-200 bg-amber-50 text-amber-700",
  INIT: "border-sky-200 bg-sky-50 text-sky-700",
  PLANNING: "border-amber-200 bg-amber-50 text-amber-700",
  IN_PROGRESS: "border-emerald-200 bg-emerald-50 text-emerald-700",
  COMPLETED: "border-violet-200 bg-violet-50 text-violet-700",
  CANCELLED: "border-rose-200 bg-rose-50 text-rose-700",
  BLOCKED: "border-orange-200 bg-orange-50 text-orange-700",
  DONE: "border-violet-200 bg-violet-50 text-violet-700"
};

interface ProjectStatusPillProps {
  status: ProjectStatus;
}

export const ProjectStatusPill = ({ status }: ProjectStatusPillProps) => {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] ${projectStatusToneClasses[status]}`}
    >
      {projectStatusLabels[status]}
    </span>
  );
};
