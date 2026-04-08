import { SidebarMenuItem } from "@workspace/ui/components/Sidebar";

export const NavProjectsEmpty = () => {
  return (
    <SidebarMenuItem data-test-id="project-empty-state" className="text-xs p-2">
      No projects. Create one, now!
    </SidebarMenuItem>
  );
};
