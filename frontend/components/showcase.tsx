"use client"

import { Fragment } from "react"

import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { textVariants } from "@/lib/design-system/typography"
import { spacing } from "@/lib/design-system/tokens"
import { cn } from "@/lib/utils"

// System components
import { Skeleton, SkeletonGrid, ErrorState, EmptyState, LoadingState } from "@/components/system"

// Account components
import { AccountDashboard, AddressList, OrderHistoryFilterable } from "@/components/account"

// Commerce components
import { OrderTracking } from "@/components/commerce"

// Checkout components
import { CheckoutProgress, ShippingMethodSelector, PaymentMethodSelector } from "@/components/checkout"

// Product components
import { ProductComparison, ProductFAQ, FrequentlyBoughtTogether } from "@/components/product"

// Blog components
import { BlogPostCard } from "@/components/blog"

// Marketing components
import { PromotionalBanner } from "@/components/marketing"

// This is a showcase/integration example file demonstrating all the new components working together
// In production, these would be split across multiple page files

export function ComponentShowcase({ dictionary, locale }: { dictionary: any; locale: string }) {
  return (
    <main style={{ paddingBlock: spacing.section.lg }}>
      <Container>
        {/* Section: System Components */}
        <section className="mb-16 space-y-8">
          <h2 className={cn(textVariants({ variant: "h2" }))}>
            System Components (Loading, Error, Empty States)
          </h2>

          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <h3 className={cn(textVariants({ variant: "h4" }), "mb-3")}>Loading State</h3>
              <LoadingState message="Fetching your data..." />
            </div>

            <div>
              <h3 className={cn(textVariants({ variant: "h4" }), "mb-3")}>Skeleton Grid</h3>
              <SkeletonGrid count={3} columns={1} />
            </div>

            <div>
              <h3 className={cn(textVariants({ variant: "h4" }), "mb-3")}>Error State</h3>
              <ErrorState
                title="Failed to load"
                description="Please try again"
                onRetry={() => {}}
              />
            </div>

            <div>
              <h3 className={cn(textVariants({ variant: "h4" }), "mb-3")}>Empty State</h3>
              <EmptyState title="No items found" description="Start exploring" />
            </div>
          </div>
        </section>

        {/* Section: User Experience Components */}
        <section className="mb-16 space-y-8">
          <h2 className={cn(textVariants({ variant: "h2" }))}>
            User Experience (Account, Orders, Addresses)
          </h2>

          <div>
            <h3 className={cn(textVariants({ variant: "h4" }), "mb-4")}>Account Dashboard</h3>
            <AccountDashboard locale={locale} dictionary={dictionary} />
          </div>
        </section>

        {/* Section: Commerce Components */}
        <section className="mb-16 space-y-8">
          <h2 className={cn(textVariants({ variant: "h2" }))}>
            Commerce Experience (Checkout, Shipping, Payment)
          </h2>

          <div>
            <h3 className={cn(textVariants({ variant: "h4" }), "mb-4")}>
              Checkout Progress
            </h3>
            <CheckoutProgress
              steps={[
                dictionary.common.checkout.progressStep1,
                dictionary.common.checkout.progressStep2,
                dictionary.common.checkout.progressStep3,
                dictionary.common.checkout.progressStep4,
              ]}
              currentStep={2}
            />
          </div>
        </section>

        {/* Section: Product Components */}
        <section className="mb-16 space-y-8">
          <h2 className={cn(textVariants({ variant: "h2" }))}>
            Product Experience (Comparison, FAQ, Frequently Bought)
          </h2>

          <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground mb-4")}>
            All product components are integrated with mock data and ready to be used across product detail pages.
          </p>
        </section>

        {/* Section: Marketing Components */}
        <section className="mb-16 space-y-8">
          <h2 className={cn(textVariants({ variant: "h2" }))}>
            Marketing Experience (Banners, Blog Cards)
          </h2>

          <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground mb-4")}>
            Promotional banners and blog post cards ready for homepage and marketing pages.
          </p>
        </section>

        {/* Summary */}
        <section className="rounded-lg border border-border/60 bg-card p-8">
          <h2 className={cn(textVariants({ variant: "h3" }), "mb-4")}>
            Implementation Complete
          </h2>
          <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground mb-4")}>
            All components have been created with:
          </p>
          <ul className={cn(textVariants({ variant: "body" }), "text-muted-foreground space-y-2 list-disc list-inside")}>
            <li>Full TypeScript typing</li>
            <li>i18n support (English & Persian/Farsi)</li>
            <li>RTL/LTR compatibility</li>
            <li>Tailwind CSS styling with theme tokens</li>
            <li>Mock data integration</li>
            <li>Accessibility considerations (semantic HTML, ARIA labels)</li>
            <li>Responsive design patterns</li>
          </ul>
        </section>
      </Container>
    </main>
  );
}
