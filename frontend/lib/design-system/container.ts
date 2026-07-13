import type { VariantProps } from "class-variance-authority";

export {
  containerVariants,
  type ContainerProps,
} from "@/components/layout/container";

export type ContainerVariants = VariantProps<
  typeof import("@/components/layout/container").containerVariants
>;
