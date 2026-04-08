import { Input } from "@workspace/ui/components/Input";
import { Search } from "lucide-react";

interface WorkspaceSearchControlsProps<TValue extends string> {
  value: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  options: Array<{
    label: string;
    value: TValue;
  }>;
  selectedValue: TValue;
  onOptionChange: (value: TValue) => void;
}

export const WorkspaceSearchControls = <TValue extends string>({
  value,
  placeholder,
  onValueChange,
  options,
  selectedValue,
  onOptionChange,
}: WorkspaceSearchControlsProps<TValue>) => (
  <div className="mb-6 flex flex-col gap-3 bg-white pb-4 md:flex-row md:items-center md:justify-between">
    <label className="relative block w-full md:max-w-sm">
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400"
        aria-hidden="true"
      />
      <Input
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder={placeholder}
        className="pl-9"
      />
    </label>

    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onOptionChange(option.value)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            selectedValue === option.value
              ? "border-neutral-900 bg-neutral-900 text-white"
              : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);
