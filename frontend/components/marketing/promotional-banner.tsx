import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { textVariants } from "@/lib/design-system/typography"
import type { PromotionalBanner } from "@/lib/blog"

export interface PromotionalBannerProps {
  banner: PromotionalBanner;
}

const bannerStyles = {
  seasonal: "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
  featured: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
  sale: "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30",
  new_collection: "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
};

export function PromotionalBanner({ banner }: PromotionalBannerProps) {
  return (
    <div className={cn("rounded-lg p-6 sm:p-8 border border-border/60", bannerStyles[banner.type])}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className={cn(textVariants({ variant: "h3" }), "mb-2")}>
            {banner.title}
          </h3>
          <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground mb-4")}>
            {banner.description}
          </p>
        </div>

        <Button variant="default" className="flex-shrink-0 gap-2">
          {banner.callToAction}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
