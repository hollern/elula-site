import type { ReactNode } from "react";

import { Container } from "@/components/common/container";
import { DocsMobileNav } from "@/components/common/docs-mobile-nav";
import { DocsSidebar } from "@/components/common/docs-sidebar";
import { SiteHeader } from "@/components/common/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { headerCtas, mainNav } from "@/lib/content";
import { getDocsNav } from "@/lib/docs";

/**
 * Shell for every docs page: the site header at full width, a sticky sidebar
 * (a sheet on mobile) and the main column. Pages render `DocsPageTemplate`.
 * No marketing footer, so the sidebar can run the full height.
 */
async function DocsLayout({ children }: { children: ReactNode }) {
  const docsNav = await getDocsNav();

  return (
    <>
      <SkipLink />
      <SiteHeader
        items={mainNav}
        primaryCta={headerCtas.primary}
        secondaryCta={headerCtas.secondary}
        containerSize="full"
      />
      <div className="sticky top-16 z-30 border-y bg-background md:hidden">
        <Container size="full" className="flex h-11 items-center">
          <DocsMobileNav>
            <DocsSidebar items={docsNav} />
          </DocsMobileNav>
        </Container>
      </div>
      <Container size="full" className="flex flex-1 items-start">
        <aside className="sticky top-16 hidden h-[calc(100svh-4rem)] w-64 shrink-0 overflow-y-auto border-r py-8 pr-4 md:block">
          <DocsSidebar items={docsNav} />
        </aside>
        <main id="main" className="min-w-0 flex-1 py-8 md:py-10 md:pl-10 lg:pl-12">
          {children}
        </main>
      </Container>
    </>
  );
}

export { DocsLayout };
