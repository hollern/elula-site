import type { ComponentProps } from "react";
import Link from "next/link";

/**
 * Markdown links in MDX. Site paths use next/link for client navigation and
 * prefetching; anchors stay plain; other sites open in a new tab.
 */
function MdxLink({ href = "", ...props }: ComponentProps<"a">) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  if (href.startsWith("#")) return <a href={href} {...props} />;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

export { MdxLink };
