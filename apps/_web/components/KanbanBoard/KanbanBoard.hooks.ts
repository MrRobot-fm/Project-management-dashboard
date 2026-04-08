import { type Dispatch, type SetStateAction, useState } from "react";
import { moveTask } from "@/services/tasks/move-task";
import type { Project } from "@/types/models/api-get-project-by-id";
import type { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type { Task } from "@workspace/db";

export const useReorderTasks = ({
  tasks,
  setTasks,
}: {
  tasks: Project["tasks"];
  setTasks: Dispatch<SetStateAction<Project["tasks"]>>;
}) => {
  const [activeTask, setActiveTask] = useState<Project["tasks"][number] | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "task") {
      setActiveTask(event.active.data.current.task);
      setActiveTaskId(event.active.id as string);
      return;
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const isActiveTask = active.data.current?.type === "task";
    const isOverTask = over.data.current?.type === "task";
    const isOverColumn = over.data.current?.type === "column";

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex((task) => task.id === active.id);
        const overTaskIndex = tasks.findIndex((task) => task.id === over.id);

        if (tasks[activeTaskIndex] && tasks[overTaskIndex]) {
          if (tasks[overTaskIndex].status !== tasks[activeTaskIndex].status) {
            tasks[activeTaskIndex].status = tasks[overTaskIndex].status;
          }
        }

        return arrayMove(tasks, activeTaskIndex, overTaskIndex);
      });
    }

    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex((task) => task.id === active.id);

        if (tasks[activeTaskIndex]) {
          tasks[activeTaskIndex].status = over.id as Task["status"];
        }

        return [...tasks];
      });
    }
  };

  const onDragEnd = async (event: DragEndEvent) => {
    if (!activeTask) return;

    const overId = event.over?.id;

    if (!overId) {
      setActiveTask(null);
      setActiveTaskId(null);
      return;
    }

    const overTask = tasks.find((task) => task.id === overId);
    const overColumnId = event.over?.data.current?.type === "column" ? overId : undefined;

    let newStatus = activeTask.status;
    let newPosition = 0;

    if (overTask) {
      newStatus = overTask.status;
    } else if (overColumnId) {
      newStatus = overColumnId as Task["status"];
    }

    const targetTasks = tasks.filter((task) => task.status === newStatus);

    const newIndex = targetTasks.findIndex((task) => task.id === activeTask.id);

    newPosition = newIndex;

    await moveTask({
      activeTaskId: activeTask.id,
      newPosition,
      newStatus,
    });

    setActiveTask(null);
    setActiveTaskId(null);
  };

  return {
    onDragStart,
    onDragOver,
    onDragEnd,
    activeTask,
    activeTaskId,
  };
};
