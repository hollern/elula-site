import { DocsLayout } from "@/components/layout/docs-layout";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return <DocsLayout>{children}</DocsLayout>;
}
