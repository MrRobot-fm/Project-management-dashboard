import type { ReactNode } from "react";
import { FolderKanban, Layers3, ListTodo, RefreshCcw } from "lucide-react";
import type { WorkspaceSummaryItem } from "@/domains/workspaces/features/Workspaces";

import { OverviewStat } from "./components/OverviewStat";

const summaryIcons: Record<WorkspaceSummaryItem["key"], ReactNode> = {
  totalWorkspaces: <Layers3 className="size-4" />,
  totalProjects: <FolderKanban className="size-4" />,
  totalTasks: <ListTodo className="size-4" />,
  lastUpdated: <RefreshCcw className="size-4" />
};

interface WorkspaceSummaryProps {
  items: WorkspaceSummaryItem[];
}

export const WorkspaceSummary = ({ items }: WorkspaceSummaryProps) => (
  <section>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(item => (
        <OverviewStat
          key={item.key}
          label={item.label}
          value={item.value}
          description={item.description}
          icon={summaryIcons[item.key]}
          tone={item.tone}
        />
      ))}
    </div>
  </section>
);
