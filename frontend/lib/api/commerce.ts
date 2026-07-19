import type { Product } from "@/lib/products";
import type { Cart, CartItem } from "@/lib/cart";

import type { ApiClient } from "./client";
import type { ApiEnvelope } from "./contracts";
import { unwrapEnvelope } from "./contracts";

type BackendCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
};

type BackendProductAttribute = {
  name: string;
  value: string;
};

type BackendProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string | number;
  category?: BackendCategory;
  brand?: { id: string; name: string; slug: string } | null;
  images?: Array<{ url: string; isPrimary: boolean; order: number }>;
  attributes?: BackendProductAttribute[];
  inventory?: { quantity: number; reserved: number } | null;
};

type ProductListData = {
  products: BackendProduct[];
  total: number;
};

type BackendCart = {
  items: Array<{
    id: string;
    productId: string;
    quantity: number;
    product: BackendProduct;
  }>;
} | null;

export type Category = Pick<BackendCategory, "id" | "name" | "slug" | "description" | "image">;

function attributeValues(product: BackendProduct, names: string[]): string[] {
  const normalizedNames = names.map((name) => name.toLowerCase());
  return (product.attributes ?? [])
    .filter((attribute) => normalizedNames.includes(attribute.name.toLowerCase()))
    .flatMap((attribute) => attribute.value.split(","))
    .map((value) => value.trim())
    .filter(Boolean);
}

export function mapProduct(product: BackendProduct): Product {
  const sortedImages = product.images
    ? [...product.images].sort(
        (a, b) => Number(b.isPrimary) - Number(a.isPrimary) || a.order - b.order,
      )
    : [];

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category?.name ?? "",
    price: `$${Number(product.price).toFixed(2)}`,
    description: product.description ?? "",
    rating: 0,
    reviewCount: 0,
    stock: Math.max(0, (product.inventory?.quantity ?? 0) - (product.inventory?.reserved ?? 0)),
    image: sortedImages[0]?.url,
    images: sortedImages.map((image) => image.url),
    topNotes: attributeValues(product, ["top notes", "topnotes", "top"]),
    heartNotes: attributeValues(product, ["heart notes", "heartnotes", "middle notes", "middle"]),
    baseNotes: attributeValues(product, ["base notes", "basenotes", "base"]),
  };
}

function mapCartItem(item: NonNullable<BackendCart>["items"][number]): CartItem {
  const product = mapProduct(item.product);
  return {
    id: item.id,
    productId: item.productId,
    name: product.name,
    category: product.category,
    price: product.price,
    quantity: item.quantity,
    image: product.image,
  };
}

export function createCommerceApi(client: ApiClient) {
  return {
    async getProducts(page = 1, limit = 100): Promise<{ products: Product[]; total: number }> {
      const response = await client.get<ApiEnvelope<ProductListData>>(
        `/products?page=${page}&limit=${limit}`,
      );
      const data = unwrapEnvelope(response);
      return { products: data.products.map(mapProduct), total: data.total };
    },

    async getProduct(id: string): Promise<Product> {
      const response = await client.get<ApiEnvelope<BackendProduct>>(`/products/${id}`);
      return mapProduct(unwrapEnvelope(response));
    },

    async getCategories(): Promise<Category[]> {
      const response = await client.get<ApiEnvelope<BackendCategory[]>>("/categories");
      return unwrapEnvelope(response).map(({ id, name, slug, description, image }) => ({
        id,
        name,
        slug,
        description,
        image,
      }));
    },

    async getCart(): Promise<Cart> {
      const response = await client.get<ApiEnvelope<BackendCart>>("/cart", { auth: true });
      const cart = unwrapEnvelope(response);
      return { items: cart?.items.map(mapCartItem) ?? [] };
    },

    async addCartItem(productId: string, quantity = 1): Promise<void> {
      await client.post<ApiEnvelope<unknown>>(
        "/cart/items",
        { productId, quantity },
        { auth: true },
      );
    },

    async removeCartItem(productId: string): Promise<void> {
      await client.delete<ApiEnvelope<unknown>>(`/cart/items/${productId}`, { auth: true });
    },
  };
}

export type CommerceApi = ReturnType<typeof createCommerceApi>;
