import { fetchInstance } from "../../utils/fetch-instance";

interface UploadLogo {
  type: "workspace" | "project" | "user";
  id: string | undefined;
  logo: File;
}

export const uploadLogo = async ({ type, id, logo }: UploadLogo) => {
  try {
    if (!id || !type) throw new Error("ID and type are required");

    const tagMap: Record<typeof type, string> = {
      workspace: "workspaces",
      project: "projects",
      user: "users"
    };

    const formData = new FormData();

    if (logo) {
      formData.append("logo", logo);
    }

    const response = await fetchInstance<{ success: boolean }>({
      path: `${tagMap[type]}/${id}/logo`,
      options: {
        method: "POST",
        body: formData,
        credentials: "include"
      }
    });

    return { success: response.data?.success };
  } catch (error) {
    throw error;
  }
};
