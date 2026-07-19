"use client";

import { cn } from "@/lib/utils";
import { textVariants } from "@/lib/design-system/typography";
import type { CommonDictionary } from "@/i18n/types";
import { useCommerce } from "@/components/providers/commerce-provider";
import { calculateSubtotal } from "@/lib/cart";

interface OrderSummaryProps {
  dictionary: CommonDictionary;
}

export function OrderSummary({ dictionary }: OrderSummaryProps) {
  const { checkout, cart: cartLabels } = dictionary;
  const { cart, cartLoading } = useCommerce();
  const items = cart.items;

  const subtotal = calculateSubtotal(items);
  const shippingCost = 10;
  const taxRate = 0.1;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  if (cartLoading && items.length === 0) {
    return (
      <div className="rounded-lg border border-border/60 bg-card p-6 shadow-sm">
        <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
          {dictionary.loading}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border/60 bg-card p-6 shadow-sm">
      <h2
        className={cn(
          textVariants({ variant: "h4" }),
          "mb-6 text-base font-semibold",
        )}
      >
        {checkout.orderSummary}
      </h2>

      <div className="mb-6 space-y-3 border-b border-border/40 pb-6">
        {items.length === 0 ? (
          <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
            {cartLabels.empty}
          </p>
        ) : (
          items.map((item) => {
            const itemPrice = Number(item.price.replace("$", ""));
            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <p className={cn(textVariants({ variant: "bodySm" }), "font-medium")}>
                    {item.name}
                  </p>
                  <p className={cn(textVariants({ variant: "caption" }))}>
                    {checkout.items}: {item.quantity}
                  </p>
                </div>
                <p className={cn(textVariants({ variant: "bodySm" }), "font-semibold")}>
                  ${(itemPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            );
          })
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className={cn(textVariants({ variant: "bodySm" }))}>
            {checkout.subtotal}
          </p>
          <p className={cn(textVariants({ variant: "bodySm" }), "font-medium")}>
            ${subtotal.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className={cn(textVariants({ variant: "bodySm" }))}>
            {checkout.shipping}
          </p>
          <p className={cn(textVariants({ variant: "bodySm" }), "font-medium")}>
            ${shippingCost.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className={cn(textVariants({ variant: "bodySm" }))}>
            {checkout.tax}
          </p>
          <p className={cn(textVariants({ variant: "bodySm" }), "font-medium")}>
            ${tax.toFixed(2)}
          </p>
        </div>

        <div className="border-t border-border/40 pt-3">
          <div className="flex items-center justify-between">
            <p
              className={cn(
                textVariants({ variant: "bodySm" }),
                "font-semibold text-base",
              )}
            >
              {checkout.total}
            </p>
            <p
              className={cn(
                textVariants({ variant: "bodySm" }),
                "font-semibold text-base text-primary",
              )}
            >
              ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
