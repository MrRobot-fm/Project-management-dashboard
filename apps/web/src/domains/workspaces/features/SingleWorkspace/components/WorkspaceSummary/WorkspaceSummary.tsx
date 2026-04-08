import type { WorkspaceSummaryItem } from "@/domains/workspaces/features/SingleWorkspace";
import { WorkspaceDetailInline } from "./components/WorkspaceDetailInline";

interface WorkspaceSummaryProps {
  items: WorkspaceSummaryItem[];
}

export const WorkspaceSummary = ({ items }: WorkspaceSummaryProps) => {
  return (
    <section>
      <div className="grid gap-5 border-b pb-6 lg:grid-cols-5">
        {items.map(item => (
          <WorkspaceDetailInline
            key={item.label}
            label={item.label}
            value={item.value}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};
