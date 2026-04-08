import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext, type ReactNode } from "react";
import {
  FormProvider as RHFProvider,
  useForm,
  type DefaultValues,
  type FieldValues
} from "react-hook-form";
import type { ZodTypeAny } from "zod";

interface FormProviderProps<T extends FieldValues> {
  initialValues: T;
  children: ReactNode;
  schema?: ZodTypeAny;
  variant?: "default" | "minimal";
}

export const FormProvider = <T extends FieldValues>({
  initialValues,
  schema,
  variant = "default",
  children
}: FormProviderProps<T>) => {
  const methods = useForm<T>({
    defaultValues: initialValues as DefaultValues<T>,
    resolver: schema ? zodResolver(schema) : undefined
  });

  return (
    <FormContext.Provider value={{ variant }}>
      <RHFProvider {...methods}>{children}</RHFProvider>
    </FormContext.Provider>
  );
};

interface FormContextValue {
  variant?: "default" | "minimal";
}

export const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("Context must be used between Form context provider");
  }

  return context;
};
