import { cva, type VariantProps } from "class-variance-authority";

/**
 * Container width variants shared by the layout `Container` component.
 */
export const containerVariants = cva(
  "mx-auto w-full px-4 sm:px-6 lg:px-8",
  {
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
  },
);

export type ContainerVariants = VariantProps<typeof containerVariants>;
