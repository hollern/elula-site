import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/lib/types";
import { cn } from "@/lib/utils";

type FaqListProps = {
  faqs: Faq[];
  className?: string;
};

function FaqList({ faqs, className }: FaqListProps) {
  return (
    <Accordion
      data-slot="faq-list"
      type="single"
      collapsible
      className={cn("mx-auto w-full max-w-3xl", className)}
    >
      {faqs.map((faq) => (
        <AccordionItem key={faq.question} value={faq.question}>
          <AccordionTrigger className="text-base">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export { FaqList };
