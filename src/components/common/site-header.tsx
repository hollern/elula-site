"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import type { ContainerProps } from "@/components/common/container";
import { Container } from "@/components/common/container";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useScrolled } from "@/hooks/use-scrolled";
import { uiCopy } from "@/lib/content";
import type { Cta, NavItem, NavLink } from "@/lib/types";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  items: NavItem[];
  primaryCta?: Cta;
  secondaryCta?: Cta;
  /** Docs use `full` so the header lines up with the sidebar layout. */
  containerSize?: ContainerProps["size"];
  className?: string;
};

// Two columns at md keep a wide menu inside the viewport; the full count kicks in at lg.
const dropdownGrid = {
  1: "w-96",
  2: "w-[36rem] grid-cols-2",
  3: "w-[36rem] grid-cols-2 lg:w-[48rem] lg:grid-cols-3",
} as const;

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function SiteHeader({
  items,
  primaryCta,
  secondaryCta,
  containerSize,
  className,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const scrolled = useScrolled(8);

  return (
    <header
      data-slot="site-header"
      className={cn(
        "sticky top-0 z-40 border-b border-transparent transition-colors",
        scrolled && "border-border bg-background/80 backdrop-blur",
        className,
      )}
    >
      <Container size={containerSize} className="flex h-16 items-center gap-6">
        <Logo href="/" />

        <NavigationMenu className="hidden md:flex" aria-label={uiCopy.header.navLabel}>
          <NavigationMenuList>
            {items.map((item) =>
              "items" in item ? (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className={cn("grid gap-1", dropdownGrid[item.columns ?? 1])}>
                      {item.items.map((link) => (
                        <li key={link.href}>
                          <NavigationMenuLink asChild className="flex-col items-start gap-1">
                            <Link href={link.href}>
                              <div className="font-medium">{link.title}</div>
                              {link.description && (
                                <div className="text-muted-foreground">{link.description}</div>
                              )}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    active={isActive(pathname, item.href)}
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={item.href}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          {secondaryCta && (
            <Button asChild variant="ghost" className="hidden md:inline-flex">
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          )}
          {primaryCta && (
            <Button asChild className="hidden md:inline-flex">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
          )}
          <MobileNav
            items={items}
            pathname={pathname}
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
          />
        </div>
      </Container>
    </header>
  );
}

function MobileNav({
  items,
  pathname,
  primaryCta,
  secondaryCta,
}: Pick<SiteHeaderProps, "items" | "primaryCta" | "secondaryCta"> & { pathname: string }) {
  const renderLink = (link: NavLink) => (
    <SheetClose asChild key={link.href}>
      <Button
        asChild
        variant="ghost"
        className="justify-start aria-[current=page]:bg-muted"
      >
        <Link href={link.href} aria-current={isActive(pathname, link.href) ? "page" : undefined}>
          {link.title}
        </Link>
      </Button>
    </SheetClose>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label={uiCopy.header.menuLabel}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xs">
        <SheetHeader>
          <SheetTitle asChild>
            <Logo size="sm" />
          </SheetTitle>
        </SheetHeader>
        <nav aria-label={uiCopy.header.navLabel} className="flex flex-col gap-1 px-4">
          {items.map((item) =>
            "items" in item ? (
              <div key={item.title} className="flex flex-col gap-1">
                <p className="px-2.5 pt-2 text-xs font-medium text-muted-foreground">{item.title}</p>
                {item.items.map(renderLink)}
              </div>
            ) : (
              renderLink(item)
            ),
          )}
        </nav>
        {(primaryCta || secondaryCta) && (
          <div className="mt-auto flex flex-col gap-2 p-4">
            <Separator className="mb-2" />
            {secondaryCta && (
              <SheetClose asChild>
                <Button asChild variant="outline" size="lg">
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              </SheetClose>
            )}
            {primaryCta && (
              <SheetClose asChild>
                <Button asChild size="lg">
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              </SheetClose>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export { SiteHeader };
