import { LoginPageContent } from "@/domains/auth/containers/LoginPageContent";
import { requireGuest } from "@/domains/auth/api/services/require-guest";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/login")({
  component: LoginRoute,
  beforeLoad: ({ context }) => requireGuest(context.queryClient)
});

export default function LoginRoute() {
  return <LoginPageContent />;
}
