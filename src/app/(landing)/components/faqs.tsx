import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_QUESTIONS } from "@/constants/faqs";

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
