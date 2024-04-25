import Link from "next/link";
import React from "react";
import WaitListForm from "./components/wait-list-form";
import AnimatedText from "./components/AnimatedText";

export default function WaitList(): JSX.Element {
  return (
    <main className="flex items-center justify-center min-h-screen bg-white px-5 ">
      <div className="w-[40rem] flex flex-col justify-center items-center gap-y-4 z-10">
        <p className=" font-normal text-center text-md tracking-wide mb-4">
          🚀 Experience the Future of Voting & Ticketing with Us!
        </p>
        <AnimatedText />
        <p className="text-center font-normal text-md mt-3">
          Be among the first to experience the next evolution in online voting
          and ticketing systems. By signing up, you&apos;ll secure exclusive
          early access to the JED Platforms, revolutionizing how you manage
          voting and ticketing processes online.
        </p>
        <WaitListForm />
        <div>
          <p className=" text-center text-md mt-3">
            Have questions about JED Platforms?
          </p>
          <p className=" text-center text-md mt-2">
            Drop us a message here{" "}
            <Link
              className="text-center text-md text-secondary underline hover:transistion-all hover:duration-300 ease-in-out"
              href="mailto:info.jedvotes@gmail.com"
              target="_blank"
            >
              Support Team
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
