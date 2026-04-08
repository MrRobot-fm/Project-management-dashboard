import { useLogin } from "@/domains/auth/hooks/use-login";
import { getAuthFieldConfig } from "@/domains/auth/utils/get-auth-field-config";
import { Form } from "@/domains/shared/components/Form/components";
import { FormProvider } from "@/domains/shared/components/Form/context/FormProvider";
import { Link } from "@tanstack/react-router";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator
} from "@workspace/ui/components/Field";
import { GoogleAuthButton } from "../GoogleAuthButton/GoogleAuthButton";
import { LoginUserSchema } from "@workspace/schemas";
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
    <FormProvider initialValues={initialValues} schema={LoginUserSchema}>
      <Form.Root onSubmit={onSubmit}>
        <FieldGroup>
          {values.map(field => {
            const {
              type,
              label,
              placeholder,
              component: InputComponent
            } = getAuthFieldConfig(field);

            return (
              <Form.Field key={field} name={field}>
                <Form.Label>{label}</Form.Label>
                <InputComponent placeholder={placeholder} type={type} />
                <Form.Error />
              </Form.Field>
            );
          })}
          <Form.Submit disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Form.Submit>
          <FieldSeparator className="my-2">Or continue with</FieldSeparator>
          <Field>
            <GoogleAuthButton />
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
