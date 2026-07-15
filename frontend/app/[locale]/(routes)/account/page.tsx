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
import { mockUser } from "@/lib/user";
import { mockOrders } from "@/lib/orders";

type AccountPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AccountPage({ params }: AccountPageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  const {
    account: accountStrings,
  } = dictionary.common;

  const {
    title,
    welcome,
    sections,
    totalOrders,
    totalSpent,
  } = accountStrings;

  const isRTL = locale === "fa";
  const totalAmount = mockOrders.reduce((sum, order) => {
    const amount = parseFloat(order.total.replace("$", "").replace(",", ""));
    return sum + amount;
  }, 0);

  return (
    <main style={{ paddingBlock: spacing.section.lg }}>
      <Container>
        <div className="mb-12">
          <h1 className={cn(textVariants({ variant: "h1" }), "text-balance")}>
            {title}
          </h1>
          <p className={cn(textVariants({ variant: "body" }), "mt-2 text-muted-foreground")}>
            {welcome}, {mockUser.name}
          </p>
        </div>

        <div className="space-y-12">
          {/* Quick Stats Section */}
          <section>
            <h2 className={cn(textVariants({ variant: "h3" }), "mb-6")}>
              Overview
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Total Orders Card */}
              <div className="rounded-lg border border-border/60 bg-card p-6">
                <p className={cn(textVariants({ variant: "label" }), "mb-2 text-muted-foreground")}>
                  {totalOrders}
                </p>
                <p className={cn(textVariants({ variant: "h2" }), "text-primary")}>
                  {mockOrders.length}
                </p>
              </div>

              {/* Total Spent Card */}
              <div className="rounded-lg border border-border/60 bg-card p-6">
                <p className={cn(textVariants({ variant: "label" }), "mb-2 text-muted-foreground")}>
                  {totalSpent}
                </p>
                <p className={cn(textVariants({ variant: "h2" }), "text-primary")}>
                  ${totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Account Sections Navigation */}
          <section>
            <h2 className={cn(textVariants({ variant: "h3" }), "mb-6")}>
              Account Menu
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Orders Link */}
              <Link href={`/${locale}/account/orders`} className="group">
                <div className="rounded-lg border border-border/60 bg-card p-6 transition-all hover:border-primary hover:shadow-md">
                  <p className={cn(textVariants({ variant: "h4" }), "mb-2 text-balance group-hover:text-primary")}>
                    {sections.orders}
                  </p>
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    View your order history
                  </p>
                </div>
              </Link>

              {/* Profile Link */}
              <Link href={`/${locale}/profile`} className="group">
                <div className="rounded-lg border border-border/60 bg-card p-6 transition-all hover:border-primary hover:shadow-md">
                  <p className={cn(textVariants({ variant: "h4" }), "mb-2 text-balance group-hover:text-primary")}>
                    {sections.profile}
                  </p>
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    Manage your personal info
                  </p>
                </div>
              </Link>

              {/* Wishlist Link */}
              <Link href={`/${locale}/wishlist`} className="group">
                <div className="rounded-lg border border-border/60 bg-card p-6 transition-all hover:border-primary hover:shadow-md">
                  <p className={cn(textVariants({ variant: "h4" }), "mb-2 text-balance group-hover:text-primary")}>
                    {sections.wishlist}
                  </p>
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    Your saved items
                  </p>
                </div>
              </Link>

              {/* Settings Card */}
              <div className="group cursor-not-allowed opacity-50">
                <div className="rounded-lg border border-border/60 bg-card p-6 transition-all">
                  <p className={cn(textVariants({ variant: "h4" }), "mb-2 text-balance")}>
                    {sections.settings}
                  </p>
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    Coming soon
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Quick Actions */}
          <section>
            <h2 className={cn(textVariants({ variant: "h3" }), "mb-6")}>
              Quick Actions
            </h2>

            <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/account/orders`}>
                <Button variant="outline">
                  {sections.orders}
                </Button>
              </Link>
              <Link href={`/${locale}/catalog`}>
                <Button variant="default">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
