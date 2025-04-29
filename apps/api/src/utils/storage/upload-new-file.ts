import { supabase } from "@/supabase";
import { InternalServerError, NotFoundError } from "@workspace/exceptions";

export const uploadNewFile = async (
  bucket: string,
  file: Express.Multer.File,
  basePath: string,
): Promise<string> => {
  const timestampedName = `${Date.now()}_${file.originalname}`;
  const filePath = `${basePath}${timestampedName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (uploadError) {
    if (uploadError.message?.includes("Bucket not found")) {
      throw new NotFoundError(`Bucket '${bucket}' not found`, uploadError);
    }
    throw new InternalServerError("Error during file upload", uploadError);
  }

  return filePath;
};
