import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";

interface MoveTaskProps {
  activeTaskId: string;
  newStatus: string;
  newPosition: number;
}

export const moveTask = async ({ activeTaskId, newPosition, newStatus }: MoveTaskProps) => {
  try {
    await fetchInstance({
      path: `tasks/${activeTaskId}/move`,
      options: {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newStatus, newPosition }),
        credentials: "include",
      },
    });

    return { success: true };
  } catch (error) {
    return errorData(error);
  }
};
