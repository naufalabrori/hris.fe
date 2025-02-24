import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  disable?: boolean;
}

const SearchInputField: React.FC<SearchInputFieldProps> = ({ error, disable, ...props }) => {
  return (
    <div className="relative flex items-center w-full">
      <div className="absolute left-3 text-gray-500">
        <Search size={18} />
      </div>
      <Input
        {...props}
        className={`pl-10 w-full ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-blue-500"
        } ${disable ? "cursor-not-allowed bg-gray-200" : ""}`}
      />
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default SearchInputField;