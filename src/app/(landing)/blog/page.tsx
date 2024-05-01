import { client } from "@/client";
import { postQuery } from "@/lib/query";
import { Metadata } from "next";
import React from "react";
import BlogList from "./components/blog_lists";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = await client.fetch(postQuery, {}, { next: { revalidate: 1 } });

  return (
    <>
      <BlogList posts={posts} />
    </>
  );
}
