import { cva, type VariantProps } from "class-variance-authority";

/**
 * Typography scale — use these variants for consistent text hierarchy.
 */
export const textVariants = cva("", {
  variants: {
    variant: {
      display:
        "font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl",
      h1: "font-heading text-3xl font-semibold tracking-tight sm:text-4xl",
      h2: "font-heading text-2xl font-semibold tracking-tight sm:text-3xl",
      h3: "font-heading text-xl font-semibold tracking-tight sm:text-2xl",
      h4: "font-heading text-lg font-semibold tracking-tight",
      h5: "font-heading text-base font-semibold tracking-tight",
      body: "text-base leading-7",
      bodySm: "text-sm leading-6",
      caption: "text-xs leading-5 text-muted-foreground",
      label: "text-sm font-medium leading-none",
      /** Small-caps "kicker" label above a heading — luxury editorial pattern. */
      eyebrow:
        "text-xs font-medium uppercase tracking-luxury text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export type TextVariants = VariantProps<typeof textVariants>;
