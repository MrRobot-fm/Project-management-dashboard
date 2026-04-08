import { useFormContext as useRHFContext } from "react-hook-form";
import { useFormField } from "../context/FormFieldContext";

export const FormError = () => {
  const { field } = useFormField();

  const {
    formState: { errors }
  } = useRHFContext();

  return (
    <span className="text-red-400 text-xs h-3">
      {errors[field.name]?.message as string}
    </span>
  );
};
