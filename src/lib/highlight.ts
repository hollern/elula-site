import {
  bundledLanguages,
  createHighlighter,
  type BundledLanguage,
  type Highlighter,
} from "shiki";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import { cacheLife } from "next/cache";

// Server-side syntax highlighting for CodeBlock. One highlighter is shared for
// the whole process; languages load on first use. The JavaScript regex engine
// avoids shipping Oniguruma WASM. `highlight` is cached because the output
// only depends on its arguments (and Shiki reads the clock, which Cache
// Components forbids during prerender).

const themes = { light: "github-light", dark: "github-dark" } as const;

let highlighter: Promise<Highlighter> | undefined;

function getHighlighter() {
  highlighter ??= createHighlighter({
    themes: Object.values(themes),
    langs: [],
    engine: createJavaScriptRegexEngine(),
  });
  return highlighter;
}

function isBundledLanguage(lang: string): lang is BundledLanguage {
  return lang in bundledLanguages;
}

/** Returns Shiki HTML with both themes as CSS variables (see globals.css). */
export async function highlight(code: string, lang = "text") {
  "use cache";
  cacheLife("max");

  const shiki = await getHighlighter();
  const language = isBundledLanguage(lang) ? lang : "text";
  if (language !== "text" && !shiki.getLoadedLanguages().includes(language)) {
    await shiki.loadLanguage(language);
  }

  return shiki.codeToHtml(code, {
    lang: language,
    themes,
    defaultColor: false,
  });
}
