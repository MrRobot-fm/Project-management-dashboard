export class HttpExceptionError extends Error {
  status: StatusCode;
  code: ErrorCode;
  errors?: Record<string, any>;

  constructor(
    message: string,
    status: StatusCode,
    code: ErrorCode,
    errors?: Record<string, any>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.errors = errors;
  }

  toJSON() {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      errors: this.errors ?? null
    };
  }
}

export enum StatusCode {
  NOT_FOUND = 404,
  USER_ALREADY_EXISTS = 409,
  UNAUTHORIZED = 401,
  VALIDATION_ERROR = 422,
  INTERNAL_EXCEPTION = 500,
  BAD_REQUEST = 400,
  FORBIDDEN = 403
}

export enum ErrorCode {
  NOT_FOUND = "NOT_FOUND",
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
  UNAUTHORIZED = "UNAUTHORIZED",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INTERNAL_EXCEPTION = "INTERNAL_EXCEPTION",
  BAD_REQUEST = "BAD_REQUEST",
  FORBIDDEN = "FORBIDDEN"
}
