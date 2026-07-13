import * as React from "react";

import {
  containerVariants,
  type ContainerVariants,
} from "@/lib/design-system/container";
import { cn } from "@/lib/utils";

type ContainerElement = React.ElementType;

type ContainerProps<T extends ContainerElement = "div"> =
  ContainerVariants & {
    as?: T;
    className?: string;
    children?: React.ReactNode;
  } & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

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
      className={cn(containerVariants({ size }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
