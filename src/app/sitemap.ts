import { client } from "@/client";
import { postQuery } from "@/lib/query";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch(postQuery, {}, { next: { revalidate: 1 } });

  const postEntries: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug.current}`,
    lastModified: new Date(post._updatedAt).toISOString(),
    priority: 0.8,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/resources/guides`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/resources/about`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/products#nominations`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/products#voting`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/products#ticketing`,
    },
    ...postEntries,
  ];
}
