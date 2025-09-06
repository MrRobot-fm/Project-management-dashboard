import { supabase } from "@/supabase";

export const getSignedUrl = async <T extends { path: string }>(asset: T) => {
  const { data, error } = await supabase.storage
    .from("task-assets")
    .createSignedUrl(asset.path, 60 * 60);

  if (error) return { ...asset, path: null };

  return { ...asset, path: data.signedUrl };
};
