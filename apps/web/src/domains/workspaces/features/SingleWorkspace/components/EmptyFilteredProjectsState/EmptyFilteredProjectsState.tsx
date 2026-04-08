import { WorkspaceEmptyStatePanel } from "@/domains/workspaces/components";

export const EmptyFilteredProjectsState = () => {
  return (
    <WorkspaceEmptyStatePanel
      title="No projects in this view"
      description="Try another search or switch filter to review a different set of projects."
    />
  );
};
