import { Form } from "@/features/shared/components/Form/components";

type FormField = "name" | "email" | "password" | "repeatPassword";

export const getAuthFieldConfig = (field: FormField) => {
  const config = {
    name: {
      label: "Name",
      placeholder: "Enter your name",
      component: Form.Input,
      type: "text"
    },
    email: {
      label: "Email",
      placeholder: "Enter your email",
      component: Form.Input,
      type: "email"
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
      component: Form.PasswordField,
      type: "password"
    },
    repeatPassword: {
      label: "Repeat password",
      placeholder: "Repeat password",
      component: Form.PasswordField,
      type: "password"
    }
  } as const;

  return config[field as keyof typeof config];
};
