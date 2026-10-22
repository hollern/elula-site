import type { ReactNode } from "react";

import { SiteFooter } from "@/components/common/site-footer";
import { SiteHeader } from "@/components/common/site-header";
import { footer, headerCtas, mainNav, uiCopy } from "@/lib/content";

function MarketingHeader() {
  return (
    <SiteHeader
      items={mainNav}
      primaryCta={headerCtas.primary}
      secondaryCta={headerCtas.secondary}
    />
  );
}

function MarketingFooter() {
  return (
    <SiteFooter
      columns={footer.columns}
      legal={footer.legal}
      socials={footer.socials}
      copyright={footer.copyright}
    />
  );
}

/** Shell for the landing and pricing pages: header, main content and footer. */
function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-background px-3 py-2 text-sm font-medium ring-2 ring-ring focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {uiCopy.layout.skipToContent}
      </a>
      <MarketingHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <MarketingFooter />
    </>
  );
}

export { MarketingFooter, MarketingHeader, MarketingLayout };
