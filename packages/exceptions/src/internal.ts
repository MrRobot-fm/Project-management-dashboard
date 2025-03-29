import { ErrorCode, HttpExceptionError, StatusCode } from "./http-exception";

export class InternalServerError extends HttpExceptionError {
  constructor(message: string, errors?: Record<string, any>) {
    super(
      message,
      StatusCode.INTERNAL_EXCEPTION,
      ErrorCode.INTERNAL_EXCEPTION,
      errors
    );
  }
}
