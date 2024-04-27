import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Check } from "lucide-react";

interface CheckBoxProps {
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

export default function Checkbox_Show_Password({
  showPassword,
  setShowPassword,
}: CheckBoxProps) {
  return (
    <Label htmlFor="show-password" className="flex items-center">
      <Input
        id="show-password"
        type="checkbox"
        className="hidden"
        onChange={() => setShowPassword(!showPassword)}
      />
      <span
        className={`mr-2 w-5 h-5 flex items-center border border-gray-300 rounded ${
          showPassword ? "bg-green-500" : "bg-white"
        }`}
      >
        {showPassword && <Check className="font-bold text-white" />}
      </span>
      <span>Show password</span>
    </Label>
  );
}
