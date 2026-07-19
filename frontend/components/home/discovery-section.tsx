"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Container } from "@/components/layout/container";
import { useCommerce } from "@/components/providers/commerce-provider";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/navigation";
import type { Dictionary } from "@/i18n/types";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

type DiscoverySectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const MAX_TILES = 6;

/**
 * Fragrance-family discovery tiles, driven by live categories (already
 * fetched once by `CommerceProvider`). Links to `/catalog?category=<slug>`;
 * `catalog-content.tsx` resolves the slug back to a category name for
 * filtering. Renders nothing while there is no usable category data, so a
 * slow/failed fetch never shows a broken homepage section.
 */
export function DiscoverySection({ locale, dictionary }: DiscoverySectionProps) {
  const { discovery } = dictionary.home;
  const { categories, catalogLoading, catalogError } = useCommerce();

  if (!catalogLoading && (catalogError || categories.length === 0)) {
    return null;
  }

  const tiles = categories.slice(0, MAX_TILES);

  return (
    <section aria-labelledby="discovery-heading" style={{ paddingBlock: spacing.section.lg }}>
      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className={cn(textVariants({ variant: "eyebrow" }), "mb-3")}>
            {discovery.eyebrow}
          </p>
          <h2
            id="discovery-heading"
            className={cn(textVariants({ variant: "h2" }), "mb-4 text-balance")}
          >
            {discovery.title}
          </h2>
          <p className={cn(textVariants({ variant: "body" }), "text-pretty text-muted-foreground")}>
            {discovery.description}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {catalogLoading
            ? Array.from({ length: MAX_TILES }).map((_, index) => (
                <div
                  key={index}
                  aria-hidden="true"
                  className="aspect-[4/3] animate-pulse rounded-xl border border-border/60 bg-muted"
                />
              ))
            : tiles.map((category) => (
                <Link
                  key={category.id}
                  href={`${localizeHref("/catalog", locale)}?category=${encodeURIComponent(category.slug)}`}
                  className="hover-lift group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-xl border border-border/60 bg-muted p-6 shadow-luxury-sm hover:shadow-luxury-md"
                  style={
                    category.image
                      ? {
                          backgroundImage: `url("${category.image}")`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : undefined
                  }
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent transition-opacity group-hover:opacity-90"
                  />

                  {!category.image ? (
                    <Sparkles
                      aria-hidden="true"
                      className="absolute end-5 top-5 size-5 text-accent/70"
                    />
                  ) : null}

                  <div className="relative z-10">
                    <h3 className={cn(textVariants({ variant: "h4" }), "mb-1 text-white")}>
                      {category.name}
                    </h3>

                    {category.description ? (
                      <p
                        className={cn(
                          textVariants({ variant: "bodySm" }),
                          "line-clamp-2 text-white/80",
                        )}
                      >
                        {category.description}
                      </p>
                    ) : null}

                    <span
                      className={cn(
                        textVariants({ variant: "label" }),
                        "mt-3 inline-flex items-center gap-1 text-white transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5",
                      )}
                    >
                      {discovery.exploreLabel}
                    </span>
                  </div>
                </Link>
              ))}
        </div>
      </Container>
    </section>
  );
}
