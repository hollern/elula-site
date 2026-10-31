import type { ReactNode } from "react";

import { PrevNextLinks } from "@/components/common/prev-next-links";
import { Prose } from "@/components/common/prose";
import { TableOfContents } from "@/components/common/table-of-contents";
import { H1, Lead } from "@/components/common/typography";
import { Separator } from "@/components/ui/separator";
import type { DocPageMeta, NavLink } from "@/lib/types";

type DocsPageTemplateProps = {
  meta: DocPageMeta;
  /** Sidebar group the page belongs to, shown above the title. */
  section?: string;
  prev?: Pick<NavLink, "title" | "href">;
  next?: Pick<NavLink, "title" | "href">;
  /** The content slot: the page body, rendered inside Prose. */
  children: ReactNode;
};

/**
 * Fixed frame for every docs page, rendered inside `DocsLayout`: section
 * label, title and description, the content slot, prev/next links, and a
 * sticky table of contents on wide screens. Only `children` differs between pages.
 */
function DocsPageTemplate({ meta, section, prev, next, children }: DocsPageTemplateProps) {
  const toc = meta.toc ?? [];

  return (
    <div data-slot="docs-page" className="grid gap-x-12 xl:grid-cols-[minmax(0,1fr)_14rem]">
      <article className="max-w-3xl min-w-0">
        <header className="flex flex-col gap-3">
          {section && <p className="text-sm font-medium text-primary">{section}</p>}
          <H1>{meta.title}</H1>
          {meta.description && <Lead>{meta.description}</Lead>}
        </header>

        <Prose className="mt-8">
          {children}
        </Prose>

        {(prev || next) && (
          <footer className="mt-12">
            <Separator className="mb-8" />
            <PrevNextLinks prev={prev} next={next} />
          </footer>
        )}
      </article>

      {toc.length > 0 && (
        <aside className="hidden xl:block">
          <TableOfContents items={toc} className="sticky top-24" />
        </aside>
      )}
    </div>
  );
}

export { DocsPageTemplate };
