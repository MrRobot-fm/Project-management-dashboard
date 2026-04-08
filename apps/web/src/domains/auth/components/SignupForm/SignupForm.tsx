import { useSignup } from "@/domains/auth/hooks/use-signup";
import { getAuthFieldConfig } from "@/domains/auth/utils/get-auth-field-config";
import { Form } from "@/domains/shared/components/Form/components";
import { FormProvider } from "@/domains/shared/components/Form/context/FormProvider";
import { Link } from "@tanstack/react-router";
import { GoogleAuthButton } from "../GoogleAuthButton/GoogleAuthButton";
import { RegisterUserSchemaWithRepeatPassword } from "@workspace/schemas";

export const SignupForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    repeatPassword: ""
  } as const;

  const values = Object.keys(initialValues) as (keyof typeof initialValues)[];

  const { mutate, isPending } = useSignup();

  const onSubmit = (values: typeof initialValues) => {
    mutate(values);
  };

  return (
    <FormProvider
      initialValues={initialValues}
      schema={RegisterUserSchemaWithRepeatPassword}
    >
      <Form.Root onSubmit={onSubmit}>
        <Form.Group>
          {values.map(field => {
            const {
              label,
              placeholder,
              type,
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
            {isPending ? "Registering..." : "Register"}
          </Form.Submit>
          <Form.Separator className="my-2">Or continue with</Form.Separator>
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
