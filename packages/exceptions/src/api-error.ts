import { ErrorCode, HttpExceptionError, StatusCode } from "./http-exception";

export class ApiError extends HttpExceptionError {
  constructor(
    message: string,
    status: StatusCode,
    code: ErrorCode,
    errors?: Record<string, any>
  ) {
    super(message, status, code, errors);
  }
}
