import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskCadProps {
  id: string;
  content: string;
}

export const TaskCad = ({ id, content }: TaskCadProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: id,
    data: {
      type: "task",
      task: { id, content },
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-200 border-2 border-dashed border-gray-400 h-fit w-full rounded-md p-3 opacity-50"
      >
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white h-fit w-full rounded-md p-2 cursor-pointer border border-neutral-200/70 shadow-neutral-100 shadow-md"
      {...attributes}
      {...listeners}
    >
      <div className="text-black mb-2 text-sm">{content}</div>
    </div>
  );
};
