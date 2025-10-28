"use server";

import { revalidateTag } from "next/cache";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";

interface MoveTaskProps {
  activeTaskId: string;
  newStatus: string;
  newPosition: number;
}

export const moveTask = async ({ activeTaskId, newPosition, newStatus }: MoveTaskProps) => {
  const token = await getCookie("jwt_token");

  try {
    await fetchInstance({
      path: `tasks/${activeTaskId}/move`,
      options: {
        method: "PUT",
        headers: { "Content-Type": "application/json", Cookie: `jwt_token=${token}` },
        body: JSON.stringify({ newStatus, newPosition }),
      },
    });

    revalidateTag("get-project");

    return { success: true };
  } catch (error) {
    return errorData(error);
  }
};
