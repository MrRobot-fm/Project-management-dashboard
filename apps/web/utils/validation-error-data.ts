import type { typeToFlattenedError } from "zod";

export const validationErrorData = <T>(validationErrors: typeToFlattenedError<T> | undefined) => {
  return {
    success: false,
    zodErrors: validationErrors,
  };
};
