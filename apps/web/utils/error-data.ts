import type { ErrorResponse } from "./fetch-instance";

export const errorData = (error: ErrorResponse) => {
  return {
    success: false,
    status: error.status,
    error: {
      message: error.message,
      code: error.code,
      status: error.status,
      errors: error.errors || {},
    },
  };
};
