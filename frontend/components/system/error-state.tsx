import { AlertCircle, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { textVariants } from "@/lib/design-system/typography"

type ErrorStateProps = {
  title: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
};

export function ErrorState({
  title,
  description,
  onRetry,
  retryLabel = "Try Again",
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 p-12 text-center",
        className
      )}
    >
      <AlertCircle className="mb-4 size-12 text-destructive" />
      <h3 className={cn(textVariants({ variant: "h3" }), "mb-2 text-destructive")}>
        {title}
      </h3>
      {description && (
        <p className={cn(textVariants({ variant: "body" }), "mb-6 text-muted-foreground")}>
          {description}
        </p>
      )}
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RotateCcw className="mr-2 size-4" />
          {retryLabel}
        </Button>
      )}
    </div>
  )
}

type EmptyStateProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-border/40 bg-card p-12 text-center",
        className
      )}
    >
      {icon && <div className="mb-4 size-12 text-muted-foreground">{icon}</div>}
      <h3 className={cn(textVariants({ variant: "h3" }), "mb-2")}>
        {title}
      </h3>
      {description && (
        <p className={cn(textVariants({ variant: "body" }), "mb-6 text-muted-foreground")}>
          {description}
        </p>
      )}
      {action && (
        <Button variant="default" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}

export function EmptyStateCart({ onContinueShopping }: { onContinueShopping: () => void }) {
  return (
    <EmptyState
      title="Your cart is empty"
      description="Start shopping to add items to your cart"
      action={{ label: "Continue Shopping", onClick: onContinueShopping }}
    />
  )
}

export function EmptyStateWishlist({ onContinueShopping }: { onContinueShopping: () => void }) {
  return (
    <EmptyState
      title="Your wishlist is empty"
      description="Add items to your wishlist to save them for later"
      action={{ label: "Continue Shopping", onClick: onContinueShopping }}
    />
  )
}

export function EmptyStateOrders() {
  return (
    <EmptyState
      title="No orders yet"
      description="You haven't placed any orders yet. Start shopping to create your first order"
    />
  )
}

export function EmptyStateSearchResults() {
  return (
    <EmptyState
      title="No results found"
      description="Try adjusting your filters or search terms"
    />
  )
}
