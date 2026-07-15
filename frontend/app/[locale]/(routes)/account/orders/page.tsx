import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";
import { mockOrders } from "@/lib/orders";

type OrdersPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  const {
    orders: orderStrings,
  } = dictionary.common;

  const {
    title,
    empty,
    orderId,
    date,
    status,
    items,
    total,
    viewDetails,
    pending,
    shipped,
    delivered,
    cancelled,
  } = orderStrings;

  const getStatusBadgeColor = (orderStatus: string) => {
    switch (orderStatus) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "pending":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getStatusLabel = (orderStatus: string): string => {
    switch (orderStatus) {
      case "delivered":
        return delivered;
      case "shipped":
        return shipped;
      case "pending":
        return pending;
      case "cancelled":
        return cancelled;
      default:
        return orderStatus;
    }
  };

  const hasOrders = mockOrders.length > 0;

  return (
    <main style={{ paddingBlock: spacing.section.lg }}>
      <Container>
        <div className="mb-12">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className={cn(textVariants({ variant: "h1" }), "text-balance")}>
              {title}
            </h1>
            <Link href={`/${locale}/account`}>
              <Button variant="outline" size="sm">
                Back to Account
              </Button>
            </Link>
          </div>
        </div>

        {!hasOrders ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-border/40 bg-card p-12 text-center">
            <p className={cn(textVariants({ variant: "body" }), "mb-6 text-muted-foreground")}>
              {empty}
            </p>
            <Link href={`/${locale}/catalog`}>
              <Button variant="default" size="lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Desktop Table View */}
            <div className="hidden overflow-x-auto rounded-lg border border-border/60 md:block">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="border-b border-border/60">
                    <th className="px-6 py-4 text-left">
                      <p className={cn(textVariants({ variant: "label" }), "text-muted-foreground")}>
                        {orderId}
                      </p>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <p className={cn(textVariants({ variant: "label" }), "text-muted-foreground")}>
                        {date}
                      </p>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <p className={cn(textVariants({ variant: "label" }), "text-muted-foreground")}>
                        {status}
                      </p>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <p className={cn(textVariants({ variant: "label" }), "text-muted-foreground")}>
                        {items}
                      </p>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <p className={cn(textVariants({ variant: "label" }), "text-muted-foreground")}>
                        {total}
                      </p>
                    </th>
                    <th className="px-6 py-4 text-right">
                      <p className={cn(textVariants({ variant: "label" }), "text-muted-foreground")}>
                        Action
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={cn(
                        "border-b border-border/60 transition-colors hover:bg-muted/30",
                        index === mockOrders.length - 1 && "border-b-0",
                      )}
                    >
                      <td className="px-6 py-4">
                        <p className={textVariants({ variant: "bodySm" })}>
                          {order.orderNumber}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className={textVariants({ variant: "bodySm" })}>
                          {order.date}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            textVariants({ variant: "bodySm" }),
                            "inline-block rounded-full px-3 py-1 capitalize",
                            getStatusBadgeColor(order.status),
                          )}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className={textVariants({ variant: "bodySm" })}>
                          {order.itemCount}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className={cn(textVariants({ variant: "bodySm" }), "font-semibold")}>
                          {order.total}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm">
                          {viewDetails}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="space-y-4 md:hidden">
              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-lg border border-border/60 bg-card p-4"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <p className={cn(textVariants({ variant: "label" }), "mb-1 text-muted-foreground")}>
                        {orderId}
                      </p>
                      <p className={textVariants({ variant: "bodySm" })}>
                        {order.orderNumber}
                      </p>
                    </div>
                    <span
                      className={cn(
                        textVariants({ variant: "bodySm" }),
                        "inline-block rounded-full px-3 py-1 capitalize",
                        getStatusBadgeColor(order.status),
                      )}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  <Separator className="my-4" />

                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className={cn(textVariants({ variant: "label" }), "mb-1 text-muted-foreground")}>
                        {date}
                      </p>
                      <p className={textVariants({ variant: "bodySm" })}>
                        {order.date}
                      </p>
                    </div>
                    <div>
                      <p className={cn(textVariants({ variant: "label" }), "mb-1 text-muted-foreground")}>
                        {items}
                      </p>
                      <p className={textVariants({ variant: "bodySm" })}>
                        {order.itemCount}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className={cn(textVariants({ variant: "label" }), "mb-1 text-muted-foreground")}>
                      {total}
                    </p>
                    <p className={cn(textVariants({ variant: "bodySm" }), "font-semibold")}>
                      {order.total}
                    </p>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    {viewDetails}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
