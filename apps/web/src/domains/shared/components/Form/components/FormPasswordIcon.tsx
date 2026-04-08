import { Eye, EyeOff } from "lucide-react";
import { Form } from ".";
import { useFormPassword } from "../context/PasswordContext";

export const FormPasswordIcon = () => {
  const { visible, toggle } = useFormPassword();

  return (
    <Form.Icon onClick={toggle}>
      {visible ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
    </Form.Icon>
  );
};
