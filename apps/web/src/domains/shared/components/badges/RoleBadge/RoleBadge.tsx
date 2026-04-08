import type { ComponentProps } from "react";
import { Badge } from "@workspace/ui/components/Badge";
import { cn } from "@workspace/ui/lib/utils";
import { capitalizeText } from "@/utils/capitalize-text";
import { cva, type VariantProps } from "class-variance-authority";

type RoleBadgeProps = RoleBadgeVariants & ComponentProps<typeof Badge>;

export const RoleBadge = ({ role, className, ...rest }: RoleBadgeProps) => {
  return (
    <Badge className={cn(roleBadgeVariants({ role, className }))} {...rest}>
      {role && capitalizeText(role)}
    </Badge>
  );
};

type RoleBadgeVariants = VariantProps<typeof roleBadgeVariants>;

const roleBadgeVariants = cva(
  "flex items-center justify-center text-xs px-2 rounded-sm border font-semibold",
  {
    variants: {
      role: {
        ADMIN: "text-neutral-600  bg-neutral-100",
        OWNER: "text-blue-600 bg-neutral-100",
        EDITOR: "text-neutral-600  bg-neutral-100",
        COLLABORATOR: "text-neutral-600 bg-neutral-100"
      }
    },
    defaultVariants: {
      role: "EDITOR"
    }
  }
);
