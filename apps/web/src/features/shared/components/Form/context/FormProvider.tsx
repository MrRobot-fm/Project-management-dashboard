import { type ReactNode } from "react";
import {
  useForm,
  FormProvider as RHFProvider,
  type DefaultValues,
  type FieldValues
} from "react-hook-form";
import { FormContext } from "./use-form-context";

interface FormProviderProps<T extends FieldValues> {
  initialValues: T;
  children: ReactNode;
}

export const FormProvider = <T extends FieldValues>({
  initialValues,
  children
}: FormProviderProps<T>) => {
  const methods = useForm<T>({
    defaultValues: initialValues as DefaultValues<T>
  });

  const reset = () => methods.reset(initialValues);

  return (
    <RHFProvider {...methods}>
      <FormContext
        value={{
          state: { values: methods.watch() },
          actions: { reset }
        }}
      >
        {children}
      </FormContext>
    </RHFProvider>
  );
};
