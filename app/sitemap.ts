import { MetadataRoute } from "next";
import { getPosts, getCategories } from "@/lib/notion";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourblog.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const categories = await getCategories();

  const postEntries: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${siteUrl}/post/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category: string) => ({
    url: `${siteUrl}/category/${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    ...postEntries,
    ...categoryEntries,
  ];
}
