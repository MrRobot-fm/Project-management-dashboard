import type { WorkspaceActivityItem } from "@/domains/workspaces/features/Workspaces";

import { InfoBlock } from "./components/InfoBlock";

interface WorkspaceInsightsSectionProps {
  items: WorkspaceActivityItem[];
}

export const WorkspaceInsightsSection = ({
  items
}: WorkspaceInsightsSectionProps) => {
  return (
    <aside className="border-t border-neutral-200/70 pt-8 xl:sticky xl:top-32 xl:border-t-0 xl:border-l xl:border-neutral-200/70 xl:pt-0 xl:pl-8">
      <h2 className="text-xl font-semibold text-neutral-950">
        Workspace Activity
      </h2>
      <p className="mt-1 text-sm leading-6 text-neutral-500">
        Shortcuts to the most recent and busiest spaces in the list.
      </p>
      <div className="mt-6 space-y-5">
        {items.map(item => (
          <InfoBlock
            key={item.label}
            label={item.label}
            value={item.value}
            description={item.description}
          />
        ))}
      </div>
    </aside>
  );
};
