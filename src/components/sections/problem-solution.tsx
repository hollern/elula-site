import type { LucideIcon } from "lucide-react";
import { CircleCheck, CircleX } from "lucide-react";

import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { home } from "@/lib/content";
import { cn } from "@/lib/utils";

type ColumnProps = {
  title: string;
  points: string[];
  icon: LucideIcon;
  tone: "problem" | "solution";
};

function Column({ title, points, icon: Icon, tone }: ColumnProps) {
  const solution = tone === "solution";

  return (
    <Card className={cn("h-full", solution ? "ring-2 ring-primary" : "bg-muted/40")}>
      <CardHeader>
        <CardTitle>
          <h3 className={cn("text-lg", !solution && "text-muted-foreground")}>{title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          {points.map((point) => (
            <li key={point} className="flex gap-3">
              <Icon
                className={cn("mt-0.5 size-5 shrink-0", solution ? "text-primary" : "text-muted-foreground")}
                aria-hidden="true"
              />
              <span className={cn(!solution && "text-muted-foreground")}>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function ProblemSolution() {
  const { eyebrow, title, subtitle, problem, solution } = home.problemSolution;

  return (
    <Section id="solution">
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Column {...problem} icon={CircleX} tone="problem" />
        <Column {...solution} icon={CircleCheck} tone="solution" />
      </div>
    </Section>
  );
}

export { ProblemSolution };
