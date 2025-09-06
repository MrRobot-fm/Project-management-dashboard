"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@workspace/ui/components/Button";
import { DropdownMenuItem } from "@workspace/ui/components/DropdownMenu";
import { Input } from "@workspace/ui/components/Input";
import { Label } from "@workspace/ui/components/Label";
import { MultipleSelector } from "@workspace/ui/components/MultipleSelector";
import { Separator } from "@workspace/ui/components/Separator";
import { Textarea } from "@workspace/ui/components/Textarea";
import { cn } from "@workspace/ui/lib/utils";
import { SubmitButtonContent } from "../SubmitButtonContent/SubmitButtonContent";
import { updateTaskAction } from "./EditTaskDialogContent.actions";
import { type TaskAsset, useTaskForm } from "./EditTaskDialogContent.hooks";
import { UserItem } from "@/components/AddTeamMemberDialog";
import { AssetThumb } from "@/components/AssetThumb";
import { CustomDropdown } from "@/components/CustomDropdown";
import { CustomSelect } from "@/components/CustomSelect";
import { DatePicker } from "@/components/DatePicker";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { priorityBadgeData, taskStatusBadgeData } from "@/constants/badges";
import type { createTask } from "@/services/tasks/create-task";
import type { editTask } from "@/services/tasks/edit-task";
import type { Project, ProjectMember } from "@/types/models/api-get-project-by-id";
import type { TaskPriority, TaskStatus } from "@workspace/db";
import {
  ChevronDown,
  CirclePlus,
  CloudUpload,
  EllipsisVertical,
  PencilLine,
  X,
} from "lucide-react";

interface EditTaskDialogContentProps {
  projectMembers: ProjectMember[];
  task?: Project["tasks"][number];
  mode?: "create" | "edit" | "read";
  taskStatus?: TaskStatus;
  setIsOpen?: (isOpen: boolean) => void;
}

type TaskActionFn = typeof createTask | typeof editTask;

type FormState<T extends TaskActionFn> = Awaited<ReturnType<T>>;

