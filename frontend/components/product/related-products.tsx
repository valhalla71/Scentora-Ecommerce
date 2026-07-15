import Link from "next/link";
import { Container } from "@/components/layout/container";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/navigation";
import { getRelatedProducts } from "@/lib/products";

interface RelatedProductsProps {
  productId: string;
  category: string;
  locale: Locale;
  title: string;
}

export function RelatedProducts({
  productId,
  category,
  locale,
  title,
}: RelatedProductsProps) {
  const relatedProducts = getRelatedProducts(productId, category, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border/40 py-12">
      <Container>
        <h2 className={cn(textVariants({ variant: "h3" }), "mb-8 text-center")}>
          {title}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((product) => (
            <Link
              key={product.id}
              href={localizeHref(`/catalog/${product.id}`, locale)}
              className="group"
            >
              <article className="rounded-xl border border-border/60 bg-card p-6 text-start shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 aspect-square rounded-lg bg-muted" />
                <h3 className={cn(textVariants({ variant: "h4" }), "mb-2 group-hover:text-primary transition-colors")}>
                  {product.name}
                </h3>
                <p
                  className={cn(
                    textVariants({ variant: "bodySm" }),
                    "text-muted-foreground mb-3",
                  )}
                >
                  {product.category}
                </p>
                <div className="flex items-center justify-between">
                  <p
                    className={cn(
                      textVariants({ variant: "bodySm" }),
                      "font-semibold",
                    )}
                  >
                    {product.price}
                  </p>
                  <span className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    {product.rating.toFixed(1)}★
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
