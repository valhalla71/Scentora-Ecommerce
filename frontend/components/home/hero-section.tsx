import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/navigation";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function HeroSection({ locale, dictionary }: HeroSectionProps) {
  const { hero } = dictionary.home;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-border/40"
      style={{ paddingBlock: spacing.section.lg }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,var(--accent)_0%,transparent_55%)] opacity-[0.12]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-32 top-1/4 size-96 rounded-full bg-primary/5 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-start">
            <p
              className={cn(
                textVariants({ variant: "label" }),
                "mb-4 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-accent-foreground",
              )}
            >
              <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
              {hero.eyebrow}
            </p>

            <h1
              id="hero-heading"
              className={cn(textVariants({ variant: "display" }), "text-balance")}
            >
              {hero.title}
            </h1>

            <p
              className={cn(
                textVariants({ variant: "body" }),
                "mx-auto mt-6 max-w-2xl text-pretty text-muted-foreground lg:mx-0",
              )}
            >
              {hero.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Button
                render={
                  <Link href={localizeHref("/catalog", locale)}>
                    {hero.primaryCta}
                    <ArrowRight
                      className="transition-transform group-hover/button:translate-x-0.5 rtl:rotate-180 rtl:group-hover/button:-translate-x-0.5"
                      data-icon="inline-end"
                    />
                  </Link>
                }
                size="lg"
              />

              <Button
                variant="outline"
                size="lg"
                render={
                  <Link href={localizeHref("/about", locale)}>
                    {hero.secondaryCta}
                  </Link>
                }
              />
            </div>
          </div>

          {/*
           * Reserved visual slot — sized and positioned for a future 3D/interactive
           * perfume visualization. Intentionally empty (gradient only) for now;
           * hidden below `lg` to keep the mobile hero compact.
           */}
          <div
            aria-hidden="true"
            data-slot="hero-visual"
            className="hover-lift relative hidden aspect-[4/5] overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-accent/15 via-muted to-primary/10 shadow-luxury-lg lg:block"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,var(--accent)_0%,transparent_60%)] opacity-40" />
          </div>
        </div>
      </Container>
    </section>
  );
}
