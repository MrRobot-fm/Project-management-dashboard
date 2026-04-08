import { requireGuest } from "@/domains/auth/api/services/require-guest";
import { SignupPageContent } from "@/domains/auth/containers/SignupPageContent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/signup")({
  component: SignupRoute,
  beforeLoad: ({ context }) => requireGuest(context.queryClient)
});

function SignupRoute() {
  return <SignupPageContent />;
}
