import type { MDXComponents } from "mdx/types";

import { Callout } from "@/components/common/callout";
import { CodeBlock } from "@/components/common/code-block";
import { MdxLink } from "@/components/mdx/mdx-link";

// Every component MDX content can use. Required by @next/mdx. Elements are
// styled by the Prose wrapper in the page templates, so most need no mapping.
// Fenced code and GitHub alerts become CodeBlock and Callout at build time
// (src/lib/mdx/plugins). Using a component that isn't listed fails the build.
const components: MDXComponents = {
  a: MdxLink,
  Callout,
  CodeBlock,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
