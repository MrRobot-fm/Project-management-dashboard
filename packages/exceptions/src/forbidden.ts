import { ErrorCode, HttpExceptionError, StatusCode } from "./http-exception";

export class ForbiddenError extends HttpExceptionError {
  constructor(message: string, errors?: Record<string, any>) {
    super(message, StatusCode.FORBIDDEN, ErrorCode.FORBIDDEN, errors);
  }
}
