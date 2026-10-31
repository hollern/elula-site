import type { Metadata } from "next";

import { PostCard } from "@/components/common/post-card";
import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { getPosts, toPostCard } from "@/lib/blog";
import { blog } from "@/lib/content";

export const metadata: Metadata = {
  ...blog.metadata,
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <Section>
      <SectionHeader {...blog.header} titleAs="h1" align="left" />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <li key={post.slug}>
            <PostCard post={toPostCard(post)} priority={i < 3} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
