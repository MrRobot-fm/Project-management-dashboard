import { useMemo } from "react";
import Image from "next/image";
import { getAssetIcon } from "@/utils/get-asset-icon";

export const AssetIcon = ({ assetType }: { assetType: string | null }) => {
  const iconType = useMemo(() => getAssetIcon(assetType), [assetType]);

  return <Image src={iconType} alt="Asset Icon" width={60} height={60} />;
};
