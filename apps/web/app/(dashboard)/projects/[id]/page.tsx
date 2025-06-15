import { Avatar } from "@/components/Avatar";
import { AboutProjectBlock } from "@/components/project/AboutProjectBlock/AboutProjectBlock";
import { EditProjectDialog } from "@/components/project/EditProjectDialog";
import { ProjectDescriptionBlock } from "@/components/project/ProjectDescriptionBlock";
import { ProjectMembersBlock } from "@/components/project/ProjectMembersBlock";
import { getProjectById } from "@/services/projects/get-project-by-id";

export const dynamic = "force-dynamic";

interface SingleProjectProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SingleProject({ params }: SingleProjectProps) {
  const { id } = await params;

  const { project } = await getProjectById(id);

  if (!project) return;

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar size="2xl" image={project.logo} fallback={project.name} />
          <h1 className="font-semibold text-3xl">{project.name}</h1>
        </div>
        <EditProjectDialog project={project} />
      </div>
      <div className="flex gap-6">
        <div className="w-1/2 xl:w-4/6 shrink-0 flex flex-col gap-6">
          <ProjectDescriptionBlock description={project.description} />
          <ProjectMembersBlock members={project.members} />
        </div>
        <div className="w-full">
          <AboutProjectBlock project={project} />
        </div>
      </div>
    </div>
  );
}
