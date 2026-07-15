import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { getProductById, getRelatedProducts } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductDetailPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { locale: rawLocale, id } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  const product = getProductById(id);
  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(id, product.category, 3);
  const { product: productStrings } = dictionary.common;

  return (
    <main style={{ paddingBlock: spacing.section.lg }}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 mb-16">
          <div className="flex items-center justify-center">
            <div className="aspect-square w-full rounded-2xl bg-muted" />
          </div>

          <div className="flex flex-col justify-start">
            <div className="mb-6">
              <p
                className={cn(
                  textVariants({ variant: "bodySm" }),
                  "mb-3 text-muted-foreground uppercase tracking-wide",
                )}
              >
                {product.category}
              </p>

              <h1 className={cn(textVariants({ variant: "h1" }), "mb-6")}>
                {product.name}
              </h1>

              <div className="mb-6 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "text-lg",
                        i < Math.floor(product.rating) ? "text-yellow-400" : "text-muted",
                      )}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className={textVariants({ variant: "bodySm" })}>
                  {product.rating}
                </span>
                <span
                  className={cn(
                    textVariants({ variant: "bodySm" }),
                    "text-muted-foreground",
                  )}
                >
                  ({product.reviewCount} {productStrings.reviews})
                </span>
              </div>

              <p
                className={cn(
                  textVariants({ variant: "h2" }),
                  "mb-6 font-semibold text-primary",
                )}
              >
                {product.price}
              </p>

              <p
                className={cn(
                  textVariants({ variant: "body" }),
                  "mb-8 text-muted-foreground leading-relaxed",
                )}
              >
                {product.description}
              </p>
            </div>

            <div className="mb-8 flex gap-3">
              <Button variant="default" size="lg" className="flex-1">
                {productStrings.addToCart}
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                {productStrings.addToWishlist}
              </Button>
            </div>

            <div className="space-y-6 border-t border-border/60 pt-8">
              <div>
                <h3
                  className={cn(
                    textVariants({ variant: "h4" }),
                    "mb-4 text-foreground",
                  )}
                >
                  {productStrings.notes}
                </h3>

                <div className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <p className={cn(textVariants({ variant: "label" }), "mb-2 text-muted-foreground uppercase tracking-wide")}>
                      {productStrings.topNotes}
                    </p>
                    <ul className={cn(textVariants({ variant: "bodySm" }), "space-y-1")}>
                      {product.topNotes.map((note, idx) => (
                        <li key={idx} className="text-foreground">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className={cn(textVariants({ variant: "label" }), "mb-2 text-muted-foreground uppercase tracking-wide")}>
                      {productStrings.heartNotes}
                    </p>
                    <ul className={cn(textVariants({ variant: "bodySm" }), "space-y-1")}>
                      {product.heartNotes.map((note, idx) => (
                        <li key={idx} className="text-foreground">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className={cn(textVariants({ variant: "label" }), "mb-2 text-muted-foreground uppercase tracking-wide")}>
                      {productStrings.baseNotes}
                    </p>
                    <ul className={cn(textVariants({ variant: "bodySm" }), "space-y-1")}>
                      {product.baseNotes.map((note, idx) => (
                        <li key={idx} className="text-foreground">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2
              className={cn(
                textVariants({ variant: "h2" }),
                "mb-8 text-center",
              )}
            >
              {productStrings.relatedProducts}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {relatedProducts.map((relatedProduct) => (
                <article
                  key={relatedProduct.id}
                  className="group flex flex-col rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 aspect-square rounded-lg bg-muted" />

                  <h3 className={cn(textVariants({ variant: "h4" }), "mb-2")}>
                    {relatedProduct.name}
                  </h3>

                  <p
                    className={cn(
                      textVariants({ variant: "bodySm" }),
                      "mb-4 text-muted-foreground",
                    )}
                  >
                    {relatedProduct.category}
                  </p>

                  <p className={cn(textVariants({ variant: "bodySm" }), "mb-6 font-semibold")}>
                    {relatedProduct.price}
                  </p>

                  <Button
                    variant="default"
                    size="sm"
                    className="mt-auto"
                  >
                    {productStrings.addToCart}
                  </Button>
                </article>
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
