import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CategoryLabel } from "./CategoryLabel";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";

interface PostCardProps {
  post: {
    slug: string;
    title: string;
    description: string;
    covers: string[];
    date: string;
    author: string;
    categories: { name: string; color: string }[];
  };
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const coverImage = post.covers[0] || "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg";

  if (featured) {
    return (
      <Link href={`/post/${post.slug}`} className="group block">
        <Card className="overflow-hidden border-border/40 hover:border-border transition-all hover:shadow-lg h-full">
          <div className="relative h-[400px] w-full overflow-hidden">
            <Image
              src={coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {post.categories.slice(0, 2).map((cat) => (
                  <CategoryLabel key={cat.name} category={cat} href={false} />
                ))}
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-200 line-clamp-2 mb-3">
                {post.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(post.date), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/post/${post.slug}`} className="group block h-full">
      <Card className="overflow-hidden border-border/40 hover:border-border transition-all hover:shadow-lg h-full flex flex-col">
        <div className="relative h-[220px] w-full overflow-hidden">
          <Image
            src={coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader className="flex-1">
          <div className="flex flex-wrap gap-2 mb-2">
            {post.categories.slice(0, 2).map((cat) => (
              <CategoryLabel key={cat.name} category={cat} href={false} />
            ))}
          </div>
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {post.description}
          </p>
        </CardContent>
        <CardFooter className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(post.date), "MMM d, yyyy")}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
