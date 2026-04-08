import { IconDots } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@workspace/ui/components/DropdownMenu";
import { SidebarMenuAction } from "@workspace/ui/components/Sidebar";
import type { DropdownItem } from "../types";

interface NavProjectsDropdownProps {
  isMobile: boolean;
  items: DropdownItem[];
}

const NavDropdownItem = ({ item }: { item: DropdownItem }) => {
  if (item.isLink && item.href) {
    return (
      <DropdownMenuItem asChild>
        <Link to={item.href} className="cursor-pointer">
          {item.icon}
          <span>{item.label}</span>
        </Link>
      </DropdownMenuItem>
    );
  }

  return (
    <form action={item.action}>
      <DropdownMenuItem
        asChild
        variant={item.isDestructive ? "destructive" : "default"}
        className="w-full justify-start font-normal cursor-pointer px-2!"
      >
        <Button variant="transparent">
          {item.icon}
          <span>{item.label}</span>
        </Button>
      </DropdownMenuItem>
    </form>
  );
};

export const NavProjectsDropdown = ({
  isMobile,
  items
}: NavProjectsDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <SidebarMenuAction
        aria-label="More"
        showOnHover
        className="data-[state=open]:bg-accent rounded-sm cursor-pointer focus-within:ring-0"
      >
        <IconDots className="size-3!" />
        <span className="sr-only">More</span>
      </SidebarMenuAction>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      side="bottom"
      align={isMobile ? "end" : "start"}
      className="rounded-lg"
    >
      {items.map(item => (
        <NavDropdownItem key={item.label} item={item} />
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);
