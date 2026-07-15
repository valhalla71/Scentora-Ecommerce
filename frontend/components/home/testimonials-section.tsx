import { Quote } from "lucide-react";

import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/i18n/types";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

type TestimonialsSectionProps = {
  dictionary: Dictionary;
};

export function TestimonialsSection({ dictionary }: TestimonialsSectionProps) {
  const { testimonials } = dictionary.home;

  return (
    <section
      aria-labelledby="testimonials-heading"
      style={{ paddingBlock: spacing.section.md }}
    >
      <Container>
        <h2
          id="testimonials-heading"
          className={cn(
            textVariants({ variant: "h2" }),
            "mb-10 text-center sm:mb-12",
          )}
        >
          {testimonials.title}
        </h2>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.items.map((item, index) => (
            <li
              key={index}
              className="rounded-xl border border-border/60 bg-card p-6 text-start shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <Quote className="size-5" aria-hidden="true" />
              </div>
              <p
                className={cn(
                  textVariants({ variant: "body" }),
                  "mb-6 text-foreground",
                )}
              >
                "{item.text}"
              </p>
              <div>
                <p className={cn(textVariants({ variant: "bodySm" }), "font-semibold")}>
                  {item.author}
                </p>
                <p
                  className={cn(
                    textVariants({ variant: "bodySm" }),
                    "text-muted-foreground",
                  )}
                >
                  {item.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
