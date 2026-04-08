import { WorkspacesPageContent } from "@/domains/workspaces/pages/WorkspacesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_dashboard/workspaces/")({
  component: WorkspacesPageContent
});
