import type { Product } from "./products";

export const PRODUCT_CATEGORIES = [
  "Oriental",
  "Fresh",
  "Floral",
  "Amber",
  "Woody",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const PRICE_RANGES = [
  { min: 0, max: 100 },
  { min: 100, max: 150 },
  { min: 150, max: 200 },
] as const;

export const MIN_PRICE = 0;
export const MAX_PRICE = 200;

export function filterProducts(
  products: Product[],
  {
    searchQuery = "",
    categories = [],
    priceMin = MIN_PRICE,
    priceMax = MAX_PRICE,
  }: {
    searchQuery?: string;
    categories?: string[];
    priceMin?: number;
    priceMax?: number;
  } = {},
): Product[] {
  return products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesCategory =
      categories.length === 0 || categories.includes(product.category);

    const price = parseFloat(product.price.replace("$", ""));
    const matchesPrice = price >= priceMin && price <= priceMax;

    return matchesSearch && matchesCategory && matchesPrice;
  });
}

export function sortProducts(
  products: Product[],
  sortBy: "newest" | "priceLow" | "priceHigh" | "rating",
): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case "priceLow":
      return sorted.sort(
        (a, b) =>
          parseFloat(a.price.replace("$", "")) -
          parseFloat(b.price.replace("$", "")),
      );

    case "priceHigh":
      return sorted.sort(
        (a, b) =>
          parseFloat(b.price.replace("$", "")) -
          parseFloat(a.price.replace("$", "")),
      );

    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);

    case "newest":
    default:
      return sorted;
  }
}
