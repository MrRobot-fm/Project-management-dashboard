import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "../components/LoginForm/LoginForm";

export const LoginPageContent = () => {
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
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-muted-foreground text-sm">
                Enter your email below to login to your account
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};
