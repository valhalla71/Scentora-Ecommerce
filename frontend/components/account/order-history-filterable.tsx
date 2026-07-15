"use client"

import { useMemo, useState } from "react"
import { Filter, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { textVariants } from "@/lib/design-system/typography"
import type { Order } from "@/lib/orders"

export interface OrderHistoryFilterableProps {
  orders: Order[];
  dictionary: any;
}

type SortBy = "date-new" | "date-old" | "total-high" | "total-low";
type FilterStatus = "all" | Order["status"];

export function OrderHistoryFilterable({
  orders,
  dictionary,
}: OrderHistoryFilterableProps) {
  const { orders: t } = dictionary.common;
  const [sortBy, setSortBy] = useState<SortBy>("date-new");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const statuses: FilterStatus[] = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

  const filteredAndSorted = useMemo(() => {
    let result = [...orders];

    // Filter by status
    if (filterStatus !== "all") {
      result = result.filter((order) => order.status === filterStatus);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "date-new") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "date-old") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "total-high") {
        return parseFloat(b.total) - parseFloat(a.total);
      } else {
        return parseFloat(a.total) - parseFloat(b.total);
      }
    });

    return result;
  }, [orders, filterStatus, sortBy]);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200";
      case "shipped":
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        <div>
          <h3 className={cn(textVariants({ variant: "h4" }), "mb-3 flex items-center gap-2")}>
            <Filter className="w-4 h-4" />
            {t.filterBy}
          </h3>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="capitalize"
              >
                {status === "all" ? "All Orders" : status}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className={cn(textVariants({ variant: "h4" }), "mb-3 flex items-center gap-2")}>
            <ArrowUpDown className="w-4 h-4" />
            {t.sortBy}
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "date-new", label: t.recentFirst },
              { value: "date-old", label: t.oldestFirst },
              { value: "total-high", label: "Highest Total" },
              { value: "total-low", label: "Lowest Total" },
            ].map((sort) => (
              <Button
                key={sort.value}
                variant={sortBy === sort.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy(sort.value as SortBy)}
              >
                {sort.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      {filteredAndSorted.length === 0 ? (
        <div className="rounded-lg border border-border/40 bg-card p-8 text-center">
          <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground")}>
            {t.empty}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAndSorted.map((order) => (
            <div
              key={order.id}
              className="rounded-lg border border-border/60 bg-card p-4 hover:shadow-sm transition-shadow"
            >
              <div className="grid gap-4 sm:grid-cols-5 mb-3">
                <div>
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    {t.orderId}
                  </p>
                  <p className={cn(textVariants({ variant: "bodySm" }), "font-semibold")}>
                    {order.orderNumber}
                  </p>
                </div>
                <div>
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    {t.date}
                  </p>
                  <p className={cn(textVariants({ variant: "bodySm" }), "font-semibold")}>
                    {order.date}
                  </p>
                </div>
                <div>
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    {t.status}
                  </p>
                  <span className={cn("inline-block px-2 py-1 rounded text-xs font-semibold capitalize", getStatusColor(order.status))}>
                    {order.status}
                  </span>
                </div>
                <div>
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    {t.items}
                  </p>
                  <p className={cn(textVariants({ variant: "bodySm" }), "font-semibold")}>
                    {order.itemCount}
                  </p>
                </div>
                <div>
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    {t.total}
                  </p>
                  <p className={cn(textVariants({ variant: "bodySm" }), "font-semibold")}>
                    {order.total}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                {t.viewDetails}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
