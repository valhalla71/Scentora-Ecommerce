import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/navigation";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

type CtaSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function CtaSection({ locale, dictionary }: CtaSectionProps) {
  const { cta } = dictionary.home;

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden border-t border-border/40"
      style={{ paddingBlock: spacing.section.lg }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,var(--accent)_0%,transparent_60%)] opacity-[0.08]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-32 bottom-1/4 size-96 rounded-full bg-primary/5 blur-3xl"
      />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="cta-heading"
            className={cn(textVariants({ variant: "h2" }), "text-balance")}
          >
            {cta.title}
          </h2>

          <p
            className={cn(
              textVariants({ variant: "body" }),
              "mx-auto mt-6 text-pretty text-muted-foreground",
            )}
          >
            {cta.description}
          </p>

          <div className="mt-10 flex justify-center">
            <Button
              render={
                <Link href={localizeHref("/catalog", locale)}>
                  {cta.button}
                  <ArrowRight
                    className="transition-transform group-hover/button:translate-x-0.5 rtl:rotate-180 rtl:group-hover/button:-translate-x-0.5"
                    data-icon="inline-end"
                  />
                </Link>
              }
              size="lg"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
