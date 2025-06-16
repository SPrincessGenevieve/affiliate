"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CalendarFormProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  className?: string;
  required?: boolean;
  error?: boolean;
}

export function CalendarForm({
  value,
  onChange,
  className,
  required,
  error,
}: CalendarFormProps) {
  return (
    <div className="flex flex-col gap-2">
      <Popover>
        <PopoverTrigger className={className} asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full h-10 pl-3 text-left font-normal",
              !value && "text-muted-foreground",
              error && "border ring-1 ring-destructive",
              className
            )}
          >
            {value ? format(value, "PPP") : <span>Select date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            required={required}
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
