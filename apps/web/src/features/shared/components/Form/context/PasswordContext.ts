import { createContext, use } from "react";

interface PasswordContextInterface {
  toggle: () => void;
  visible: boolean;
}

export const PasswordContext = createContext<PasswordContextInterface | null>(
  null
);

export const useFormPassword = () => {
  const context = use(PasswordContext);

  if (!context) {
    throw new Error("useFormPassword must be used inside PasswordProvider");
  }

  return context;
};
