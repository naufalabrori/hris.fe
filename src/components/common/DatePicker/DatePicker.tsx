import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  formatDate?: string;
  error?: string;
};

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Select Date",
  formatDate = "dd MMMM yyyy",
  error,
}) => {
  return (
    <div className="relative flex flex-col gap-1">
      <Popover modal={true}>
        <PopoverTrigger
          asChild
          className={`w-full ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus-visible:ring-[#D84D26] transition-all duration-100 ease-in-out ${
            error ? "focus:ring-red-500" : "focus:ring-[#F44E20]"
          }`}
        >
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, formatDate) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => onChange(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default DatePicker;