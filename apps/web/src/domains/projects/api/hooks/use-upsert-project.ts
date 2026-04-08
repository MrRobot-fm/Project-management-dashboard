import type { CreateProjectType } from "@workspace/schemas";
import { useCreateProject } from "./use-create-project";
import { useUpdateProject } from "./use-update-project";

interface UseUpsertProjectProps {
  projectId: string | undefined;
  workspaceId: string;
}

export const useUpsertProject = ({
  projectId,
  workspaceId
}: UseUpsertProjectProps) => {
  const { mutate: createProject } = useCreateProject();
  const { mutate: updateProject } = useUpdateProject(workspaceId);

  const submit = (values: CreateProjectType) => {
    if (projectId) {
      updateProject({ values, projectId });
    } else {
      createProject({ values, workspaceId });
    }
  };

  return { submit };
};
