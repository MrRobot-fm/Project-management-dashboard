import { useMemo } from "react";
import { Button } from "@workspace/ui/components/Button";
import { Input } from "@workspace/ui/components/Input";
import { Label } from "@workspace/ui/components/Label";
import { MultipleSelector } from "@workspace/ui/components/MultipleSelector";
import { Textarea } from "@workspace/ui/components/Textarea";
import { cn } from "@workspace/ui/lib/utils";
import { UserItem } from "@/components/AddTeamMemberDialog";
import { CustomDialog } from "@/components/CustomDialog";
import { CustomSelect } from "@/components/CustomSelect";
import type { Task } from "@/components/KanbanBoard";
import { TaskCad } from "@/components/TaskCad";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { priorityBadgeData } from "@/constants/badges";
import type { ProjectMember } from "@/types/models/api-get-project-by-id";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { CirclePlus, Plus } from "lucide-react";

interface TaskColumnProps {
  id: string;
  title: string;
  tasks?: Task[];
  projectMembers: ProjectMember[];
}

export const TaskColumn = ({ id, title, tasks, projectMembers }: TaskColumnProps) => {
  const tasksIds = useMemo(() => tasks?.map((task) => task.id), [tasks]);

  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: {
      type: "column",
      column: { id, title },
    },
  });

  return (
    <div
      className={cn(
        "w-1/3 min-w-[370px] h-[750px] rounded-lg bg-white border border-neutral-200/70 shadow-neutral-100 shadow-md flex flex-col p-4",
      )}
    >
      <div className="flex gap-2 items-center pb-2 cursor-grab">
        <h2 className="font-semibold">{title}</h2>
        <div className="rounded-full font-medium bg-neutral-50 border aspect-square px-2 py-2 size-6 flex items-center justify-center text-xs">
          {tasks?.length ?? 0}
        </div>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex flex-col gap-2 flex-grow py-2 rounded-md transition-colors overflow-y-auto scrollbar-none",
          isOver && "bg-blue-100 border-2 border-blue-300 border-dashed",
        )}
      >
        <SortableContext items={tasksIds || []}>
          {tasks?.map((task) => <TaskCad key={task.id} id={task.id} content={task.content} />)}
        </SortableContext>
        {tasks?.length === 0 && (
          <div className="text-gray-400 text-center py-8">Trascina qui una task</div>
        )}
      </div>
      <div>
        <CustomDialog
          title="Add Task"
          description="Add a new task to the column"
          triggerSlot={
            <button className="flex items-center mt-2 w-full px-4 py-1 cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </button>
          }
          contentSlot={
            <div className="">
              <form className="flex flex-col gap-8">
                <div className="flex flex-col gap-4 w-fit">
                  <Label className="text-right">Priority</Label>
                  <div className="flex flex-col gap-1">
                    <CustomSelect
                      data={priorityBadgeData}
                      value="MEDIUM"
                      triggerProps={{
                        className:
                          "w-full justify-between focus:border-neutral-300 bg-white border-none shadow-none p-0 data-[size=default]:h-fit",
                      }}
                      contentProps={{ className: "w-[180px]" }}
                      renderItem={({ value }) => (
                        <PriorityBadge priority={value} className="mx-px" />
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Label className="text-right">Assignee</Label>
                  <div className="flex flex-col gap-1">
                    <MultipleSelector
                      defaultOptions={projectMembers.map((member) => ({
                        value: member.id,
                        label: member.name,
                        logo: member.logo,
                      }))}
                      placeholder="Select members..."
                      menuItem={(item) => <UserItem {...item} />}
                      inputProps={{
                        className: "pl-0 pr-1 py-0 ml-0 w-full",
                        "data-test-id": "search-members-input",
                        name: "members",
                      }}
                      className="border-none pl-0 py-0 w-full"
                      badgeClassName="bg-white text-neutral-600 border !border-neutral-400"
                      hidePlaceholderWhenSelected
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Let’s give it a name"
                    className="focus-visible:ring-0 focus-visible:border-neutral-300 shadow-none border-none p-0 h-6 rounded-none"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Add a short description of the project"
                    className="focus-visible:ring-0 focus-visible:border-neutral-300 shadow-none border-none p-0 py-0 h-auto min-h-20 max-h-48 resize-none rounded-none"
                  />
                </div>
                <div className="ml-auto">
                  <Button
                    type="submit"
                    variant="outline"
                    className={cn(
                      "cursor-pointer w-fit rounded font-normal border-neutral-400 text-xs max-w-[115px]",
                    )}
                  >
                    <CirclePlus className="size-4" />
                    Create Task
                  </Button>
                </div>
              </form>
            </div>
          }
        />
      </div>
    </div>
  );
};
