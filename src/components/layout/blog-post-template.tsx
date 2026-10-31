import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AuthorByline } from "@/components/common/author-byline";
import { Container } from "@/components/common/container";
import { PostCard } from "@/components/common/post-card";
import { Prose } from "@/components/common/prose";
import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { TableOfContents } from "@/components/common/table-of-contents";
import { TagList } from "@/components/common/tag-list";
import { H1, Lead } from "@/components/common/typography";
import { blog } from "@/lib/content";
import { formatDate } from "@/lib/format";
import type { BlogPostMeta, Post } from "@/lib/types";

type BlogPostTemplateProps = {
  meta: BlogPostMeta;
  related?: Post[];
  /** The content slot: the post body, rendered inside Prose. */
  children: ReactNode;
};

/**
 * Fixed frame for every blog post: back link, tags, title, excerpt and byline,
 * an optional cover, the content slot with a sticky table of contents, then
 * related posts. Only `children` differs between posts.
 */
function BlogPostTemplate({ meta, related = [], children }: BlogPostTemplateProps) {
  const toc = meta.toc ?? [];

  return (
    <>
      <article data-slot="blog-post">
        <Container className="grid gap-x-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="max-w-3xl min-w-0">
            <header className="flex flex-col gap-6">
              <Link
                href="/blog"
                className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                {blog.backLink}
              </Link>
              <TagList tags={meta.tags} />
              <H1>{meta.title}</H1>
              <Lead>{meta.excerpt}</Lead>
              {meta.author ? (
                <AuthorByline author={meta.author} date={meta.date} readingTime={meta.readingTime} />
              ) : (
                <time dateTime={meta.date} className="text-sm text-muted-foreground">
                  {formatDate(meta.date)}
                </time>
              )}
            </header>

            {meta.cover && (
              <Image
                src={meta.cover.src}
                alt={meta.cover.alt}
                width={1200}
                height={630}
                priority
                sizes="(min-width: 768px) 48rem, 100vw"
                className="mt-10 aspect-[1200/630] w-full rounded-xl bg-muted object-cover"
              />
            )}

            <Prose className="mt-10">
              {children}
            </Prose>
          </div>

          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <TableOfContents items={toc} className="sticky top-24" />
            </aside>
          )}
        </Container>
      </article>

      {related.length > 0 && (
        <Section variant="muted" aria-labelledby="related-posts">
          <SectionHeader id="related-posts" title={blog.related.title} align="left" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((post) => (
              <li key={post.href}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}

export { BlogPostTemplate };
