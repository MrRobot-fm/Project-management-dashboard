import { useSignup } from "@/features/auth/hooks/use-signup";
import { getAuthFieldConfig } from "@/features/auth/utils/get-auth-field-config";
import { Form } from "@/features/shared/components/Form/components";
import { FormProvider } from "@/features/shared/components/Form/context/FormProvider";
import { Link } from "@tanstack/react-router";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { isPasswordField } from "@/features/auth/utils/is-password-field";

export const SignupForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  } as const;

  const values = Object.keys(initialValues) as (keyof typeof initialValues)[];

  const { mutate, isPending } = useSignup();

  const onSubmit = (values: typeof initialValues) => {
    mutate(values);
  };

  return (
    <FormProvider initialValues={initialValues}>
      <Form.Root onSubmit={onSubmit}>
        <Form.Group>
          {values.map(field => {
            const { label, placeholder, type } = getAuthFieldConfig(field);

            const PasswordComponent = isPasswordField(field)
              ? Form.PasswordFiled
              : Form.Input;

            return (
              <Form.Field key={field} name={field}>
                <Form.Label>{label}</Form.Label>
                <PasswordComponent placeholder={placeholder} type={type} />
              </Form.Field>
            );
          })}
          <Form.Submit disabled={isPending}>
            {isPending ? "Registering..." : "Register"}
          </Form.Submit>
          <Form.Separator>Or continue with</Form.Separator>
          <Form.Box>
            <GoogleAuthButton />
            <Form.Description className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </Form.Description>
          </Form.Box>
        </Form.Group>
      </Form.Root>
    </FormProvider>
  );
};
