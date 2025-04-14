import { SignupForm } from "@/components/SIgnupForm";

export default function Signup() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
