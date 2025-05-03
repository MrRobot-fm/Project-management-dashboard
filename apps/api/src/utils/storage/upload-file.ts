import {
  getBasePath,
  getPublicUrl,
  removeExistingFiles,
  uploadNewFile,
} from "@/utils/storage";
import { BadRequestError } from "@workspace/exceptions";

interface UploadFileProps {
  bucket: string;
  file: Express.Multer.File | undefined;
  userId?: string;
  workspaceId?: string;
  projectId?: string;
}

export const uploadFile = async ({
  bucket,
  file,
  userId,
  workspaceId,
  projectId,
}: UploadFileProps): Promise<string> => {
  if (!file) {
    throw new BadRequestError("File not found or invalid");
  }

  if (!bucket) {
    throw new BadRequestError("Bucket name is required");
  }

  const basePath = getBasePath({ workspaceId, userId, projectId });

  await removeExistingFiles(bucket, basePath);

  const filePath = await uploadNewFile(bucket, file, basePath);

  return getPublicUrl(bucket, filePath);
};
