import type { ReactNode } from "react";

import { SiteFooter } from "@/components/common/site-footer";
import { SiteHeader } from "@/components/common/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { footer, headerCtas, mainNav } from "@/lib/content";

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
      <SkipLink />
      <MarketingHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <MarketingFooter />
    </>
  );
}

export { MarketingFooter, MarketingHeader, MarketingLayout };
