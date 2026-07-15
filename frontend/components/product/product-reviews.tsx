"use client";

import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { textVariants } from "@/lib/design-system/typography";
import { Button } from "@/components/ui/button";
import { mockReviews, sortReviewsByNewest, sortReviewsByHelpful, type Review } from "@/lib/reviews";

interface ProductReviewsProps {
  productId: string;
  reviewTitle: string;
  sortByLabel: string;
  newestLabel: string;
  helpfulLabel: string;
  noReviewsLabel: string;
  writeReviewLabel: string;
  helpfulActionLabel: string;
  notHelpfulActionLabel: string;
  verifiedLabel: string;
}

type SortOption = "newest" | "helpful";

export function ProductReviews({
  reviewTitle,
  sortByLabel,
  newestLabel,
  helpfulLabel,
  noReviewsLabel,
  helpfulActionLabel,
  notHelpfulActionLabel,
  verifiedLabel,
}: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());
  const [unhelpfulReviews, setUnhelpfulReviews] = useState<Set<string>>(new Set());

  const sortedReviews =
    sortBy === "newest" ? sortReviewsByNewest(mockReviews) : sortReviewsByHelpful(mockReviews);

  const toggleHelpful = (reviewId: string) => {
    const newHelpful = new Set(helpfulReviews);
    if (newHelpful.has(reviewId)) {
      newHelpful.delete(reviewId);
    } else {
      newHelpful.add(reviewId);
      setUnhelpfulReviews((prev) => {
        const updated = new Set(prev);
        updated.delete(reviewId);
        return updated;
      });
    }
    setHelpfulReviews(newHelpful);
  };

  const toggleNotHelpful = (reviewId: string) => {
    const newUnhelpful = new Set(unhelpfulReviews);
    if (newUnhelpful.has(reviewId)) {
      newUnhelpful.delete(reviewId);
    } else {
      newUnhelpful.add(reviewId);
      setHelpfulReviews((prev) => {
        const updated = new Set(prev);
        updated.delete(reviewId);
        return updated;
      });
    }
    setUnhelpfulReviews(newUnhelpful);
  };

  if (mockReviews.length === 0) {
    return (
      <section className="space-y-6">
        <div>
          <h2 className={cn(textVariants({ variant: "h3" }), "mb-2")}>{reviewTitle}</h2>
        </div>
        <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground")}>
          {noReviewsLabel}
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className={cn(textVariants({ variant: "h3" }), "mb-0")}>{reviewTitle}</h2>
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort-reviews"
            className={cn(textVariants({ variant: "label" }), "text-muted-foreground")}
          >
            {sortByLabel}:
          </label>
          <select
            id="sort-reviews"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="newest">{newestLabel}</option>
            <option value="helpful">{helpfulLabel}</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <article
            key={review.id}
            className="rounded-lg border border-border/40 p-6 text-start"
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className={cn(textVariants({ variant: "h4" }))}>{review.author}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-4 w-4",
                          star <= review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-muted text-muted-foreground",
                        )}
                      />
                    ))}
                  </div>
                  {review.verified && (
                    <span className={cn(textVariants({ variant: "caption" }), "text-green-600")}>
                      {verifiedLabel}
                    </span>
                  )}
                </div>
              </div>
              <span className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>

            <p className={cn(textVariants({ variant: "body" }), "mb-4 text-foreground")}>
              {review.text}
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleHelpful(review.id)}
                className={cn(
                  "inline-flex items-center gap-1 text-sm transition-colors",
                  helpfulReviews.has(review.id)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{helpfulActionLabel}</span>
              </button>
              <button
                onClick={() => toggleNotHelpful(review.id)}
                className={cn(
                  "inline-flex items-center gap-1 text-sm transition-colors",
                  unhelpfulReviews.has(review.id)
                    ? "text-destructive"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <ThumbsDown className="h-4 w-4" />
                <span>{notHelpfulActionLabel}</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
