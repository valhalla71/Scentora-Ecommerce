"use client";

import Link from "next/link";

import { useCommerce } from "@/components/providers/commerce-provider";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";
import { calculateSubtotal, calculateTax, calculateTotal } from "@/lib/cart";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

type CartLabels = {
  empty: string;
  product: string;
  quantity: string;
  price: string;
  subtotal: string;
  tax: string;
  total: string;
  remove: string;
  continueShopping: string;
  checkout: string;
};

export function CartContent({ labels }: { labels: CartLabels }) {
  const {
    cart,
    cartLoading,
    cartError,
    cartActionPending,
    user,
    sessionLoading,
    incrementCartItem,
    removeCartItem,
    canDecrementQuantity,
  } = useCommerce();
  const locale = useLocale();
  const { items } = cart;
  const subtotalAmount = calculateSubtotal(items);
  const taxAmount = calculateTax(subtotalAmount);
  const totalAmount = calculateTotal(subtotalAmount, taxAmount);

  if ((sessionLoading || cartLoading) && items.length === 0) {
    return <p className="py-12 text-center text-muted-foreground">Loading cart…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-border/40 bg-card p-12 text-center">
        {cartError && <p className="mb-4 text-destructive">{cartError}</p>}
        <p className={cn(textVariants({ variant: "body" }), "mb-6 text-muted-foreground")}>
          {user ? labels.empty : "Please sign in to view your cart."}
        </p>
        <Link href={`/${locale}/catalog`}>
          <Button variant="default" size="lg">{labels.continueShopping}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {cartError && <p className="mb-4 text-sm text-destructive">{cartError}</p>}
        <div className="overflow-x-auto rounded-lg border border-border/40">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 bg-muted/50">
                {[labels.product, labels.price, labels.quantity, labels.subtotal, labels.remove].map((label) => (
                  <th key={label} className={cn(textVariants({ variant: "label" }), "p-4 text-center first:text-start")}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const itemPrice = Number(item.price.replace("$", ""));
                return (
                  <tr key={item.id} className="border-b border-border/40">
                    <td className="p-4">
                      <p className={cn(textVariants({ variant: "bodySm" }), "font-medium")}>{item.name}</p>
                      {item.category && (
                        <p className={textVariants({ variant: "caption" })}>{item.category}</p>
                      )}
                    </td>
                    <td className="p-4 text-center">{item.price}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={!canDecrementQuantity}
                          title="The current API does not support exact quantity decreases."
                        >
                          −
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={cartActionPending}
                          onClick={() => void incrementCartItem(item.productId)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td className="p-4 text-end">${(itemPrice * item.quantity).toFixed(2)}</td>
                    <td className="p-4 text-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={cartActionPending}
                        onClick={() => void removeCartItem(item.productId)}
                      >
                        ✕
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg border border-border/40 bg-card p-6">
        <h2 className={cn(textVariants({ variant: "h4" }), "mb-6")}>{labels.total}</h2>
        <div className="space-y-3 border-b border-border/40 pb-6">
          <div className="flex justify-between"><span>{labels.subtotal}</span><span>${subtotalAmount.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>{labels.tax}</span><span>${taxAmount.toFixed(2)}</span></div>
        </div>
        <div className="mb-6 flex justify-between pt-6">
          <span className={textVariants({ variant: "h4" })}>{labels.total}</span>
          <span className={cn(textVariants({ variant: "h3" }), "text-primary")}>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="space-y-3">
          <Link href={`/${locale}/checkout`} className="block">
            <Button variant="default" size="lg" className="w-full">{labels.checkout}</Button>
          </Link>
          <Link href={`/${locale}/catalog`} className="block">
            <Button variant="outline" size="lg" className="w-full">{labels.continueShopping}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
