"use client";

import { useEffect } from "react";
import { Button } from "@workspace/ui/components/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-2xl">Something went wrong!</h2>
        <p className="text-xs mb-4">{error.message}</p>
        <Button size="sm" className="w-fit" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
