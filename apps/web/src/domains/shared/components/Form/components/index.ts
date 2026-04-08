import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator
} from "@workspace/ui/components/Field";
import { FormDropzone } from "./FormDropzone";
import { FormError } from "./FormError";
import { FormField } from "./FormField";
import { FormIcon } from "./FormIcon";
import { FormInput } from "./FormInput";
import { FormInputPassword } from "./FormInputPassword";
import { FormLabel } from "./FormLabel";
import { FormPasswordField } from "./FormPasswordField";
import { FormPasswordIcon } from "./FormPasswordIcon";
import { FormReset } from "./FormReset";
import { FormRoot } from "./FormRoot";
import { FormScrollArea } from "./FormScrollArea";
import { FormSelect } from "./FormSelect";
import { FormStickyFooter } from "./FormStickyFooter";
import { FormSubmit } from "./FormSubmit";
import { FormTextarea } from "./FormTextarea";

export const Form = {
  Root: FormRoot,
  Input: FormInput,
  Submit: FormSubmit,
  Reset: FormReset,
  Label: FormLabel,
  Field: FormField,
  InputPassword: FormInputPassword,
  PasswordField: FormPasswordField,
  Icon: FormIcon,
  PasswordIcon: FormPasswordIcon,
  Description: FieldDescription,
  Separator: FieldSeparator,
  Box: Field,
  Group: FieldGroup,
  Error: FormError,
  Select: FormSelect,
  Textarea: FormTextarea,
  Dropzone: FormDropzone,
  ScrollArea: FormScrollArea,
  StickyFooter: FormStickyFooter
};
