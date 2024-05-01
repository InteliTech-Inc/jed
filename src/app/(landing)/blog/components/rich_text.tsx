import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/urlFor";

export const RichText = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="w-full md:h-[30rem] my-8">
          <Image
            src={urlFor(value).url()}
            alt={"Image"}
            width={2000}
            height={2000}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc my-8 space-y-4">{children}</ul>
    ),

    number: ({ children }: any) => <ol className="list-decimal">{children}</ol>,
  },
  block: {
    normal: ({ children }: any) => <p className="my-6 text-md">{children}</p>,
    h1: ({ children }: any) => (
      <h1 className="text-4xl my-6 font-bold">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="my-6 text-3xl font-bold">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="my-6 text-2xl font-bold">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="my-6 text-xl font-bold">{children}</h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="my-6 text-lg font-semibold">{children}</h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="my-6 text-base font-medium">{children}</h6>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-secondary pl-2 my-6 md:pr-60 text-gray-500 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noopener noreferrer"
        : undefined;

      return (
        <Link
          href={value.href}
          rel={rel}
          target="_blank"
          className="
        text-blue-400 underline visited:text-[#07025a] dark:visited:text-[#3877da] hover:text-blue-600 dark:hover:text-blue-400
        "
        >
          {children}
        </Link>
      );
    },
  },
};
