import { WorkspaceEmptyStatePanel } from "@/domains/workspaces/components";

export const EmptyState = () => {
  return (
    <WorkspaceEmptyStatePanel
      title="No matching workspaces"
      description="Try another search or create your first workspace to start grouping projects and collaboration in one place."
    />
  );
};
