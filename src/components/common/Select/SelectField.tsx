/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

interface CustomSelectProps {
  value: any;
  onChange: (value: any) => void;
  options: { value: any; label: string }[];
  placeholder?: string;
  error?: string;
}

const SelectField = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
}: CustomSelectProps) => {
  return (
    <div className="flex flex-col">
      <Select value={value} onValueChange={(val) => onChange(val)}>
        <SelectTrigger
          className={`w-full ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SelectField;