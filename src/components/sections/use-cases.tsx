import { Check } from "lucide-react";

import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { home } from "@/lib/content";
import type { UseCase } from "@/lib/types";

function UseCaseCard({ icon: Icon, title, description, points }: UseCase) {
  return (
    <Card className="h-full">
      <CardHeader className="gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <CardTitle className="mt-2">
          <h3 className="text-lg">{title}</h3>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3 text-sm">
          {points.map((point) => (
            <li key={point} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function UseCases() {
  const { eyebrow, title, subtitle, items } = home.useCases;

  return (
    <Section id="use-cases">
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((useCase) => (
          <UseCaseCard key={useCase.title} {...useCase} />
        ))}
      </div>
    </Section>
  );
}

export { UseCases };
