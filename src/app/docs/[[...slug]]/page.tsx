import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { DocsPageTemplate } from "@/components/layout/docs-page-template";
import { docs } from "@/lib/content";
import { docHref, getDoc, getDocSlugs } from "@/lib/docs";

export async function generateStaticParams() {
  return (await getDocSlugs()).map((slug) => ({ slug: slug ? slug.split("/") : [] }));
}

export async function generateMetadata({ params }: PageProps<"/docs/[[...slug]]">): Promise<Metadata> {
  const doc = await getDoc((await params).slug);
  if (!doc) notFound();

  return {
    title: doc.meta.slug ? `${doc.meta.title} · ${docs.metadata.title}` : docs.metadata.title,
    description: doc.meta.description ?? docs.metadata.description,
    alternates: { canonical: docHref(doc.meta.slug) },
  };
}

// Partial Prefetching shares one App Shell across every docs URL, so the slug
// is read inside Suspense. The layout's header and sidebar stay in the shell.
export default function DocsPage({ params }: PageProps<"/docs/[[...slug]]">) {
  return (
    <Suspense>
      <DocsPageContent params={params} />
    </Suspense>
  );
}

async function DocsPageContent({ params }: Pick<PageProps<"/docs/[[...slug]]">, "params">) {
  const doc = await getDoc((await params).slug);
  if (!doc) notFound();

  const { meta, Content, section, prev, next } = doc;

  return (
    <DocsPageTemplate meta={meta} section={section} prev={prev} next={next}>
      <Content />
    </DocsPageTemplate>
  );
}
