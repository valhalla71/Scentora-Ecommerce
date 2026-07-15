import { ChevronRight, MapPin, Bell, Settings, Heart, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"
import { textVariants } from "@/lib/design-system/typography"
import { spacing } from "@/lib/design-system/tokens"
import { mockUserStats } from "@/lib/user-account"

export interface AccountDashboardProps {
  locale: string;
  dictionary: any;
}

export function AccountDashboard({ locale, dictionary }: AccountDashboardProps) {
  const { account } = dictionary.common;
  const stats = mockUserStats;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="rounded-xl border border-border/60 bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <h1 className={cn(textVariants({ variant: "h2" }), "mb-2")}>
          {account.welcome}, John!
        </h1>
        <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground")}>
          You have {stats.totalOrders} orders totaling {stats.totalSpent}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: account.totalOrders, value: stats.totalOrders, icon: Package },
          { label: account.totalSpent, value: stats.totalSpent, icon: Heart },
          { label: account.rewardPoints, value: stats.rewardPoints, icon: Settings },
          { label: account.memberSince, value: stats.memberSince, icon: Bell },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="rounded-lg border border-border/60 bg-card p-6 text-center transition-shadow hover:shadow-sm"
            >
              <Icon className="mb-2 size-5 text-muted-foreground mx-auto" />
              <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground mb-1")}>
                {stat.label}
              </p>
              <p className={cn(textVariants({ variant: "h3" }))}>
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className={cn(textVariants({ variant: "h3" }), "mb-4")}>Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "View Orders", icon: Package },
            { label: "Manage Addresses", icon: MapPin },
            { label: "Notification Settings", icon: Bell },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <Button
                key={i}
                variant="outline"
                className="justify-between h-auto py-3"
              >
                <div className="flex items-center gap-2">
                  <Icon className="size-4" />
                  <span>{action.label}</span>
                </div>
                <ChevronRight className="size-4" />
              </Button>
            );
          })}
        </div>
      </div>

      {/* Rewards Info */}
      <div className="rounded-lg border border-border/60 bg-card p-6">
        <h3 className={cn(textVariants({ variant: "h4" }), "mb-2")}>Loyalty Program</h3>
        <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground mb-4")}>
          You're {stats.nextTierThreshold} away from the next tier level
        </p>
        <div className="w-full bg-muted rounded-full h-2 mb-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }} />
        </div>
        <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
          65% to next tier
        </p>
      </div>
    </div>
  );
}
