"use client";

import {
  useMemo,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type MouseEvent
} from "react";
import { Button } from "@workspace/ui/components/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@workspace/ui/components/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@workspace/ui/components/Popover";
import { cn } from "@workspace/ui/lib/utils";
import { getAvailableFilterValues } from "./TaskFilter.utils";
import type { Task } from "@/types/models/api-get-project-by-id";
import type { TaskPriority, TaskStatus } from "@workspace/db";
import { Check, ListFilter, X } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

type GroupLabel = "Status" | "Priority" | "Members";

export interface TaskFilterData {
  label: string;
  items: {
    value: string;
    label: string;
  }[];
}

interface TaskFilterProps {
  data: TaskFilterData[];
  tasks: Task[];
  hasLabel?: boolean;
  size?: "default" | "sm";
  contentAlign?: ComponentProps<typeof PopoverContent>["align"];
}

export const TaskFilter = ({
  data,
  tasks,
  hasLabel = true,
  size = "default",
  contentAlign = "end"
}: TaskFilterProps) => {
  const [open, setOpen] = useState(false);

  const [status, setStatus] = useQueryState(
    "status",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [members, setMembers] = useQueryState(
    "members",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [priority, setPriority] = useQueryState(
    "priority",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const activeCount = status.length + members.length + priority.length;

  const resetFiltersAndCloseMenu = (
    e:
      | MouseEvent<HTMLDivElement, globalThis.MouseEvent>
      | KeyboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setStatus([]);
    setPriority([]);
    setMembers([]);
    setOpen(false);
  };

  const { availableStatuses, availableMembers, availablePriorities } = useMemo(
    () => getAvailableFilterValues(tasks, { status, members, priority }),
    [tasks, status, members, priority]
  );

  const handleSelect = (groupLabel: GroupLabel, currentValue: string) => {
    const stateMap = {
      Status: { selectedValues: status, setSelectedValues: setStatus },
      Priority: { selectedValues: priority, setSelectedValues: setPriority },
      Members: { selectedValues: members, setSelectedValues: setMembers }
    } as const;

    const state = stateMap[groupLabel];

    if (!state) return;

    const { selectedValues, setSelectedValues } = state;
    const isSelected = selectedValues.includes(currentValue);

    setSelectedValues(
      isSelected
        ? selectedValues.filter(value => value !== currentValue)
        : [...selectedValues, currentValue]
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-24 justify-center items-center group py-2 !px-3 h-fit text-neutral-600 text-xs font-semibold rounded-sm shadow-none cursor-pointer",
            size === "sm" && "w-fit py-1 px-3 border-none"
          )}
        >
          {hasLabel && "Filters"}
          {(size === "default" && activeCount === 0) || size === "sm" ? (
            <ListFilter />
          ) : (
            <div
              className={cn(
                "flex items-center justify-center rounded-full p-1 size-4 bg-neutral-50 border aspect-square text-[10px] text-neutral-700"
              )}
            >
              <span className="group-hover:hidden">{activeCount}</span>
              <div
                role="button"
                tabIndex={0}
                onClick={e => resetFiltersAndCloseMenu(e)}
                onKeyDown={e =>
                  e.key === "Enter" && resetFiltersAndCloseMenu(e)
                }
                className="group-hover:flex items-center justify-center hidden cursor-pointer"
              >
                <X className="size-3.5" />
              </div>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={contentAlign}
        className="w-[220px] p-0 text-neutral-600"
      >
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>No filter found.</CommandEmpty>
            {data.map(group => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.items.map(item => {
                  const isActive =
                    group.label === "Status"
                      ? status.includes(item.value)
                      : group.label === "Priority"
                        ? priority.includes(item.value)
                        : members.includes(item.value);

                  return (
                    <CommandItem
                      key={item.value}
                      value={
                        group.label === "Members" ? item.label : item.value
                      }
                      onSelect={() =>
                        handleSelect(group.label as GroupLabel, item.value)
                      }
                      disabled={
                        group.label === "Status"
                          ? !availableStatuses.includes(
                              item.value as TaskStatus
                            )
                          : group.label === "Priority"
                            ? !availablePriorities.includes(
                                item.value as TaskPriority
                              )
                            : !availableMembers.includes(item.value)
                      }
                    >
                      {item.label}
                      <Check
                        className={cn(
                          "ml-auto transition-opacity",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
