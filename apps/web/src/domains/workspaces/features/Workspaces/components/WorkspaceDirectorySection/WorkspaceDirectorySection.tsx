import type { WorkspaceWithStats } from "@/domains/workspaces/api/types";
import {
  WorkspaceSearchControls,
  WorkspaceSectionIntro
} from "@/domains/workspaces/components";
import { type WorkspaceSort } from "@/domains/workspaces/features/Workspaces";
import { getMostRecentBy } from "@/domains/workspaces/utils";
import { EmptyState } from "../EmptyState";
import { WorkspaceListRow } from "../WorkspaceListRow";
import { WORKSPACE_SORT_OPTIONS } from "./utils/workspaceSortOptions";

interface WorkspaceDirectorySectionProps {
  workspaces: WorkspaceWithStats[];
  searchQuery: string;
  sortBy: WorkspaceSort;
  onSearchChange: (value: string) => void;
  onSortChange: (value: WorkspaceSort) => void;
}

export const WorkspaceDirectorySection = ({
  workspaces,
  searchQuery,
  sortBy,
  onSearchChange,
  onSortChange
}: WorkspaceDirectorySectionProps) => {
  const latestWorkspace = getMostRecentBy(workspaces, "updatedAt");

  return (
    <div>
      <WorkspaceSectionIntro
        title="All Workspaces"
        description="Compare names, activity, and timestamps before entering a workspace."
        className="mb-6"
      />

      <WorkspaceSearchControls
        value={searchQuery}
        placeholder="Search workspaces..."
        onValueChange={onSearchChange}
        options={WORKSPACE_SORT_OPTIONS}
        selectedValue={sortBy}
        onOptionChange={onSortChange}
      />

      {workspaces.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="divide-y divide-neutral-200/70">
          {workspaces.map(workspace => (
            <WorkspaceListRow
              key={workspace.id}
              workspace={workspace}
              isLatest={workspace.id === latestWorkspace?.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
