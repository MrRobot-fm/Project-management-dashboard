import { Button } from "@workspace/ui/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/DropdownMenu";
import { cn } from "@workspace/ui/lib/utils";
import { Avatar } from "@/components/Avatar";
import { logoutAction } from "@/services/auth/logout";
import { IconDotsVertical, IconLogout, type TablerIcon } from "@tabler/icons-react";
import type { User } from "@workspace/db";
import type { LucideIcon } from "lucide-react";

interface UserMenuProps {
  user: Pick<User, "name" | "email" | "logo"> | undefined;
  menuItems: {
    title: string;
    href?: string;
    action?: () => void;
    icon: LucideIcon | TablerIcon;
    value: string;
  }[];
  variant?: "default" | "avatar";
}

const UserInfoBox = ({ user }: { user: { name: string; email: string } | undefined }) => {
  return (
    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-medium">{user?.name}</span>
      <span className="text-muted-foreground truncate text-xs">{user?.email}</span>
    </div>
  );
};

export const UserMenu = ({ user, menuItems, variant = "default" }: UserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className={cn(
            "focus-visible:ring-0 h-fit cursor-pointer hover:no-underline",
            variant === "avatar" && "p-0",
          )}
          data-test-id="nav-user"
        >
          <Avatar image={user?.logo} fallback={user?.name} size="xl" />
          {variant === "default" && (
            <>
              <UserInfoBox user={user} />
              <IconDotsVertical className="ml-auto size-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        sideOffset={4}
        align="end"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar image={user?.logo} fallback={user?.name} size="xl" />
            <UserInfoBox user={user} />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems.map((item) => {
            const isDeleteAccount = item.value === "delete-account";

            return (
              <DropdownMenuItem asChild key={item.title} className="cursor-pointer">
                <Button
                  variant="transparent"
                  onClick={item.action}
                  className={cn(
                    "!px-2 !py-1.5 w-full h-fit justify-start font-normal",
                    isDeleteAccount && "text-red-500 focus:text-red-500 focus:bg-red-50",
                  )}
                >
                  <item.icon className={cn("mr-2 size-4", isDeleteAccount && "text-red-500")} />
                  {item.title}
                </Button>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem data-test-id="logout-btn" onClick={logoutAction}>
          <IconLogout />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
