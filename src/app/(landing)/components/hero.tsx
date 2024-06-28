"use client";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import Badge from "./bagde";
import { Dot } from "lucide-react";
import HeroImage from "./hero_image";
export default function Hero() {
  return (
    <section className="w-full  z-10 grid place-content-center lg:p-12 pt-16 lg:w-[90%] mx-auto">
      <section className="relative">
        <div className=" hidden lg:block absolute w-60 aspect-square bg-green-400/40 blur-[120px]  right-[4%] bottom-[15%]  animate-pulse duration-1000" />
        <div className="absolute w-60 aspect-square bg-green-200/60 blur-[120px]  left-[4%] top-[15%]" />
        <section className="flex flex-col gap-8 p-2 lg:p-6 text-center w-full md::w-4/5 mx-auto">
          <Badge>
            <p className="flex">
              {" "}
              <Dot className=" text-inherit" /> 2 weeks to product launch 🎊{" "}
              <Dot className=" text-inherit" />
            </p>
          </Badge>
          <h1 className=" main-heading">
            Your <mark className=" text-secondary">all-in-one</mark> event
            organization platform.
          </h1>
          <p className=" px-2 text-neutral-700 lg:px-12 mx-auto text-lg  md:text-xl">
            Discover all the essential tools for creating memorable events,
            including ticketing, nomination filing, and voting for nominees,
            designed to be user-friendly for both organizers and attendees.
          </p>
          <div className="flex w-fit mx-auto gap-4">
            <Link
              className="w-fit px-8 py-2 bg-secondary flex items-center rounded-md text-white mx-auto gap-2 hover:gap-3 transition-all duration-300"
              href={"/dashboard"}
            >
              Get started for free
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </section>
      </section>
      <HeroImage />
    </section>
  );
}
