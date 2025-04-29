import { supabase } from "@/supabase";
import { InternalServerError } from "@workspace/exceptions";

export const getPublicUrl = (bucket: string, filePath: string): string => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  if (!data?.publicUrl) {
    throw new InternalServerError("Unable to get public URL for the file");
  }

  return data.publicUrl;
};
