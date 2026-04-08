import { SignupForm } from "@/domains/auth/components/SignupForm/SignupForm";
import { GalleryVerticalEnd } from "lucide-react";

export const SignupPageContent = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-1">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="#"
            className="flex items-center gap-2 font-medium text-stone-600"
          >
            <div className="bg-teal-600/80 text-primary-foreground flex size-6 items-center justify-center rounded-sm">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Vionex Flow
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm flex flex-col gap-6">
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Create your account</h1>
              <p className="text-muted-foreground text-sm">
                Fill in the form below to create your account
              </p>
            </div>
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};
