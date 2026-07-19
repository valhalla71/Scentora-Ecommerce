/**
 * Luxury product visual asset integration.
 *
 * Resolves a display image for a product: a real product photo when one
 * exists, otherwise a curated fragrance-family visual, otherwise a neutral
 * luxury placeholder. Assets live in `public/images/products/`.
 */

const PRODUCT_IMAGE_BASE_PATH = "/images/products";

export const PLACEHOLDER_PRODUCT_IMAGE = `${PRODUCT_IMAGE_BASE_PATH}/placeholder.webp`;

const CATEGORY_IMAGE_FILENAMES: Record<string, string> = {
  oriental: "oriental.webp",
  fresh: "fresh.webp",
  floral: "floral.webp",
  amber: "amber.webp",
  woody: "woody.webp",
};

/** Resolves a fragrance-family visual for a category name, or the placeholder. */
export function resolveCategoryImage(category?: string | null): string {
  const filename = category
    ? CATEGORY_IMAGE_FILENAMES[category.trim().toLowerCase()]
    : undefined;

  return filename ? `${PRODUCT_IMAGE_BASE_PATH}/${filename}` : PLACEHOLDER_PRODUCT_IMAGE;
}

/**
 * Resolves the image to display for a product: prefers a real product
 * image, then falls back to the product's fragrance-family visual, then
 * the neutral placeholder. Never returns an empty value.
 */
export function resolveProductImage(
  image?: string | null,
  category?: string | null,
): string {
  return image || resolveCategoryImage(category);
}
