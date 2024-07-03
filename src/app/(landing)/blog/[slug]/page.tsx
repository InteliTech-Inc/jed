import React from "react";
import { PortableText } from "@portabletext/react";
import { client } from "@/client";
import { RichText } from "../components/rich_text";
import Image from "next/image";
import { Post } from "@/types/types";
import BackButton from "../components/back_button";
import { urlFor } from "@/lib/urlFor";
import { Metadata } from "next";
import NotFound from "@/app/not-found";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const query = `
    *[_type == "post"]
    {
      slug
    }
   `;
  const posts: Post[] = await client.fetch(query);
  const slugRoutes = posts.map((post) => post.slug.current);

  return slugRoutes.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      description,
      "image": mainImage.asset -> url,
    }`,
    { slug }
  );
  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      images: [
        {
          url: post?.image,
          alt: `${post?.title}'s image`,
        },
      ],
    },
  };
}

export default async function SinglePost({ params: { slug } }: Props) {
  const posts = await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0]
    {
    ...,
    author->,
      }
  `,
    { slug },
    { next: { revalidate: 1 } }
  );

  if (posts === null) {
    return <NotFound />;
  }

  return (
    <section className="flex p-4  flex-col items-center justify-center w-full md:w-[55dvw] mx-auto">
      <div className="my-8">
        <BackButton />
        <p className="text-3xl leading-[1.4] py-4 md:text-5xl font-bold text-neutral-700 lg:text-center">
          {posts.title}
        </p>
        <div className="flex flex-row items-center lg:justify-center gap-2 md:gap-x-4 my-5">
          <Image
            src={urlFor(posts.author.image).url()}
            alt={posts.author.name}
            width={200}
            height={200}
            className="rounded-full w-12 h-12 object-cover object-top "
          />
          <section className="flex flex-col lg:flex-row items-start justify-center lg:items-center">
            <p className="flex items-center justify-center">
              <span className="font-bold">
                {posts.author.name ? `By ${posts.author.name}` : "User"}
              </span>
            </p>
            <span className="hidden md:block text-lg text-gray-500 px-2">
              &#x2022;
            </span>
            <span className=" text-gray-500">
              {new Date(posts._createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </section>
        </div>
        <div className="w-full md:h-[20rem]  my-14">
          <Image
            src={urlFor(posts.mainImage).url()}
            alt={posts.title}
            width={2000}
            height={2000}
            className="object-cover object-bottom w-full h-full rounded-lg shadow-md"
          />
        </div>
        <PortableText value={posts.body} components={RichText} />
        <hr className="dark:border-white/55 border-primary my-6 " />
        <div className="flex flex-col md:flex-row items-start justify-center gap-4">
          <Image
            src={urlFor(posts.author.image).url()}
            alt={posts.author.name}
            width={2000}
            height={2000}
            className="rounded-full h-24 w-24 md:h-28 md:w-28 object-cover object-top hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <div>
            <div className="flex items-center gap-3 -mb-5">
              <p className="font-bold text-2xl ">{posts.author.name}</p>
              <Link href={`${posts.author.social}`} target="_blank">
                <LinkIcon
                  height={20}
                  width={20}
                  className="text-gray-500 hover:text-secondary transition-all duration-150 ease-in"
                />
              </Link>
            </div>
            <PortableText value={posts.author.bio} components={RichText} />
          </div>
        </div>
      </div>
    </section>
  );
}
