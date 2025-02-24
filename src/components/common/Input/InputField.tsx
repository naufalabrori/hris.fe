import React from "react";
import { Input } from "@/components/ui/input";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  disable?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ error, disable, ...props }) => {
  return (
    <div className="relative flex flex-col gap-1">
      <Input
        {...props}
        className={`w-full ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-blue-500"
        } ${disable ? "cursor-not-allowed bg-gray-200" : ""}`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default InputField;