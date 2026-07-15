"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { textVariants } from "@/lib/design-system/typography";

interface RatingDisplayProps {
  rating: number;
  reviewCount: number;
  className?: string;
}

export function RatingDisplay({ rating, reviewCount, className }: RatingDisplayProps) {
  const stars = Math.round(rating);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-4 w-4",
              star <= stars
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted-foreground",
            )}
          />
        ))}
      </div>
      <span className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
        {rating.toFixed(1)} ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
      </span>
    </div>
  );
}
