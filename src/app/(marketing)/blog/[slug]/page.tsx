import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { BlogPostTemplate } from "@/components/layout/blog-post-template";
import { getPost, getPosts, getRelatedPosts, postHref, toPostCard } from "@/lib/blog";

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    alternates: { canonical: postHref(post.meta.slug) },
    openGraph: { type: "article", publishedTime: post.meta.date, tags: post.meta.tags },
  };
}

// Partial Prefetching shares one App Shell across every post URL, so the slug
// is read inside Suspense. Known slugs are still prerendered in full.
export default function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense>
      <BlogPostContent params={params} />
    </Suspense>
  );
}

async function BlogPostContent({ params }: Pick<PageProps<"/blog/[slug]">, "params">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const { meta, Content } = post;
  const related = (await getRelatedPosts(meta)).map(toPostCard);

  return (
    <BlogPostTemplate meta={meta} related={related}>
      <Content />
    </BlogPostTemplate>
  );
}
