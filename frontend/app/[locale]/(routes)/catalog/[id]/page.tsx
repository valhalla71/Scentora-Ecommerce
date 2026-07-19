import { notFound } from "next/navigation";
import { Gem, ShieldCheck, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/product/product-gallery";
import { PurchaseActions } from "@/components/product/purchase-actions";
import { RelatedProducts } from "@/components/product/related-products";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { ApiError, createApiFoundation, createCommerceApi } from "@/lib/api";
import type { Product } from "@/lib/products";
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

  const commerceApi = createCommerceApi(createApiFoundation().client);
  let product: Product;
  let relatedProducts: Product[];
  try {
    product = await commerceApi.getProduct(id);
    const listing = await commerceApi.getProducts(1, 100);
    relatedProducts = listing.products
      .filter((item) => item.id !== id && item.category === product.category)
      .slice(0, 4);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    return (
      <main style={{ paddingBlock: spacing.section.lg }}>
        <Container>
          <p className="py-12 text-center text-destructive">
            {error instanceof Error ? error.message : "Unable to load this product."}
          </p>
        </Container>
      </main>
    );
  }
  const { product: productStrings } = dictionary.common;
  const galleryImages = product.images?.length
    ? product.images
    : product.image
      ? [product.image]
      : [];
  const noteGroups = (
    [
      ["topNotes", productStrings.topNotes],
      ["heartNotes", productStrings.heartNotes],
      ["baseNotes", productStrings.baseNotes],
    ] as const
  )
    .map(([key, label]) => ({ key, label, notes: product[key] }))
    .filter((group) => group.notes.length > 0);
  const hasNotes = noteGroups.length > 0;

  return (
    <main style={{ paddingBlock: spacing.section.lg }}>
      <Container>
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Home", href: `/${locale}` },
              { label: "Products", href: `/${locale}/catalog` },
              {
                label: product.category,
                href: `/${locale}/catalog?category=${encodeURIComponent(product.category)}`,
              },
              { label: product.name },
            ]}
          />
        </div>

        {/* Product Section */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 mb-16">
          {/* Product Gallery */}
          <ProductGallery
            images={galleryImages}
            name={product.name}
            galleryLabel={productStrings.gallery}
          />

          {/* Product Info */}
          <div className="flex flex-col justify-start">
            <div className="mb-6">
              <p className={cn(textVariants({ variant: "eyebrow" }), "mb-3")}>
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
                  <Badge variant={product.stock > 0 ? "success" : "destructive"}>
                    {product.stock > 0 ? productStrings.inStock : productStrings.outOfStock}
                  </Badge>
                  {product.stock > 0 ? (
                    <span className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                      {product.stock} {productStrings.available}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mb-8">
              <PurchaseActions
                productId={product.id}
                stock={product.stock}
                addToCartLabel={productStrings.addToCart}
                addToWishlistLabel={productStrings.addToWishlist}
                quantityLabel={productStrings.quantity}
                increaseQuantityLabel={productStrings.increaseQuantity}
                decreaseQuantityLabel={productStrings.decreaseQuantity}
                shareLabel={productStrings.share}
              />
            </div>

            {/* Fragrance Notes */}
            {hasNotes ? (
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
                    {noteGroups.map(({ key, label, notes }) => (
                      <div key={key}>
                        <p className={cn(textVariants({ variant: "eyebrow" }), "mb-3")}>
                          {label}
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {notes.map((note, idx) => (
                            <li
                              key={idx}
                              className={cn(
                                textVariants({ variant: "bodySm" }),
                                "rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-foreground",
                              )}
                            >
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Fragrance Storytelling */}
        {product.description ? (
          <div className="mb-16 border-t border-border/40 pt-12">
            <div className="mx-auto max-w-3xl text-center">
              <p className={cn(textVariants({ variant: "eyebrow" }), "mb-3")}>
                {productStrings.story.eyebrow}
              </p>
              <h2 className={cn(textVariants({ variant: "h2" }), "mb-6 text-balance")}>
                {productStrings.story.heading}
              </h2>
              <p
                className={cn(
                  textVariants({ variant: "h4" }),
                  "text-balance font-normal italic text-muted-foreground",
                )}
              >
                &ldquo;{product.description}&rdquo;
              </p>
            </div>

            {/* Brand positioning */}
            <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-3">
              {[
                { icon: Sparkles, label: productStrings.positioning.curated },
                { icon: Gem, label: productStrings.positioning.crafted },
                { icon: ShieldCheck, label: productStrings.positioning.concierge },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <Icon className="size-5 text-accent" aria-hidden="true" />
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Related Products */}
        <RelatedProducts
          products={relatedProducts}
          locale={locale}
          title={productStrings.relatedProducts}
        />
      </Container>
    </main>
  );
}
