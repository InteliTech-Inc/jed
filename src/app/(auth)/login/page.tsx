import React from "react";
import LoginForm from "./components/login_form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account to access your dashboard",
};

export default function LoginPage() {
  return <LoginForm />;
}
