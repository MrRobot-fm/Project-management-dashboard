import React from "react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/Button";
import { DropdownMenuItem } from "@workspace/ui/components/DropdownMenu";

type DropdownItem = {
  icon: React.ReactNode;
  label: string;
  action?: () => Promise<void> | void;
  href?: string;
  isLink?: boolean;
  isDestructive?: boolean;
};

interface NavProjectsItemsProps {
  item: DropdownItem;
}

export const NavProjectsItems = ({ item }: NavProjectsItemsProps) => {
  if (item.isLink && item.href) {
    return (
      <DropdownMenuItem asChild>
        <Link href={item.href} className="cursor-pointer">
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
        className="w-full justify-start font-normal cursor-pointer !px-2"
      >
        <Button variant="transparent">
          {item.icon}
          <span>{item.label}</span>
        </Button>
      </DropdownMenuItem>
    </form>
  );
};
