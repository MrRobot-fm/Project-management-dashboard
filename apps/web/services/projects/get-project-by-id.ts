import type { ActionResponse } from "@/types/action";
import type { Project, ProjectMember } from "@/types/models/api-get-project-by-id";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";

type GetProjectByIdResponse = {
  project: (Project & { members: ProjectMember[] } & { tasks: Project["tasks"] }) | undefined;
};

export const getProjectById = async (
  projectId: string,
): Promise<ActionResponse<GetProjectByIdResponse["project"], "project">> => {
  try {
    const jwtToken = await getCookie("jwt_token");

    const response = await fetchInstance<GetProjectByIdResponse>({
      path: `projects/${projectId}`,
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `jwt_token=${jwtToken}`,
        },
        next: {
          tags: ["get-project"],
        },
      },
    });

    return { project: response.data?.project };
  } catch (error) {
    return errorData(error);
  }
};
