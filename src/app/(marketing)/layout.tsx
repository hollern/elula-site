import { MarketingLayout } from "@/components/layout/marketing-layout";

export default function Layout({ children }: LayoutProps<"/">) {
  return <MarketingLayout>{children}</MarketingLayout>;
}
