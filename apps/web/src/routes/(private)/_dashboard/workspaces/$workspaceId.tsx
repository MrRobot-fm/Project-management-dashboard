import { projectsQueries } from "@/domains/projects/api/queries";
import { workspacesQueries } from "@/domains/workspaces/api/queries";
import { SingleWorkspacePageContent } from "@/domains/workspaces/pages/SingleWorkspacePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(private)/_dashboard/workspaces/$workspaceId"
)({
  component: SingleWorkspacePageContent,
  loader: ({ params, context }) => {
    context.queryClient.ensureQueryData(workspacesQueries.getWorkspaces);
    context.queryClient.ensureQueryData(
      projectsQueries.getWsProjects(params.workspaceId)
    );
  }
});
