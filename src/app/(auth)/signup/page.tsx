import React from "react";
import SignupForm from "./components/signup_form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account to access have a dashboard",
};

export default function SignUpPage() {
  return <SignupForm />;
}
