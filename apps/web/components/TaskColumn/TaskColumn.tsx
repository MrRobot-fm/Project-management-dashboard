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

  return (
    <div
      className={cn(
        "xl:w-1/3 min-w-[300px] h-full min-h-[550px] xl:max-h-[750px] rounded-lg bg-white border border-neutral-200/90 shadow-neutral-100 shadow-md flex flex-col p-4 pb-8",
        isOver && "border-2 border-neutral-200",
      )}
    >
      <div className="flex gap-2 items-center justify-between pb-2">
        <div className="flex gap-2 items-center">
          <h2 className="font-semibold">{title}</h2>
          <div className="rounded-full font-medium bg-neutral-50 border aspect-square px-2 py-2 size-6 flex items-center justify-center text-xs">
            {tasks?.length ?? 0}
          </div>
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
          "grid grid-cols-1 sm:grid-cols-2 auto-rows-auto xl:grid-cols-1 gap-4 py-2 rounded-md transition-all duration-200 overflow-y-auto scrollbar-none",
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
