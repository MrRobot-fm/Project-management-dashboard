import { login } from "./login";
import { logoutAction } from "./logout";
import { refreshToken } from "./refresh-token";
import { registerUser } from "./register-user";
import { requireGuest } from "./require-guest";
import { requireUser } from "./require-user";
import { signup } from "./signup";

export const authServices = {
  login,
  signup,
  logoutAction,
  refreshToken,
  requireGuest,
  requireUser,
  registerUser
};
