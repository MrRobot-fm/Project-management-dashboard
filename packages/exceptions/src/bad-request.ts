import { ErrorCode, HttpExceptionError, StatusCode } from "./http-exception";

export class BadRequestError extends HttpExceptionError {
  constructor(message: string, errors?: Record<string, any>) {
    super(message, StatusCode.BAD_REQUEST, ErrorCode.BAD_REQUEST, errors);
  }
}
