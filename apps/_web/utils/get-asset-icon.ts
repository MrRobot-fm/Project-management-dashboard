export const getAssetIcon = (assetType: string | null): string => {
  if (!assetType) return "/images/file-asset.svg";

  if (assetType === "application/pdf") return "/images/pdf-asset.svg";

  if (assetType === "text/csv") return "/images/sheet-asset.svg";

  if (
    assetType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    assetType === "application/vnd.ms-excel" ||
    assetType.includes("sheet.macroEnabled")
  )
    return "/images/sheet-asset.svg";

  if (assetType.startsWith("image/")) return "/images/image-asset.svg";

  if (assetType.startsWith("video/")) return "/images/video-asset.svg";

  if (assetType.startsWith("audio/")) return "/images/audio-asset.svg";
  if (assetType.startsWith("application/") || assetType.startsWith("text/"))
    return "/images/doc-asset.svg";

  return "/images/file-asset.svg";
};
