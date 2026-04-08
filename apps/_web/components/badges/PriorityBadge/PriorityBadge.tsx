import { type ComponentProps, useMemo } from "react";
import { Badge } from "@workspace/ui/components/Badge";
import { cn } from "@workspace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, Flag, Lightbulb, ShieldAlert } from "lucide-react";

type PriorityBadgeProps = PriorityBadgeVariants &
  Pick<ComponentProps<"span">, "className"> & { withIcon?: boolean };

export const PriorityBadge = ({
  priority,
  shape,
  withIcon = true,
  className,
}: PriorityBadgeProps) => {
  const { icon: Icon, label } = useMemo(() => {
    switch (priority) {
      case "LOW":
        return { label: "Low", icon: Flag };
      case "MEDIUM":
        return { label: "Medium", icon: Lightbulb };
      case "HIGH":
        return { label: "High", icon: AlertTriangle };
      case "CRITICAL":
        return { label: "Critical", icon: ShieldAlert };
      default:
        return { label: "Low", icon: Flag };
    }
  }, [priority]);

  return (
    <Badge className={cn(priorityBadgeVariants({ priority, shape, className }))}>
      {withIcon && <Icon className="!size-3.5 text-inherit" />}
      {label}
    </Badge>
  );
};

type PriorityBadgeVariants = VariantProps<typeof priorityBadgeVariants>;

const priorityBadgeVariants = cva(
  "flex items-center justify-center text-xs px-2 rounded-full border",
  {
    variants: {
      priority: {
        LOW: "text-blue-600 bg-blue-100 border-blue-600",
        MEDIUM: "text-yellow-600 bg-yellow-100 border-yellow-600",
        HIGH: "text-orange-600 bg-orange-100 border-orange-600",
        CRITICAL: "text-red-600 bg-red-100 border-red-600",
      },
      shape: {
        rounded: "rounded-full",
        square: "rounded",
      },
    },
    defaultVariants: {
      priority: "LOW",
      shape: "rounded",
    },
  },
);
