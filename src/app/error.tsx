"use client";
import React, { useEffect, useState } from "react";
import NetworkErrorIcon from "../../public/icons/network-error.svg";
import ServerErrorIcon from "../../public/icons/server-error.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error",
};

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}): JSX.Element {
  const goBack = (): void => {
    return window.history.back();
  };

  return (
    <section className="flex flex-col items-center text-center justify-center h-screen">
      <div
        className="
          w-[15rem] md:w-[25rem]
        "
      >
        <Image
          src={
            error.message === "fetch failed"
              ? NetworkErrorIcon
              : ServerErrorIcon
          }
          width={2000}
          height={2000}
          alt="Error"
          className="w-full h-full"
          priority
        />
      </div>
      <h1 className="text-3xl md:text-5xl  font-bold text-red-500 ">
        {error.message === "fetch failed"
          ? "Oops! Network Error"
          : "Internal Server Error"}
      </h1>
      <p className="text-gray-400 dark:text-gray-400 mt-2">
        {error.message === "fetch failed"
          ? "Check your internet connection and try again."
          : "Something went wrong. Please try again later."}
      </p>
      <div className="mt-3">
        <Button
          onClick={goBack}
          variant="destructive"
          className="ml-2  md:w-[20rem]"
        >
          <ArrowLeftIcon size={16} className="mr-1" />
          Go Back
        </Button>
      </div>
    </section>
  );
}
