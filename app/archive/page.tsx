import { Container } from "@/components/Container";
import { PostList } from "@/components/PostList";
import { getPosts } from "@/lib/notion";
import { generateSEO } from "@/lib/metadata";

export const revalidate = 60;

export const metadata = generateSEO({
  title: "Archive",
  description: "Browse all articles and insights from TechInsight blog",
  url: "/archive",
});

export default async function ArchivePage() {
  const posts = await getPosts();

  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Archive
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse all {posts.length} articles
          </p>
        </div>

        <PostList posts={posts} />
      </Container>
    </section>
  );
}
