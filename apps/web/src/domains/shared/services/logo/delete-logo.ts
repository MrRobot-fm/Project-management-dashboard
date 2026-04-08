import { fetchInstance } from "../../utils/fetch-instance";

export const deleteLogo = async ({
  type,
  id
}: {
  type: "workspace" | "project" | "user";
  id: string;
}): Promise<{ success: boolean | undefined }> => {
  try {
    if (!id || !type) throw new Error("ID and type are required");

    const tagMap: Record<typeof type, string> = {
      workspace: "workspaces",
      project: "projects",
      user: "users"
    };

    const response = await fetchInstance<{ success: boolean }>({
      path: `${tagMap[type]}/${id}/logo`,
      options: {
        method: "DELETE",
        credentials: "include"
      }
    });

    return { success: response.data?.success };
  } catch (error) {
    throw error;
  }
};
