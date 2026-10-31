import { DocsSidebarLink } from "@/components/common/docs-sidebar-link";
import { DocsSidebarSection } from "@/components/common/docs-sidebar-section";
import { uiCopy } from "@/lib/content";
import type { DocNavItem } from "@/lib/types";
import { cn } from "@/lib/utils";

type DocsSidebarProps = {
  /**
   * Top-level entries are section headings; their `items` are the pages.
   * Sections without an `href` collapse, closed unless they hold the current page.
   */
  items: DocNavItem[];
  className?: string;
};

function DocsSidebarTree({ items }: { items: DocNavItem[] }) {
  return (
    <ul className="flex flex-col gap-0.5">
      {items.map((item) => (
        <li key={item.href ?? item.title}>
          {item.href ? (
            <DocsSidebarLink href={item.href}>{item.title}</DocsSidebarLink>
          ) : (
            <span className="block px-2.5 py-1.5 text-sm text-muted-foreground">{item.title}</span>
          )}
          {item.items && item.items.length > 0 && (
            <div className="ml-3 border-l pl-2">
              <DocsSidebarTree items={item.items} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function collectHrefs(items: DocNavItem[]): string[] {
  return items.flatMap((item) => [...(item.href ? [item.href] : []), ...collectHrefs(item.items ?? [])]);
}

function DocsSidebar({ items, className }: DocsSidebarProps) {
  return (
    <nav data-slot="docs-sidebar" aria-label={uiCopy.docs.navLabel} className={cn("flex flex-col gap-2", className)}>
      {items.map((section) =>
        section.href ? (
          <div key={section.title} className="flex flex-col gap-1">
            <DocsSidebarLink href={section.href}>{section.title}</DocsSidebarLink>
            {section.items && <DocsSidebarTree items={section.items} />}
          </div>
        ) : (
          <DocsSidebarSection key={section.title} title={section.title} hrefs={collectHrefs(section.items ?? [])}>
            <DocsSidebarTree items={section.items ?? []} />
          </DocsSidebarSection>
        ),
      )}
    </nav>
  );
}

export { DocsSidebar };
