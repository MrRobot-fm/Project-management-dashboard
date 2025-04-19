import type { ComponentProps, HTMLAttributes } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { Tooltip } from "../Tooltip";
import { Avatar, type AvatarSize } from "@/components/Avatar";
import { cva, type VariantProps } from "class-variance-authority";

const avatarStackVariants = cva("flex -space-x-4 -space-y-4", {
  variants: {
    orientation: {
      vertical: "flex-row",
      horizontal: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export interface AvatarStackProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarStackVariants> {
  avatars: { name: string; image: string }[];
  maxAvatarsAmount?: number;
  avatarStyles?: ComponentProps<typeof Avatar>["className"];
  avatarSize?: AvatarSize["size"];
}

const AvatarStack = ({
  className,
  orientation,
  avatars,
  maxAvatarsAmount = 3,
  avatarStyles,
  avatarSize = "md",
  ...props
}: AvatarStackProps) => {
  const shownAvatars = avatars.slice(0, maxAvatarsAmount);
  const hiddenAvatars = avatars.slice(maxAvatarsAmount);

  return (
    <div
      className={cn(
        avatarStackVariants({ orientation }),
        className,
        orientation === "horizontal" ? "-space-x-0" : "-space-y-0",
      )}
      {...props}
    >
      {shownAvatars.map(({ name, image }, index) => (
        <Tooltip
          key={`${name}-${image}-${index}`}
          trigger={
            <Avatar
              image={image}
              fallback={name}
              size={avatarSize}
              className={cn("hover:z-10", avatarStyles)}
            />
          }
          contents={<p>{name}</p>}
        />
      ))}
      {hiddenAvatars.length && (
        <Tooltip
          key="hidden-avatars"
          trigger={
            <Avatar
              fallback={`+ ${avatars.length - shownAvatars.length}`}
              size={avatarSize}
              className={avatarStyles}
            />
          }
          contents={hiddenAvatars.map(({ name }, index) => (
            <p key={`${name}-${index}`}>{name}</p>
          ))}
        />
      )}
    </div>
  );
};

export { AvatarStack, avatarStackVariants };
