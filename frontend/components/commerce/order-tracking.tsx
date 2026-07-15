import { CheckCircle2, Clock, Truck, MapPin } from "lucide-react"

import { cn } from "@/lib/utils"
import { textVariants } from "@/lib/design-system/typography"
import type { OrderTrackingEvent } from "@/lib/commerce"

const statusIcons = {
  pending: Clock,
  processing: Clock,
  shipped: Truck,
  out_for_delivery: Truck,
  delivered: CheckCircle2,
  cancelled: Clock,
}

const statusColors = {
  pending: "text-muted-foreground",
  processing: "text-blue-500",
  shipped: "text-blue-500",
  out_for_delivery: "text-blue-500",
  delivered: "text-green-500",
  cancelled: "text-destructive",
}

export interface OrderTrackingProps {
  events: OrderTrackingEvent[];
  dictionary: any;
}

export function OrderTracking({ events, dictionary }: OrderTrackingProps) {
  const { orders } = dictionary.common;

  return (
    <div className="space-y-6">
      <div>
        <h2 className={cn(textVariants({ variant: "h3" }), "mb-4")}>
          {orders.orderTracking}
        </h2>
      </div>

      <div className="relative">
        {events.map((event, index) => {
          const Icon = statusIcons[event.status as keyof typeof statusIcons] || Clock;
          const color = statusColors[event.status as keyof typeof statusColors];
          const isLast = index === events.length - 1;

          return (
            <div key={event.id} className="flex gap-4 pb-8">
              {/* Timeline line */}
              {!isLast && (
                <div className="absolute left-4 top-10 w-0.5 h-12 bg-border" />
              )}

              {/* Icon */}
              <div className="relative flex-shrink-0 mt-1">
                <div className={cn("rounded-full p-2 bg-muted", color)}>
                  <Icon className="size-5" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h4 className={cn(textVariants({ variant: "h4" }), "capitalize")}>
                  {event.status.replace(/_/g, " ")}
                </h4>
                <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                  {event.description}
                </p>
                {event.location && (
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <MapPin className="size-3" />
                    {event.location}
                  </div>
                )}
                <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground mt-1")}>
                  {new Date(event.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
