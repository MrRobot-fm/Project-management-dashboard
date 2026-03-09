import { AppSidebar } from "@/features/shared/components/AppSidebar";
import { SiteHeader } from "@/features/shared/components/SiteHeader";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  SidebarInset,
  SidebarProvider
} from "@workspace/ui/components/Sidebar";

export const Route = createFileRoute("/(private)/_dashboard")({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem"
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
