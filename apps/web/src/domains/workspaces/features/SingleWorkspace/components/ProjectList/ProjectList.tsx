import { type ProjectListItem } from "@/domains/workspaces/features/SingleWorkspace";
import { ProjectItem } from "./components/ProjectItem";

interface ProjectListProps {
  workspaceId: string;
  projects: ProjectListItem[];
}

export const ProjectList = ({ workspaceId, projects }: ProjectListProps) => {
  return (
    <div className="divide-y divide-neutral-200/70">
      {projects.map(project => (
        <ProjectItem workspaceId={workspaceId} project={project} />
      ))}
    </div>
  );
};
