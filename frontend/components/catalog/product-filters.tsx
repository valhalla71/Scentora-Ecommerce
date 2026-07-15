"use client";

import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { textVariants } from "@/lib/design-system/typography";

export type FilterState = {
  categories: string[];
  priceMin: number;
  priceMax: number;
};

type ProductFiltersProps = {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClear: () => void;
  labels: {
    filters: string;
    category: string;
    price: string;
    priceMin: string;
    priceMax: string;
    clearFilters: string;
  };
};

export function ProductFilters({
  categories,
  minPrice,
  maxPrice,
  filters,
  onFiltersChange,
  onClear,
  labels,
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
  });

  const toggleSection = (section: "category" | "price") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleCategory = (category: string) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    onFiltersChange({
      ...filters,
      categories: updated,
    });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.priceMin > minPrice ||
    filters.priceMax < maxPrice;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className={cn(textVariants({ variant: "h4" }))}>{labels.filters}</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-xs"
          >
            {labels.clearFilters}
          </Button>
        )}
      </div>

      <div className="space-y-4 divide-y divide-border/30">
        <div>
          <button
            onClick={() => toggleSection("category")}
            className={cn(
              "w-full flex items-center justify-between",
              "py-3 text-start",
              "hover:text-foreground transition-colors",
              "text-muted-foreground",
            )}
          >
            <span className={cn(textVariants({ variant: "label" }))}>
              {labels.category}
            </span>
            <ChevronDown
              className={cn(
                "size-4 shrink-0 transition-transform",
                expandedSections.category && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>

          {expandedSections.category && (
            <div className="space-y-2 py-3">
              {categories.map((category) => (
                <label
                  key={category}
                  className={cn(
                    "flex items-center gap-2 cursor-pointer",
                    "text-sm py-1",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className={cn(
                      "size-4 rounded border border-border",
                      "checked:bg-primary checked:border-primary",
                      "cursor-pointer",
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm text-muted-foreground",
                      filters.categories.includes(category) &&
                        "text-foreground font-medium",
                    )}
                  >
                    {category}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleSection("price")}
            className={cn(
              "w-full flex items-center justify-between",
              "py-3 text-start",
              "hover:text-foreground transition-colors",
              "text-muted-foreground",
            )}
          >
            <span className={cn(textVariants({ variant: "label" }))}>
              {labels.price}
            </span>
            <ChevronDown
              className={cn(
                "size-4 shrink-0 transition-transform",
                expandedSections.price && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>

          {expandedSections.price && (
            <div className="space-y-3 py-3">
              <div className="space-y-1">
                <label className={cn(textVariants({ variant: "bodySm" }))}>
                  {labels.priceMin}
                </label>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={filters.priceMin}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      priceMin: Number(e.target.value),
                    })
                  }
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground">
                  ${filters.priceMin}
                </div>
              </div>

              <div className="space-y-1">
                <label className={cn(textVariants({ variant: "bodySm" }))}>
                  {labels.priceMax}
                </label>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={filters.priceMax}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      priceMax: Number(e.target.value),
                    })
                  }
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground">
                  ${filters.priceMax}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
