import { useRemoveLogo } from "@/domains/shared/services/hooks/use-remove-log";
import { useUpdateLogo } from "@/domains/shared/services/hooks/use-update-logo";
import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent
} from "react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

interface UseDropzoneProps {
  image: string | null;
  field?: ControllerRenderProps<FieldValues, string>;
  id?: string;
  type: "workspace" | "project" | "user";
  mode: "create" | "edit";
}

export const useDropzone = ({
  image,
  field,
  id,
  type,
  mode
}: UseDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(image ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateLogo, isPending: isUpdateLogoPending } =
    useUpdateLogo();

  const clearState = () => {
    setPreviewUrl(null);
    field?.onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const { mutate: removeLogo, isPending: isRemoveLogoPending } = useRemoveLogo({
    onSuccess: clearState
  });

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file?.type.startsWith("image/")) return;

      field?.onChange(file);
      setPreviewUrl(URL.createObjectURL(file));

      if (mode === "edit") {
        updateLogo({ id, type, logo: file });
      }
    },
    [field, id, type, mode, updateLogo]
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      handleFile(event.dataTransfer.files[0]);
    },
    [handleFile]
  );

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

  const handleFileSelect = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      handleFile(event.target.files?.[0]);
    },
    [handleFile]
  );

  const handleRemoveFile = useCallback(() => {
    if (mode === "edit" && id) {
      removeLogo({ id, type });
      return;
    }
  }, [id, type, mode, removeLogo]);

  const handleClick = () => fileInputRef.current?.click();

  return {
    isDragging,
    previewUrl,
    fileInputRef,
    isPending: isUpdateLogoPending || isRemoveLogoPending,
    handlers: {
      handleDrop,
      handleDragOver,
      handleDragLeave,
      handleFileSelect,
      handleRemoveFile,
      handleClick
    }
  };
};
