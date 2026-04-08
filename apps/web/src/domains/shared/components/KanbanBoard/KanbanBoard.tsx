"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { TaskContent } from "../TaskCad";
import { filterTasks } from "../filters/TaskFilter/TaskFilter.utils";
import { useReorderTasks } from "./KanbanBoard.hooks";
import { TaskColumn } from "@/domains/shared/components/TaskColumn";
import type {
  Project,
  ProjectMember
} from "@/types/models/api-get-project-by-id";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import type { TaskStatus } from "@workspace/db";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

interface Column {
  id: TaskStatus;
  title: string;
}

interface KanbanBoardProps {
  tasks: Project["tasks"];
  projectMembers: ProjectMember[];
}

export const KanbanBoard = ({
  tasks: projectTasks,
  projectMembers
}: KanbanBoardProps) => {
  const [status] = useQueryState(
    "status",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [members] = useQueryState(
    "members",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [priority] = useQueryState(
    "priority",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [columns] = useState<Column[]>([
    { id: "TODO", title: "To Do" },
    { id: "IN_PROGRESS", title: "In Progress" },
    { id: "DONE", title: "Done" }
  ]);

  const sortedTasks = useMemo(() => {
    if (!projectTasks) return [];

    return [...projectTasks].sort((a, b) => {
      const posA = a.position ?? 0;
      const posB = b.position ?? 0;

      return posA - posB;
    });
  }, [projectTasks]);

  const [tasks, setTasks] = useState<Project["tasks"]>(sortedTasks);

  const { activeTask, activeTaskId, onDragEnd, onDragOver, onDragStart } =
    useReorderTasks({
      tasks,
      setTasks
    });

  useEffect(() => {
    setTasks(sortedTasks);
  }, [sortedTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 30 }
    })
  );

  const tasksIds = useMemo(() => tasks.map(task => task.id), [tasks]);
  console.log({ members });

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, { status, members, priority });
  }, [tasks, status, members, priority]);

  return (
    <div>
      <DndContext
        id="kanban-board"
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <div className="flex flex-col gap-6">
          <SortableContext items={tasksIds}>
            {columns.map(column => (
              <TaskColumn
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={filteredTasks.filter(task => task.status === column.id)}
                projectMembers={projectMembers}
                activeTaskId={activeTaskId}
              />
            ))}
          </SortableContext>
        </div>
        {typeof window !== "undefined" &&
          createPortal(
            <DragOverlay>
              {activeTask && (
                <TaskContent
                  task={activeTask}
                  hasStatusBadge={false}
                  isOverlay
                />
              )}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  );
};
