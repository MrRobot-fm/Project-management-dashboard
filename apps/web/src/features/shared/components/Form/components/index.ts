import { FormRoot } from "./FormRoot";
import { FormInput } from "./FormInput";
import { FormSubmit } from "./FormSubmit";
import { FormReset } from "./FormReset";
import { FormLabel } from "./FormLabel";
import { FormField } from "./FormField";
import { FormInputPassword } from "./FormInputPassword";
import { FormPasswordField } from "./FormPasswordField";
import { FormIcon } from "./FormIcon";
import { FormPasswordIcon } from "./FormPasswordIcon";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator
} from "@workspace/ui/components/Field";
import { FormError } from "./FormError";

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
  Error: FormError
};
