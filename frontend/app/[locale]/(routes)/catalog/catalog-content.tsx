"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/catalog/search-bar";
import { ProductFilters, type FilterState } from "@/components/catalog/product-filters";
import { ProductSort, type SortOption } from "@/components/catalog/product-sort";
import { CategoryNav } from "@/components/catalog/category-nav";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";
import { products } from "@/lib/products";
import {
  PRODUCT_CATEGORIES,
  filterProducts,
  sortProducts,
  MIN_PRICE,
  MAX_PRICE,
} from "@/lib/catalog";
import { Package, X } from "lucide-react";
import type { CommonDictionary } from "@/i18n/types";

type CatalogContentProps = {
  discovery: CommonDictionary["discovery"];
  addToCartLabel: string;
};

export default function CatalogContent({
  discovery,
  addToCartLabel,
}: CatalogContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceMin: MIN_PRICE,
    priceMax: MAX_PRICE,
  });

  const filteredAndSorted = useMemo(() => {
    let result = filterProducts(products, {
      searchQuery,
      categories: categoryFilter ? [categoryFilter] : filters.categories,
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
    });

    return sortProducts(result, sort);
  }, [searchQuery, sort, categoryFilter, filters]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategoryFilter(null);
    setFilters({
      categories: [],
      priceMin: MIN_PRICE,
      priceMax: MAX_PRICE,
    });
    setSort("newest");
  };

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    (categoryFilter ? 1 : 0) +
    filters.categories.length +
    (filters.priceMin > MIN_PRICE || filters.priceMax < MAX_PRICE ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <SearchBar
          placeholder={discovery.search}
          onSearch={setSearchQuery}
        />

        <CategoryNav
          categories={PRODUCT_CATEGORIES as unknown as string[]}
          activeCategory={categoryFilter}
          onCategoryChange={setCategoryFilter}
          allLabel={discovery.categories.all}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <ProductFilters
              categories={PRODUCT_CATEGORIES as unknown as string[]}
              minPrice={MIN_PRICE}
              maxPrice={MAX_PRICE}
              filters={filters}
              onFiltersChange={setFilters}
              onClear={handleClearFilters}
              labels={{
                filters: discovery.filters,
                category: discovery.category,
                price: discovery.price,
                priceMin: discovery.priceMin,
                priceMax: discovery.priceMax,
                clearFilters: discovery.clearFilters,
              }}
            />
          </div>
        </aside>

        <div className="space-y-4 lg:col-span-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <ProductSort
                value={sort}
                onChange={setSort}
                labels={{
                  sortBy: discovery.sort,
                  newest: discovery.newest,
                  priceLowToHigh: discovery.priceLowToHigh,
                  priceHighToLow: discovery.priceHighToLow,
                  rating: discovery.rating,
                }}
              />

              {activeFilterCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilters}
                  className="gap-1 text-xs"
                >
                  <X className="size-3" />
                  Clear all
                </Button>
              )}
            </div>

            <div
              className={cn(
                textVariants({ variant: "bodySm" }),
                "text-muted-foreground",
              )}
            >
              {filteredAndSorted.length} results
            </div>
          </div>

          {filteredAndSorted.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {filteredAndSorted.map((product) => (
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
                      "mb-1 text-muted-foreground",
                    )}
                  >
                    {product.category}
                  </p>

                  <div className="mb-2 flex items-center gap-1">
                    <span
                      className={cn(
                        textVariants({ variant: "bodySm" }),
                        "text-yellow-500",
                      )}
                    >
                      ★ {product.rating.toFixed(1)}
                    </span>
                    <span
                      className={cn(
                        textVariants({ variant: "bodySm" }),
                        "text-muted-foreground",
                      )}
                    >
                      ({product.reviewCount})
                    </span>
                  </div>

                  <p
                    className={cn(
                      textVariants({ variant: "bodySm" }),
                      "mb-6 font-semibold",
                    )}
                  >
                    {product.price}
                  </p>

                  <Button
                    variant="default"
                    size="sm"
                    className="mt-auto"
                  >
                    {addToCartLabel}
                  </Button>
                </article>
              ))}
            </div>
          ) : (
            <div
              className={cn(
                "flex flex-col items-center justify-center py-12 text-center",
                "rounded-lg border border-border/30 bg-muted/30",
              )}
            >
              <Package
                className="mb-4 size-12 text-muted-foreground"
                aria-hidden="true"
              />
              <h3 className={cn(textVariants({ variant: "h4" }), "mb-2")}>
                {discovery.noProducts}
              </h3>
              <p
                className={cn(
                  textVariants({ variant: "bodySm" }),
                  "mb-4 max-w-sm text-muted-foreground",
                )}
              >
                {discovery.noProductsDescription}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
              >
                {discovery.clearFilters}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
