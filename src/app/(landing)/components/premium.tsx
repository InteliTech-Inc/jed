"use client";

import { motion } from "framer-motion";
import { TextBoxVariants } from "@/constants/framer_animations";
import { TextItemsVariants } from "@/constants/framer_animations";
import { FlipWord } from "./flip-words";
import { CardsStack } from "./cards-stack";

export default function Premium() {
  return (
    <div className="lg:p-16 place-content-center !overflow-x-hidden">
      <section className="p-2 w-full h-3/5 mx-auto lg:rounded-xl bg-primary grid lg:grid-cols-2 gap-4">
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
            <FlipWord />
          </motion.h3>
        </motion.div>
        <div className=" rounded-lg max-h-96  overflow-hidden">
          <CardsStack />
        </div>
      </section>
    </div>
  );
}
