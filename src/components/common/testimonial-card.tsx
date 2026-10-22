import { PersonAvatar } from "@/components/common/person-avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";

type TestimonialCardProps = Testimonial & {
  className?: string;
};

function TestimonialCard({ quote, author, className }: TestimonialCardProps) {
  const byline = [author.role, author.company].filter(Boolean).join(", ");

  return (
    <Card data-slot="testimonial-card" className={cn("h-full", className)}>
      <figure className="contents">
        <CardContent className="flex-1">
          <blockquote className="text-base leading-relaxed text-pretty">
            <p>&ldquo;{quote}&rdquo;</p>
          </blockquote>
        </CardContent>
        <CardFooter className="border-t-0 bg-transparent">
          <figcaption className="flex items-center gap-3">
            <PersonAvatar person={author} size="lg" />
            <div className="flex flex-col">
              <span className="font-medium">{author.name}</span>
              {byline && <span className="text-muted-foreground">{byline}</span>}
            </div>
          </figcaption>
        </CardFooter>
      </figure>
    </Card>
  );
}

export { TestimonialCard };
