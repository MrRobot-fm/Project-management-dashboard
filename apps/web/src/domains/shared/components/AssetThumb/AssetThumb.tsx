import type { ReactElement } from "react";
import { cn } from "@workspace/ui/lib/utils";
import type { TaskAsset } from "../EditTaskDialogContent/EditTaskDialogContent.hooks";
import { AssetIcon } from "@/domains/shared/components/AssetIcon";
import { downloadAsset } from "@/utils/download-asset";
import { formatFileSize } from "@/utils/format-file-size";
import { Download } from "lucide-react";

interface AssetThumbProps {
  file: TaskAsset;
  removeButton?: ReactElement;
  canDownload?: boolean;
}

export const AssetThumb = ({
  file,
  removeButton,
  canDownload = false
}: AssetThumbProps) => {
  const handleDownload = () => {
    if (canDownload)
      downloadAsset({ name: file.name, path: "path" in file ? file.path : "" });
  };

  return (
    <div
      data-test-id="asset-thumb"
      className={cn(
        "flex items-center gap-3 py-1.5 pl-2 pr-3 min-w-32 rounded-sm border",
        canDownload &&
          "cursor-pointer hover:opacity-70 transition-opacity duration-300"
      )}
      onClick={handleDownload}
    >
      <div className="size-5 flex items-center">
        <AssetIcon assetType={file.type} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium">{file.name}</span>
        <div className="flex gap-1">
          <span className="text-[10px] text-neutral-600">
            {formatFileSize(file.size)}
          </span>
          {canDownload && <Download className="size-3 text-neutral-600" />}
        </div>
      </div>
      {removeButton}
    </div>
  );
};
