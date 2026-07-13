import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full ps-4 pe-4 sm:ps-6 sm:pe-6 lg:ps-8 lg:pe-8", {
  variants: {
    size: {
      narrow: "max-w-3xl",
      default: "max-w-7xl",
      wide: "max-w-[90rem]",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type ContainerElement = React.ElementType;

export type ContainerProps<T extends ContainerElement = "div"> = VariantProps<
  typeof containerVariants
> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & Omit<
  React.ComponentPropsWithoutRef<T>,
  "as" | "className" | "children" | "size"
>;

/**
 * Responsive page-width wrapper with locale-safe horizontal gutters.
 * Uses logical padding (`ps` / `pe`) so spacing stays correct in LTR and RTL.
 */
export function Container<T extends ContainerElement = "div">({
  as,
  size,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ContainerElement;

  return (
    <Component
      data-slot="container"
      className={cn(containerVariants({ size }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export { containerVariants };
