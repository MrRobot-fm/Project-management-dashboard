import type { Project, ProjectMember, Task } from "@/types/models/api-get-project-by-id";

interface FilterOptions {
  status: string[];
  members: string[];
  priority: string[];
}

export const parsedTaskFilterData = ({
  tasks,
  members,
}: {
  tasks: Project["tasks"] | undefined;
  members: ProjectMember[] | undefined;
}) => {
  if (!tasks || !members) return [];

  const uniqueStatuses = Array.from(new Set(tasks.map((task) => task.status))) ?? [];
  const uniquePriorities = Array.from(new Set(tasks.map((task) => task.priority))) ?? [];

  return [
    {
      label: "Priority",
      items: uniquePriorities.map((priority) => ({
        value: priority,
        label: priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase(),
      })),
    },
    {
      label: "Status",
      items: uniqueStatuses.map((status) => ({
        value: status,
        label: (status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()).replace("_", " "),
      })),
    },
    {
      label: "Members",
      items:
        members.map((member) => ({
          value: member.id,
          label: member.name,
        })) ?? [],
    },
  ];
};

export const filterTasks = (tasks: Task[], filters: FilterOptions) => {
  const { status, members, priority } = filters;

  return tasks.filter((task) => {
    const matchStatus = status.length === 0 || status.includes(task.status);
    const matchPriority = priority.length === 0 || priority.includes(task.priority);
    const matchMember =
      members.length === 0 || task.assignees.some((assignee) => members.includes(assignee.userId));

    console.log({ assingees: task.assignees });

    return matchStatus && matchPriority && matchMember;
  });
};

interface FilterOptions {
  status: string[];
  members: string[];
  priority: string[];
}

export const getAvailableFilterValues = (tasks: Task[], filters: FilterOptions) => {
  const { status, members, priority } = filters;

  const availableStatuses = Array.from(
    new Set(
      tasks
        .filter(
          (task) => members.length === 0 || task.assignees.some((a) => members.includes(a.userId)),
        )
        .filter((task) => priority.length === 0 || priority.includes(task.priority))
        .map((task) => task.status),
    ),
  );

  const availableMembers = Array.from(
    new Set(
      tasks
        .filter((task) => status.length === 0 || status.includes(task.status))
        .filter((task) => priority.length === 0 || priority.includes(task.priority))
        .flatMap((task) => task.assignees.map((assignee) => assignee.userId)),
    ),
  );

  const availablePriorities = Array.from(
    new Set(
      tasks
        .filter((task) => status.length === 0 || status.includes(task.status))
        .filter(
          (task) => members.length === 0 || task.assignees.some((a) => members.includes(a.userId)),
        )
        .map((task) => task.priority),
    ),
  );

  return { availableStatuses, availableMembers, availablePriorities };
};
