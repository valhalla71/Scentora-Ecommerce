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
      style={{ paddingBlock: spacing.section.md }}
    >
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_20%,var(--accent)_0%,transparent_60%)] opacity-20"
          />

          <div className="relative mx-auto max-w-2xl">
            <h2
              id="cta-heading"
              className={cn(textVariants({ variant: "h2" }), "text-balance")}
            >
              {cta.title}
            </h2>
            <p
              className={cn(
                textVariants({ variant: "body" }),
                "mt-4 text-pretty text-primary-foreground/80",
              )}
            >
              {cta.description}
            </p>

            <Button
              className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
              size="lg"
              render={
                <Link href={localizeHref("/catalog", locale)}>
                  {cta.button}
                  <ArrowRight
                    className="transition-transform group-hover/button:translate-x-0.5 rtl:rotate-180 rtl:group-hover/button:-translate-x-0.5"
                    data-icon="inline-end"
                  />
                </Link>
              }
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
