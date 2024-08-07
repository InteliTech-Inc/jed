"use client";

import GlobeImage from "@/app/assets/globe.webp";
import { motion } from "framer-motion";
import { headingAnimationsProp } from "@/constants/framer_animations";
import Image from "next/image";
export default function Globe() {
  return (
    <div className=" grid lg:grid-cols-2 gap-4 p-4 lg:pt-6 place-items-center lg:pb-0 lg:pr-0 lg:h-screen">
      <section className="p-4">
        <motion.h3
          {...headingAnimationsProp}
          className=" text-3xl lg:text-[3rem] leading-[1.2] text-gray-900/90"
        >
          Create an event at one place,{" "}
          <mark className="text-primary/80">
            manage responses from anywhere around the world!
          </mark>
        </motion.h3>
        <motion.p
          {...headingAnimationsProp}
          className=" py-4 leading-[1.6] lg:py-8"
        >
          With JED's user-friendly interface, you can easily manage responses
          and interact with participants from all around the world after your
          event goes live. No matter where you are, you can always stay
          connected and in control.
        </motion.p>
      </section>
      <section className="w-full h-full overflow-hidden relative">
        <section className=" relative left-0 lg:absolute lg:-right-[30%]">
          <Image
            src={GlobeImage}
            alt="Globe"
            width={2000}
            height={2000}
            className=" w-full h-full"
          />
        </section>
      </section>
    </div>
  );
}
