import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconHelp,
  IconHome,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";

export type AppSidebarNavItem =
  | {
      title: string;
      icon: Icon;
      to: "/" | "/dashboard" | "/workspaces";
    }
  | {
      title: string;
      icon: Icon;
      disabled: true;
    };

export const data = {
  navMain: [
    {
      title: "Home",
      to: "/",
      icon: IconHome,
    },
    {
      title: "Dashboard",
      to: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Workspaces",
      to: "/workspaces",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      icon: IconChartBar,
      disabled: true,
    },
    {
      title: "Team",
      icon: IconUsers,
      disabled: true,
    },
  ] satisfies AppSidebarNavItem[],
  navSecondary: [
    {
      title: "Settings",
      icon: IconSettings,
      disabled: true,
    },
    {
      title: "Get Help",
      icon: IconHelp,
      disabled: true,
    },
    {
      title: "Search",
      icon: IconSearch,
      disabled: true,
    },
  ] satisfies AppSidebarNavItem[],
  experimental: [
    {
      title: "Capture",
      icon: IconCamera,
      disabled: true,
    },
  ] satisfies AppSidebarNavItem[],
};
