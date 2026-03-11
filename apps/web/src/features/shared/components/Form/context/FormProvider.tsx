import { zodResolver } from "@hookform/resolvers/zod";
import { type ReactNode } from "react";
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
}

export const FormProvider = <T extends FieldValues>({
  initialValues,
  schema,
  children
}: FormProviderProps<T>) => {
  const methods = useForm<T>({
    defaultValues: initialValues as DefaultValues<T>,
    resolver: schema ? zodResolver(schema) : undefined
  });

  return <RHFProvider {...methods}>{children}</RHFProvider>;
};
