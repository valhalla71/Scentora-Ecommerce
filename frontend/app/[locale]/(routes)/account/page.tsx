import Link from "next/link";
import { notFound } from "next/navigation";
import { Settings, ShoppingBag, Heart, LogOut } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";
import { mockOrders } from "@/lib/orders";
import {
  AccountWelcome,
  LogoutButton,
  ProtectedAccountContent,
} from "@/components/account/profile-identity";

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

  const totalAmount = mockOrders.reduce((sum, order) => {
    const amount = parseFloat(order.total.replace("$", "").replace(",", ""));
    return sum + amount;
  }, 0);

  const quickActions = [
    { icon: ShoppingBag, label: sections.orders, href: `/${locale}/account/orders`, color: "text-blue-600" },
    { icon: Heart, label: sections.wishlist, href: `/${locale}/wishlist`, color: "text-rose-600" },
    { icon: Settings, label: sections.settings, href: `/${locale}/account/settings`, color: "text-amber-600" },
  ];

  return (
    <ProtectedAccountContent locale={locale}>
      <main style={{ paddingBlock: spacing.section.lg }}>
        <Container>
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Account" },
            ]}
          />
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className={cn(textVariants({ variant: "h1" }), "text-balance mb-2")}>
            {title}
          </h1>
          <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground")}>
            <AccountWelcome prefix={welcome} />
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-2 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{totalOrders}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={cn(textVariants({ variant: "h3" }), "text-primary")}>
                {mockOrders.length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{totalSpent}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={cn(textVariants({ variant: "h3" }), "text-primary")}>
                ${totalAmount.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator className="mb-12" />

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className={cn(textVariants({ variant: "h3" }), "mb-6")}>
            Quick Actions
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.label} href={action.href}>
                  <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md h-full">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center gap-3">
                        <Icon className={cn("w-8 h-8", action.color)} />
                        <p className={cn(textVariants({ variant: "label" }), "text-foreground")}>
                          {action.label}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <Separator className="mb-12" />

        {/* Account Sections */}
        <section className="mb-12">
          <h2 className={cn(textVariants({ variant: "h3" }), "mb-6")}>
            Account Menu
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href={`/${locale}/account/orders`} className="group">
              <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md h-full">
                <CardContent className="pt-6">
                  <ShoppingBag className="w-6 h-6 mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  <p className={cn(textVariants({ variant: "h4" }), "mb-2 group-hover:text-primary transition-colors")}>
                    {sections.orders}
                  </p>
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    View order history
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href={`/${locale}/profile`} className="group">
              <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md h-full">
                <CardContent className="pt-6">
                  <Settings className="w-6 h-6 mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  <p className={cn(textVariants({ variant: "h4" }), "mb-2 group-hover:text-primary transition-colors")}>
                    {sections.profile}
                  </p>
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    Manage personal info
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href={`/${locale}/wishlist`} className="group">
              <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md h-full">
                <CardContent className="pt-6">
                  <Heart className="w-6 h-6 mb-3 text-muted-foreground group-hover:text-rose-500 transition-colors" />
                  <p className={cn(textVariants({ variant: "h4" }), "mb-2 group-hover:text-primary transition-colors")}>
                    {sections.wishlist}
                  </p>
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    Your saved items
                  </p>
                </CardContent>
              </Card>
            </Link>

            <div className="opacity-50 cursor-not-allowed">
              <Card className="h-full">
                <CardContent className="pt-6">
                  <Badge className="mb-3">{sections.settings}</Badge>
                  <p className={cn(textVariants({ variant: "h4" }), "mb-2")}>
                    {sections.settings}
                  </p>
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    Coming soon
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="mb-12" />

        {/* Logout Section */}
        <section className="flex gap-3">
          <LogOut className="w-4 h-4" />
          <LogoutButton label="Sign Out" locale={locale} />
        </section>
        </Container>
      </main>
    </ProtectedAccountContent>
  );
}
