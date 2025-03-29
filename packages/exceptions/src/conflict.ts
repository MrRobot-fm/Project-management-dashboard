import { ErrorCode, HttpExceptionError, StatusCode } from "./http-exception";

export class ConflictError extends HttpExceptionError {
  constructor(message: string, errors?: Record<string, any>) {
    super(
      message,
      StatusCode.USER_ALREADY_EXISTS,
      ErrorCode.USER_ALREADY_EXISTS,
      errors
    );
  }
}
