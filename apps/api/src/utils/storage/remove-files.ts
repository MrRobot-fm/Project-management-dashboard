import { supabase } from "@/supabase";
import { InternalServerError } from "@workspace/exceptions";

export const removeExistingFiles = async (
  bucket: string,
  basePath: string,
): Promise<void> => {
  const { data: existingFiles, error: listError } = await supabase.storage
    .from(bucket)
    .list(basePath);

  if (listError) {
    throw new InternalServerError("Error listing existing files", listError);
  }

  if (existingFiles?.length) {
    const filesToRemove = existingFiles.map((f) => `${basePath}${f.name}`);

    const { error: removeError } = await supabase.storage
      .from(bucket)
      .remove(filesToRemove);

    if (removeError) {
      throw new InternalServerError(
        "Error removing existing files",
        removeError,
      );
    }
  }
};
