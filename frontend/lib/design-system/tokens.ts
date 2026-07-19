/**
 * Design tokens — single source of truth for layout and spacing constants.
 * Colors and radius are defined as CSS variables in `app/globals.css`.
 */

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const containerWidths = {
  narrow: "48rem",
  default: "80rem",
  wide: "90rem",
} as const;

export const spacing = {
  section: {
    sm: "3rem",
    md: "4rem",
    lg: "6rem",
  },
  gutter: {
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
  },
} as const;

export const zIndex = {
  header: 50,
  overlay: 40,
  dropdown: 30,
} as const;

export const motion = {
  duration: {
    fast: "150ms",
    normal: "250ms",
    slow: "350ms",
  },
  easing: {
    /** Reusable luxury easing curve — gentle acceleration, soft settle. */
    luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
} as const;

/**
 * Soft, warm-tinted elevation shadows (see `--shadow-luxury-*` in globals.css).
 * Prefer the `shadow-luxury-*` Tailwind utilities in className; use these
 * only where an inline `boxShadow` style is unavoidable.
 */
export const shadow = {
  luxury: {
    sm: "var(--shadow-luxury-sm)",
    md: "var(--shadow-luxury-md)",
    lg: "var(--shadow-luxury-lg)",
  },
} as const;
