import { type ComponentProps, useMemo } from "react";
import { Badge } from "@workspace/ui/components/Badge";
import { cn } from "@workspace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

type StatusBadgeProps = StatusBadgeVariants &
  Pick<ComponentProps<"span">, "className">;

export const StatusBadge = ({
  status,
  shape,
  size,
  className
}: StatusBadgeProps) => {
  const projectLabel = useMemo(() => {
    switch (status) {
      case "TODO":
        return "To Do";
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
      case "DONE":
        return "Done";
      default:
        return "Unknown";
    }
  }, [status]);

  return (
    <Badge
      className={cn(statusBadgeVariants({ status, shape, size, className }))}
    >
      {projectLabel}
    </Badge>
  );
};

type StatusBadgeVariants = VariantProps<typeof statusBadgeVariants>;

const statusBadgeVariants = cva(
  "flex items-center justify-center rounded-full border px-2",
  {
    variants: {
      status: {
        TODO: "text-amber-600 bg-amber-100 border-amber-600",
        INIT: "text-blue-600 bg-blue-100 border-blue-600",
        PLANNING: "text-amber-600 bg-amber-100 border-amber-600",
        IN_PROGRESS: "text-emerald-600 bg-emerald-100 border-emerald-600",
        COMPLETED: "text-purple-600 bg-purple-100 border-purple-600",
        CANCELLED: "text-red-600 bg-red-100 border-red-600",
        BLOCKED: "text-orange-700 bg-orange-100 border-orange-700",
        DONE: "text-purple-600 bg-purple-100 border-purple-600"
      },
      size: {
        sm: "text-[10px] leading-[150%]",
        md: "text-xs "
      },
      shape: {
        rounded: "rounded-full",
        square: "rounded"
      }
    },
    defaultVariants: {
      status: "INIT",
      size: "md",
      shape: "rounded"
    }
  }
);
