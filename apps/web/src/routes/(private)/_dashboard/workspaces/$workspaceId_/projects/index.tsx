import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(private)/_dashboard/workspaces/$workspaceId_/projects/"
)({
  component: RouteComponent
});

function RouteComponent() {
  return <div>Hello "/(private)/_dashboard/projects"!</div>;
}
