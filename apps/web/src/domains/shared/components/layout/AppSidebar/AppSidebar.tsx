import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@workspace/ui/components/Sidebar/Sidebar";
import { type ComponentProps } from "react";
// import { useExpandSidebar } from "./AppSidebar.hooks";
import { AppSidebarWorkspaceSection } from "@/domains/shared/components/layout/AppSidebar/components/AppSidebarWorkspaceSection";
import { NavMain } from "@/domains/shared/components/layout/AppSidebar/components/NavMain";
import { NavProjects } from "@/domains/shared/components/layout/AppSidebar/components/NavProjects";
import { NavSecondary } from "@/domains/shared/components/NavSecondary";
// import type { CreateActionPayload } from "@/hooks/use-update-project";
// import { createWorkspaceAction } from "@/services/workspaces/create-workspace";
// import { updateWorkspaceAction } from "@/services/workspaces/update-workspace";
import { projectsQueries } from "@/domains/projects/api/queries";
import { IconInnerShadowTop } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { data } from "./data/nav-data";

type AppSidebarProps = ComponentProps<typeof Sidebar>;

export const AppSidebar = ({ ...props }: AppSidebarProps) => {
  const { workspaceId, projectId } = useParams({ strict: false });

  const { data: projects = [] } = useQuery(
    projectsQueries.getWsProjects(workspaceId)
  );

  // const { handleMouseEnter, handleMouseLeave } = useExpandSidebar();

  return (
    <Sidebar
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      collapsible="icon"
      {...props}
    >
      <SidebarHeader className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5! "
            >
              <Link to="/dashboard">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Vionex Flow</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <NavMain items={data.navMain} />
        {workspaceId && projects && projectId && (
          <NavProjects projects={projects} currentWorkspaceId={workspaceId} />
        )}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <AppSidebarWorkspaceSection workspaceId={workspaceId} />
    </Sidebar>
  );
};
