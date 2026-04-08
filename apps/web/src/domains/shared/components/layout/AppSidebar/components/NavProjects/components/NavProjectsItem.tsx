import type { Project } from "@/domains/projects/api/types";
import { Avatar } from "@/domains/shared/components/Avatar";
import type { DropdownItem } from "@/domains/shared/components/layout/AppSidebar/components/NavProjects/types";
import { Link } from "@tanstack/react-router";
import {
  SidebarMenuButton,
  SidebarMenuItem
} from "@workspace/ui/components/Sidebar";
import { NavProjectsDropdown } from "./NavProjectsDropdown";

interface NavProjectsItemProps {
  project: Project;
  isMobile: boolean;
  dropdownItems: DropdownItem[];
}

export const NavProjectsItem = ({
  isMobile,
  project,
  dropdownItems
}: NavProjectsItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        data-test-id="project-item"
        className="group-data-[collapsible=icon]:p-1.5!"
      >
        <Link
          to="/workspaces/$workspaceId/projects/$projectId"
          params={{
            workspaceId: project.workspaceId,
            projectId: project.id
          }}
          activeProps={{ className: "bg-neutral-100" }}
        >
          <Avatar
            size="md"
            shape="square"
            image={project.logo}
            fallback={project.name}
          />
          <span className="text-sm mr-auto">{project.name}</span>
        </Link>
      </SidebarMenuButton>
      <NavProjectsDropdown isMobile={isMobile} items={dropdownItems} />
    </SidebarMenuItem>
  );
};
