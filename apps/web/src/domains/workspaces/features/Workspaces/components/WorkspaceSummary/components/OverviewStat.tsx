import type { ReactNode } from "react";
import type { WorkspaceSummaryTone } from "@/domains/workspaces/features/Workspaces";

const overviewStatToneClasses: Record<WorkspaceSummaryTone, { icon: string }> =
  {
    amber: { icon: "bg-amber-100 text-amber-700" },
    sky: { icon: "bg-sky-100 text-sky-700" },
    emerald: { icon: "bg-emerald-100 text-emerald-700" },
    rose: { icon: "bg-rose-100 text-rose-700" }
  };

interface OverviewStatProps {
  label: string;
  value: string;
  description: string;
  icon: ReactNode;
  tone: WorkspaceSummaryTone;
}

export const OverviewStat = ({
  label,
  value,
  description,
  icon,
  tone
}: OverviewStatProps) => {
  return (
    <div className="space-y-2 rounded-sm border p-4">
      <div className="flex items-center justify-between text-sm text-neutral-500">
        <span>{label}</span>
        <span
          aria-hidden="true"
          className={`rounded-full p-2 ${overviewStatToneClasses[tone].icon}`}
        >
          {icon}
        </span>
      </div>
      <p className="text-2xl font-semibold tracking-tight text-neutral-950">
        {value}
      </p>
      <p className="text-xs leading-6 text-neutral-500">{description}</p>
    </div>
  );
};
