import type { ComponentProps } from "react";
import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarRoot,
} from "@workspace/ui/components/Avatar";
import { cn } from "@workspace/ui/lib/utils";
import { getAvatarFallback } from "@/utils/get-avatar-fallback";
import { cva, type VariantProps } from "class-variance-authority";

export type AvatarSize = VariantProps<typeof avatarSize>;

interface AvatarProps extends ComponentProps<typeof AvatarRoot>, AvatarSize {
  image?: string | null;
  fallback?: string;
}

export const Avatar = ({
  image,
  fallback,
  size,
  shape,
  className,
  ...props
}: AvatarProps) => {
  const initials = getAvatarFallback(fallback ?? "");

  return (
    <AvatarRoot className={avatarSize({ size, shape, className })} {...props}>
      {image && (
        <AvatarImage src={image} alt={initials} className="object-cover" />
      )}
      <AvatarFallback
        className={cn(
          "bg-gray-200",
          shape === "square" && "rounded",
          size === "sm" && "text-[9px]",
        )}
      >
        {initials}
      </AvatarFallback>
    </AvatarRoot>
  );
};

const avatarSize = cva(null, {
  variants: {
    size: {
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
      xl: "size-10",
      "2xl": "size-12",
      "3xl": "size-14",
    },
    shape: {
      rounded: "rounded-full",
      square: "rounded",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "rounded",
  },
});
