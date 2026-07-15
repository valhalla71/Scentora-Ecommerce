import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { textVariants } from "@/lib/design-system/typography";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1", className)}
    >
      <ol className="flex items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight
                  className="w-4 h-4 text-muted-foreground mx-0.5"
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                <span
                  className={cn(
                    textVariants({ variant: "bodySm" }),
                    "text-foreground"
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || "#"}
                  className={cn(
                    textVariants({ variant: "bodySm" }),
                    "text-muted-foreground hover:text-foreground transition-colors"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
