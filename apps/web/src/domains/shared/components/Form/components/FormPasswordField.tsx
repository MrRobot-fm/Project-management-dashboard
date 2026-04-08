import { useState, type ComponentProps } from "react";
import { Form } from ".";
import { PasswordContext } from "../context/PasswordContext";

export const FormPasswordField = (props: ComponentProps<"input">) => {
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible(prev => !prev);

  return (
    <PasswordContext value={{ visible, toggle }}>
      <div className="relative w-full">
        <Form.InputPassword {...props} />
        <Form.PasswordIcon />
      </div>
    </PasswordContext>
  );
};
