"use client";

import { cn } from "@/lib/utils";
import { textVariants } from "@/lib/design-system/typography";
import type { CommonDictionary } from "@/i18n/types";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  dictionary: CommonDictionary;
  items?: CartItem[];
}

export function OrderSummary({ dictionary, items = [] }: OrderSummaryProps) {
  const { checkout } = dictionary;

  const mockItems: CartItem[] =
    items.length > 0
      ? items
      : [
          {
            id: "1",
            name: "Midnight Elegance",
            price: 125,
            quantity: 1,
          },
          {
            id: "2",
            name: "Rose Garden",
            price: 95,
            quantity: 1,
          },
        ];

  const subtotal = mockItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = 10;
  const taxRate = 0.1;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

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
        {mockItems.map((item) => (
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
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
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