export const EditTaskDialogContent = ({
  projectMembers,
  task,
  mode = "create",
  taskStatus = "TODO",
  setIsOpen,
}: EditTaskDialogContentProps) => {
  const { id } = useParams();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [displayMode, setDisplayMode] = useState(mode);

  const isReadMode = displayMode === "read";
  const isEditMode = displayMode === "edit";
  const isCreateMode = displayMode === "create";

  const {
    fileInputRef,
    taskDetails,
    setTaskDetails,
    addFiles,
    removeFile,
    members,
    removedAssetIds,
    removedAssigneeIds,
    setRemovedAssigneeIds,
  } = useTaskForm(projectMembers, task, taskStatus);

  const [formState, formAction, formPending] = useActionState<FormState<TaskActionFn>, FormData>(
    async (_prev, formData) => {
      const response = await updateTaskAction({
        formData,
        actionType: isCreateMode ? "create" : isEditMode ? "edit" : "delete",
        removedAssetIds,
        removedAssigneeIds,
        taskDetails,
      });

      if (response?.success && setIsOpen) {
        setIsOpen(false);
      }

      return response;
    },
    { success: false },
  );

  useEffect(() => {
    if ((isEditMode || isCreateMode) && titleInputRef.current) {
      const timer = setTimeout(() => titleInputRef.current?.focus(), 500);

      return () => clearTimeout(timer);
    }
  }, [isEditMode, isCreateMode]);

  const mappedAssigneesValues = useMemo(() => {
    return taskDetails.assignees.map((userId) => {
      const member = members.find((m) => m.value === userId);

      return {
        label: member?.label ?? "",
        value: userId,
        image: member?.logo ?? "",
      };
    });
  }, [members, taskDetails.assignees]);

  const fieldErrors = formState.zodErrors?.fieldErrors;

  return (
    <form action={formAction} className={cn("flex flex-col gap-1.5", isReadMode && "pb-10")}>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 w-fit min-w-[120px] pb-5">
          <Label className="text-right">Status</Label>
          <StatusSelect
            value={taskDetails.status}
            onValueChangeAction={(value) => setTaskDetails({ ...taskDetails, status: value })}
            disabled={isReadMode}
          />
        </div>
        <div className="flex flex-col gap-4 w-fit min-w-[120px] pb-5">
          <Label className="text-right">Priority</Label>
          <PrioritySelect
            value={taskDetails.priority}
            onValueChangeAction={(value) => setTaskDetails({ ...taskDetails, priority: value })}
            disabled={isReadMode}
          />
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-3 min-w-[120px] pb-5">
          <Label className="text-right">Start date</Label>
          <DatePicker
            date={taskDetails.startDate}
            onDateChange={(date) => setTaskDetails({ ...taskDetails, startDate: date })}
            triggerProps={{
              disabled: isReadMode,
              className: "disabled:opacity-100 disabled:[&_svg]:hidden [&_svg]:opacity-50",
            }}
          />
        </div>
        <div className="flex flex-col gap-3 pb-5">
          <Label className="text-right">Due date</Label>
          <DatePicker
            date={taskDetails.dueDate}
            onDateChange={(date) => setTaskDetails({ ...taskDetails, dueDate: date })}
            triggerProps={{
              disabled: isReadMode,
              className: "disabled:opacity-100 disabled:[&_svg]:hidden [&_svg]:opacity-50",
            }}
          />
        </div>
      </div>
      <div className={cn("flex flex-col gap-4 pb-5", fieldErrors?.title && "pb-0")}>
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <div className="flex flex-col gap-1">
          <Input
            ref={titleInputRef}
            id="title"
            name="title"
            value={taskDetails.title}
            onChange={(e) => setTaskDetails({ ...taskDetails, title: e.target.value })}
            placeholder="Let’s give it a name"
            className="focus-visible:ring-0 focus-visible:border-neutral-300 shadow-none border-none p-0 h-6 rounded-none disabled:opacity-100"
            disabled={isReadMode}
          />
          {fieldErrors?.title && <span className="text-xs text-red-400">{fieldErrors.title}</span>}
        </div>
      </div>
      <div className={cn("flex flex-col gap-4 pb-5", fieldErrors?.description && "pb-0")}>
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <div className="flex flex-col gap-1">
          <Textarea
            id="description"
            name="description"
            value={taskDetails.description}
            onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })}
            placeholder="Add a short description of the project"
            className="focus-visible:ring-0 focus-visible:border-neutral-300 shadow-none border-none p-0 py-0 min-h-10 max-h-48 resize-none rounded-none disabled:opacity-100 disabled:cursor-default"
            disabled={isReadMode}
          />
          {fieldErrors?.description && (
            <span className="text-xs text-red-400">{fieldErrors.description}</span>
          )}
        </div>
      </div>
      <div className={cn("flex flex-col gap-4 pb-5", fieldErrors?.assignees && "pb-0")}>
        <Label className="text-right">Assignee</Label>
        <div className="flex flex-col gap-1">
          <MultipleSelector
            value={mappedAssigneesValues}
            defaultOptions={members}
            placeholder="Select members..."
            menuItem={(item) => <UserItem {...item} />}
            onChange={(options) => {
              const newAssignees = options.map((option) => option.value);
              const removed = taskDetails.assignees.filter(
                (oldId) => !newAssignees.includes(oldId),
              );
              if (removed.length > 0) {
                setRemovedAssigneeIds((prev) => [...prev, ...removed]);
              }
              setTaskDetails({ ...taskDetails, assignees: newAssignees });
            }}
            inputProps={{
              className: "pl-0 pr-1 py-0 ml-0 w-full",
              "data-test-id": "search-members-input",
            }}
            className="border-none pl-0 py-0 w-full"
            badgeClassName="bg-white text-neutral-600 border !border-neutral-400 data-[disabled]:bg-white hover:data-[disabled]:bg-white data-[disabled]:text-neutral-600"
            hidePlaceholderWhenSelected
            disabled={isReadMode}
          />
          {fieldErrors?.assignees && (
            <span className="text-xs text-red-400">{fieldErrors.assignees}</span>
          )}
        </div>
      </div>
      <Separator className="mb-4" />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4 items-start">
          {!isReadMode ? (
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => addFiles(e.target.files)}
                multiple
              />
              <Button
                type="button"
                variant="transparent"
                className="cursor-pointer !p-1 !h-fit text-sm font-medium"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload assets
                <div className="p-1 rounded-full border border-neutral-400">
                  <CloudUpload className="size-3" />
                </div>
              </Button>
            </div>
          ) : (
            <p className="text-sm font-medium">Assets</p>
          )}
          <FileList
            files={taskDetails.assets}
            removeFileAction={removeFile}
            disabled={isReadMode}
          />
          {fieldErrors?.assets && (
            <span className="text-xs text-red-400">{fieldErrors.assets}</span>
          )}
        </div>
      </div>
      {isCreateMode && <input type="hidden" name="projectId" value={id} />}
      <input type="hidden" name="status" value={taskDetails.status} />
      {isEditMode && <input type="hidden" name="taskId" value={task?.id} />}
      <input type="hidden" name="priority" value={taskDetails.priority} />
      {taskDetails.startDate && (
        <input type="hidden" name="startDate" value={taskDetails.startDate.toISOString()} />
      )}
      {taskDetails.dueDate && (
        <input type="hidden" name="dueDate" value={taskDetails.dueDate.toISOString()} />
      )}
      {taskDetails.assignees.map((userId) => (
        <input key={userId} type="hidden" name="assignees[]" value={userId} />
      ))}
      {!isReadMode && (
        <div className="ml-auto mt-4">
          <Button
            type="submit"
            variant="outline"
            disabled={formPending}
            className={cn(
              "cursor-pointer w-fit rounded font-normal border-neutral-400 text-xs max-w-[115px]",
            )}
          >
            <SubmitButtonContent
              label={isCreateMode ? "Create task" : "Edit task"}
              icon={isCreateMode ? CirclePlus : PencilLine}
              isLoading={formPending}
              loadingIconClassName="size-4 stroke-black"
            />
          </Button>
        </div>
      )}
      {(isReadMode || isEditMode) && (
        <CustomDropdown
          align="end"
          className="p-2 flex-col flex items-start rounded-sm"
          triggerSlot={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-3 right-10 cursor-pointer p-1 size-fit rounded"
            >
              <EllipsisVertical className="stroke-1" />
            </Button>
          }
          contentSlot={
            <>
              {!isEditMode && (
                <DropdownMenuItem asChild>
                  <Button
                    variant="ghost"
                    className="text-xs h-fit p-2 text-black justify-start w-full rounded cursor-pointer"
                    onClick={() => setDisplayMode("edit")}
                  >
                    Edit task
                  </Button>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <form action={formAction} className="!p-0 w-full">
                  <input type="hidden" name="taskId" value={task?.id} />
                  <Button
                    type="submit"
                    variant="ghost"
                    disabled={formPending}
                    className="p-2 h-fit text-xs justify-start text-rose-500 rounded w-full cursor-pointer hover:bg-rose-100 hover:text-rose-500"
                  >
                    {formPending ? "Deleting..." : "Delete task"}
                  </Button>
                  {formState.error && (
                    <p className="text-red-500 text-xs mt-1">{formState.error.message}</p>
                  )}
                </form>
              </DropdownMenuItem>
            </>
          }
        />
      )}
    </form>
  );
};

