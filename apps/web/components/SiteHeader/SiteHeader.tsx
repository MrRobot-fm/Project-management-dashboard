"use client";

import { useState } from "react";
import { Separator } from "@workspace/ui/components/Separator";
import { SidebarTrigger } from "@workspace/ui/components/Sidebar";
import { UserAccountDialog } from "@/components/UserAccountDialog";
import { UserMenu } from "@/components/UserMenu";
import { IconUserCircle } from "@tabler/icons-react";
import type { User } from "@workspace/db";

interface SiteHeaderProps {
  user: User | undefined;
}

export function SiteHeader({ user }: SiteHeaderProps) {
  const [isUserAccountOpen, setIsUserAccountOpen] = useState(false);

  const menuLinksItem = [
    {
      title: "Account",
      icon: IconUserCircle,
      action: () => setIsUserAccountOpen(true),
    },
  ];

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
        </div>
      </div>
    </header>
  );
}
