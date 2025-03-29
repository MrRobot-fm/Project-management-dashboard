/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@workspace/db";
import {
  ConflictError,
  HttpExceptionError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "@workspace/exceptions";
import { ZodError } from "zod";

export const errorMiddleware = (
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  console.log(error);

  if (error instanceof HttpExceptionError) {
    res.status(error.status).json(error.toJSON());
    return;
  }

  if (error instanceof ZodError) {
    const validationException = new ValidationError(
      "Validation Error",
      error.errors,
    );
    res.status(validationException.status).json(validationException.toJSON());
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      const notFoundError = new NotFoundError("Not found error", error.meta);

      res.status(notFoundError.status).json(notFoundError.toJSON());
      return;
    }

    if (error.code === "P2002") {
      const message = error.meta
        ? `${error.meta.modelName} ${
            (error.meta?.target as string[])[0]
          } already exist.`
        : "Unique constraints violation";

      const conflictError = new ConflictError(message, error.meta);

      res.status(conflictError.status).json(conflictError.toJSON());
      return;
    }
  }

  const internalException = new InternalServerError(
    "Unexpected error occurred",
    error,
  );

  res.status(internalException.status).json(internalException.toJSON());
};
