"use client";

import { cn } from "@workspace/ui/lib/utils";
import { AvatarStack } from "../AvatarStack";
import { PriorityBadge } from "../badges/PriorityBadge";
import type { Project } from "@/types/models/api-get-project-by-id";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Paperclip } from "lucide-react";

interface TaskCadProps {
  id: string;
  content: Project["tasks"][number];
  activeTaskId?: string | null;
  onClick?: () => void;
}

export const TaskCad = ({ id, content, activeTaskId, onClick }: TaskCadProps) => {
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
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white h-fit w-full rounded-md p-4 cursor-pointer border border-neutral-300/70 shadow-neutral-100 shadow-md",
        isActuallyBeingDragged && "opacity-60",
      )}
      onClick={onClick}
      {...attributes}
      {...listeners}
    >
      <TaskContent task={content} />
    </div>
  );
};

export const TaskContent = ({
  task,
  isOverlay,
}: {
  task: Project["tasks"][number];
  isOverlay?: boolean;
}) => {
  const hasAssets = task.assets.length > 0;

  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-6 text-black rounded",
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
        <PriorityBadge
          shape="square"
          priority={task.priority}
          withIcon={false}
          className={cn(!hasAssets && "ml-auto")}
        />
      </div>
    </div>
  );
};
