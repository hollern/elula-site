// Turns GitHub-style alerts into <Callout>, so content reads well on GitHub
// and renders with our component here:
//
//   > [!TIP]
//   > Press ⌘K to open the command palette.
//
// Runs at build time inside the MDX loader, so it's plain JS (see next.config.ts).

import { visit } from "unist-util-visit";

/** GitHub alert type → Callout variant. */
const variants = {
  NOTE: "note",
  IMPORTANT: "note",
  TIP: "tip",
  WARNING: "warning",
  CAUTION: "danger",
};

const marker = /^\[!(NOTE|IMPORTANT|TIP|WARNING|CAUTION)\][ \t]*\n?/;

/** @type {import("unified").Plugin<[], import("mdast").Root>} */
export default function remarkCallouts() {
  return (tree) => {
    visit(tree, "blockquote", (node, index, parent) => {
      const paragraph = node.children[0];
      const text = paragraph?.type === "paragraph" ? paragraph.children[0] : undefined;
      if (!parent || index === undefined || text?.type !== "text") return;

      const match = marker.exec(text.value);
      if (!match) return;

      text.value = text.value.slice(match[0].length);
      if (!text.value) paragraph.children.shift();
      // A blank first paragraph (marker on its own line) is dropped.
      const children = paragraph.children.length ? node.children : node.children.slice(1);

      parent.children[index] = {
        type: "mdxJsxFlowElement",
        name: "Callout",
        attributes: [{ type: "mdxJsxAttribute", name: "variant", value: variants[match[1]] }],
        children,
      };
    });
  };
}
