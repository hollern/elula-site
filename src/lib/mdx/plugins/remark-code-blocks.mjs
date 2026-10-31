// Turns fenced code blocks into <CodeBlock>, so they get Shiki highlighting,
// the copy button and the filename header. Fence options:
//
//   ```ts title="elula.config.ts" showLineNumbers
//
// Runs at build time inside the MDX loader, so it's plain JS (see next.config.ts).

import { visit } from "unist-util-visit";

const titlePattern = /(?:title|filename)=(?:"([^"]*)"|'([^']*)')/;

/** @type {import("unified").Plugin<[], import("mdast").Root>} */
export default function remarkCodeBlocks() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (!parent || index === undefined) return;

      const meta = node.meta ?? "";
      const title = titlePattern.exec(meta);
      /** @type {import("mdast-util-mdx-jsx").MdxJsxAttribute[]} */
      const attributes = [{ type: "mdxJsxAttribute", name: "code", value: node.value }];
      if (node.lang) attributes.push({ type: "mdxJsxAttribute", name: "lang", value: node.lang });
      if (title) attributes.push({ type: "mdxJsxAttribute", name: "filename", value: title[1] ?? title[2] });
      // A null value is a boolean attribute, like <CodeBlock showLineNumbers />.
      if (/\bshowLineNumbers\b/.test(meta)) attributes.push({ type: "mdxJsxAttribute", name: "showLineNumbers", value: null });

      parent.children[index] = { type: "mdxJsxFlowElement", name: "CodeBlock", attributes, children: [] };
    });
  };
}
