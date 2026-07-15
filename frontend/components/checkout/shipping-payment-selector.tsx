import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { textVariants } from "@/lib/design-system/typography"
import type { ShippingOption, PaymentMethod } from "@/lib/commerce"

export interface ShippingMethodSelectorProps {
  options: ShippingOption[];
  selected?: string;
  onSelect: (id: string) => void;
}

export function ShippingMethodSelector({
  options,
  selected,
  onSelect,
}: ShippingMethodSelectorProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={cn(
            "w-full text-left rounded-lg border-2 p-4 transition-all",
            selected === option.id
              ? "border-primary bg-primary/5"
              : "border-border/60 bg-card hover:border-primary/30"
          )}
        >
          <div className="flex justify-between items-start mb-1">
            <h4 className={cn(textVariants({ variant: "h5" }))}>
              {option.name}
            </h4>
            <span className={cn(textVariants({ variant: "bodySm" }), "font-semibold")}>
              {option.price}
            </span>
          </div>
          <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
            {option.description}
          </p>
          <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground mt-1")}>
            {option.estimatedDays.min}-{option.estimatedDays.max} days
          </p>
        </button>
      ))}
    </div>
  );
}

export interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  selected?: string;
  onSelect: (id: string) => void;
  onAddNew?: () => void;
}

export function PaymentMethodSelector({
  methods,
  selected,
  onSelect,
  onAddNew,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <button
          key={method.id}
          onClick={() => onSelect(method.id)}
          className={cn(
            "w-full text-left rounded-lg border-2 p-4 transition-all flex items-center gap-3",
            selected === method.id
              ? "border-primary bg-primary/5"
              : "border-border/60 bg-card hover:border-primary/30"
          )}
        >
          <div className="w-10 h-6 bg-muted rounded flex items-center justify-center text-xs font-semibold">
            {method.type === "credit_card" ? "CC" : method.type === "paypal" ? "PP" : "AP"}
          </div>
          <div className="flex-1">
            <h4 className={cn(textVariants({ variant: "h5" }))}>
              {method.cardHolder}
            </h4>
            <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
              •••• {method.lastFour} · {method.type === "paypal" ? "PayPal" : `Expires ${method.expiryMonth}/${method.expiryYear}`}
            </p>
          </div>
          {method.isDefault && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              Default
            </span>
          )}
        </button>
      ))}
      {onAddNew && (
        <Button variant="outline" className="w-full" onClick={onAddNew}>
          <ShoppingBag className="w-4 h-4 mr-2" />
          Add Payment Method
        </Button>
      )}
    </div>
  );
}
