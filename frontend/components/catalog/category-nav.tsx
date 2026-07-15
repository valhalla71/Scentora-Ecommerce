"use client";

import { cn } from "@/lib/utils";
import { textVariants } from "@/lib/design-system/typography";

type CategoryNavProps = {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  allLabel: string;
};

export function CategoryNav({
  categories,
  activeCategory,
  onCategoryChange,
  allLabel,
}: CategoryNavProps) {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0",
        "scrollbar-hide",
      )}
    >
      <button
        onClick={() => onCategoryChange(null)}
        className={cn(
          "whitespace-nowrap flex-shrink-0",
          "px-4 py-2 rounded-lg",
          "transition-all duration-200",
          textVariants({ variant: "bodySm" }),
          activeCategory === null
            ? "bg-primary text-primary-foreground font-medium"
            : "bg-muted text-muted-foreground hover:bg-muted/80",
        )}
      >
        {allLabel}
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "whitespace-nowrap flex-shrink-0",
            "px-4 py-2 rounded-lg",
            "transition-all duration-200",
            textVariants({ variant: "bodySm" }),
            activeCategory === category
              ? "bg-primary text-primary-foreground font-medium"
              : "bg-muted text-muted-foreground hover:bg-muted/80",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
