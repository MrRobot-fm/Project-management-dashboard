import { Card, CardContent, CardHeader } from "@workspace/ui/components/Card";
import { Skeleton } from "@workspace/ui/components/Skeleton";

export const SingleProjectSkeleton = () => {
  return (
    <div className="flex flex-col gap-10">
      <Skeleton className="h-10 w-64 rounded-lg" />
      <div className="flex-col flex gap-6">
        <div className="w-full shrink-0 flex flex-col gap-6">
          <AboutProjectBlockSkeleton />
        </div>
        <div className="flex flex-col gap-6 w-full">
          <ProjectMembersBlockSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 w-full gap-6">
          <TaskSummaryBlockSkeleton />
          <CompletedTasksBlockSkeleton />
        </div>
      </div>
    </div>
  );
};

const AboutProjectBlockSkeleton = () => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <Skeleton className="h-7 w-40 rounded-md" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-2/4 rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-4 w-32 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

const ProjectMembersBlockSkeleton = () => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <Skeleton className="h-7 w-32 rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-3 w-16 rounded-md" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const CompletedTasksBlockSkeleton = () => {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <Skeleton className="h-7 w-40 rounded-md" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-6">
          <Skeleton className="h-40 w-40 rounded-full" />
          <div className="w-full space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-sm" />
                <Skeleton className="h-4 flex-1 rounded-md" />
                <Skeleton className="h-4 w-12 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TaskSummaryBlockSkeleton = () => {
  return (
    <Card className="lg:col-span-2 shadow-none">
      <CardHeader>
        <Skeleton className="h-7 w-40 rounded-md" />
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded-sm" />
            <Skeleton className="h-4 flex-1 rounded-md" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
