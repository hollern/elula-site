"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the heading the reader is currently in: the last heading
 * that has scrolled past the top `offset` pixels of the viewport.
 */
export function useActiveHeading(ids: string[], offset = 96) {
  const [activeId, setActiveId] = useState<string | undefined>(ids[0]);
  const key = ids.join(",");

  useEffect(() => {
    const headings = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const update = () => {
      let current = headings[0].id;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top - offset > 0) break;
        current = heading.id;
      }
      // At the very bottom the last headings may never reach the top.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      setActiveId(atBottom ? headings[headings.length - 1].id : current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [key, offset]);

  return activeId;
}
