import { SignupPageContent } from "@/features/auth/containers/SignupPageContent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/signup")({
  component: SignupRoute
});

function SignupRoute() {
  return <SignupPageContent />;
}
