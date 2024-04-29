import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_QUESTIONS = [
  {
    id: "item 1",
    question: "Can I host any event on this platform?",
    answer:
      "Yes, you can host any event here wai, based on their expertise or familiarity with your work.",
  },
  {
    id: "item 2",
    question: "How are nominations done?",
    answer:
      "Lorem ipsum dolor sit amet and con laoreet et justo sit am vel met null a ante et justo sit amet et justo sit amet et justo sit amet",
  },
  {
    id: "item 3",
    question: "Is Evans Elabo an L7 dev or L9?",
    answer:
      "Lorem ipsum dolor sit amet and con laoreet et justo sit am vel met null a ante et justo sit amet et justo sit amet et justo sit amet",
  },
  {
    id: "item 4",
    question: "Does Topboy have access to the national cake?",
    answer: "I'm sure he does, cos that guy dey hold forkn 🫡",
  },
  {
    id: "item 5",
    question: "Is JRO a scammer?",
    answer:
      "Lorem ipsum dolor sit amet and con laoreet et justo sit am vel met null a ante et justo sit amet et justo sit amet et justo sit amet",
  },
  {
    id: "item 6",
    question: " Is there a fee for using this platform?",
    answer: "Yes, the platform has per-event charges. ",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className=" p-6 md:p-16 lg:p-28 bg-green-50 rounded-tr-[3rem] rounded-tl-[3rem] "
    >
      <div className=" text-center">
        <h1 className="text-3xl lg:text-5xl py-8 capitalize main-heading font-semibold">
          Frequently asked questions.
        </h1>
      </div>
      <Accordion type="single" collapsible className="">
        {FAQ_QUESTIONS.map((item) => (
          <AccordionItem value={item.id} key={item.id} className=" p-2">
            <AccordionTrigger className=" text-lg lg:text-2xl text-left  leading-[1.4]">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className=" text-xl">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
