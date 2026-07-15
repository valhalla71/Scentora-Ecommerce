import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";
import {
  mockCart,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from "@/lib/cart";

type CartPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CartPage({ params }: CartPageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  const { title, empty, product, quantity, price, subtotal, tax, total, remove, continueShopping, checkout } =
    dictionary.common.cart;

  const items = mockCart.items;
  const hasItems = items.length > 0;

  const subtotalAmount = calculateSubtotal(items);
  const taxAmount = calculateTax(subtotalAmount);
  const totalAmount = calculateTotal(subtotalAmount, taxAmount);

  return (
    <main style={{ paddingBlock: spacing.section.lg }}>
      <Container>
        <div className="mb-8">
          <h1 className={cn(textVariants({ variant: "h1" }), "text-balance")}>
            {title}
          </h1>
        </div>

        {!hasItems ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-border/40 bg-card p-12 text-center">
            <p className={cn(textVariants({ variant: "body" }), "mb-6 text-muted-foreground")}>
              {empty}
            </p>
            <Button variant="default" size="lg">
              {continueShopping}
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="overflow-x-auto rounded-lg border border-border/40">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 bg-muted/50">
                      <th className={cn(textVariants({ variant: "label" }), "p-4 text-start")}>
                        {product}
                      </th>
                      <th className={cn(textVariants({ variant: "label" }), "p-4 text-start")}>
                        {price}
                      </th>
                      <th className={cn(textVariants({ variant: "label" }), "p-4 text-center")}>
                        {quantity}
                      </th>
                      <th className={cn(textVariants({ variant: "label" }), "p-4 text-end")}>
                        {subtotal}
                      </th>
                      <th className={cn(textVariants({ variant: "label" }), "p-4 text-center")}>
                        {remove}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                      const itemPrice = parseFloat(item.price.replace("$", ""));
                      const itemSubtotal = (itemPrice * item.quantity).toFixed(2);

                      return (
                        <tr key={item.id} className="border-b border-border/40 transition-colors hover:bg-muted/30">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded bg-muted" />
                              <div>
                                <p className={cn(textVariants({ variant: "bodySm" }), "font-medium")}>
                                  {item.name}
                                </p>
                                <p className={cn(textVariants({ variant: "caption" }))}>
                                  {item.category}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className={cn(textVariants({ variant: "bodySm" }), "p-4 font-medium")}>
                            {item.price}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-2">
                              <Button variant="ghost" size="sm" className="px-2">
                                −
                              </Button>
                              <span className={cn(textVariants({ variant: "bodySm" }), "w-8 text-center")}>
                                {item.quantity}
                              </span>
                              <Button variant="ghost" size="sm" className="px-2">
                                +
                              </Button>
                            </div>
                          </td>
                          <td className={cn(textVariants({ variant: "bodySm" }), "p-4 text-end font-medium")}>
                            ${itemSubtotal}
                          </td>
                          <td className="p-4 text-center">
                            <Button variant="destructive" size="sm">
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

            {/* Cart Summary */}
            <div className="rounded-lg border border-border/40 bg-card p-6">
              <h2 className={cn(textVariants({ variant: "h4" }), "mb-6")}>
                {total}
              </h2>

              <div className="space-y-3 border-b border-border/40 pb-6">
                <div className="flex items-center justify-between">
                  <span className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    {subtotal}
                  </span>
                  <span className={cn(textVariants({ variant: "bodySm" }), "font-medium")}>
                    ${subtotalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    {tax}
                  </span>
                  <span className={cn(textVariants({ variant: "bodySm" }), "font-medium")}>
                    ${taxAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mb-6 flex items-center justify-between pt-6">
                <span className={cn(textVariants({ variant: "h4" }))}>
                  {total}
                </span>
                <span className={cn(textVariants({ variant: "h3" }), "text-primary")}>
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="space-y-3">
                <Button variant="default" size="lg" className="w-full">
                  {checkout}
                </Button>

                <Button variant="outline" size="lg" className="w-full">
                  {continueShopping}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
