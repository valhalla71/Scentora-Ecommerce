import { notFound } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

type CheckoutPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <main style={{ paddingBlock: spacing.section.lg }}>
      <Container>
        <div className="mb-12">
          <h1
            className={cn(
              textVariants({ variant: "h1" }),
              "mb-2 text-balance",
            )}
          >
            {dictionary.common.checkout.title}
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CheckoutForm dictionary={dictionary.common} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary dictionary={dictionary.common} />

              <Link
                href={`/${locale}/cart`}
                className={cn(
                  textVariants({ variant: "bodySm" }),
                  "mt-6 block text-center text-primary hover:underline",
                )}
              >
                {dictionary.common.checkout.backToCart}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
