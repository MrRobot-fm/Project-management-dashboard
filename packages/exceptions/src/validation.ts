import { ErrorCode, HttpExceptionError, StatusCode } from "./http-exception";

export class ValidationError extends HttpExceptionError {
  constructor(message: string, errors?: Record<string, any>) {
    super(
      message,
      StatusCode.VALIDATION_ERROR,
      ErrorCode.VALIDATION_ERROR,
      errors
    );
  }
}
