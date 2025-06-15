import type { ProjectMember } from "@/types/models/api-get-project-by-id";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import type { Project } from "@workspace/db";

type GetProjectByIdResponse = {
  project: (Project & { members: ProjectMember[] }) | undefined;
};

export const getProjectById = async (projectId: string): Promise<GetProjectByIdResponse> => {
  const jwtToken = await getCookie("jwt_token");

  const response = await fetchInstance<GetProjectByIdResponse>({
    path: `projects/${projectId}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt_token=${jwtToken}`,
      },
    },
  });

  return { project: response.data?.project };
};
