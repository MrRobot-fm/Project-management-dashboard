"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@workspace/ui/components/Button";
import { Card, CardContent } from "@workspace/ui/components/Card";
import { cn } from "@workspace/ui/lib/utils";
import { CustomDialog } from "@/domains/shared/components/CustomDialog";
import { EditTaskDialogContent } from "@/domains/shared/components/EditTaskDialogContent";
import { LinkLoadingIndicator } from "@/domains/shared/components/LinkLoadingIndicator";
import { TaskCad } from "@/domains/shared/components/TaskCad";
import {
  TaskFilter,
  type TaskFilterData
} from "@/domains/shared/components/filters/TaskFilter";
import { filterTasks } from "@/domains/shared/components/filters/TaskFilter/TaskFilter.utils";
import { useScrollGradient } from "@/hooks/use-scroll-gradients";
import type { Project } from "@/types/models/api-get-project-by-id";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Plus } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

interface TaskListBlockProps {
  project: Project;
  taskFilterData?: TaskFilterData[];
}

export const TaskListBlock = ({
  project,
  taskFilterData
}: TaskListBlockProps) => {
  const { workspaceId } = useParams({ strict: false });
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [dialogTaskMode, setDialogTaskMode] = useState<"create" | "read">(
    "read"
  );

  const [status] = useQueryState(
    "status",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [members] = useQueryState(
    "members",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [priority] = useQueryState(
    "priority",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredTasks = useMemo(() => {
    return filterTasks(project.tasks, { status, members, priority });
  }, [project.tasks, status, members, priority]);

  const { showBottomGradient, showTopGradient } = useScrollGradient(
    scrollRef,
    []
  );

  const openTaskDialog = ({
    taskId,
    mode
  }: {
    taskId?: string | null;
    mode: "create" | "read";
  }) => {
    if (taskId) {
      setSelectedTaskId(taskId);
    }
    setDialogTaskMode(mode);
    setIsTaskDialogOpen(true);
  };

  const taskDialogData = useMemo(() => {
    if (dialogTaskMode === "create") {
      return undefined;
    }

    return project.tasks?.find(task => task.id === selectedTaskId);
  }, [dialogTaskMode, project.tasks, selectedTaskId]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-2 h-2 rounded-full bg-amber-500 shrink-0"
            aria-hidden
          />
          <h2 className="text-base font-semibold text-neutral-900">Tasks</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer size-8 shrink-0"
          onClick={() => openTaskDialog({ mode: "create" })}
        >
          <Plus className="size-5" />
        </Button>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center justify-center gap-1.5">
          {project.tasks.length > 0 && (
            <TaskFilter
              size="sm"
              contentAlign="center"
              data={taskFilterData || []}
              tasks={project.tasks}
              hasLabel={false}
            />
          )}
        </div>
        {project.tasks.length > 0 && workspaceId && (
          <Link
            to="/workspaces/$workspaceId/projects/$projectId"
            params={{ workspaceId, projectId: project.id }}
            className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-600 font-medium"
          >
            View all tasks
            <LinkLoadingIndicator className="text-neutral-500 size-3.5">
              <ArrowRight className="size-3.5" />
            </LinkLoadingIndicator>
          </Link>
        )}
      </div>
      <Card
        className={cn(
          "relative flex flex-col gap-2  border-none shadow-none py-0 h-full",
          project.tasks.length === 0 && "justify-center items-center"
        )}
      >
        {project.tasks.length === 0 && workspaceId && (
          <Link
            to="/workspaces/$workspaceId/projects/$projectId"
            params={{ workspaceId, projectId: project.id }}
            className="flex gap-2 items-center underline text-neutral-600 text-sm"
          >
            Create a new task
            <LinkLoadingIndicator size="xs" className="text-neutral-600">
              <ArrowRight className="size-4 text-neutral-600" />
            </LinkLoadingIndicator>
          </Link>
        )}
        <CardContent
          ref={scrollRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 items-center max-h-[350px] overflow-hidden overflow-y-scroll scrollbar-none px-0"
        >
          {filteredTasks.map((task, index) => (
            <TaskCad
              key={index}
              id={task.id}
              content={task}
              onClick={() => openTaskDialog({ taskId: task.id, mode: "read" })}
              hasStatusBadge
              showDueDate={false}
            />
          ))}
        </CardContent>
        {showTopGradient && (
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent z-10" />
        )}
        {showBottomGradient && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent flex justify-center items-end pb-1 z-10">
            <ChevronDown className="size-5 text-neutral-500 animate-bounce" />
          </div>
        )}
      </Card>
      <CustomDialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <EditTaskDialogContent
          mode={dialogTaskMode}
          task={taskDialogData}
          projectMembers={project.members}
          setIsOpen={setIsTaskDialogOpen}
        />
      </CustomDialog>
    </div>
  );
};
