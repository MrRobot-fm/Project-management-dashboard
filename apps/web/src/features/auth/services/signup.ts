import { login } from "./login";
import { registerUser } from "./register-user";

export async function signup(values: {
  name: string;
  email: string;
  password: string;
}) {
  await registerUser(values);

  return await login({
    email: values.email,
    password: values.password
  });
}
