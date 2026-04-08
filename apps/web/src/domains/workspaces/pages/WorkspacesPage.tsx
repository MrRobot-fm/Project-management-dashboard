import { workspacesQueries } from "@/domains/workspaces/api/queries";
import {
  WorkspaceDirectorySection,
  WorkspaceInsightsSection,
  WorkspacesHeader,
  WorkspaceSummary,
  buildWorkspaceActivityItems,
  buildWorkspaceSummaryItems,
  filterWorkspaces,
  type WorkspaceSort
} from "@/domains/workspaces/features/Workspaces";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const WorkspacesPageContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<WorkspaceSort>("recent");

  const { data: workspaces = [] } = useQuery(workspacesQueries.getWorkspaces);

  const summaryItems = useMemo(
    () => buildWorkspaceSummaryItems(workspaces),
    [workspaces]
  );

  const filteredWorkspaces = useMemo(
    () => filterWorkspaces(workspaces, searchQuery, sortBy),
    [searchQuery, sortBy, workspaces]
  );

  const activityItems = useMemo(
    () => buildWorkspaceActivityItems(workspaces),
    [workspaces]
  );

  return (
    <div className="flex flex-col gap-8 p-6 sm:p-8 xl:gap-10 xl:p-10">
      <WorkspacesHeader />
      <WorkspaceSummary items={summaryItems} />
      <section className="grid gap-10 xl:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.9fr)] xl:items-start">
        <WorkspaceDirectorySection
          workspaces={filteredWorkspaces}
          searchQuery={searchQuery}
          sortBy={sortBy}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
        />
        <WorkspaceInsightsSection items={activityItems} />
      </section>
    </div>
  );
};
