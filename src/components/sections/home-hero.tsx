import { Hero } from "@/components/common/hero";
import { home } from "@/lib/content";
import { cn } from "@/lib/utils";

// Placeholder product shot drawn with theme tokens until real screenshots exist.
function ProductPreview() {
  const columns = [
    { cards: 3, accent: 0 },
    { cards: 2, accent: 1 },
    { cards: 3, accent: 2 },
  ];

  return (
    <div
      role="img"
      aria-label={home.hero.previewLabel}
      className="overflow-hidden rounded-xl bg-card shadow-2xl ring-1 ring-border"
    >
      <div className="flex items-center gap-1.5 border-b bg-muted/50 px-4 py-3">
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="ml-4 h-4 w-40 rounded bg-muted" />
      </div>
      <div className="grid grid-cols-[auto_1fr]">
        <div className="hidden w-44 flex-col gap-2 border-r p-4 sm:flex">
          <span className="mb-2 h-4 w-20 rounded bg-primary/20" />
          {["w-28", "w-32", "w-24", "w-36", "w-20"].map((width, i) => (
            <span
              key={width}
              className={cn("h-3 rounded", width, i === 1 ? "bg-primary/60" : "bg-muted")}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4 p-4 md:p-6">
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-2 rounded-lg p-3 ring-1 ring-border">
                <span className="h-2.5 w-12 rounded bg-muted" />
                <span className="h-5 w-16 rounded bg-foreground/15" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {columns.map((column, c) => (
              <div key={c} className="flex flex-col gap-2 rounded-lg bg-muted/50 p-2">
                <span className="h-2.5 w-14 rounded bg-muted-foreground/25" />
                {Array.from({ length: column.cards }, (_, i) => (
                  <div key={i} className="flex flex-col gap-1.5 rounded-md bg-card p-2 ring-1 ring-border">
                    <span
                      className={cn("h-2 w-3/4 rounded", i === column.accent ? "bg-primary/50" : "bg-muted")}
                    />
                    <span className="h-2 w-1/2 rounded bg-muted" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeHero() {
  const { eyebrow, title, description, primaryCta, secondaryCta } = home.hero;

  return (
    <Hero
      eyebrow={eyebrow}
      title={title}
      description={description}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      media={<ProductPreview />}
      className="bg-linear-to-b from-muted/60 to-background"
    />
  );
}

export { HomeHero };
