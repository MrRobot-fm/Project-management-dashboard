import type { ComponentProps, ReactNode } from "react";

interface FormIconProps extends Pick<ComponentProps<"button">, "onClick"> {
  children: ReactNode;
}

export const FormIcon = ({ children, onClick }: FormIconProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 right-3"
    >
      {children}
    </button>
  );
};
