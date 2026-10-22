import Image from "next/image";
import Link from "next/link";

import { AuthorByline } from "@/components/common/author-byline";
import { TagList } from "@/components/common/tag-list";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { uiCopy } from "@/lib/content";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";

type PostCardProps = {
  post: Post;
  /** Set on above-the-fold cards so the cover loads eagerly. */
  priority?: boolean;
  className?: string;
};

// The title link stretches over the whole card (after:absolute), and the tag
// links sit above it (relative z-10) so both stay clickable without nesting.
function PostCard({ post, priority, className }: PostCardProps) {
  return (
    <Card
      data-slot="post-card"
      className={cn(
        "relative h-full transition-shadow hover:shadow-md has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring",
        className,
      )}
    >
      {post.cover && (
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          width={1200}
          height={630}
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[1200/630] w-full bg-muted object-cover"
        />
      )}
      <CardHeader className="gap-2">
        {!post.author && (
          <p className="text-xs text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.readingTime && ` · ${uiCopy.blog.readingTime(post.readingTime)}`}
          </p>
        )}
        <CardTitle className="text-lg">
          <h3>
            <Link
              href={post.href}
              className="outline-none after:absolute after:inset-0 after:content-['']"
            >
              {post.title}
            </Link>
          </h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>
      </CardContent>
      {(post.author || post.tags.length > 0) && (
        <CardFooter className="flex-col items-start gap-4 border-t-0 bg-transparent pt-0">
          {post.tags.length > 0 && <TagList tags={post.tags} className="relative z-10" />}
          {post.author && (
            <AuthorByline
              author={{ ...post.author, href: undefined }}
              date={post.date}
              readingTime={post.readingTime}
              size="sm"
            />
          )}
        </CardFooter>
      )}
    </Card>
  );
}

export { PostCard };
