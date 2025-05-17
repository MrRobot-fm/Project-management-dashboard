import type { ErrorResponse } from "@/types/error";
import { ApiError } from "@workspace/exceptions";

export const errorData = (error: unknown): { success: false; error: ErrorResponse } => {
  if (error instanceof ApiError) {
    return {
      success: false,
      error: {
        message: error.message,
        code: error.code,
        status: error.status,
        errors: error.errors || {},
      },
    };
  }

  return {
    success: false,
    error: {
      message: "Errore imprevisto. Riprova più tardi.",
      code: "UNKNOWN_ERROR",
      status: 500,
      errors: {},
    },
  };
};
