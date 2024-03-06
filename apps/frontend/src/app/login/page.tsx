"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { validateEmailObject } from "@repo/validations";

export default function LoginForms(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitForm(e: FormEvent): void {
    e.preventDefault();
    const payload = { email, password };
    const validatedObj = validateEmailObject(payload);
    // eslint-disable-next-line no-console -- chale chale
    console.log(validatedObj);
  }
  return (
    <form
      onSubmit={(e) => {
        submitForm(e);
      }}
    >
      <label htmlFor="email">Email</label>
      <input
        className="border"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="email"
        value={email}
      />
      <label htmlFor="password">Password</label>
      <input
        className="border"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        value={password}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
