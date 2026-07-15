import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { textVariants } from "@/lib/design-system/typography"

type LoadingStateProps = {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function LoadingState({ message = "Loading...", size = "md", className }: LoadingStateProps) {
  const iconSize =
    size === "sm" ? "size-6" : size === "lg" ? "size-12" : "size-8"

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-12",
        className
      )}
    >
      <Loader2 className={cn("animate-spin text-muted-foreground", iconSize)} />
      {message && (
        <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground")}>
          {message}
        </p>
      )}
    </div>
  )
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const iconSize =
    size === "sm" ? "size-4" : size === "lg" ? "size-6" : "size-5"

  return <Loader2 className={cn("animate-spin", iconSize)} />
}
