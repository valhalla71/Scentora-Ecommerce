import { Gem, ShieldCheck, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/i18n/types";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

type FeaturesSectionProps = {
  dictionary: Dictionary;
};

const featureIcons = {
  curated: Sparkles,
  authentic: ShieldCheck,
  experience: Gem,
} as const;

const featureKeys = ["curated", "authentic", "experience"] as const;

export function FeaturesSection({ dictionary }: FeaturesSectionProps) {
  const { features } = dictionary.home;

  return (
    <section
      aria-labelledby="features-heading"
      style={{ paddingBlock: spacing.section.md }}
    >
      <Container>
        <h2
          id="features-heading"
          className={cn(
            textVariants({ variant: "h2" }),
            "mb-10 text-center sm:mb-12",
          )}
        >
          {features.title}
        </h2>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featureKeys.map((key) => {
            const item = features.items[key];
            const Icon = featureIcons[key];

            return (
              <li
                key={key}
                className="rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className={textVariants({ variant: "h4" })}>{item.title}</h3>
                <p
                  className={cn(
                    textVariants({ variant: "bodySm" }),
                    "mt-2 text-muted-foreground",
                  )}
                >
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
