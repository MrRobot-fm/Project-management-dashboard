import {
  WorkspaceSearchControls,
  WorkspaceSectionIntro
} from "@/domains/workspaces/components";
import {
  type ProjectFilter,
  type ProjectListItem
} from "@/domains/workspaces/features/SingleWorkspace";
import { EmptyFilteredProjectsState } from "../EmptyFilteredProjectsState";
import { EmptyProjectsState } from "../EmptyProjectsState";
import { ProjectList } from "../ProjectList";
import { PROJECT_FILTER_OPTIONS } from "./utils/projectFilterOptions";

interface ProjectActivitySectionProps {
  workspaceId: string;
  projects: ProjectListItem[];
  filteredProjects: ProjectListItem[];
  searchQuery: string;
  selectedFilter: ProjectFilter;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: ProjectFilter) => void;
  onCreateProject: () => void;
}

export const ProjectActivitySection = ({
  workspaceId,
  projects,
  filteredProjects,
  searchQuery,
  selectedFilter,
  onSearchChange,
  onFilterChange,
  onCreateProject
}: ProjectActivitySectionProps) => {
  return (
    <section className="bg-transparent p-0">
      <WorkspaceSectionIntro
        title="Project Activity"
        description="Review status, ownership, and recent updates before jumping into a project."
        className="mb-6"
      />

      <WorkspaceSearchControls
        value={searchQuery}
        placeholder="Search projects..."
        onValueChange={onSearchChange}
        options={PROJECT_FILTER_OPTIONS}
        selectedValue={selectedFilter}
        onOptionChange={onFilterChange}
      />

      {projects.length === 0 ? (
        <EmptyProjectsState onCreateProject={onCreateProject} />
      ) : filteredProjects.length === 0 ? (
        <EmptyFilteredProjectsState />
      ) : (
        <ProjectList workspaceId={workspaceId} projects={filteredProjects} />
      )}
    </section>
  );
};
