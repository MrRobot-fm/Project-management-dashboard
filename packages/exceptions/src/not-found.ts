import { ErrorCode, HttpExceptionError, StatusCode } from "./http-exception";

export class NotFoundError extends HttpExceptionError {
  constructor(message: string, errors?: Record<string, any>) {
    super(message, StatusCode.NOT_FOUND, ErrorCode.NOT_FOUND, errors);
  }
}
