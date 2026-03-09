"use client";

import { useActionState, useEffect, useState, type ComponentProps } from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/Sidebar/Sidebar";
import { cn } from "@workspace/ui/lib/utils";
import { useExpandSidebar } from "./AppSidebar.hooks";
import { CustomDialog } from "@/components/CustomDialog";
import { NavMain } from "@/components/NavMain";
import { NavProjects } from "@/components/NavProjects";
import { NavSecondary } from "@/components/NavSecondary";
import { WorkspaceSelector } from "@/components/WorkspaceSelector";
import { WorkspaceSelectorActions } from "@/components/WorkspaceSelector/WorkspaceSelectorActions";
import { WorkspaceProjectForm } from "@/components/forms/WorkspaceProjectForm";
import type { CreateActionPayload } from "@/hooks/use-update-project";
import { createWorkspaceAction } from "@/services/workspaces/create-workspace";
import { updateWorkspaceAction } from "@/services/workspaces/update-workspace";
import type { Project } from "@/types/models/api-get-project-by-id";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconHome,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import type { Workspace } from "@workspace/db";

const data = {
  user: {
    name: "Federico Migliore",
    email: "m@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: IconHome,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  userId: string | undefined;
  workspaces: Workspace[];
  projects: Project[];
  currentWorkspaceId: string | undefined;
}

type WorkspaceAction = Awaited<ReturnType<typeof createWorkspaceAction>>;

export function AppSidebar({
  userId,
  workspaces,
  projects,
  currentWorkspaceId,
  ...props
}: AppSidebarProps) {
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [sheetMode, setSheetMode] = useState<"create" | "edit">("create");
  const [workspaceActionState, workspaceAction] = useActionState<
    WorkspaceAction,
    CreateActionPayload
  >(
    async (_state, { formData, currentWsId }) => {
      if (sheetMode === "edit") {
        return await updateWorkspaceAction({
          formData,
          workspaceId: currentWsId ?? "",
        });
      }
      return await createWorkspaceAction(formData);
    },
    { success: false, error: {} },
  );

  const isCreateMode = sheetMode === "create";
  const selectedWorkspace = workspaces.find((w) => w.id === currentWorkspaceId);

  useEffect(() => {
    if (workspaceActionState.success) setIsCreateWorkspaceOpen(false);
  }, [workspaceActionState]);

  const { handleMouseEnter, handleMouseLeave } = useExpandSidebar();

  return (
    <Sidebar
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      collapsible="icon"
      {...props}
    >
      <SidebarHeader className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5 ">
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Vionex Flow</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <NavMain items={data.navMain} />
        <NavProjects projects={projects ?? []} currentWorkspaceId={currentWorkspaceId} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <WorkspaceSelector
          key={isCreateWorkspaceOpen || isDeleteDialogOpen ? "open" : "closed"}
          userId={userId}
          workspaces={workspaces}
          sidebarMenuButtonWrapper={{
            component: SidebarMenuButton,
            props: {
              asChild: true,
              size: "lg",
              className: cn(workspaces.length === 0 && "group-data-[collapsible=icon]:hidden"),
            },
          }}
          actionSlot={
            <WorkspaceSelectorActions
              workspaces={workspaces}
              currentWorkspaceName={selectedWorkspace?.name}
              setIsCreateWorkspaceOpen={setIsCreateWorkspaceOpen}
              setSheetMode={setSheetMode}
              currentWorkspaceId={currentWorkspaceId}
              isDeleteDialogOpen={isDeleteDialogOpen}
              setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            />
          }
        />
        <CustomDialog
          title={isCreateMode ? "Create your workspace" : `Edit your workspace`}
          description={
            isCreateMode
              ? "This is where your ideas take shape"
              : "Edit details and keep your workspace up to date"
          }
          isOpen={isCreateWorkspaceOpen}
          setIsOpen={setIsCreateWorkspaceOpen}
          contentSlot={
            <WorkspaceProjectForm
              id={currentWorkspaceId}
              data={selectedWorkspace && sheetMode === "edit" ? selectedWorkspace : undefined}
              action={workspaceAction}
              mode={sheetMode}
              type="workspace"
              workspaceId={currentWorkspaceId}
            />
          }
        />
      </SidebarFooter>
    </Sidebar>
  );
}
