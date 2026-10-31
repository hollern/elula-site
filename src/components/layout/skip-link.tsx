import { uiCopy } from "@/lib/content";

/** First focusable element on every page; jumps past the header to `#main`. */
function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-50 rounded-md bg-background px-3 py-2 text-sm font-medium ring-2 ring-ring focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      {uiCopy.layout.skipToContent}
    </a>
  );
}

export { SkipLink };
