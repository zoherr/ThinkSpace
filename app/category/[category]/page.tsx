import { Container } from "@/components/Container";
import { PostList } from "@/components/PostList";
import { getPostsByCategory, getCategories } from "@/lib/notion";
import { generateSEO } from "@/lib/metadata";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category);

  return generateSEO({
    title: `${category} Articles`,
    description: `Explore articles about ${category} on TechInsight`,
    url: `/category/${params.category}`,
  });
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category);
  const posts = await getPostsByCategory(category);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {category}
          </h1>
          <p className="text-lg text-muted-foreground">
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </p>
        </div>

        <PostList posts={posts} />
      </Container>
    </section>
  );
}
