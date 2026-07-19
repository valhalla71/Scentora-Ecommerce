"use client";

import { useState } from "react";
import { Heart, Minus, Plus, Share2 } from "lucide-react";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Button } from "@/components/ui/button";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

type PurchaseActionsProps = {
  productId: string;
  stock: number;
  addToCartLabel: string;
  addToWishlistLabel: string;
  quantityLabel: string;
  increaseQuantityLabel: string;
  decreaseQuantityLabel: string;
  shareLabel: string;
};

/**
 * Quantity + add-to-cart + wishlist toggle + share. Cart logic is
 * delegated entirely to `AddToCartButton`/`useCommerce()` (unchanged);
 * the wishlist heart is a local, non-persisted visual toggle only —
 * the backend wishlist API is intentionally not wired here.
 */
export function PurchaseActions({
  productId,
  stock,
  addToCartLabel,
  addToWishlistLabel,
  quantityLabel,
  increaseQuantityLabel,
  decreaseQuantityLabel,
  shareLabel,
}: PurchaseActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const maxQuantity = Math.max(stock, 0);
  const outOfStock = maxQuantity === 0;

  return (
    <div className="flex flex-col gap-4">
      {!outOfStock ? (
        <div className="flex items-center gap-3">
          <span className={cn(textVariants({ variant: "label" }), "text-muted-foreground")}>
            {quantityLabel}
          </span>
          <div className="inline-flex items-center rounded-lg border border-input">
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              disabled={quantity <= 1}
              aria-label={decreaseQuantityLabel}
              className="flex size-10 items-center justify-center text-muted-foreground transition-colors ease-luxury hover:text-foreground disabled:opacity-40"
            >
              <Minus className="size-4" aria-hidden="true" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.min(maxQuantity, current + 1))}
              disabled={quantity >= maxQuantity}
              aria-label={increaseQuantityLabel}
              className="flex size-10 items-center justify-center text-muted-foreground transition-colors ease-luxury hover:text-foreground disabled:opacity-40"
            >
              <Plus className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex gap-3">
        <AddToCartButton
          productId={productId}
          label={addToCartLabel}
          quantity={quantity}
          disabled={outOfStock}
          className="flex-1"
        />

        <Button
          variant="outline"
          size="lg"
          className="gap-2"
          aria-pressed={wishlisted}
          onClick={() => setWishlisted((current) => !current)}
        >
          <Heart
            className={cn("size-4 transition-colors", wishlisted && "fill-current text-destructive")}
            aria-hidden="true"
          />
          {addToWishlistLabel}
        </Button>

        <Button variant="outline" size="icon" aria-label={shareLabel}>
          <Share2 className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
