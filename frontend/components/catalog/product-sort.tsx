"use client";

import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { textVariants } from "@/lib/design-system/typography";

export type SortOption = "newest" | "priceLow" | "priceHigh" | "rating";

type ProductSortProps = {
  value: SortOption;
  onChange: (option: SortOption) => void;
  labels: {
    sortBy: string;
    newest: string;
    priceLowToHigh: string;
    priceHighToLow: string;
    rating: string;
  };
};

export function ProductSort({ value, onChange, labels }: ProductSortProps) {
  const sortOptions = [
    { value: "newest" as const, label: labels.newest },
    { value: "priceLow" as const, label: labels.priceLowToHigh },
    { value: "priceHigh" as const, label: labels.priceHighToLow },
    { value: "rating" as const, label: labels.rating },
  ];

  const currentLabel =
    sortOptions.find((opt) => opt.value === value)?.label ||
    labels.newest;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "gap-2",
              "flex items-center",
            )}
          >
            <ArrowUpDown className="size-4" aria-hidden="true" />
            <span className={cn(textVariants({ variant: "bodySm" }))}>
              {labels.sortBy}
            </span>
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {sortOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className={cn(
                "cursor-pointer",
                "text-sm",
              )}
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
