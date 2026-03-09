import { createContext, useContext } from "react";

interface FormContextType<T extends Record<string, unknown>> {
  state: {
    values: T;
  };
  actions: {
    reset: () => void;
  };
}

export const FormContext = createContext<FormContextType<
  Record<string, unknown>
> | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }

  return context;
};
