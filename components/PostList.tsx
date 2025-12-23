import { PostCard } from "./PostCard";

interface PostListProps {
  posts: any[];
  featured?: boolean;
}

export function PostList({ posts, featured = false }: PostListProps) {
  if (featured && posts.length > 0) {
    const featuredPost = posts[0];
    const remainingPosts = posts.slice(1);

    return (
      <div className="space-y-12">
        <PostCard post={featuredPost} featured />
        {remainingPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