interface SelectProps<T> {
  value: string;
  onValueChangeAction: (value: T) => void;
  disabled?: boolean;
}

export const StatusSelect = ({ value, onValueChangeAction, disabled }: SelectProps<TaskStatus>) => {
  return (
    <CustomSelect
      data={taskStatusBadgeData}
      onValueChange={onValueChangeAction}
      value={value}
      triggerProps={{
        className:
          "w-full justify-between bg-white border-none shadow-none p-0 disabled:opacity-100 disabled:[&_[data-slot=select-icon]]:hidden disabled:cursor-default",
        disabled,
      }}
      contentProps={{ className: "w-[180px]" }}
      renderItem={({ value }) => <StatusBadge status={value} className="mx-px" />}
    />
  );
};

export const PrioritySelect = ({
  value,
  onValueChangeAction,
  disabled,
}: SelectProps<TaskPriority>) => {
  return (
    <CustomSelect
      data={priorityBadgeData}
      onValueChange={onValueChangeAction}
      value={value}
      triggerProps={{
        className:
          "w-full justify-between bg-white border-none shadow-none p-0 disabled:opacity-100 disabled:[&_[data-slot=select-icon]]:hidden disabled:cursor-default",
        disabled,
      }}
      contentProps={{ className: "w-[180px]" }}
      renderItem={({ value }) => <PriorityBadge priority={value} className="mx-px" />}
    />
  );
};

export const FileList = ({
  files,
  removeFileAction,
  disabled,
}: {
  files: TaskAsset[];
  removeFileAction: (index: number) => void;
  disabled?: boolean;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showGradient, setShowGradient] = useState(false);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const updateGradient = () => {
      const hasOverflow = element.scrollHeight > element.clientHeight;
      const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 2;

      setShowGradient(hasOverflow && !atBottom);
    };

    updateGradient();

    element.addEventListener("scroll", updateGradient);

    return () => element.removeEventListener("scroll", updateGradient);
  }, [files]);

  return (
    <div className="relative max-h-[105px]">
      <div ref={scrollRef} className="h-full overflow-y-auto pr-2">
        <div className="flex flex-wrap gap-3">
          {files.map((file, index) => (
            <AssetThumb
              key={index}
              file={file}
              removeButton={
                disabled ? undefined : (
                  <button
                    type="button"
                    onClick={() => removeFileAction(index)}
                    className="p-1 rounded-full bg-neutral-100 cursor-pointer hover:bg-neutral-200 transition-colors"
                  >
                    <X className="size-3" />
                  </button>
                )
              }
            />
          ))}
        </div>
      </div>
      {showGradient && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent flex justify-center items-end pb-1">
          <ChevronDown className="size-5  text-neutral-500 animate-bounce" />
        </div>
      )}
    </div>
  );
};
