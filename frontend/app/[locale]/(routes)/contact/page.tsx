import type { LocaleParamsPromise } from "@/i18n/types";
import { isValidLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { Container } from "@/components/layout/container";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";
import { spacing } from "@/lib/design-system/tokens";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";

export default async function ContactPage(props: LocaleParamsPromise) {
  const params = await props.params;
  const rawLocale = params.locale;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);
  const { contact } = dictionary.common;

  return (
    <main>
      <section style={{ paddingBlock: spacing.section.lg }} className="border-b border-border/40">
        <Container>
          <div className="max-w-2xl">
            <h1 className={cn(textVariants({ variant: "h1" }), "mb-4")}>
              {contact.title}
            </h1>
            <p className={cn(textVariants({ variant: "body" }), "text-lg text-muted-foreground")}>
              Have a question or suggestion? We'd love to hear from you. Get in touch with our team
              and we'll respond as soon as possible.
            </p>
          </div>
        </Container>
      </section>

      <section style={{ paddingBlock: spacing.section.lg }}>
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ContactForm contact={contact} />
            </div>

            <div className="space-y-8">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className={cn(textVariants({ variant: "h4" }))}>Email</h3>
                </div>
                <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground")}>
                  support@scentora.com
                </p>
                <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground mt-1")}>
                  We typically respond within 24 hours
                </p>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className={cn(textVariants({ variant: "h4" }))}>Phone</h3>
                </div>
                <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground")}>
                  +1 (555) 123-4567
                </p>
                <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground mt-1")}>
                  Monday–Friday, 9 AM–6 PM EST
                </p>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className={cn(textVariants({ variant: "h4" }))}>Address</h3>
                </div>
                <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground")}>
                  123 Fragrance Boulevard<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>

              <div className="rounded-lg border border-border/40 p-6">
                <h3 className={cn(textVariants({ variant: "h4" }), "mb-3")}>Office Hours</h3>
                <div className={cn(textVariants({ variant: "bodySm" }), "space-y-2 text-muted-foreground")}>
                  <p>Monday–Friday: 9 AM–6 PM</p>
                  <p>Saturday: 10 AM–4 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section style={{ paddingBlock: spacing.section.lg }} className="border-t border-border/40 bg-muted/30">
        <Container size="narrow">
          <div className="rounded-lg border border-border/40 p-8 text-center">
            <h2 className={cn(textVariants({ variant: "h2" }), "mb-4")}>
              Map Placeholder
            </h2>
            <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
              <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground")}>
                Interactive map would be displayed here
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
