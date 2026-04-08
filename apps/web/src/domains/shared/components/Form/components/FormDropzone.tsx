import { Dropzone } from "../../Dropzone";
import { useFormField } from "../context/FormFieldContext";

export const FormDropzone = () => {
  const { field } = useFormField();
  return <Dropzone id={field.name} image={field.value ?? null} field={field} />;
};
