import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

type CatalogPageProps = {
  params: Promise<{ locale: string }>;
};

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Midnight Elegance",
    category: "Oriental",
    price: "$125.00",
  },
  {
    id: "2",
    name: "Rose Garden",
    category: "Floral",
    price: "$95.00",
  },
  {
    id: "3",
    name: "Citrus Dawn",
    category: "Fresh",
    price: "$85.00",
  },
  {
    id: "4",
    name: "Amber Noir",
    category: "Amber",
    price: "$120.00",
  },
  {
    id: "5",
    name: "Vanilla Sunset",
    category: "Floral",
    price: "$90.00",
  },
  {
    id: "6",
    name: "Ocean Breeze",
    category: "Fresh",
    price: "$80.00",
  },
  {
    id: "7",
    name: "Oud Symphony",
    category: "Woody",
    price: "$150.00",
  },
  {
    id: "8",
    name: "Jasmine Pearl",
    category: "Floral",
    price: "$110.00",
  },
  {
    id: "9",
    name: "Sandalwood Dreams",
    category: "Woody",
    price: "$115.00",
  },
  {
    id: "10",
    name: "Lavender Serenity",
    category: "Fresh",
    price: "$75.00",
  },
  {
    id: "11",
    name: "Exotic Spice",
    category: "Oriental",
    price: "$130.00",
  },
  {
    id: "12",
    name: "White Musk",
    category: "Fresh",
    price: "$88.00",
  },
  {
    id: "13",
    name: "Black Orchid",
    category: "Floral",
    price: "$140.00",
  },
  {
    id: "14",
    name: "Cedar & Sage",
    category: "Woody",
    price: "$105.00",
  },
  {
    id: "15",
    name: "Golden Honey",
    category: "Amber",
    price: "$100.00",
  },
];

export default async function CatalogPage({ params }: CatalogPageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  const { title, description, addToCart } = dictionary.common.catalog;

  return (
    <main
      style={{ paddingBlock: spacing.section.lg }}
    >
      <Container>
        <div className="mb-12 text-center">
          <h1
            className={cn(
              textVariants({ variant: "h1" }),
              "mb-4 text-balance",
            )}
          >
            {title}
          </h1>

          <p
            className={cn(
              textVariants({ variant: "body" }),
              "mx-auto max-w-2xl text-pretty text-muted-foreground",
            )}
          >
            {description}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
          {mockProducts.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 aspect-square rounded-lg bg-muted" />

              <h3 className={cn(textVariants({ variant: "h4" }), "mb-2")}>
                {product.name}
              </h3>

              <p
                className={cn(
                  textVariants({ variant: "bodySm" }),
                  "mb-4 text-muted-foreground",
                )}
              >
                {product.category}
              </p>

              <p className={cn(textVariants({ variant: "bodySm" }), "mb-6 font-semibold")}>
                {product.price}
              </p>

              <Button
                variant="default"
                size="sm"
                className="mt-auto"
              >
                {addToCart}
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
