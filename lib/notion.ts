import { Client } from "@notionhq/client";
import { redis } from "./redis";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

interface Post {
  id: string;
  categories: any[];
  title: string;
  slug: string;
  description: string;
  covers: string[];
  date: string;
  author: string;
}

const POSTS_CACHE_KEY = "notion:posts";
const CACHE_TTL = 60 * 60;

async function fetchPostsOnce(): Promise<Post[]> {
  const cached = await redis.get(POSTS_CACHE_KEY);

  if (cached) {
    return JSON.parse(cached);
  }


  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "Published",
        checkbox: { equals: true },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    const posts: Post[] = response.results.map((page: any) => {
      const coverImages = (page.properties?.Cover?.files || [])
        .map((f: any) => f?.file?.url || f?.external?.url)
        .filter(Boolean);

      return {
        id: page.id,
        categories: page.properties?.Categories?.multi_select || [],
        title: page.properties?.Title?.title?.[0]?.plain_text || "Untitled",
        slug: page.properties?.Slug?.rich_text?.[0]?.plain_text || "",
        description:
          page.properties?.Description?.rich_text?.[0]?.plain_text || "",
        covers: coverImages,
        date: page.properties?.Date?.date?.start || "",
        author: page.properties?.Author?.rich_text?.[0]?.plain_text || "",
      };
    });

    await redis.set(
      POSTS_CACHE_KEY,
      JSON.stringify(posts),
      "EX",
      CACHE_TTL
    );

    return posts;
  } catch (error) {
    return [];
  }
}

export async function getPosts() {
  return await fetchPostsOnce();
}

export async function getPageBlocks(pageId: string) {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    return response.results;
  } catch (error) {
    console.error("Error fetching page blocks from Notion:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  const posts = await fetchPostsOnce();
  const post = posts.find((p: Post) => p.slug === slug);

  if (!post) return null;

  const blocks = await getPageBlocks(post.id);

  return { ...post, blocks };
}

export async function getAllPostsSlugs() {
  const posts = await fetchPostsOnce();

  return posts
    .filter((p: Post) => p.slug)
    .map((p: Post) => ({ slug: p.slug }));
}

export async function getCategories() {
  const posts = await fetchPostsOnce();
  const categoriesSet = new Set<string>();

  posts.forEach((post: Post) => {
    post.categories.forEach((cat: any) => {
      categoriesSet.add(cat.name);
    });
  });

  return Array.from(categoriesSet);
}

export async function getPostsByCategory(category: string) {
  const posts = await fetchPostsOnce();

  return posts.filter((post: Post) =>
    post.categories.some((cat: any) => cat.name === category)
  );
}
