"use client";

import Nomination from "@/app/assets/nomination.svg";
import Voting from "@/app/assets/voting.svg";
import Ticketing from "@/app/assets/ticketing.svg";

import Image from "next/image";
import { motion } from "framer-motion";
import { headingAnimationsProp } from "@/constants/framer_animations";

const Products = [
  {
    name: "Nominations",
    img_url: Nomination,
    description:
      "Manage nominations with our user-friendly platform, simplifying submissions and voting processes for a smooth experience.",
  },
  {
    name: "Ticketing",
    img_url: Ticketing,
    description:
      "Our platform makes it easy for organizers and attendees to manage ticket purchases and registrations hassle-free.",
  },
  {
    name: "Voting",
    img_url: Voting,
    description:
      "Simplify your voting processes with our platform, ensuring a smooth experience for all participants as they cast their votes effortlessly.",
  },
];

export default function Product() {
  return (
    <div className=" py-16 grid place-content-center !overflow-x-hidden">
      <section className="p-4 w-full text-center">
        <motion.h1 {...headingAnimationsProp} className=" main-heading py-8">
          What we <mark className=" text-secondary">offer</mark>
        </motion.h1>
        <motion.p
          {...headingAnimationsProp}
          className=" text-lg lg:text-2xl  leading-[1.4] w-full lg:w-3/5 mx-auto"
        >
          Seamless online events organization and management{" "}
          <mark className=" text-primary/80">
            platforms purposely built for you!
          </mark>
        </motion.p>
      </section>
      <section className=" grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-8 py-12">
        {Products.map(({ name, img_url, description }) => {
          return (
            <div
              key={name}
              className=" border rounded-3xl p-4 overflow-hidden bg-neutral-50"
            >
              <Image
                src={img_url}
                width={1000}
                height={1000}
                alt="Product"
                className="card-image"
              />
              <h3 className=" text-2xl font-semibold text-secondary py-2">
                {name}
              </h3>
              <p className="py-2">{description}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
