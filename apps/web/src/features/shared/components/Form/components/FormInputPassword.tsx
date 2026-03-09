import type { ComponentProps } from "react";
import { Form } from ".";
import { useFormPassword } from "../context/PasswordContext";

type FormInputPasswordProps = Omit<
  ComponentProps<"input">,
  "name" | "type" | "onChange"
>;

export function FormInputPassword({ ...props }: FormInputPasswordProps) {
  const { visible } = useFormPassword();

  return <Form.Input type={visible ? "text" : "password"} {...props} />;
}
