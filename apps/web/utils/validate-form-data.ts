import type { ZodSchema } from "zod";

export const validateFormData = ({
  schema,
  formData,
}: {
  schema: ZodSchema;
  formData: FormData;
}) => {
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  return { success: true, data: parsed.data };
};
