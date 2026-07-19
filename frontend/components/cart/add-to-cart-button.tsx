"use client";

import { ShoppingCart } from "lucide-react";

import { useCommerce } from "@/components/providers/commerce-provider";
import { Button } from "@/components/ui/button";

export function AddToCartButton({
  productId,
  label,
  quantity = 1,
  disabled = false,
  className,
}: {
  productId: string;
  label: string;
  quantity?: number;
  disabled?: boolean;
  className?: string;
}) {
  const { addToCart, cartActionPending, cartError } = useCommerce();

  return (
    <div className={className}>
      <Button
        variant="default"
        size="lg"
        className="w-full gap-2"
        disabled={disabled || cartActionPending}
        onClick={() => void addToCart(productId, quantity)}
      >
        <ShoppingCart className="w-4 h-4" />
        {label}
      </Button>
      {cartError && <p className="mt-2 text-sm text-destructive">{cartError}</p>}
    </div>
  );
}
