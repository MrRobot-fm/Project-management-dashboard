"use client";

import { type ComponentProps, useState } from "react";
import { Button } from "@workspace/ui/components/Button";
import { Calendar } from "@workspace/ui/components/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/Popover";
import { cn } from "@workspace/ui/lib/utils";
import { ChevronDownIcon, type LucideIcon } from "lucide-react";

interface DatePickerProps {
  icon?: LucideIcon;
  date?: Date | undefined;
  onDateChange?: (date: Date | undefined) => void;
  triggerProps?: Pick<ComponentProps<typeof Button>, "className" | "disabled">;
}

export const DatePicker = ({ icon, date, onDateChange, triggerProps }: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

  const Icon = icon ? icon : ChevronDownIcon;

  return (
    <div className="flex flex-col gap-3">
      <Popover modal={true} open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={cn(
              "gap-4 justify-between font-normal text-xs h-fit border-0 shadow-none !px-0 hover:bg-white cursor-pointer",
              triggerProps?.className,
            )}
            disabled={triggerProps?.disabled}
          >
            {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
            <Icon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={(date) => {
              setSelectedDate(date);
              onDateChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
