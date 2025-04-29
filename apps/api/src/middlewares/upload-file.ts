import type { Request } from "express";
import { BadRequestError } from "@workspace/exceptions";
import multer, { type FileFilterCallback } from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (
    _: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (!file.mimetype.startsWith("image/")) {
      const error = new BadRequestError("File type not allowed");

      return cb(error as Error);
    }
    cb(null, true);
  },
});
