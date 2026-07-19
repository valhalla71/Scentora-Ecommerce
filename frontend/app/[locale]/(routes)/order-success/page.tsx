import { CheckCircle2, Package, Home } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isValidLocale, type Locale } from "@/i18n/config";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";
import { spacing } from "@/lib/design-system/tokens";

type OrderSuccessPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ order?: string; total?: string }>;
};

export default async function OrderSuccessPage({ params, searchParams }: OrderSuccessPageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const { order, total } = await searchParams;
  const orderId = order ?? "—";
  const orderTotal = total ? Number(total) : null;
  const orderDate = new Date().toLocaleDateString();

  return (
    <main style={{ paddingBlock: spacing.section.lg }}>
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4">
              <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <h1 className={cn(textVariants({ variant: "h1" }), "mb-3")}>
            Order Confirmed!
          </h1>

          <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground mb-8")}>
            Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
          </p>
        </div>

        {/* Order Details */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Order Number</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={cn(textVariants({ variant: "h3" }), "text-primary")}>
                {orderId}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Order Date</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={cn(textVariants({ variant: "bodySm" }))}>
                {orderDate}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Total Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={cn(textVariants({ variant: "h3" }), "text-primary")}>
                {orderTotal !== null ? `$${orderTotal.toFixed(2)}` : "—"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className={cn(textVariants({ variant: "label" }), "text-foreground")}>
                    Order Processing
                  </p>
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    We're preparing your order for shipment. You'll receive a tracking number via email.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className={cn(textVariants({ variant: "label" }), "text-foreground")}>
                    Shipping
                  </p>
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    Your package will be shipped within 2-3 business days.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={`/${locale}/catalog`}>
            <Button variant="outline" className="gap-2">
              Continue Shopping
            </Button>
          </Link>
          <Link href={`/${locale}/account/orders`}>
            <Button variant="default" className="gap-2">
              <Package className="w-4 h-4" />
              Track Order
            </Button>
          </Link>
          <Link href={`/${locale}`}>
            <Button variant="ghost" className="gap-2">
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
