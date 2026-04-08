import { Button } from "@workspace/ui/components/Button";

export const GoogleAuthButton = () => {
  return (
    <Button variant="outline" type="button" className="text-stone-600">
      <img
        src="/images/google-logo.svg"
        alt="Google logo"
        className="size-3.5"
      />
      Continue with Google
    </Button>
  );
};
