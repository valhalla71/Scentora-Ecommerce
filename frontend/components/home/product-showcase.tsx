import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/navigation";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

type ProductShowcaseProps = {
  locale: Locale;
  dictionary: Dictionary;
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
    name: "Midnight Rose",
    category: "Floral",
    price: "$89.99",
  },
  {
    id: "2",
    name: "Amber Noir",
    category: "Oriental",
    price: "$94.99",
  },
  {
    id: "3",
    name: "Ocean Breeze",
    category: "Fresh",
    price: "$79.99",
  },
  {
    id: "4",
    name: "Vanilla Sunset",
    category: "Sweet",
    price: "$84.99",
  },
];

export function ProductShowcase({ locale, dictionary }: ProductShowcaseProps) {
  const { showcase } = dictionary.home;

  return (
    <section
      aria-labelledby="showcase-heading"
      style={{ paddingBlock: spacing.section.lg }}
    >
      <Container>
        <div className="text-center">
          <p className={cn(textVariants({ variant: "eyebrow" }), "mb-3")}>
            {showcase.eyebrow}
          </p>

          <h2
            id="showcase-heading"
            className={cn(
              textVariants({ variant: "h2" }),
              "mb-4 text-balance",
            )}
          >
            {showcase.title}
          </h2>

          <p
            className={cn(
              textVariants({ variant: "body" }),
              "mx-auto mb-10 max-w-2xl text-pretty text-muted-foreground sm:mb-12",
            )}
          >
            {showcase.description}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {mockProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Button
            render={
              <Link href={localizeHref("/catalog", locale)}>
                {showcase.viewAll}
                <ArrowRight
                  className="transition-transform group-hover/button:translate-x-0.5 rtl:rotate-180 rtl:group-hover/button:-translate-x-0.5"
                  data-icon="inline-end"
                />
              </Link>
            }
            size="lg"
          />
        </div>
      </Container>
    </section>
  );
}
