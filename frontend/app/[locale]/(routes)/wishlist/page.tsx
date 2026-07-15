import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";
import { mockWishlist } from "@/lib/wishlist";

type WishlistPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function WishlistPage({ params }: WishlistPageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  const { title, empty, items: itemsLabel, addToCart, remove, continueShopping, totalItems } =
    dictionary.common.wishlist;

  const wishlistItems = mockWishlist.items;
  const hasItems = wishlistItems.length > 0;

  return (
    <main style={{ paddingBlock: spacing.section.lg }}>
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <h1 className={cn(textVariants({ variant: "h1" }), "text-balance")}>
            {title}
          </h1>
          {hasItems && (
            <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
              {wishlistItems.length} {itemsLabel}
            </p>
          )}
        </div>

        {!hasItems ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-border/40 bg-card p-12 text-center">
            <p className={cn(textVariants({ variant: "body" }), "mb-6 text-muted-foreground")}>
              {empty}
            </p>
            <Button variant="default" size="lg">
              {continueShopping}
            </Button>
          </div>
        ) : (
          <div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
              {wishlistItems.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 aspect-square rounded-lg bg-muted" />

                  <h3 className={cn(textVariants({ variant: "h4" }), "mb-2")}>
                    {item.name}
                  </h3>

                  <p
                    className={cn(
                      textVariants({ variant: "bodySm" }),
                      "mb-4 text-muted-foreground",
                    )}
                  >
                    {item.category}
                  </p>

                  <p className={cn(textVariants({ variant: "bodySm" }), "mb-6 font-semibold")}>
                    {item.price}
                  </p>

                  <div className="mt-auto space-y-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full"
                    >
                      {addToCart}
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                    >
                      {remove}
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button variant="outline" size="lg">
                {continueShopping}
              </Button>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
