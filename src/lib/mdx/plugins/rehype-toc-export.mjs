// Collects h2 and h3 headings into `export const toc = [{ id, title, depth }]`,
// the shape TableOfContents takes. Runs after rehype-slug, so the ids match
// the rendered headings.
//
// Runs at build time inside the MDX loader, so it's plain JS (see next.config.ts).

import { valueToEstree } from "estree-util-value-to-estree";
import { toString } from "hast-util-to-string";
import { visit } from "unist-util-visit";

const depths = { h2: 2, h3: 3 };

/** @type {import("unified").Plugin<[], import("hast").Root>} */
export default function rehypeTocExport() {
  return (tree) => {
    const toc = [];
    visit(tree, "element", (node) => {
      const depth = depths[node.tagName];
      if (depth && typeof node.properties.id === "string") {
        toc.push({ id: node.properties.id, title: toString(node), depth });
      }
    });

    tree.children.unshift({
      type: "mdxjsEsm",
      value: "",
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ExportNamedDeclaration",
              specifiers: [],
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: "toc" },
                    init: valueToEstree(toc),
                  },
                ],
              },
            },
          ],
        },
      },
    });
  };
}
