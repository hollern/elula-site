import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Copy, Menu, Search, Sparkles } from "lucide-react";

import { ThemeToggle } from "@/components/common/theme-toggle";
import {
  Blockquote,
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  Large,
  Lead,
  List,
  Muted,
  P,
  Small,
} from "@/components/common/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DataTableDemo } from "./_components/data-table-demo";
import { preview } from "./_data";

export const metadata: Metadata = {
  title: preview.title,
  robots: { index: false, follow: false },
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <H2>{title}</H2>
      {children}
    </section>
  );
}

export default function UiPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const { nav, sections: s } = preview;

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4">
          <Link href="#" className="font-heading font-semibold">
            {nav.brand}
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{nav.product.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-96 gap-1">
                    {nav.product.links.map((link) => (
                      <li key={link.title}>
                        <NavigationMenuLink asChild className="flex-col items-start gap-1">
                          <Link href={link.href}>
                            <div className="font-medium">{link.title}</div>
                            <div className="text-muted-foreground">
                              {link.description}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {nav.simpleLinks.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href={link.href}>{link.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label={nav.menuLabel}>
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>{nav.brand}</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4">
                  {[...nav.product.links, ...nav.simpleLinks].map((link) => (
                    <Button key={link.title} variant="ghost" className="justify-start" asChild>
                      <Link href={link.href}>{link.title}</Link>
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-10">
        <div className="flex flex-col gap-2">
          <H1>{preview.title}</H1>
          <Lead>{preview.description}</Lead>
        </div>

        <Section title={s.typography}>
          <div>
            <H1 as="p">{preview.typography.h1}</H1>
            <H2 as="p" className="mt-6">{preview.typography.h2}</H2>
            <H3 as="p" className="mt-6">{preview.typography.h3}</H3>
            <H4 as="p" className="mt-6">{preview.typography.h4}</H4>
            <P>{preview.typography.p}</P>
            <P>
              {preview.typography.codePrefix}
              <InlineCode>{preview.typography.code}</InlineCode>
              {preview.typography.codeSuffix}
            </P>
            <Blockquote>{preview.typography.quote}</Blockquote>
            <List>
              {preview.typography.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </List>
            <div className="flex flex-wrap items-baseline gap-4">
              <Large>{preview.typography.large}</Large>
              <Small>{preview.typography.small}</Small>
              <Muted>{preview.typography.muted}</Muted>
            </div>
          </div>
        </Section>

        <Section title={s.buttons}>
          <div className="flex flex-wrap items-center gap-2">
            <Button>{preview.buttons.default}</Button>
            <Button variant="secondary">{preview.buttons.secondary}</Button>
            <Button variant="outline">{preview.buttons.outline}</Button>
            <Button variant="ghost">{preview.buttons.ghost}</Button>
            <Button variant="destructive">{preview.buttons.destructive}</Button>
            <Button variant="link">{preview.buttons.link}</Button>
            <Button size="lg">
              {preview.buttons.withIcon}
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonGroup>
              {preview.buttons.group.map((label) => (
                <Button key={label} variant="outline">
                  {label}
                </Button>
              ))}
            </ButtonGroup>
            <ButtonGroup>
              <Input defaultValue={preview.typography.code} readOnly className="w-40" />
              <Button variant="outline" size="icon" aria-label={preview.buttons.copyLabel}>
                <Copy />
              </Button>
            </ButtonGroup>
          </div>
        </Section>

        <Section title={s.badges}>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{preview.badges[0]}</Badge>
            <Badge variant="secondary">{preview.badges[1]}</Badge>
            <Badge variant="outline">{preview.badges[2]}</Badge>
            <Badge variant="destructive">{preview.badges[3]}</Badge>
            <Separator orientation="vertical" className="mx-2 h-6" />
            <AvatarGroup>
              {preview.avatars.map((initials) => (
                <Avatar key={initials}>
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
          </div>
        </Section>

        <Section title={s.cards}>
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>{preview.pricing.title}</CardTitle>
              <CardDescription>{preview.pricing.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <span className="text-4xl font-bold">{preview.pricing.price}</span>
                <span className="text-muted-foreground">{preview.pricing.period}</span>
              </div>
              <Field orientation="horizontal">
                <Switch id="annual" />
                <FieldLabel htmlFor="annual">{preview.pricing.annualLabel}</FieldLabel>
              </Field>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{preview.pricing.cta}</Button>
            </CardFooter>
          </Card>
        </Section>

        <Section title={s.tabs}>
          <Tabs defaultValue={preview.tabs[0].value} className="max-w-md">
            <TabsList>
              {preview.tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {preview.tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <pre className="rounded-lg bg-muted p-4 font-mono text-sm">{tab.code}</pre>
              </TabsContent>
            ))}
          </Tabs>
        </Section>

        <Section title={s.accordion}>
          <Accordion type="single" collapsible className="max-w-xl">
            {preview.faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        <Section title={s.forms}>
          <FieldGroup className="max-w-sm">
            <Field>
              <FieldLabel htmlFor="email">{preview.form.emailLabel}</FieldLabel>
              <Input id="email" type="email" placeholder={preview.form.emailPlaceholder} />
              <FieldDescription>{preview.form.emailDescription}</FieldDescription>
            </Field>
            <InputGroup>
              <InputGroupInput placeholder={preview.form.searchPlaceholder} />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupText>{preview.form.searchShortcut}</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <Button>{preview.form.subscribe}</Button>
          </FieldGroup>
        </Section>

        <Section title={s.items}>
          <ItemGroup className="max-w-xl">
            {preview.items.map((item) => (
              <Item key={item.title} variant="outline">
                <ItemMedia variant="icon">
                  <Sparkles />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemDescription>{item.description}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button variant="outline" size="sm">
                    {preview.itemAction}
                  </Button>
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
        </Section>

        <Section title={s.table}>
          <Table>
            <TableCaption>{preview.invoices.caption}</TableCaption>
            <TableHeader>
              <TableRow>
                {preview.invoices.headers.map((h, i) => (
                  <TableHead key={h} className={i === 2 ? "text-right" : undefined}>
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {preview.invoices.rows.map(([id, status, amount]) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">{id}</TableCell>
                  <TableCell>{status}</TableCell>
                  <TableCell className="text-right">{amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Section title={s.dataTable}>
          <DataTableDemo />
        </Section>

        <Section title={s.sheet}>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-fit">
                {preview.sheet.trigger}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{preview.sheet.title}</SheetTitle>
                <SheetDescription>{preview.sheet.description}</SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">{preview.sheet.close}</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Section>
      </main>
    </>
  );
}
