import { AboutProjectBlock } from "@/components/project/AboutProjectBlock/AboutProjectBlock";
import { getProjectById } from "@/services/projects/get-project-by-id";

interface SingleProjectProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SingleProject({ params }: SingleProjectProps) {
  const { id } = await params;

  const { project } = await getProjectById(id);

  console.log({ project });

  if (!project) return;

  return (
    <div className="p-6 flex gap-6">
      <div className="w-4/6 shrink-0">
        <div className="rounded-md border border-neutral-100 p-6 flex flex-col gap-2">
          <h1 className="font-semibold text-2xl">{project.name}</h1>
          <p className="text-sm text-neutral-600">{project.description}</p>
        </div>
      </div>
      <div className="w-full">
        <AboutProjectBlock project={project} />
      </div>
    </div>
  );
}
