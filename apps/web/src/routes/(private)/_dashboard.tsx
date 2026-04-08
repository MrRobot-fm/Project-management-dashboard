import { requireUser } from "@/domains/auth/api/services/require-user";
import { AppSidebar } from "@/domains/shared/components/layout/AppSidebar";
import { SiteHeader } from "@/domains/shared/components/layout/SiteHeader";
import { workspacesQueries } from "@/domains/workspaces/api/queries";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  SidebarInset,
  SidebarProvider
} from "@workspace/ui/components/Sidebar";

export const Route = createFileRoute("/(private)/_dashboard")({
  component: RouteComponent,
  beforeLoad: ({ context }) => requireUser(context.queryClient),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(workspacesQueries.getWorkspaces);
  }
});

function RouteComponent() {
  return (
    <SidebarProvider
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "17.5rem"
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="floating" collapsible="icon" />
      <SidebarInset>
        <SiteHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
