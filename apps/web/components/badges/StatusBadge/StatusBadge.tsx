import { type ComponentProps, useMemo } from "react";
import { Badge } from "@workspace/ui/components/Badge";
import { cn } from "@workspace/ui/lib/utils";
import type { ProjectStatus } from "@workspace/db";
import { cva } from "class-variance-authority";

interface StatusBadgeProps extends Pick<ComponentProps<"span">, "className"> {
  status: ProjectStatus;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const projectLabel = useMemo(() => {
    switch (status) {
      case "INIT":
        return "Initialized";
      case "PLANNING":
        return "Planning";
      case "IN_PROGRESS":
        return "Progress";
      case "COMPLETED":
        return "Completed";
      case "CANCELLED":
        return "Cancelled";
      case "BLOCKED":
        return "Blocked";
      default:
        return "Unknown";
    }
  }, [status]);

  return <Badge className={cn(statusBadgeVariants({ status, className }))}>{projectLabel}</Badge>;
};

const statusBadgeVariants = cva(
  "flex items-center justify-center text-xs px-2 rounded-full border",
  {
    variants: {
      status: {
        INIT: "text-blue-600 bg-blue-100 border-blue-600",
        PLANNING: "text-amber-600 bg-amber-100 border-amber-600",
        IN_PROGRESS: "text-emerald-600 bg-emerald-100 border-emerald-600",
        COMPLETED: "text-purple-600 bg-purple-100 border-purple-600",
        CANCELLED: "text-red-600 bg-red-100 border-red-600",
        BLOCKED: "text-orange-700 bg-orange-100 border-orange-700",
      },
    },
    defaultVariants: {
      status: "INIT",
    },
  },
);
