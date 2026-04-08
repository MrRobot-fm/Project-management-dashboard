import { createContext, useContext } from "react";

interface FormScrollAreaContextValue {
  isScrollable: boolean;
}

export const FormScrollAreaContext =
  createContext<FormScrollAreaContextValue | null>(null);

export const useFormScrollArea = () => {
  const context = useContext(FormScrollAreaContext);

  if (!context) {
    return { isScrollable: false };
  }

  return context;
};
