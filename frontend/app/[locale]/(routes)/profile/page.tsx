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
import {
  LogoutButton,
  ProfileIdentity,
  ProtectedAccountContent,
} from "@/components/account/profile-identity";

type ProfilePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  const {
    profile: profileStrings,
  } = dictionary.common;

  const {
    title,
    personalInfo,
    name,
    email,
    phone,
    editProfile,
    preferences,
    newsletter,
    language,
    notifications,
    recentOrders,
    orderNumber,
    date,
    total,
    status,
    addressBook,
    addAddress,
    logout,
    viewDetails,
    edit,
    delete: deleteText,
    setAsDefault,
  } = profileStrings;

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
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <ProtectedAccountContent locale={locale}>
      <main style={{ paddingBlock: spacing.section.lg }}>
        <Container>
        <div className="mb-12">
          <h1 className={cn(textVariants({ variant: "h1" }), "text-balance")}>
            {title}
          </h1>
        </div>

        <div className="space-y-12">
          {/* Personal Information Section */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className={textVariants({ variant: "h3" })}>
                {personalInfo}
              </h2>
              <Button variant="outline" size="sm">
                {editProfile}
              </Button>
            </div>

            <div className="space-y-4 rounded-lg border border-border/60 bg-card p-6">
              <ProfileIdentity labels={{ name, email, phone }} locale={locale} />
            </div>
          </section>

          <Separator />

          {/* Preferences Section */}
          <section>
            <h2 className={cn(textVariants({ variant: "h3" }), "mb-6")}>
              {preferences}
            </h2>

            <div className="space-y-4 rounded-lg border border-border/60 bg-card p-6">
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className={textVariants({ variant: "body" })}>
                    {newsletter}
                  </p>
                </div>
                <div className="h-6 w-11 rounded-full bg-primary" />
              </div>

              <Separator />

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className={textVariants({ variant: "body" })}>
                    {language}
                  </p>
                </div>
                <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                  {locale === "en" ? "English" : "فارسی"}
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className={textVariants({ variant: "body" })}>
                    {notifications}
                  </p>
                </div>
                <div className="h-6 w-11 rounded-full bg-primary" />
              </div>
            </div>
          </section>

          <Separator />

          {/* Recent Orders Section */}
          <section>
            <h2 className={cn(textVariants({ variant: "h3" }), "mb-6")}>
              {recentOrders}
            </h2>

            <div className="space-y-4">
              {mockUser.orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-lg border border-border/60 bg-card p-4 sm:p-6"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="grid gap-4 sm:flex sm:items-center sm:gap-6">
                      <div>
                        <p className={cn(textVariants({ variant: "label" }), "mb-1 text-muted-foreground")}>
                          {orderNumber}
                        </p>
                        <p className={textVariants({ variant: "body" })}>
                          {order.orderNumber}
                        </p>
                      </div>

                      <div>
                        <p className={cn(textVariants({ variant: "label" }), "mb-1 text-muted-foreground")}>
                          {date}
                        </p>
                        <p className={textVariants({ variant: "body" })}>
                          {order.date}
                        </p>
                      </div>

                      <div>
                        <p className={cn(textVariants({ variant: "label" }), "mb-1 text-muted-foreground")}>
                          {total}
                        </p>
                        <p className={textVariants({ variant: "body" })}>
                          {order.total}
                        </p>
                      </div>

                      <div>
                        <p className={cn(textVariants({ variant: "label" }), "mb-1 text-muted-foreground")}>
                          {status}
                        </p>
                        <span
                          className={cn(
                            textVariants({ variant: "bodySm" }),
                            "inline-block rounded-full px-3 py-1 capitalize",
                            getStatusBadgeColor(order.status),
                          )}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      {viewDetails}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Address Book Section */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className={textVariants({ variant: "h3" })}>
                {addressBook}
              </h2>
              <Button variant="outline" size="sm">
                {addAddress}
              </Button>
            </div>

            <div className="space-y-4">
              {mockUser.addresses.map((address) => (
                <div
                  key={address.id}
                  className="rounded-lg border border-border/60 bg-card p-4 sm:p-6"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <p className={textVariants({ variant: "h4" })}>
                        {address.fullName}
                      </p>
                      {address.isDefault && (
                        <p className={cn(textVariants({ variant: "bodySm" }), "text-primary")}>
                          Default
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 space-y-1">
                    <p className={textVariants({ variant: "body" })}>
                      {address.street}
                    </p>
                    <p className={textVariants({ variant: "body" })}>
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    <p className={textVariants({ variant: "body" })}>
                      {address.country}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      {edit}
                    </Button>
                    <Button variant="outline" size="sm">
                      {deleteText}
                    </Button>
                    {!address.isDefault && (
                      <Button variant="ghost" size="sm">
                        {setAsDefault}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Logout Section */}
          <div className="flex justify-center pb-8">
            <LogoutButton label={logout} locale={locale} />
          </div>
        </div>
        </Container>
      </main>
    </ProtectedAccountContent>
  );
}
