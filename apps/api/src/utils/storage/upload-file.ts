import {
  getBasePath,
  getPublicUrl,
  removeExistingFiles,
  uploadNewFile,
} from "@/utils/storage";
import { BadRequestError } from "@workspace/exceptions";

export const uploadFile = async ({
  bucket,
  file,
  userId,
  workspaceId,
}: {
  bucket: string;
  file: Express.Multer.File | undefined;
  userId?: string;
  workspaceId?: string;
}): Promise<string> => {
  if (!file) {
    throw new BadRequestError("File not found or invalid");
  }

  if (!bucket) {
    throw new BadRequestError("Bucket name is required");
  }

  const basePath = getBasePath(workspaceId, userId);

  await removeExistingFiles(bucket, basePath);

  const filePath = await uploadNewFile(bucket, file, basePath);

  return getPublicUrl(bucket, filePath);
};
