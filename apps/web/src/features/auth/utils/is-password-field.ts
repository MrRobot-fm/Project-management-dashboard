export function isPasswordField(
  field: string
): field is "password" | "confirmPassword" {
  return field === "password" || field === "confirmPassword";
}
