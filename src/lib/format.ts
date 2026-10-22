import { cacheLife } from "next/cache";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  // Fixed zone so server and client render the same string.
  timeZone: "UTC",
});

/** Formats an ISO date ("2026-10-22") as "Oct 22, 2026". */
export function formatDate(iso: string) {
  return dateFormatter.format(new Date(iso));
}

/** Turns "Product Updates" into "product-updates" for URLs and anchor ids. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * The current year, for copyright lines. Cache Components forbids reading the
 * clock during prerender, so the value is cached and refreshed daily.
 */
export async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
