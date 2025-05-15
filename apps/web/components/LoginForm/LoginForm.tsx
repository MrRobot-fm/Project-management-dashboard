"use client";

import { type ComponentProps, useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@workspace/ui/components/Button";
import { Card, CardContent } from "@workspace/ui/components/Card";
import { Input } from "@workspace/ui/components/Input";
import { Label } from "@workspace/ui/components/Label";
import { cn } from "@workspace/ui/lib/utils";
import { FieldInfo } from "../Form/FieldInfo";
import { useForm } from "@tanstack/react-form";
import { LoginUserSchema } from "@workspace/schemas";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps extends ComponentProps<"div"> {
  className?: string;
}

export const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LoginUserSchema,
      onMount: LoginUserSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(value),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }

      if (response.redirected) {
        redirect(response.url);
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="p-6 md:p-8"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">Login to your Fede Inc account</p>
              </div>
              <div className="flex flex-col gap-2">
                <form.Field name="email">
                  {(field) => (
                    <div className="grid gap-1 relative">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor={field.name}>Email</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                      <FieldInfo field={field} />
                    </div>
                  )}
                </form.Field>
                <form.Field name="password">
                  {(field) => (
                    <div className="grid gap-1 relative">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor={field.name}>Password</Label>
                        <div className="relative">
                          <Input
                            id={field.name}
                            name={field.name}
                            type={showPassword ? "text" : "password"}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="pr-10"
                          />
                          {field.state.value.length > 0 && (
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="size-fit absolute top-2.5 right-3 cursor-pointer"
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              {showPassword ? <EyeOff /> : <Eye />}
                            </Button>
                          )}
                        </div>
                      </div>
                      <FieldInfo field={field} />
                    </div>
                  )}
                </form.Field>
                <div className="flex flex-col gap-1">
                  <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                    {([canSubmit, isSubmitting]) => (
                      <Button type="submit" disabled={!canSubmit} className="w-full">
                        {isSubmitting ? "Logging in..." : "Login"}
                      </Button>
                    )}
                  </form.Subscribe>
                  <div className="h-3">
                    <p className="text-rose-500 text-[11px]">{error}</p>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="underline underline-offset-4">
                      Signup
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
