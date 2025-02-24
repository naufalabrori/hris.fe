import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Optional label for the input
  error?: string; // Optional error message
}

const InputPassword: React.FC<InputPasswordProps> = ({ 
  error, 
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex flex-col gap-1">
      <div className="relative flex items-center">
        <Input
          {...props}
          type={showPassword ? "text" : "password"}
          className={`w-full ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
        />
        <button
          type="button"
          className="absolute right-2 text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default InputPassword;