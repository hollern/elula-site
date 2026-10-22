"use client";

import { useId, useState, useTransition, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { uiCopy } from "@/lib/content";
import { cn } from "@/lib/utils";

export type NewsletterResult = { ok: true } | { ok: false; message?: string };

/** Usually a server action; it receives the already-validated email. */
export type NewsletterAction = (email: string) => Promise<NewsletterResult>;

type NewsletterFormProps = {
  action: NewsletterAction;
  title?: string;
  description?: string;
  className?: string;
};

// Deliberately loose: the provider does the real validation.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function NewsletterForm({ action, title, description, className }: NewsletterFormProps) {
  const copy = uiCopy.newsletter;
  const id = useId();
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();

    if (!EMAIL_PATTERN.test(email)) {
      setError(copy.invalid);
      return;
    }

    setError(undefined);
    startTransition(async () => {
      try {
        const result = await action(email);
        if (result.ok) {
          toast.success(copy.success);
          form.reset();
        } else {
          setError(result.message ?? copy.error);
        }
      } catch {
        setError(copy.error);
      }
    });
  }

  return (
    <form
      data-slot="newsletter-form"
      noValidate
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-3", className)}
    >
      {title && <p className="font-heading font-medium">{title}</p>}
      <Field data-invalid={error ? true : undefined}>
        <FieldLabel htmlFor={id} className={cn(title && "sr-only")}>
          {copy.label}
        </FieldLabel>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id={id}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={copy.placeholder}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            disabled={pending}
            className="h-9 sm:flex-1"
            onChange={() => error && setError(undefined)}
          />
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? copy.submitting : copy.submit}
          </Button>
        </div>
        {error ? (
          <FieldError id={`${id}-error`}>{error}</FieldError>
        ) : (
          description && <FieldDescription>{description}</FieldDescription>
        )}
      </Field>
    </form>
  );
}

export { NewsletterForm };
