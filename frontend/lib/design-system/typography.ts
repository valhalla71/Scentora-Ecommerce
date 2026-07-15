import { cva, type VariantProps } from "class-variance-authority";

/**
 * Typography scale — use these variants for consistent text hierarchy.
 */
export const textVariants = cva("", {
  variants: {
    variant: {
      display:
        "text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl",
      h1: "text-3xl font-semibold tracking-tight sm:text-4xl",
      h2: "text-2xl font-semibold tracking-tight sm:text-3xl",
      h3: "text-xl font-semibold tracking-tight sm:text-2xl",
      h4: "text-lg font-semibold tracking-tight",
      h5: "text-base font-semibold tracking-tight",
      body: "text-base leading-7",
      bodySm: "text-sm leading-6",
      caption: "text-xs leading-5 text-muted-foreground",
      label: "text-sm font-medium leading-none",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export type TextVariants = VariantProps<typeof textVariants>;
