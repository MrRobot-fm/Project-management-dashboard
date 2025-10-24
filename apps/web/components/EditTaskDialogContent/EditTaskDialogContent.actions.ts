import type { TaskDetails } from "./EditTaskDialogContent.hooks";
import { createTask } from "@/services/tasks/create-task";
import { deleteTask } from "@/services/tasks/delete-task";
import { editTask } from "@/services/tasks/edit-task";

export const updateTaskAction = async ({
  formData,
  actionType,
  taskDetails,
  removedAssetIds,
  removedAssigneeIds,
}: {
  formData: FormData;
  actionType: "create" | "edit" | "delete";
  taskDetails: TaskDetails;
  removedAssetIds: string[];
  removedAssigneeIds: string[];
}) => {
  const fileAssets = taskDetails.assets.filter((asset) => asset instanceof File);

  fileAssets.forEach((file) => formData.append("assets[]", file));

  if (!taskDetails.description) {
    formData.delete("description");
  }

  if (actionType === "create") {
    return await createTask(formData);
  }

  if (actionType === "delete") {
    const taskId = formData.get("taskId") as string;

    return await deleteTaskAction({
      taskId,
    });
  }

  if (removedAssetIds.length > 0) {
    removedAssetIds.forEach((assetId) => formData.append("removedAssetIds", assetId));
  }

  if (removedAssigneeIds.length > 0) {
    removedAssigneeIds.forEach((userId) => formData.append("removedAssigneeIds", userId));
  }

  return await editTask(formData);
};

export const deleteTaskAction = async ({ taskId }: { taskId: string }) => {
  return await deleteTask(taskId);
};
