import type { products } from "./products";

export type CartItem = {
  id: string;
  name: string;
  category: string;
  price: string;
  quantity: number;
  image?: string;
};

export type Cart = {
  items: CartItem[];
};

export const mockCart: Cart = {
  items: [
    {
      id: "1",
      name: "Midnight Elegance",
      category: "Oriental",
      price: "$125.00",
      quantity: 2,
    },
    {
      id: "4",
      name: "Amber Noir",
      category: "Amber",
      price: "$120.00",
      quantity: 1,
    },
    {
      id: "7",
      name: "Oud Symphony",
      category: "Woody",
      price: "$150.00",
      quantity: 1,
    },
    {
      id: "2",
      name: "Rose Garden",
      category: "Floral",
      price: "$95.00",
      quantity: 3,
    },
  ],
};

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price * item.quantity;
  }, 0);
}

export function calculateTax(subtotal: number, taxRate: number = 0.1): number {
  return subtotal * taxRate;
}

export function calculateTotal(
  subtotal: number,
  tax: number,
): number {
  return subtotal + tax;
}
