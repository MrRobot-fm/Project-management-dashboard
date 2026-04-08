import type { ErrorResponse } from "@/domains/shared/types/error";
import { ApiError } from "@workspace/exceptions";

export function errorData(error: unknown): {
  success: false;
  error: ErrorResponse;
} {
  if (error instanceof ApiError) {
    return {
      success: false,
      error: {
        message: error.message,
        code: error.code,
        status: error.status,
        errors: error.errors || {}
      }
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: {
        message: error.message,
        code: error.name,
        status: 500,
        errors: {}
      }
    };
  }

  return {
    success: false,
    error: {
      message: "Errore imprevisto. Riprova più tardi.",
      code: "UNKNOWN_ERROR",
      status: 500,
      errors: {}
    }
  };
}
