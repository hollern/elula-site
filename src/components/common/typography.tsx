import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

// Each component renders a sensible default element but accepts `as`, so the
// visual style can differ from the semantic tag (e.g. an h1-styled h2).
type TypographyProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

function createTypography<D extends ElementType>(
  slot: string,
  defaultTag: D,
  baseClassName: string,
) {
  function Typography<T extends ElementType = D>({
    as,
    className,
    ...props
  }: TypographyProps<T>) {
    const Comp: ElementType = as ?? defaultTag;
    return (
      <Comp
        data-slot={slot}
        className={cn(baseClassName, className)}
        {...props}
      />
    );
  }
  Typography.displayName = slot;
  return Typography;
}

const H1 = createTypography(
  "h1",
  "h1",
  "scroll-m-20 font-heading text-4xl font-extrabold tracking-tight text-balance md:text-5xl",
);

const H2 = createTypography(
  "h2",
  "h2",
  "scroll-m-20 border-b pb-2 font-heading text-3xl font-semibold tracking-tight first:mt-0",
);

const H3 = createTypography(
  "h3",
  "h3",
  "scroll-m-20 font-heading text-2xl font-semibold tracking-tight",
);

const H4 = createTypography(
  "h4",
  "h4",
  "scroll-m-20 font-heading text-xl font-semibold tracking-tight",
);

const P = createTypography("p", "p", "leading-7 not-first:mt-6");

const Lead = createTypography("lead", "p", "text-xl text-muted-foreground");

const Large = createTypography("large", "div", "text-lg font-semibold");

const Small = createTypography("small", "small", "text-sm leading-none font-medium");

const Muted = createTypography("muted", "p", "text-sm text-muted-foreground");

const InlineCode = createTypography(
  "inline-code",
  "code",
  "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
);

const Blockquote = createTypography(
  "blockquote",
  "blockquote",
  "mt-6 border-l-2 pl-6 italic",
);

const List = createTypography("list", "ul", "my-6 ml-6 list-disc [&>li]:mt-2");

export {
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  InlineCode,
  Blockquote,
  List,
};
