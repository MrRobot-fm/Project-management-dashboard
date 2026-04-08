import { Card, CardContent } from "@workspace/ui/components/Card";
import { Input } from "@workspace/ui/components/Input";
import { cn } from "@workspace/ui/lib/utils";

import type { ControllerRenderProps, FieldValues } from "react-hook-form";
import { DropzoneArea } from "./components/DropzoneArea";
import { DropzonePreview } from "./components/DropzonePreview";
import { useDropzone } from "./hooks/use-dropzone";

interface DropzoneProps {
  disabled?: boolean;
  image: string | null;
  field?: ControllerRenderProps<FieldValues, string>;
  id?: string;
  type?: "workspace" | "project" | "user";
  mode?: "create" | "edit";
}

export const Dropzone = ({
  id,
  type = "project",
  mode = "create",
  image,
  disabled = false,
  field
}: DropzoneProps) => {
  const { isDragging, previewUrl, fileInputRef, isPending, handlers } =
    useDropzone({
      image,
      field,
      id,
      type,
      mode
    });

  return (
    <Card
      className={cn(
        "gap-0 border-none shadow-none pt-0 pb-0 w-full",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <CardContent className="space-y-1 p-0">
        {previewUrl ? (
          <DropzonePreview
            previewUrl={previewUrl}
            isPending={isPending}
            onRemove={handlers.handleRemoveFile}
          />
        ) : (
          <DropzoneArea
            isDragging={isDragging}
            onDrop={handlers.handleDrop}
            onDragOver={handlers.handleDragOver}
            onDragLeave={handlers.handleDragLeave}
            onClick={handlers.handleClick}
          />
        )}
        <Input
          id={field?.name}
          type="file"
          name={mode === "edit" ? "" : field?.name}
          accept="image/*"
          ref={fileInputRef}
          onChange={handlers.handleFileSelect}
          className="hidden"
          disabled={disabled}
        />
      </CardContent>
    </Card>
  );
};
