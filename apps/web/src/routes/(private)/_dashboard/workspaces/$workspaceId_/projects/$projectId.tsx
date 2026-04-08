import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_dashboard/workspaces/$workspaceId_/projects/$projectId")({
  component: RouteComponent
});

function RouteComponent() {
  return <div>Hello "/(private)/_dashboard/projects/$id"!</div>;
}
