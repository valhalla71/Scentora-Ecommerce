import { notFound } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

type OrderSuccessPageProps = {
  params: Promise<{ locale: string }>;
};

function generateOrderNumber(): string {
  return `ORD-${Date.now().toString().slice(-8)}`;
}

function getEstimatedDeliveryDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  const orderNumber = generateOrderNumber();
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const estimatedDelivery = getEstimatedDeliveryDate();

  return (
    <main style={{ paddingBlock: spacing.section.lg }}>
      <Container size="narrow">
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
            <svg
              className="h-8 w-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1
            className={cn(
              textVariants({ variant: "h1" }),
              "mb-2 text-balance",
            )}
          >
            {dictionary.common.orderSuccess.title}
          </h1>

          <p
            className={cn(
              textVariants({ variant: "body" }),
              "text-muted-foreground",
            )}
          >
            {dictionary.common.orderSuccess.confirmationMessage}
          </p>
        </div>

        <div className="mb-12 rounded-lg border border-border/60 bg-card p-8 shadow-sm">
          <div className="mb-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p
                className={cn(
                  textVariants({ variant: "label" }),
                  "mb-1 text-muted-foreground",
                )}
              >
                {dictionary.common.orderSuccess.orderNumber}
              </p>
              <p className={cn(textVariants({ variant: "h4" }), "text-lg")}>
                {orderNumber}
              </p>
            </div>

            <div>
              <p
                className={cn(
                  textVariants({ variant: "label" }),
                  "mb-1 text-muted-foreground",
                )}
              >
                {dictionary.common.orderSuccess.orderDate}
              </p>
              <p className={cn(textVariants({ variant: "bodySm" }))}>
                {orderDate}
              </p>
            </div>

            <div>
              <p
                className={cn(
                  textVariants({ variant: "label" }),
                  "mb-1 text-muted-foreground",
                )}
              >
                {dictionary.common.orderSuccess.estimatedDelivery}
              </p>
              <p className={cn(textVariants({ variant: "bodySm" }))}>
                {estimatedDelivery}
              </p>
            </div>

            <div>
              <p
                className={cn(
                  textVariants({ variant: "label" }),
                  "mb-1 text-muted-foreground",
                )}
              >
                {dictionary.common.orderSuccess.shippingAddress}
              </p>
              <p className={cn(textVariants({ variant: "bodySm" }))}>
                {dictionary.common.profile.personalInfo}
              </p>
            </div>
          </div>

          <div className="border-t border-border/40 pt-6">
            <h3
              className={cn(
                textVariants({ variant: "h4" }),
                "mb-4 text-base font-semibold",
              )}
            >
              {dictionary.common.orders.items}
            </h3>

            <div className="space-y-3">
              {[
                { name: "Midnight Elegance", price: "$125.00", quantity: 1 },
                { name: "Rose Garden", price: "$95.00", quantity: 1 },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-border/40 pb-3"
                >
                  <div>
                    <p className={cn(textVariants({ variant: "bodySm" }))}>
                      {item.name}
                    </p>
                    <p
                      className={cn(
                        textVariants({ variant: "caption" }),
                        "text-muted-foreground",
                      )}
                    >
                      {dictionary.common.checkout.items}: {item.quantity}
                    </p>
                  </div>
                  <p className={cn(textVariants({ variant: "bodySm" }))}>
                    {item.price}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
              <p
                className={cn(
                  textVariants({ variant: "bodySm" }),
                  "font-semibold text-base",
                )}
              >
                {dictionary.common.checkout.total}
              </p>
              <p
                className={cn(
                  textVariants({ variant: "bodySm" }),
                  "font-semibold text-base text-primary",
                )}
              >
                $230.00
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href={`/${locale}/account/orders`}>
            <Button variant="outline" size="default">
              {dictionary.common.orderSuccess.trackOrder}
            </Button>
          </Link>

          <Link href={`/${locale}/catalog`}>
            <Button variant="default" size="default">
              {dictionary.common.orderSuccess.continueShopping}
            </Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
