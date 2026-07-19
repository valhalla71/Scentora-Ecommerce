import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/ui/product-card";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/navigation";
import type { Product } from "@/lib/products";

interface RelatedProductsProps {
  products: Product[];
  locale: Locale;
  title: string;
}

/**
 * Presentational only — the caller owns fetching/selecting related
 * products (real backend data on the product detail page) and passes
 * them in directly.
 */
export function RelatedProducts({ products, locale, title }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border/40 py-12">
      <Container>
        <h2 className={cn(textVariants({ variant: "h3" }), "mb-8 text-center")}>
          {title}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              href={localizeHref(`/catalog/${product.id}`, locale)}
              name={product.name}
              category={product.category}
              price={product.price}
              image={product.image}
              rating={product.rating}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
