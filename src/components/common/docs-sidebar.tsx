import { DocsSidebarLink } from "@/components/common/docs-sidebar-link";
import { uiCopy } from "@/lib/content";
import type { DocNavItem } from "@/lib/types";
import { cn } from "@/lib/utils";

type DocsSidebarProps = {
  /** Top-level entries are section headings; their `items` are the pages. */
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

function DocsSidebar({ items, className }: DocsSidebarProps) {
  return (
    <nav data-slot="docs-sidebar" aria-label={uiCopy.docs.navLabel} className={cn("flex flex-col gap-6", className)}>
      {items.map((section) => (
        <div key={section.title} className="flex flex-col gap-1">
          {section.href ? (
            <DocsSidebarLink href={section.href}>{section.title}</DocsSidebarLink>
          ) : (
            <h2 className="px-2.5 text-xs font-medium tracking-wide text-foreground uppercase">
              {section.title}
            </h2>
          )}
          {section.items && <DocsSidebarTree items={section.items} />}
        </div>
      ))}
    </nav>
  );
}

export { DocsSidebar };
