import { cn } from "@workspace/ui/lib/utils";
import { Avatar } from "@/domains/shared/components/Avatar";
import { Button } from "@workspace/ui/components/Button";
import { Trash2 } from "lucide-react";

interface DropzonePreviewProps {
  previewUrl: string;
  isPending: boolean;
  onRemove: () => void;
}

export const DropzonePreview = ({
  previewUrl,
  isPending,
  onRemove
}: DropzonePreviewProps) => (
  <div className="relative w-fit">
    <Avatar
      imageDataTestId="uploaded-image"
      image={previewUrl}
      shape="square"
      className={cn("size-24 rounded-md", isPending && "animate-pulse")}
    />
    <Button
      type="button"
      size="icon"
      variant="destructive"
      className="text-white rounded-full p-1.5! size-fit aspect-square bg-red-500 cursor-pointer absolute -bottom-2 -right-2"
      onClick={onRemove}
    >
      <Trash2 className="size-3" />
      <span className="sr-only">Remove logo</span>
    </Button>
  </div>
);
