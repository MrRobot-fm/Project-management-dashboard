type FormField = "name" | "email" | "password" | "confirmPassword";

export const getAuthFieldConfig = (field: FormField) => {
  switch (field) {
    case "name":
      return {
        label: "Fullname",
        placeholder: "Enter your fullname...",
        type: "text"
      };
    case "email":
      return {
        label: "Email",
        placeholder: "Enter your email address...",
        type: "text"
      };
    case "password":
      return {
        label: "Password",
        placeholder: "Enter your password...",
        type: "password"
      };
    case "confirmPassword":
      return {
        label: "Confirm Password",
        placeholder: "Confirm your password...",
        type: "password"
      };
    default:
      return {
        label: "",
        placeholder: "",
        type: "text"
      };
  }
};
