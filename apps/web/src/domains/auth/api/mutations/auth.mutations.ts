import {
  mutationOptions,
  type UseMutationOptions
} from "@tanstack/react-query";
import type { ApiError } from "@workspace/exceptions";
import { authServices } from "@/domains/auth/api/services";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: { id: number; name: string };
  token?: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface LogoutResponse {
  message: string;
  success: boolean;
}

export const authMutations = {
  login: (
    options?: Partial<UseMutationOptions<LoginResponse, ApiError, LoginPayload>>
  ) => {
    return mutationOptions({
      mutationFn: authServices.login,
      ...options
    });
  },
  signup: (
    options?: Partial<
      UseMutationOptions<LoginResponse, ApiError, SignupPayload>
    >
  ) => {
    return mutationOptions({
      mutationFn: authServices.signup,
      ...options
    });
  },
  logout: (
    options?: Partial<UseMutationOptions<LogoutResponse, ApiError, void>>
  ) => {
    return mutationOptions({
      mutationFn: authServices.logoutAction,
      ...options
    });
  }
};
