import { Check, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { textVariants } from "@/lib/design-system/typography"

export interface CheckoutProgressProps {
  steps: string[];
  currentStep: number;
}

export function CheckoutProgress({ steps, currentStep }: CheckoutProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 sm:gap-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="flex items-center flex-1">
              {/* Step indicator */}
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all",
                  isCompleted || isCurrent
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border bg-background"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className={cn(textVariants({ variant: "bodySm" }), "font-semibold")}>
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Step label */}
              <div className="ms-2 hidden sm:block">
                <p
                  className={cn(
                    textVariants({ variant: "bodySm" }),
                    isCompleted || isCurrent ? "text-foreground font-medium" : "text-muted-foreground"
                  )}
                >
                  {step}
                </p>
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2">
                  <div
                    className={cn(
                      "h-0.5",
                      isCompleted ? "bg-primary" : "bg-border"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
