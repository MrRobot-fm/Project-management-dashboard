import { ModeToggle } from "@workspace/ui/components/ModeToggle";
import { Separator } from "@workspace/ui/components/Separator";
import { SidebarTrigger } from "@workspace/ui/components/Sidebar";
import { UserMenu } from "@/components/UserMenu";
import {
  IconCreditCard,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";
import type { User } from "@workspace/db";

interface SiteHeaderProps {
  user: Pick<User, "name" | "email" | "logo">;
}

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) sticky top-0 z-50 bg-background">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-2">
          <UserMenu user={user} menuItems={menuLinksItem} variant="avatar" />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

const menuLinksItem = [
  {
    title: "Account",
    href: "/account",
    icon: IconUserCircle,
  },
  {
    title: "Billing",
    href: "/billing",
    icon: IconCreditCard,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: IconNotification,
  },
];
