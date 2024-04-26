"use client";

import { db } from "@/lib/supabase";
import { FormEvent, useState } from "react";
import { redirect } from "next/navigation";

async function login({
  email,
  password,
}: Record<"email" | "password", string>) {
  try {
    const { data, error } = await db.auth.signInWithPassword({
      email,
      password,
    });

    if (data) redirect("/waitlist");

    if (error) throw new Error(error.message);
  } catch (error) {
    console.log(error);
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { email, password };
    await login(payload);
  };
  return (
    <div className=" border p-4 rounded-sm w-fit  translate-y-1/2 translate-x-1/2">
      <h1 className=" text-3xl py-4">Login Forms</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="border px-4 py-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="border px-4 py-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="w-full py-2 bg-purple-800 text-white" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
