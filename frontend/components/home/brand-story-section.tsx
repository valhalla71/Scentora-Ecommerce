import { Quote } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import type { Dictionary } from "@/i18n/types";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

type BrandStorySectionProps = {
  dictionary: Dictionary;
};

export function BrandStorySection({ dictionary }: BrandStorySectionProps) {
  const { brandStory } = dictionary.home;

  return (
    <section
      aria-labelledby="brand-story-heading"
      className="bg-muted/30"
      style={{ paddingBlock: spacing.section.lg }}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <p className={cn(textVariants({ variant: "eyebrow" }), "mb-3")}>
              {brandStory.eyebrow}
            </p>

            <h2
              id="brand-story-heading"
              className={cn(textVariants({ variant: "h2" }), "mb-6 text-balance")}
            >
              {brandStory.title}
            </h2>

            <div className="space-y-4">
              {brandStory.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={cn(
                    textVariants({ variant: "body" }),
                    "text-pretty text-muted-foreground",
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <Card variant="elevated" className="hover-lift">
            <Quote className="mb-4 size-8 text-accent" aria-hidden="true" />
            <p
              className={cn(
                textVariants({ variant: "h4" }),
                "mb-4 text-balance font-normal italic",
              )}
            >
              &ldquo;{brandStory.quote}&rdquo;
            </p>
            <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
              — {brandStory.quoteAuthor}
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
