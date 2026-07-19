import Link from "next/link";

import { textVariants } from "@/lib/design-system/typography";
import { resolveProductImage } from "@/lib/product-images";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  /** When provided, the whole card links to the product detail page. */
  href?: string;
  name: string;
  category?: string;
  price?: string;
  image?: string;
  imageAlt?: string;
  rating?: number;
  reviewCount?: number;
  className?: string;
}

/**
 * Reusable luxury product card — shared visual primitive for product
 * showcases and listings. Presentational only: callers own data fetching,
 * cart actions, and any footer/CTA slot they need alongside it.
 */
export function ProductCard({
  href,
  name,
  category,
  price,
  image,
  imageAlt,
  rating,
  reviewCount,
  className,
}: ProductCardProps) {
  const resolvedImage = resolveProductImage(image, category);
  const content = (
    <article
      data-slot="product-card"
      className={cn(
        "hover-lift group flex h-full flex-col rounded-xl border border-border/60 bg-card p-6 text-start shadow-luxury-sm hover:shadow-luxury-md",
        className
      )}
    >
      <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-muted">
        <div
          role="img"
          aria-label={imageAlt ?? name}
          className="h-full w-full bg-cover bg-center transition-transform duration-500 ease-luxury group-hover:scale-105"
          style={{ backgroundImage: `url("${resolvedImage}")` }}
        />
      </div>

      {category ? (
        <p className={cn(textVariants({ variant: "eyebrow" }), "mb-1.5")}>
          {category}
        </p>
      ) : null}

      <h3
        className={cn(
          textVariants({ variant: "h4" }),
          "mb-2 transition-colors group-hover:text-primary"
        )}
      >
        {name}
      </h3>

      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        {price ? (
          <p className={cn(textVariants({ variant: "bodySm" }), "font-semibold")}>
            {price}
          </p>
        ) : null}

        {typeof rating === "number" ? (
          <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
            <span className="text-accent">★</span> {rating.toFixed(1)}
            {typeof reviewCount === "number" ? ` (${reviewCount})` : null}
          </p>
        ) : null}
      </div>
    </article>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}
