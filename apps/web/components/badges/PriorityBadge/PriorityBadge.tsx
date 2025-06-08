import { type ComponentProps, useMemo } from "react";
import { Badge } from "@workspace/ui/components/Badge";
import { cn } from "@workspace/ui/lib/utils";
import type { ProjectPriority } from "@workspace/db";
import { cva } from "class-variance-authority";
import { AlertTriangle, Flag, Lightbulb, ShieldAlert } from "lucide-react";

interface PriorityBadgeProps extends Pick<ComponentProps<"span">, "className"> {
  priority: ProjectPriority;
}

export const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  const Icon = useMemo(() => {
    switch (priority) {
      case "LOW":
        return Flag;
      case "MEDIUM":
        return Lightbulb;
      case "HIGH":
        return AlertTriangle;
      case "CRITICAL":
        return ShieldAlert;
      default:
        return Flag;
    }
  }, [priority]);

  return (
    <Badge className={cn(priorityBadgeVariants({ priority, className }))}>
      <Icon className="!size-3.5" />
      {priority.slice(0, 1) + priority.slice(1).toLowerCase()}
    </Badge>
  );
};

const priorityBadgeVariants = cva(
  "flex items-center justify-center text-xs px-2 rounded-full border",
  {
    variants: {
      priority: {
        LOW: "text-blue-600 bg-blue-100 border-blue-600",
        MEDIUM: "text-yellow-600 bg-yellow-100 border-yellow-600",
        HIGH: "text-rose-600 bg-rose-100 border-rose-600",
        CRITICAL: "text-red-600 bg-red-100 border-red-600",
      },
    },
    defaultVariants: {
      priority: "LOW",
    },
  },
);
