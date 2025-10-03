import { useMemo, useRef, useState } from "react";
import type { Project, ProjectMember } from "@/types/models/api-get-project-by-id";
import type { TaskPriority, TaskStatus } from "@workspace/db";

export type TaskAsset = File | Project["tasks"][number]["assets"][number];

export interface TaskDetails {
  title: string;
  description: string;
  startDate: Date | undefined;
  dueDate: Date | undefined;
  priority: TaskPriority;
  status: TaskStatus;
  assignees: string[];
  assets: TaskAsset[];
}

export const useTaskForm = (
  initialMembers: ProjectMember[],
  task: Project["tasks"][number] | undefined,
  status: TaskStatus,
) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [taskDetails, setTaskDetails] = useState<TaskDetails>({
    title: task?.title || "",
    description: task?.description || "",
    startDate: task?.startDate ? new Date(task.startDate) : new Date(),
    dueDate: task?.dueDate ? new Date(task.dueDate) : new Date(),
    priority: task?.priority || "LOW",
    status: task?.status || status,
    assignees: task?.assignees.map((assignee) => assignee.userId) || [],
    assets: task?.assets ? [...task.assets] : [],
  });

  const [removedAssetIds, setRemovedAssetIds] = useState<string[]>([]);
  const [removedAssigneeIds, setRemovedAssigneeIds] = useState<string[]>([]);

  const hasChanges = useMemo(() => {
    if (!task) return true;

    return (
      task.title !== taskDetails.title ||
      (task.description ?? "") !== taskDetails.description ||
      new Date(task.startDate).getDay() !== taskDetails.startDate?.getDay() ||
      new Date(task.dueDate).getDay() !== taskDetails.dueDate?.getDay() ||
      task.priority !== taskDetails.priority ||
      task.status !== taskDetails.status ||
      task.assignees.length !== taskDetails.assignees.length ||
      task.assets.length !== taskDetails.assets.length
    );
  }, [task, taskDetails]);

  const members = useMemo(
    () =>
      initialMembers.map((member) => ({
        value: member.id,
        label: member.name,
        logo: member.logo,
      })),
    [initialMembers],
  );

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    setTaskDetails((prev) => ({
      ...prev,
      assets: [...prev.assets, ...Array.from(files)],
    }));
  };

  const removeFile = (index: number) => {
    const assetToRemove = taskDetails.assets[index];

    if (assetToRemove && !(assetToRemove instanceof File) && assetToRemove.id) {
      setRemovedAssetIds((prev) => [...prev, assetToRemove.id]);
    }

    setTaskDetails((prev) => ({
      ...prev,
      assets: prev.assets.filter((_, i) => i !== index),
    }));

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return {
    fileInputRef,
    taskDetails,
    setTaskDetails,
    members,
    addFiles,
    removeFile,
    removedAssetIds,
    removedAssigneeIds,
    setRemovedAssigneeIds,
    hasChanges,
  };
};

export const useTaskActions = () => {};
