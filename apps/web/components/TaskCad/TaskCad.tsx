"use client";

import type { KeyboardEvent } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { AvatarStack } from "@/components/AvatarStack";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import type { Project } from "@/types/models/api-get-project-by-id";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, Paperclip } from "lucide-react";

interface TaskCadProps {
  id: string;
  content: Project["tasks"][number];
  activeTaskId?: string | null;
  onClick?: () => void;
  hasStatusBadge?: boolean;
  showDueDate?: boolean;
}

export const TaskCad = ({
  id,
  content,
  activeTaskId,
  onClick,
  hasStatusBadge = false,
  showDueDate = true,
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

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  const isActuallyBeingDragged = activeTaskId === id;

  return (
    <div
      data-test-id="task-card"
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative bg-white w-full rounded-md p-3.5 cursor-pointer border border-neutral-300/70 hover:border-neutral-300 hover:bg-neutral-50/80 transition-colors duration-150 shadow-[0_1px_0_rgba(15,23,42,0.03)]",
        isActuallyBeingDragged && "opacity-60",
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={content.title}
      {...attributes}
      {...listeners}
    >
      <TaskContent task={content} hasStatusBadge={hasStatusBadge} showDueDate={showDueDate} />
    </div>
  );
};

const formatDate = (dateString: string | null | undefined): string | null => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return null;
  }
};

export const TaskContent = ({
  task,
  isOverlay,
  hasStatusBadge,
  showDueDate = true,
}: {
  task: Project["tasks"][number];
  isOverlay?: boolean;
  hasStatusBadge: boolean;
  showDueDate?: boolean;
}) => {
  const hasAssets = task.assets.length > 0;
  const formattedDueDate = showDueDate ? formatDate(task.dueDate) : null;

  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-1.5 text-black",
        isOverlay &&
          "border border-dashed border-neutral-300 bg-white p-3 cursor-grab rounded-lg shadow-sm",
      )}
    >
      <div className="flex items-center gap-2">
        <h2 className="flex-1 font-medium text-sm text-neutral-800 leading-snug truncate group-hover:text-neutral-900">
          {task.title}
        </h2>
        {formattedDueDate && (
          <div className="flex items-center gap-1 text-xs text-neutral-500 flex-shrink-0">
            <Calendar className="size-3 text-neutral-400" />
            <span>{formattedDueDate}</span>
          </div>
        )}
        {hasAssets && (
          <div className="inline-flex items-center gap-1 rounded-full bg-neutral-50 px-2 py-0.5 text-[10px] text-neutral-500 flex-shrink-0">
            <Paperclip className="size-3 text-neutral-400" />
            <span>{task.assets.length}</span>
          </div>
        )}
        {hasStatusBadge ? (
          <StatusBadge status={task.status} shape="square" className="text-[10px] px-2 py-0.5 flex-shrink-0" />
        ) : (
          <PriorityBadge
            shape="square"
            priority={task.priority}
            withIcon={false}
            className="text-[10px] px-2 py-0.5 flex-shrink-0"
          />
        )}
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
        <p className="text-xs text-neutral-500 leading-snug line-clamp-1">{task.description}</p>
      )}
    </div>
  );
};
