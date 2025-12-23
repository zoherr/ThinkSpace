import { Container } from "@/components/Container";
import { PostCard } from "@/components/PostCard";
import { Badge } from "@/components/ui/badge";
import { getPosts, getCategories } from "@/lib/notion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";

export const revalidate = 60;

export default async function HomePage() {
  const allPosts = await getPosts();
  const categories = await getCategories();
  const featuredPost = allPosts[0];
  const recentPosts = allPosts.slice(1, 7);

  return (
    <Container className="py-8 md:py-12">
      {featuredPost && (
        <Link href={`/post/${featuredPost.slug}`} className="group block mb-16">
          <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-[2px]">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-background">
              {featuredPost.covers[0] && (
                <Image
                  src={featuredPost.covers[0]}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredPost.categories.slice(0, 2).map((cat: any) => (
                    <Badge key={cat.name} variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors">
                  {featuredPost.title}
                </h1>
                <p className="text-lg text-gray-200 mb-4 line-clamp-2 max-w-3xl">
                  {featuredPost.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(featuredPost.date), "MMM d, yyyy")}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </Link>
      )}

      {categories.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium text-muted-foreground">Topics:</span>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 6).map((category) => (
                <Link key={category} href={`/category/${encodeURIComponent(category)}`}>
                  <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Latest Articles</h2>
      </div>

      <div className="space-y-8">
        {recentPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/post/${post.slug}`}
            className="group block"
          >
            <article className="grid md:grid-cols-[300px_1fr] gap-6 pb-8 border-b border-border/50 last:border-0">
              <div className="relative h-[200px] md:h-[180px] overflow-hidden rounded-lg">
                <Image
                  src={post.covers[0] || "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.slice(0, 2).map((cat: any) => (
                    <Badge key={cat.name} variant="secondary" className="text-xs">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {format(new Date(post.date), "MMM d, yyyy")}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/archive"
          className="inline-flex items-center text-primary font-medium hover:underline"
        >
          View all articles →
        </Link>
      </div>
    </Container>
  );
}
