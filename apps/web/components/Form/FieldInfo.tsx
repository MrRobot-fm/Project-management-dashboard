import type { AnyFieldApi } from "@tanstack/react-form";

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  const hasError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0;

  const errorMessage = field.state.meta.errors
    .map((err) => err.message)
    .join(",");

  return (
    <div
      className="text-[11px] h-3.5 text-red-500 transition-all"
      aria-live="polite"
    >
      {hasError ? <span>{errorMessage}</span> : null}
    </div>
  );
}
