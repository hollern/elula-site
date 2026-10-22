"use client";

import { NewsletterForm, type NewsletterAction } from "@/components/common/newsletter-form";

// Stand-in for the real server action: fails for "fail@..." to show the error state.
const demoAction: NewsletterAction = async (email) => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return email.startsWith("fail@") ? { ok: false } : { ok: true };
};

export function NewsletterDemo(props: { title?: string; description?: string }) {
  return <NewsletterForm action={demoAction} {...props} />;
}
