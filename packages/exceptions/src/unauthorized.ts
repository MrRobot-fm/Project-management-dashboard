import { ErrorCode, HttpExceptionError, StatusCode } from "./http-exception";

export class UnauthorizedError extends HttpExceptionError {
  constructor(message: string, errors?: Record<string, any>) {
    super(message, StatusCode.UNAUTHORIZED, ErrorCode.UNAUTHORIZED, errors);
  }
}
