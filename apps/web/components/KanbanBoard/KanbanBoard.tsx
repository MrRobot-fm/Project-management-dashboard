"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { TaskCad } from "../TaskCad";
import { TaskColumn } from "@/components/TaskColumn";
import type { ProjectMember } from "@/types/models/api-get-project-by-id";
import {
  DndContext,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

interface Column {
  id: string;
  title: string;
}

export interface Task {
  id: string;
  columnId: string;
  content: string;
}

interface KanbanBoardProps {
  projectMembers: ProjectMember[];
}

export const KanbanBoard = ({ projectMembers }: KanbanBoardProps) => {
  const [columns] = useState<Column[]>([
    {
      id: "1",
      title: "To Do",
    },
    {
      id: "2",
      title: "In Progress",
    },
    {
      id: "3",
      title: "Done",
    },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: "10", columnId: "1", content: "Task 1" },
    { id: "20", columnId: "1", content: "Task 2" },
    { id: "30", columnId: "2", content: "Task 3" },
    { id: "40", columnId: "3", content: "Task 4" },
    { id: "50", columnId: "3", content: "Task 4" },
    { id: "60", columnId: "3", content: "Task 4" },
    { id: "70", columnId: "3", content: "Task 4" },
    { id: "80", columnId: "3", content: "Task 4" },
    { id: "90", columnId: "3", content: "Task 4" },
    { id: "100", columnId: "3", content: "Task 4" },
    { id: "110", columnId: "3", content: "Task 4" },
    { id: "120", columnId: "3", content: "Task 4" },
    { id: "130", columnId: "3", content: "Task 4" },
    { id: "140", columnId: "3", content: "Task 4" },
    { id: "150", columnId: "3", content: "Task 4" },
    { id: "160", columnId: "3", content: "Task 4" },
    { id: "170", columnId: "3", content: "Task 4" },
    { id: "180", columnId: "3", content: "Task 4" },
  ]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 30,
      },
    }),
  );

  const tasksIds = useMemo(() => tasks?.map((task) => task.id), [tasks]);

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
          if (tasks[overTaskIndex].columnId !== tasks[activeTaskIndex].columnId) {
            tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId;
          }
        }

        return arrayMove(tasks, activeTaskIndex, overTaskIndex);
      });
    }

    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex((task) => task.id === active.id);

        if (tasks[activeTaskIndex]) {
          tasks[activeTaskIndex].columnId = over.id as string;
        }

        return [...tasks];
      });
    }
  };

  const onDragEnd = () => {
    setActiveTask(null);
  };

  return (
    <div className="h-screen">
      <DndContext
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <div className="flex gap-4">
          <SortableContext items={tasksIds || []}>
            {columns.map((column) => (
              <TaskColumn
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={tasks.filter((task) => task.columnId === column.id)}
                projectMembers={projectMembers}
              />
            ))}
          </SortableContext>
        </div>
        {typeof window !== "undefined" &&
          createPortal(
            <DragOverlay>
              {activeTask && <TaskCad id={activeTask.id} content={activeTask.content} />}
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
    </div>
  );
};
