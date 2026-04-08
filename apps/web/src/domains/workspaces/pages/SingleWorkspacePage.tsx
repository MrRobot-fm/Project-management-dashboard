import { projectsQueries } from "@/domains/projects/api/queries";
import { workspacesQueries } from "@/domains/workspaces/api/queries";
import {
  ProjectActivitySection,
  WorkspaceHeader,
  WorkspaceInsightsSection,
  WorkspaceNotFoundState,
  WorkspaceSummary,
  buildRecentActivity,
  buildTeamSnapshot,
  buildWorkspaceSummaryItems,
  filterProjects,
  type ProjectFilter
} from "@/domains/workspaces/features/SingleWorkspace";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const SingleWorkspacePageContent = () => {
  const { workspaceId } = useParams({
    from: "/(private)/_dashboard/workspaces/$workspaceId"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all");
  const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] =
    useState(false);

  const { data: workspaces = [] } = useQuery(workspacesQueries.getWorkspaces);
  const { data: projects = [] } = useQuery(
    projectsQueries.getWsProjects(workspaceId)
  );

  const workspace = workspaces.find(item => item.id === workspaceId);

  const summaryItems = useMemo(
    () => buildWorkspaceSummaryItems(projects),
    [projects]
  );

  const filteredProjects = useMemo(
    () => filterProjects(projects, searchQuery, projectFilter),
    [projectFilter, projects, searchQuery]
  );

  const recentActivity = useMemo(
    () => buildRecentActivity(projects),
    [projects]
  );

  const teamSnapshot = useMemo(() => buildTeamSnapshot(projects), [projects]);

  const openProjectDialog = () => {
    setIsCreateProjectDialogOpen(true);
  };

  if (!workspace) {
    return <WorkspaceNotFoundState />;
  }

  return (
    <div className="flex flex-col gap-8 p-6 pt-0 sm:p-8 sm:pt-0 xl:gap-10 xl:p-10 xl:pt-0">
      <WorkspaceHeader
        workspaceId={workspaceId}
        workspaceName={workspace.name}
        workspaceLogo={workspace.logo}
        isCreateProjectDialogOpen={isCreateProjectDialogOpen}
        onCreateProject={openProjectDialog}
        onOpenChange={setIsCreateProjectDialogOpen}
      />
      <WorkspaceSummary items={summaryItems} />
      <ProjectActivitySection
        workspaceId={workspaceId}
        projects={projects}
        filteredProjects={filteredProjects}
        searchQuery={searchQuery}
        selectedFilter={projectFilter}
        onSearchChange={setSearchQuery}
        onFilterChange={setProjectFilter}
        onCreateProject={openProjectDialog}
      />
      <WorkspaceInsightsSection
        workspaceId={workspaceId}
        recentActivity={recentActivity}
        teamSnapshot={teamSnapshot}
      />
    </div>
  );
};
