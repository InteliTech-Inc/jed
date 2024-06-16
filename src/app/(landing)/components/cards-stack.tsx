"use client";
import { CardStack } from "@/components/ui/card-stack";
import { cn } from "@/lib/utils";
export function CardsStack() {
  return (
    <div className="h-[25rem] flex items-center justify-center w-full">
      <CardStack items={CARDS} />
    </div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Evans Elabo",
    designation: "Senior Software, InteliTech Inc",
    content: (
      <p>
        JED stands as a beacon of{" "}
        <Highlight>
          innovation, offering a modern platform designed to revolutionize
        </Highlight>{" "}
        the way the world sells tickets and facilitates transparent voting. Its
        cutting-edge technology ensures a seamless and secure experience for
        users worldwide.
      </p>
    ),
  },
  {
    id: 1,
    name: "Addo Yaw Diabene",
    designation: "Chief Technical Officer, InteliTech Inc",
    content: (
      <p>
        At the forefront of technological advancement,
        <Highlight>JED redefines the standards</Highlight> of digital
        interaction, making ticket sales and voting processes not only more
        efficient but also universally accessible, ensuring every voice has the
        opportunity to be heard.
      </p>
    ),
  },
  {
    id: 2,
    name: "Joshua Richardson Owusu",
    designation: "Director, InteliTech Inc",
    content: (
      <p>
        With its unparalleled commitment to innovation,
        <Highlight>JED stands as a testament</Highlight> to the transformative
        power of technology. By streamlining the way we sell tickets and vote,
        it opens new avenues for global participation and transparency.
      </p>
    ),
  },
];
