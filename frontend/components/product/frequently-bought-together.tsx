import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { textVariants } from "@/lib/design-system/typography"
import type { FrequentlyBoughtTogether } from "@/lib/products-advanced"

export interface FrequentlyBoughtTogetherProps {
  products: FrequentlyBoughtTogether[];
  dictionary: any;
}

export function FrequentlyBoughtTogether({
  products,
  dictionary,
}: FrequentlyBoughtTogetherProps) {
  const { product } = dictionary.common;

  return (
    <div>
      <h3 className={cn(textVariants({ variant: "h4" }), "mb-4")}>
        {product.frequentlyBoughtTogether}
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="rounded-lg border border-border/60 bg-card p-4 flex flex-col"
          >
            <div className="aspect-square rounded-lg bg-muted mb-3" />

            <h4 className={cn(textVariants({ variant: "h5" }), "mb-1")}>
              {p.name}
            </h4>

            <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground mb-3")}>
              {p.category}
            </p>

            <p className={cn(textVariants({ variant: "bodySm" }), "font-semibold mb-4")}>
              {p.price}
            </p>

            <Button
              variant="default"
              size="sm"
              className="w-full mt-auto"
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
