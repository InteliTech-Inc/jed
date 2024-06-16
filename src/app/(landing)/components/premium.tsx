"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import PricingImage from "@/app/assets/pricing-dashboard.png";
import { TextBoxVariants } from "@/constants/framer_animations";
import { TextItemsVariants } from "@/constants/framer_animations";
import Link from "next/link";

export default function Premium() {
  return (
    <div className="lg:p-16 place-content-center">
      <section className="p-8 w-full h-3/5 mx-auto lg:rounded-xl bg-primary grid lg:grid-cols-2 gap-4">
        <motion.div
          className="text-white p-2 lg:p-6"
          variants={TextBoxVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.h3
            variants={TextItemsVariants}
            className=" text-2xl lg:text-[3rem] lg:leading-[1.3]"
          >
            JED is one of the fastest growing and most rapidly evolving
            disciplines and
          </motion.h3>
          {/* <motion.p variants={TextItemsVariants} className=" py-4 lg:py-8">
            JED is one of the fastest growing and most rapidly evolving
            disciplines and one which stands at the forefront of modern
            technology.
          </motion.p> */}
        </motion.div>
        <div className=" rounded-lg max-h-96  overflow-hidden">
          <Image
            src={PricingImage}
            alt="Pricing dashboard"
            width={1000}
            height={1000}
          />
        </div>
      </section>
    </div>
  );
}
