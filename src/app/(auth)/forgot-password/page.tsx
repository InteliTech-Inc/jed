import React from "react";
import ForgotPasswordForm from "./components/forgot_password_form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot your password? No worries, we got you!",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
