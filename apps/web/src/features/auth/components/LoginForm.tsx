import { useLogin } from "@/features/auth/hooks/use-login";
import { Form } from "@/features/shared/components/Form/components";
import { FormProvider } from "@/features/shared/components/Form/context/FormProvider";
import { Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/Button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator
} from "@workspace/ui/components/Field";
import { getAuthFieldConfig } from "@/features/auth/utils/get-auth-field-config";
import { isPasswordField } from "@/features/auth/utils/is-password-field";

export const LoginForm = () => {
  const initialValues = {
    email: "",
    password: ""
  };

  const values = Object.keys(initialValues) as (keyof typeof initialValues)[];

  const { mutate, isPending } = useLogin();

  const onSubmit = (values: typeof initialValues) => {
    mutate(values);
  };

  return (
    <FormProvider initialValues={initialValues}>
      <Form.Root onSubmit={onSubmit}>
        <FieldGroup>
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
            {isPending ? "Logging in..." : "Login"}
          </Form.Submit>
          <FieldSeparator>Or continue with</FieldSeparator>
          <Field>
            <Button variant="outline" type="button" className="text-stone-600">
              <img
                src="/images/google-logo.svg"
                alt="Google logo"
                className="size-3.5"
              />
              Continue with Google
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </Form.Root>
    </FormProvider>
  );
};
