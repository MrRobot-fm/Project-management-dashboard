import { useMemo, useState } from "react";
import { Button } from "@workspace/ui/components/Button";
import { cn } from "@workspace/ui/lib/utils";
import { EditTaskDialogContent } from "../EditTaskDialogContent";
import { CustomDialog } from "@/components/CustomDialog";
import { TaskCad } from "@/components/TaskCad";
import type { Project, ProjectMember } from "@/types/models/api-get-project-by-id";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import type { TaskStatus } from "@workspace/db";
import { Plus } from "lucide-react";

interface TaskColumnProps {
  id: TaskStatus;
  title: string;
  tasks?: Project["tasks"];
  projectMembers: ProjectMember[];
  activeTaskId?: string | null;
}

export const TaskColumn = ({ id, title, tasks, projectMembers, activeTaskId }: TaskColumnProps) => {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [dialogTaskMode, setDialogTaskMode] = useState<"create" | "read">("create");

  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: {
      type: "column",
      column: { id, title },
    },
  });

  const tasksIds = useMemo(() => tasks?.map((task) => task.id), [tasks]);

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "TODO":
        return "bg-neutral-400";
      case "IN_PROGRESS":
        return "bg-blue-500";
      case "DONE":
        return "bg-orange-500";
      default:
        return "bg-neutral-400";
    }
  };

  return (
    <div
      className={cn(
        "w-full rounded-lg bg-white flex flex-col pt-4 pb-6",
        isOver && "ring-2 ring-neutral-200",
      )}
    >
      <div className="flex gap-3 items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className={cn("size-2 rounded-full", getStatusColor(id))} />
          <h2 className="font-semibold text-sm">{title}</h2>
          <span className="text-xs text-neutral-500 font-normal">{tasks?.length ?? 0}</span>
        </div>
        <div>
          <Button
            data-test-id={`add-task-btn-${title?.toLowerCase().replace(" ", "-")}`}
            variant="ghost"
            className="flex items-center rounded text-xs text-neutral-600 font-semibold p-0 h-fit py-1 cursor-pointer"
            onClick={() => {
              setDialogTaskMode("create");
              setIsTaskDialogOpen(true);
            }}
          >
            <Plus className="size-5" />
          </Button>
        </div>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex flex-col gap-2 py-2 rounded-md transition-all duration-200",
          isOver && "bg-neutral-100/30",
        )}
      >
        <SortableContext items={tasksIds || []}>
          {tasks?.map((task) => (
            <TaskCad
              key={task.id}
              id={task.id}
              content={task}
              activeTaskId={activeTaskId}
              onClick={() => {
                setSelectedTaskId(task.id);
                setDialogTaskMode("read");
                setIsTaskDialogOpen(true);
              }}
            />
          ))}
        </SortableContext>
        {tasks?.length === 0 && (
          <div className={cn("text-gray-400 text-center py-8 transition-all duration-200")}>
            Nothing here yet — add your first task!
          </div>
        )}
      </div>
      <CustomDialog
        isOpen={isTaskDialogOpen}
        setIsOpen={setIsTaskDialogOpen}
        contentSlot={
          <EditTaskDialogContent
            mode={dialogTaskMode}
            task={
              dialogTaskMode === "read"
                ? tasks?.find((task) => task.id === selectedTaskId)
                : undefined
            }
            projectMembers={projectMembers}
            taskStatus={id}
            setIsOpen={setIsTaskDialogOpen}
          />
        }
      />
    </div>
  );
};
