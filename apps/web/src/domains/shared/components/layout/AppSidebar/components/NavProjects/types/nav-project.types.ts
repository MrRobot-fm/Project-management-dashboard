import type { ReactNode } from "react";

export interface DropdownItem {
  icon: ReactNode;
  label: string;
  action?: () => void;
  href?: string;
  isLink: boolean;
  isDestructive?: boolean;
}
