export type WishlistItem = {
  id: string;
  name: string;
  category: string;
  price: string;
  image?: string;
};

export type Wishlist = {
  items: WishlistItem[];
};

export const mockWishlist: Wishlist = {
  items: [
    {
      id: "5",
      name: "Vanilla Sunset",
      category: "Floral",
      price: "$90.00",
    },
    {
      id: "9",
      name: "Sandalwood Dreams",
      category: "Woody",
      price: "$115.00",
    },
    {
      id: "11",
      name: "Exotic Spice",
      category: "Oriental",
      price: "$130.00",
    },
    {
      id: "3",
      name: "Citrus Dawn",
      category: "Fresh",
      price: "$85.00",
    },
    {
      id: "13",
      name: "Black Orchid",
      category: "Floral",
      price: "$140.00",
    },
    {
      id: "14",
      name: "Cedar & Sage",
      category: "Woody",
      price: "$105.00",
    },
    {
      id: "6",
      name: "Ocean Breeze",
      category: "Fresh",
      price: "$80.00",
    },
  ],
};
