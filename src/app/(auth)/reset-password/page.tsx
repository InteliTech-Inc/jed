import React from "react";
import ResetPasswordForm from "./components/reset_password_form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "We got you! Let's Reset your password to access you account!",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
