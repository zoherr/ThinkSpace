import { Container } from "@/components/Container";
import { CategoryLabel } from "@/components/CategoryLabel";
import { AuthorCard } from "@/components/AuthorCard";
import { NotionRenderer } from "@/components/NotionRenderer";
import { TableOfContents } from "@/components/TableOfContents";
import { SocialShare } from "@/components/SocialShare";
import { getPostBySlug, getAllPostsSlugs } from "@/lib/notion";
import { generateSEO, generateBlogPostSchema } from "@/lib/metadata";
import { calculateReadingTime, extractHeadings } from "@/lib/reading-time";
import { notFound } from "next/navigation";
import Image from "next/image";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPostsSlugs();
  return slugs.map((item: { slug: string }) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourblog.com";
  const postUrl = `/post/${params.slug}`;
  const coverImage = post.covers[0] || `${siteUrl}/og-image.jpg`;

  return generateSEO({
    title: post.title,
    description: post.description,
    image: coverImage,
    url: postUrl,
    type: "article",
    publishedTime: post.date,
    author: post.author,
  });
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourblog.com";
  const postUrl = `${siteUrl}/post/${params.slug}`;
  const coverImage = post.covers[0] || "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg";
  const readingTime = calculateReadingTime(post.blocks);
  const headings = extractHeadings(post.blocks);

  const schema = generateBlogPostSchema({
    title: post.title,
    description: post.description,
    image: coverImage,
    url: postUrl,
    publishedTime: post.date,
    author: post.author,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article>
        <div className="relative h-[400px] md:h-[500px] w-full">
          <Image
            src={coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <Container className="relative -mt-32 md:-mt-40">
          <div className="bg-background/95 backdrop-blur-sm rounded-2xl shadow-xl border border-border/40 p-6 md:p-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.slice(0, 3).map((cat: any) => (
                <CategoryLabel key={cat.name} category={cat} />
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border/40">
              <AuthorCard author={post.author} date={post.date} readingTime={readingTime} />
              <SocialShare url={postUrl} title={post.title} />
            </div>
          </div>
        </Container>

        <Container className="mt-12">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_250px] gap-12">
            <div className="max-w-3xl">
              <NotionRenderer blocks={post.blocks} />
            </div>

            <aside className="xl:pl-8">
              <TableOfContents headings={headings} />
            </aside>
          </div>
        </Container>
      </article>
    </>
  );
}
