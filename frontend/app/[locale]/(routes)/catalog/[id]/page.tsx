import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { getProductById, getRelatedProducts } from "@/lib/products";
import { cn } from "@/lib/utils";
import { Heart, Share2, ShoppingCart } from "lucide-react";

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
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/catalog" },
              { label: product.category, href: `/catalog?category=${product.category}` },
              { label: product.name },
            ]}
          />
        </div>

        {/* Product Section */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 mb-16">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-muted to-muted/60 relative group">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Product Image
              </div>
              <Badge className="absolute top-4 left-4">New</Badge>
            </div>
          </div>

          {/* Product Info */}
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

              {/* Rating */}
              <div className="mb-6 flex items-center gap-3">
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
                <span className={cn(textVariants({ variant: "bodySm" }), "font-medium")}>
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

              {/* Price & Availability */}
              <div className="mb-6 space-y-3">
                <p
                  className={cn(
                    textVariants({ variant: "h2" }),
                    "font-semibold text-primary",
                  )}
                >
                  {product.price}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="success">In Stock</Badge>
                  <span className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    {product.stock} available
                  </span>
                </div>
              </div>

              <p
                className={cn(
                  textVariants({ variant: "body" }),
                  "mb-8 text-muted-foreground leading-relaxed",
                )}
              >
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="mb-8 flex gap-3">
              <Button variant="default" size="lg" className="flex-1 gap-2">
                <ShoppingCart className="w-4 h-4" />
                {productStrings.addToCart}
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Heart className="w-4 h-4" />
                {productStrings.addToWishlist}
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Fragrance Notes */}
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

        {/* Related Products */}
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
                  className="group flex flex-col rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/40"
                >
                  <div className="mb-4 aspect-square rounded-lg bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      Product Image
                    </div>
                  </div>

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
                    className="mt-auto w-full gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
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
