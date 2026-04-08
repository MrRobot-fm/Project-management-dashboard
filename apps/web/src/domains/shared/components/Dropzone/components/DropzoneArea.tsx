import { cn } from "@workspace/ui/lib/utils";
import { FileImage } from "lucide-react";
import type { DragEvent } from "react";

interface DropzoneAreaProps {
  isDragging: boolean;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: DragEvent<HTMLDivElement>) => void;
  onClick: () => void;
}

export const DropzoneArea = ({
  isDragging,
  onDrop,
  onDragOver,
  onDragLeave,
  onClick
}: DropzoneAreaProps) => (
  <div
    onClick={onClick}
    onDrop={onDrop}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    className={cn(
      "border-2 border-dashed rounded-lg flex flex-col gap-2 items-center justify-center cursor-pointer transition-colors h-80 overflow-hidden",
      isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200"
    )}
  >
    <FileImage className="w-12 h-12 text-gray-500" />
    <span className="text-sm font-medium text-gray-500">
      Drag and drop an image or click to browse
    </span>
    <span className="text-xs text-gray-500">Only image files</span>
  </div>
);
