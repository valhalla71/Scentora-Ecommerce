import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { textVariants } from "@/lib/design-system/typography"
import type { BlogPost } from "@/lib/blog"

export interface BlogPostCardProps {
  post: BlogPost;
  dictionary: any;
}

export function BlogPostCard({ post, dictionary }: BlogPostCardProps) {
  const { blog } = dictionary.common;

  return (
    <article className="rounded-lg border border-border/60 bg-card overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video bg-muted" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
            {post.category}
          </span>
          <span className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
            {post.readingTime} {blog.readingTime}
          </span>
        </div>

        <h3 className={cn(textVariants({ variant: "h4" }), "mb-2 line-clamp-2")}>
          {post.title}
        </h3>

        <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground mb-4 line-clamp-2")}>
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
              {blog.author} {post.author}
            </p>
            <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
              {new Date(post.publishDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <Button variant="outline" className="w-full">
          {blog.readMore}
        </Button>
      </div>
    </article>
  );
}
