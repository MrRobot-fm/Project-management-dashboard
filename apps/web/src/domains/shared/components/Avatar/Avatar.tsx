import type { ComponentProps } from "react";
import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarRoot
} from "@workspace/ui/components/Avatar";
import { getAvatarFallback } from "@/utils/get-avatar-fallback";
import { cva, type VariantProps } from "class-variance-authority";

export type AvatarSize = VariantProps<typeof avatarSize>;

interface AvatarProps extends ComponentProps<typeof AvatarRoot>, AvatarSize {
  image?: string | null;
  fallback?: string;
  imageDataTestId?: string;
}

export const Avatar = ({
  image,
  fallback,
  size,
  shape,
  className,
  imageDataTestId,
  ...props
}: AvatarProps) => {
  const initials = getAvatarFallback(fallback ?? "");

  return (
    <AvatarRoot className={avatarSize({ size, shape, className })} {...props}>
      <AvatarImage
        data-test-id={imageDataTestId}
        src={image ?? undefined}
        alt={initials}
        className="object-cover bg-center"
      />
      <AvatarFallback className={avatarFallback({ size, shape, className })}>
        {initials}
      </AvatarFallback>
    </AvatarRoot>
  );
};

const avatarSize = cva("border border-neutral-300 dark:border-neutral-900", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
      "2xl": "size-10",
      "3xl": "size-12",
      "4xl": "size-14"
    },
    shape: {
      rounded: "rounded-full",
      square: "rounded"
    }
  },
  defaultVariants: {
    size: "sm",
    shape: "rounded"
  }
});

const avatarFallback = cva("bg-neutral-200 dark:bg-neutral-400", {
  variants: {
    size: {
      sm: "text-[9px]",
      md: "text-[10px]",
      lg: "text-[10px]",
      xl: "",
      "2xl": "",
      "3xl": "",
      "4xl": ""
    },
    shape: {
      square: "rounded",
      rounded: ""
    }
  }
});
