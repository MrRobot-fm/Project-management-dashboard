import Link from "next/link";
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
import {
  IconDotsVertical,
  IconLogout,
  type TablerIcon,
} from "@tabler/icons-react";
import type { User } from "@workspace/db";
import type { LucideIcon } from "lucide-react";

interface UserMenuProps {
  user: Pick<User, "name" | "email" | "logo">;
  menuItems: {
    title: string;
    href?: string;
    action?: () => void;
    icon: LucideIcon | TablerIcon;
  }[];
  variant?: "default" | "avatar";
}

const UserInfoBox = ({ user }: { user: { name: string; email: string } }) => {
  return (
    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-medium">{user.name}</span>
      <span className="text-muted-foreground truncate text-xs">
        {user.email}
      </span>
    </div>
  );
};

export const UserMenu = ({
  user,
  menuItems,
  variant = "default",
}: UserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className={cn(
            "focus-visible:ring-0 h-fit cursor-pointer",
            variant === "avatar" && "p-0",
          )}
          dataTestId="nav-user"
        >
          <Avatar image={user.logo} fallback={user.name} size="lg" />
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
            <Avatar image={user.logo} fallback={user.name} size="lg" />
            <UserInfoBox user={user} />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems.map((item) => {
            if (item.href) {
              return (
                <DropdownMenuItem
                  asChild
                  key={item.title}
                  className="cursor-pointer"
                >
                  <Link href={item.href ?? ""}>
                    <item.icon className="mr-2 size-4" />
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              );
            }
            return null;
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutAction}>
          <IconLogout />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
