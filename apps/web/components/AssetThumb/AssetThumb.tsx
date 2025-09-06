import type { ReactElement } from "react";
import type { TaskAsset } from "../EditTaskDialogContent/EditTaskDialogContent.hooks";
import { AssetIcon } from "@/components/AssetIcon";
import { formatFileSize } from "@/utils/format-file-size";

interface AssetThumbProps {
  file: TaskAsset;
  removeButton?: ReactElement;
}

export const AssetThumb = ({ file, removeButton }: AssetThumbProps) => {
  return (
    <div className="flex items-center gap-3 py-1.5 pl-2 pr-3 min-w-32 rounded-sm border">
      <div className="size-5 flex items-center">
        <AssetIcon assetType={file.type} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium">{file.name}</span>
        <span className="text-[10px] text-neutral-600">{formatFileSize(file.size)}</span>
      </div>
      {removeButton}
    </div>
  );
};
