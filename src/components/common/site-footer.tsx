import type { ReactNode } from "react";
import Link from "next/link";

import { Container, type ContainerProps } from "@/components/common/container";
import { Logo } from "@/components/common/logo";
import { SocialIcon } from "@/components/common/social-icon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { site, uiCopy } from "@/lib/content";
import { getCurrentYear } from "@/lib/format";
import type { NavGroup, NavLink, SocialLink } from "@/lib/types";
import { cn } from "@/lib/utils";

type SiteFooterProps = {
  columns: NavGroup[];
  legal?: NavLink[];
  socials?: SocialLink[];
  /** Receives the current year, e.g. `footer.copyright` from content.ts. */
  copyright: (year: number) => string;
  /** Slot for a NewsletterForm, rendered beside the link columns. */
  newsletter?: ReactNode;
  containerSize?: ContainerProps["size"];
  className?: string;
};

async function SiteFooter({
  columns,
  legal = [],
  socials = [],
  copyright,
  newsletter,
  containerSize,
  className,
}: SiteFooterProps) {
  const year = await getCurrentYear();

  return (
    <footer data-slot="site-footer" className={cn("border-t bg-muted/30", className)}>
      <Container size={containerSize} className="flex flex-col gap-10 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-4">
            <Logo href="/" />
            <p className="max-w-xs text-sm text-muted-foreground">{site.tagline}</p>
            {socials.length > 0 && (
              <ul aria-label={uiCopy.footer.socialLabel} className="-ml-2 flex gap-1">
                {socials.map((social) => (
                  <li key={social.href}>
                    <Button asChild variant="ghost" size="icon" className="text-muted-foreground">
                      <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                        <SocialIcon icon={social.icon} />
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title} className="flex flex-col gap-3">
                <h2 className="text-sm font-medium">{column.title}</h2>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {newsletter && <div className="max-w-md">{newsletter}</div>}

        <Separator />

        <div className="flex flex-col-reverse gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{copyright(year)}</p>
          {legal.length > 0 && (
            <ul className="flex gap-6">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-foreground">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  );
}

export { SiteFooter };
