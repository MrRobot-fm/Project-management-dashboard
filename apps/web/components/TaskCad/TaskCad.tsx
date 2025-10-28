"use client";

import { cn } from "@workspace/ui/lib/utils";
import { AvatarStack } from "@/components/AvatarStack";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import type { Project } from "@/types/models/api-get-project-by-id";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Paperclip } from "lucide-react";

interface TaskCadProps {
  id: string;
  content: Project["tasks"][number];
  activeTaskId?: string | null;
  onClick?: () => void;
  hasStatusBadge?: boolean;
}

export const TaskCad = ({
  id,
  content,
  activeTaskId,
  onClick,
  hasStatusBadge = false,
}: TaskCadProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: id,
    data: {
      type: "task",
      task: content,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const isActuallyBeingDragged = activeTaskId === id;

  return (
    <div
      data-test-id="task-card"
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white h-[145px] w-full rounded-md p-4 cursor-pointer border border-neutral-300/70 shadow-neutral-100 shadow-md",
        isActuallyBeingDragged && "opacity-60",
      )}
      onClick={onClick}
      {...attributes}
      {...listeners}
    >
      <TaskContent task={content} hasStatusBadge={hasStatusBadge} />
    </div>
  );
};

export const TaskContent = ({
  task,
  isOverlay,
  hasStatusBadge,
}: {
  task: Project["tasks"][number];
  isOverlay?: boolean;
  hasStatusBadge: boolean;
}) => {
  const hasAssets = task.assets.length > 0;

  return (
    <div
      className={cn(
        "flex flex-col justify-between h-full gap-4 text-black rounded",
        isOverlay && "border-dashed border-2 border-gray-300 p-4 cursor-grab",
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h2 className="font-semibold text-neutral-600 text-md">{task.title}</h2>
          <AvatarStack
            avatarSize="lg"
            avatars={
              task.assignees?.map((assignee) => ({
                name: assignee.user.name,
                image: assignee.user.logo ?? "",
              })) ?? []
            }
          />
        </div>
        {task.description && (
          <p className="text-xs font-medium text-neutral-500 line-clamp-2">{task.description}</p>
        )}
      </div>
      <div className="flex justify-between mt-2">
        {hasAssets && (
          <div className="flex gap-1 text-xs items-center text-neutral-600">
            <Paperclip className="size-4 text-neutral-400" />
            {task.assets.length}
          </div>
        )}
        {hasStatusBadge ? (
          <StatusBadge
            status={task.status}
            shape="square"
            className={cn(!hasAssets && "ml-auto")}
          />
        ) : (
          <PriorityBadge
            shape="square"
            priority={task.priority}
            withIcon={false}
            className={cn(!hasAssets && "ml-auto")}
          />
        )}
      </div>
    </div>
  );
};
