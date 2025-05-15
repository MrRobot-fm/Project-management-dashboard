"use client";

import { type ChangeEvent, type DragEvent, useCallback, useRef, useState } from "react";
import { Button } from "@workspace/ui/components/Button";
import { Card, CardContent } from "@workspace/ui/components/Card";
import { Input } from "@workspace/ui/components/Input";
import { cn } from "@workspace/ui/lib/utils";
import { Avatar } from "@/components/Avatar";
import { FileImage, Trash2 } from "lucide-react";

interface DropzoneProps {
  disabled?: boolean;
  image: string | null;
}

export const Dropzone = ({ image, disabled = false }: DropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(image ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(droppedFile));
    }
  }, []);

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);

  const handleRemoveFile = useCallback(() => {
    setPreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card
      className={cn(
        "gap-0 border-none shadow-none pt-0",
        previewUrl && "pt-4",
        disabled && "pointer-events-none",
      )}
    >
      <CardContent className="space-y-1 p-0">
        {previewUrl ? (
          <div className="relative w-fit">
            <Avatar image={previewUrl} className="size-24" />
            <Button
              size="icon"
              variant="destructive"
              className="text-white rounded-full !p-1.5 size-fit aspect-square bg-red-500 cursor-pointer absolute -bottom-1 right-2"
              onClick={handleRemoveFile}
            >
              <Trash2 className="size-3" />
              <span className="sr-only">Remove logo</span>
            </Button>
          </div>
        ) : (
          <div
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              "border-2 border-dashed rounded-lg flex flex-col gap-2 items-center justify-center cursor-pointer transition-colors h-80 overflow-hidden",
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200",
            )}
          >
            <FileImage className="w-12 h-12 text-gray-500" />
            <span className="text-sm font-medium text-gray-500">
              Drag and drop an image or click to browse
            </span>
            <span className="text-xs text-gray-500">Only image files</span>
          </div>
        )}
        <Input
          id="logo"
          type="file"
          name="logo"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />
      </CardContent>
    </Card>
  );
};
