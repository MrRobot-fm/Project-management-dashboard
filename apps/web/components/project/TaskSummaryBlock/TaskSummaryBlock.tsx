"use client";

import { useRef, useState } from "react";
import type { Route } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@workspace/ui/components/Card";
import { cn } from "@workspace/ui/lib/utils";
import { CustomDialog } from "@/components/CustomDialog";
import { EditTaskDialogContent } from "@/components/EditTaskDialogContent";
import { LinkLoadingIndicator } from "@/components/LinkLoadingIndicator";
import { TaskCad } from "@/components/TaskCad";
import { PATHS } from "@/constants/paths";
import { useScrollGradient } from "@/hooks/use-scroll-gradients";
import type { Project } from "@/types/models/api-get-project-by-id";
import { ArrowRight, ChevronDown } from "lucide-react";

interface TaskSummaryBlockProps {
  project: Project;
}

export const TaskSummaryBlock = ({ project }: TaskSummaryBlockProps) => {
  const { id } = useParams<{ id: string }>();
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const { showBottomGradient, showTopGradient } = useScrollGradient(scrollRef, []);

  return (
    <div className="col-span-2 rounded-lg border border-neutral-200/70 shadow-neutral-100 shadow-md p-6 flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="font-medium text-md">Tasks summary</h2>
        {project.tasks.length > 0 && (
          <Link
            href={PATHS.PROJECT_TASKS(id) as Route}
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
          project.tasks.length === 0 && "justify-center items-center",
        )}
      >
        {project.tasks.length === 0 && (
          <Link
            href={PATHS.PROJECT_TASKS(project.id) as Route}
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
          {project.tasks.map((task, index) => (
            <TaskCad
              key={index}
              id={task.id}
              content={task}
              variant="compact"
              onClick={() => {
                setSelectedTaskId(task.id);
                setIsTaskDialogOpen(true);
              }}
              hasStatusBadge
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
      <CustomDialog
        isOpen={isTaskDialogOpen}
        setIsOpen={setIsTaskDialogOpen}
        contentSlot={
          <EditTaskDialogContent
            mode="read"
            task={project.tasks?.find((task) => task.id === selectedTaskId)}
            projectMembers={project.members}
            setIsOpen={setIsTaskDialogOpen}
            onlyReadMode
          />
        }
      />
    </div>
  );
};
