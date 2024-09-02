import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Check } from "lucide-react";
import Link from "next/link";

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
        className={`mr-2 w-4 h-4 flex items-center border border-gray-300 rounded ${
          showPassword ? "bg-secondary" : "bg-white"
        }`}
      >
        {showPassword && <Check className="font-bold text-white" />}
      </span>
      <span className=" my-2 text-sm text-gray-600 font-normal">
        I agree to JED's{" "}
        <Link href={"/resources/terms"} className=" underline">
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link href={"/resources/privacy-policy"} className=" underline">
          Privacy Policy
        </Link>{" "}
      </span>
    </Label>
  );
}
