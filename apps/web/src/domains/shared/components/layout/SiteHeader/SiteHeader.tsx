import { Separator } from "@workspace/ui/components/Separator";
import { SidebarTrigger } from "@workspace/ui/components/Sidebar";
import { useMemo, useState } from "react";
import { DeleteAccountDialog } from "@/domains/shared/components/DeleteAccountDialog";
import { UserAccountDialog } from "@/domains/shared/components/UserAccountDialog";
import { UserMenu } from "@/domains/shared/components/UserMenu";
import { workspacesQueries } from "@/domains/workspaces/api/queries";
import { usersQueries } from "@/domains/users/api/queries/users.queries";
import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import { useParams, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useLogout } from "@/domains/auth/hooks/use-logout";

export const SiteHeader = () => {
  const { workspaceId } = useParams({ strict: false });
  const [isUserAccountOpen, setIsUserAccountOpen] = useState(false);
  const [isDeleteUserAccountOpen, setIsDeleteUserAccountOpen] = useState(false);

  const { data: user } = useQuery(usersQueries.getCurrentUser);
  const { data: workspaces = [] } = useQuery(workspacesQueries.getWorkspaces);
  const pathname = useRouterState({
    select: state => state.location.pathname
  });

  const { mutate: logout } = useLogout();

  const menuLinksItem = useMemo(() => {
    return [
      {
        title: "Edit account",
        value: "edit-account",
        icon: IconUserCircle,
        action: () => setIsUserAccountOpen(true)
      },
      {
        title: "Delete account",
        value: "delete-account",
        icon: Trash2,
        action: () => setIsDeleteUserAccountOpen(true)
      },
      {
        title: "Logout",
        value: "logout",
        icon: IconLogout,
        action: logout,
        withSeparator: true,
        dataTestId: "logout-btn"
      }
    ];
  }, [logout]);

  const activeWorkspace = workspaces.find(
    workspace => workspace.id === workspaceId
  );

  const headerContent = useMemo(() => {
    if (activeWorkspace) {
      return {
        title: "Workspace details"
      };
    }

    if (pathname.startsWith("/workspaces")) {
      return {
        title: "Workspaces overview"
      };
    }

    return {
      title: "Dashboard"
    };
  }, [activeWorkspace, pathname]);

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 flex shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-2 px-4 py-3 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="min-w-0 flex-1">
          <h1 className="text-md font-semibold tracking-tight text-neutral-950">
            {headerContent.title}
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <UserMenu user={user} menuItems={menuLinksItem} variant="avatar" />
          <UserAccountDialog
            title="User account"
            description="This is your user information, you can read or edit it"
            user={user}
            open={isUserAccountOpen}
            onOpenChange={setIsUserAccountOpen}
          />
          <DeleteAccountDialog
            title="Delete account"
            description="Please confirm that you want to permanently delete your account. Once deleted, your account and all associated data will be irretrievably lost."
            userId={user?.id}
            open={isDeleteUserAccountOpen}
            onOpenChange={setIsDeleteUserAccountOpen}
          />
        </div>
      </div>
    </header>
  );
};
