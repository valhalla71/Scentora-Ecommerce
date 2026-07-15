import Link from "next/link";
import { Container } from "@/components/layout/container";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/navigation";
import { mockRecentlyViewed } from "@/lib/reviews";

interface RecentlyViewedProps {
  locale: Locale;
  title: string;
}

export function RecentlyViewed({ locale, title }: RecentlyViewedProps) {
  if (mockRecentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <Container>
        <h2 className={cn(textVariants({ variant: "h3" }), "mb-8")}>
          {title}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {mockRecentlyViewed.map((product) => (
            <Link
              key={product.id}
              href={localizeHref(`/catalog/${product.id}`, locale)}
              className="group"
            >
              <article className="rounded-xl border border-border/60 bg-card p-4 text-start shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-3 aspect-square rounded-lg bg-muted" />
                <h3 className={cn(textVariants({ variant: "label" }), "mb-1 group-hover:text-primary transition-colors line-clamp-2")}>
                  {product.name}
                </h3>
                <p className={cn(textVariants({ variant: "caption" }), "text-muted-foreground mb-2")}>
                  {product.category}
                </p>
                <div className="flex items-center justify-between">
                  <p className={cn(textVariants({ variant: "bodySm" }), "font-semibold")}>
                    {product.price}
                  </p>
                  <span className={cn(textVariants({ variant: "caption" }), "text-muted-foreground")}>
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
