import { Skeleton } from "@workspace/ui/components/Skeleton";
import { Plus } from "lucide-react";

export const ProjectTasksSkeleton = () => {
  return (
    <div className="flex flex-col gap-10 max-w-[920px] h-full mx-auto">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-0.5">
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-10 w-64 rounded-md" />
        </div>
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
      <KanbanBoardSkeleton />
    </div>
  );
};

const KanbanBoardSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 3 }).map((_, idx) => (
        <TaskColumnSkeleton key={idx} />
      ))}
    </div>
  );
};

const TaskColumnSkeleton = () => {
  return (
    <div className="w-full rounded-lg bg-white flex flex-col p-4 pb-6">
      <div className="flex gap-3 items-center justify-between pb-4">
        <div className="flex gap-2 items-center">
          <Skeleton className="size-2 rounded-full" />
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-3 w-6 rounded-md" />
        </div>
        <Plus className="size-5 text-neutral-300" />
      </div>
      <div className="flex flex-col gap-2 py-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <TaskCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

const TaskCardSkeleton = () => {
  return (
    <div className="bg-white w-full rounded-md p-3.5 border border-neutral-300/70 flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 flex-1 rounded-md" />
        <Skeleton className="h-3 w-20 rounded-md" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
      <Skeleton className="h-3 w-3/4 rounded-md" />
    </div>
  );
};
