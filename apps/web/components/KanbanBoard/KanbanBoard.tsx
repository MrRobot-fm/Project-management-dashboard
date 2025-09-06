"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { TaskContent } from "../TaskCad";
import { TaskColumn } from "@/components/TaskColumn";
import type { Project, ProjectMember } from "@/types/models/api-get-project-by-id";
import { fetchInstance } from "@/utils/fetch-instance";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import type { Task, TaskStatus } from "@workspace/db";

interface Column {
  id: TaskStatus;
  title: string;
}

interface KanbanBoardProps {
  tasks: Project["tasks"];
  projectMembers: ProjectMember[];
}

export const KanbanBoard = ({ tasks: projectTasks, projectMembers }: KanbanBoardProps) => {
  const [columns] = useState<Column[]>([
    { id: "TODO", title: "To Do" },
    { id: "IN_PROGRESS", title: "In Progress" },
    { id: "DONE", title: "Done" },
  ]);

  const [tasks, setTasks] = useState<Project["tasks"]>(projectTasks);

  useEffect(() => {
    setTasks(projectTasks);
  }, [projectTasks]);

  const [activeTask, setActiveTask] = useState<Project["tasks"][number] | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "task") {
      setActiveTask(event.active.data.current.task);
      setActiveTaskId(event.active.id as string);
      return;
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 30 },
    }),
  );

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

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
        const activeTaskIndex = tasks.findIndex((t) => t.id === active.id);
        const overTaskIndex = tasks.findIndex((t) => t.id === over.id);

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
        const activeTaskIndex = tasks.findIndex((t) => t.id === active.id);

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

    const overTask = tasks.find((t) => t.id === overId);
    const overColumnId = event.over?.data.current?.type === "column" ? overId : undefined;

    let newStatus = activeTask.status;
    let newPosition = 0;

    if (overTask) {
      newStatus = overTask.status;
      newPosition = overTask.position ?? 0;
    } else if (overColumnId) {
      newStatus = overColumnId as Task["status"];
      newPosition = tasks.filter((task) => task.status === newStatus).length;
    }

    await fetchInstance({
      path: `tasks/${activeTask.id}/move`,
      options: {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newStatus, newPosition }),
        credentials: "include",
      },
    });

    setActiveTask(null);
    setActiveTaskId(null);
  };

  return (
    <div className="">
      <DndContext
        id="kanban-board"
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <div className="flex gap-4">
          <SortableContext items={tasksIds}>
            {columns.map((column) => (
              <TaskColumn
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={tasks.filter((task) => task.status === column.id)}
                projectMembers={projectMembers}
                activeTaskId={activeTaskId}
              />
            ))}
          </SortableContext>
        </div>
        {typeof window !== "undefined" &&
          createPortal(
            <DragOverlay>{activeTask && <TaskContent task={activeTask} isOverlay />}</DragOverlay>,
            document.body,
          )}
      </DndContext>
    </div>
  );
};
