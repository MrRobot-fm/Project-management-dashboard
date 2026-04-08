"use client";

import { useMemo, useState } from "react";
import { Separator } from "@workspace/ui/components/Separator";
import { SidebarTrigger } from "@workspace/ui/components/Sidebar";
import { DeleteAccountDialog } from "../DeleteAccountDialog";
import { UserAccountDialog } from "@/components/UserAccountDialog";
import { UserMenu } from "@/components/UserMenu";
import { IconUserCircle } from "@tabler/icons-react";
import type { User } from "@workspace/db";
import { Trash2 } from "lucide-react";

interface SiteHeaderProps {
  user: User | undefined;
}

export function SiteHeader({ user }: SiteHeaderProps) {
  const [isUserAccountOpen, setIsUserAccountOpen] = useState(false);
  const [isDeleteUserAccountOpen, setIsDeleteUserAccountOpen] = useState(false);

  const menuLinksItem = useMemo(() => {
    return [
      {
        title: "Edit account",
        value: "edit-account",
        icon: IconUserCircle,
        action: () => setIsUserAccountOpen(true),
      },
      {
        title: "Delete account",
        value: "delete-account",
        icon: Trash2,
        action: () => setIsDeleteUserAccountOpen(true),
      },
    ];
  }, []);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) sticky top-0 z-50 bg-background">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        {/* <h1 className="text-base font-medium">Documents</h1> */}
        <div className="ml-auto flex items-center gap-2">
          <UserMenu user={user} menuItems={menuLinksItem} variant="avatar" />
          <UserAccountDialog
            title="User account"
            description="This is your user information, you can read or edit it"
            user={user}
            isOpen={isUserAccountOpen}
            setIsOpen={setIsUserAccountOpen}
          />
          <DeleteAccountDialog
            title="Delete account"
            description="Please confirm that you want to permanently delete your account. Once deleted, your account and all associated data will be irretrievably lost."
            userId={user?.id}
            isOpen={isDeleteUserAccountOpen}
            setIsOpen={setIsDeleteUserAccountOpen}
          />
        </div>
      </div>
    </header>
  );
}
