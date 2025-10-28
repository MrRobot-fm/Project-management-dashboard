import { Skeleton } from "@workspace/ui/components/Skeleton";
import { Plus } from "lucide-react";

export const ProjectTasksSkeleton = () => {
  return (
    <div className="flex flex-col gap-10 w-full h-full">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-14 rounded-md" />
        <Skeleton className="h-10 w-64 rounded-md" />
      </div>
      <KanbanBoardSkeleton />
    </div>
  );
};

const KanbanBoardSkeleton = () => {
  return (
    <div className="flex gap-4 flex-col xl:flex-row">
      {Array.from({ length: 3 }).map((_, idx) => (
        <TaskColumnSkeleton key={idx} />
      ))}
    </div>
  );
};

const TaskColumnSkeleton = () => {
  return (
    <div className="xl:w-1/3 min-w-[300px] h-full min-h-[550px] xl:max-h-[750px] rounded-lg bg-white border border-neutral-200/90 shadow-neutral-100 shadow-md flex flex-col p-4 pb-8">
      <div className="flex gap-2 items-center justify-between pb-2">
        <Skeleton className="h-6 w-24 rounded-md" />
        <Plus className="size-5 text-neutral-300" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 py-2 rounded-md overflow-y-auto scrollbar-none">
        {Array.from({ length: 2 }).map((_, index) => (
          <TaskCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

const TaskCardSkeleton = () => {
  return (
    <div className="p-4 bg-white border border-neutral-200 rounded-lg flex flex-col gap-3 shadow-sm">
      <Skeleton className="h-5 w-full rounded-md" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-3/4 rounded-md" />
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
};
