export interface ErrorResponse {
  message?: string;
  code?: string;
  status?: number;
  errors?: ErrorResponse;
}
