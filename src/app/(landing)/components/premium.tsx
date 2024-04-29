"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import PricingImage from "@/app/assets/pricing-dashboard.png";
import { TextBoxVariants } from "@/constants/framer_animations";
import { TextItemsVariants } from "@/constants/framer_animations";

export default function Premium() {
  return (
    <div className="lg:p-16 place-content-center">
      <section className="p-8 w-full h-full mx-auto lg:rounded-xl bg-primary grid lg:grid-cols-2 gap-4">
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
            Flexible pricing system specifically tailored for customers.
          </motion.h3>
          <motion.p variants={TextItemsVariants} className=" py-4 lg:py-8">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae
            minus nihil aliquam.
          </motion.p>
          <motion.button
            variants={TextItemsVariants}
            className="bg-secondary flex items-center rounded-md py-2 text-slate-50 hover:bg-secondary/90 px-12 gap-2 hover:gap-4 duration-300 "
          >
            See Pricing <ArrowRightIcon size={16} />
          </motion.button>
        </motion.div>
        <div className=" rounded-lg overflow-hidden">
          <Image
            src={PricingImage}
            alt="Pricing dashboard"
            width={2000}
            height={2000}
          />
        </div>
      </section>
    </div>
  );
}
