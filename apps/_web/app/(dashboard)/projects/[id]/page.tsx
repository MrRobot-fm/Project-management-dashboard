import { Suspense } from "react";
import { SingleProject } from "@/components/pages/SingleProject/SingleProject";
import { SingleProjectSkeleton } from "@/components/pages/SingleProject/SingleProjectSkeleton";

export const dynamic = "force-dynamic";

export default async function SingleProjectRoute({ params }: PageProps<"/projects/[id]">) {
  const { id } = await params;

  return (
    <Suspense fallback={<SingleProjectSkeleton />}>
      <SingleProject projectId={id} />
    </Suspense>
  );
}
