import { LoginPageContent } from "@/features/auth/containers/LoginPageContent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/login")({
  component: LoginRoute
});

export default function LoginRoute() {
  return <LoginPageContent />;
}
