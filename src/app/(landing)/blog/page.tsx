import React from "react";
import BlogList from "./components/blog_lists";
import { postQuery } from "@/lib/query";
import { client } from "@/client";
import { Metadata } from "next";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "JED Blog",
};

export default async function BlogPage() {
  const posts = await client.fetch(postQuery, {}, { next: { revalidate: 1 } });

  return (
    <>
      <BlogList posts={posts} />
      <Footer />
    </>
  );
}
