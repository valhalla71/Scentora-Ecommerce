export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  rating: number;
  reviewCount: number;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Midnight Elegance",
    category: "Oriental",
    price: "$125.00",
    description:
      "A captivating Oriental fragrance that combines mystique with sophistication. Perfect for evening wear and special occasions.",
    rating: 4.8,
    reviewCount: 124,
    topNotes: ["Bergamot", "Black Pepper"],
    heartNotes: ["Jasmine", "Rose", "Patchouli"],
    baseNotes: ["Amber", "Vetiver", "Musk"],
  },
  {
    id: "2",
    name: "Rose Garden",
    category: "Floral",
    price: "$95.00",
    description:
      "A romantic floral bouquet that captures the essence of a blooming garden in spring. Timeless and elegant.",
    rating: 4.7,
    reviewCount: 89,
    topNotes: ["Lemon", "Bergamot"],
    heartNotes: ["Rose", "Peony", "Lily"],
    baseNotes: ["Sandalwood", "Musk"],
  },
  {
    id: "3",
    name: "Citrus Dawn",
    category: "Fresh",
    price: "$85.00",
    description:
      "A fresh and energizing fragrance inspired by the first light of dawn. Perfect for daily wear and daytime activities.",
    rating: 4.6,
    reviewCount: 156,
    topNotes: ["Orange", "Grapefruit", "Lemon"],
    heartNotes: ["Green Tea", "Neroli"],
    baseNotes: ["Cedarwood"],
  },
  {
    id: "4",
    name: "Amber Noir",
    category: "Amber",
    price: "$120.00",
    description:
      "A rich and sensual amber fragrance with warm spices. Creates an aura of mystery and elegance.",
    rating: 4.9,
    reviewCount: 203,
    topNotes: ["Cinnamon", "Nutmeg"],
    heartNotes: ["Amber", "Vanilla", "Tonka"],
    baseNotes: ["Oud", "Leather", "Patchouli"],
  },
  {
    id: "5",
    name: "Vanilla Sunset",
    category: "Floral",
    price: "$90.00",
    description:
      "A warm and comforting blend of floral and vanilla notes. Ideal for creating a cozy, inviting presence.",
    rating: 4.5,
    reviewCount: 95,
    topNotes: ["Peach", "Orange Blossom"],
    heartNotes: ["Vanilla", "Jasmine"],
    baseNotes: ["Musk", "Amber"],
  },
  {
    id: "6",
    name: "Ocean Breeze",
    category: "Fresh",
    price: "$80.00",
    description:
      "Crisp and refreshing notes evoke the feeling of a sea breeze on a sunny day. Perfect for summer.",
    rating: 4.4,
    reviewCount: 112,
    topNotes: ["Sea Salt", "Citrus", "Mint"],
    heartNotes: ["Water Lily", "Aquatic Notes"],
    baseNotes: ["Cedarwood", "Driftwood"],
  },
  {
    id: "7",
    name: "Oud Symphony",
    category: "Woody",
    price: "$150.00",
    description:
      "A luxurious and complex woody fragrance featuring precious oud. A statement of refined taste and elegance.",
    rating: 4.9,
    reviewCount: 78,
    topNotes: ["Rose", "Saffron"],
    heartNotes: ["Oud", "Agar", "Incense"],
    baseNotes: ["Sandalwood", "Vetiver", "Musk"],
  },
  {
    id: "8",
    name: "Jasmine Pearl",
    category: "Floral",
    price: "$110.00",
    description:
      "Delicate jasmine blossoms combined with luminous pearl accords. A fresh and sophisticated floral.",
    rating: 4.7,
    reviewCount: 134,
    topNotes: ["Bergamot", "Pink Pepper"],
    heartNotes: ["Jasmine", "Gardenia", "Tuberose"],
    baseNotes: ["Musk", "Sandalwood"],
  },
  {
    id: "9",
    name: "Sandalwood Dreams",
    category: "Woody",
    price: "$115.00",
    description:
      "Creamy sandalwood wrapped in spicy warmth. A dreamy and meditative fragrance for contemplation.",
    rating: 4.8,
    reviewCount: 98,
    topNotes: ["Cardamom", "Clove"],
    heartNotes: ["Sandalwood", "Spices"],
    baseNotes: ["Vetiver", "Musk", "Amber"],
  },
  {
    id: "10",
    name: "Lavender Serenity",
    category: "Fresh",
    price: "$75.00",
    description:
      "Calming and peaceful lavender fragrance with herbal notes. Promotes relaxation and tranquility.",
    rating: 4.6,
    reviewCount: 167,
    topNotes: ["Lavender", "Bergamot"],
    heartNotes: ["Lavender", "Geranium"],
    baseNotes: ["Sandalwood", "Musk"],
  },
  {
    id: "11",
    name: "Exotic Spice",
    category: "Oriental",
    price: "$130.00",
    description:
      "An intoxicating blend of rare spices and oriental warmth. Perfect for those who love exotic aromas.",
    rating: 4.7,
    reviewCount: 87,
    topNotes: ["Black Cardamom", "Cinnamon"],
    heartNotes: ["Clove", "Nutmeg", "Ginger"],
    baseNotes: ["Amber", "Oud", "Leather"],
  },
  {
    id: "12",
    name: "White Musk",
    category: "Fresh",
    price: "$88.00",
    description:
      "Pure and clean white musk with subtle floral touches. A versatile everyday fragrance.",
    rating: 4.5,
    reviewCount: 145,
    topNotes: ["Bergamot", "Lemon"],
    heartNotes: ["White Flowers", "Musk"],
    baseNotes: ["Sandalwood", "Musk"],
  },
  {
    id: "13",
    name: "Black Orchid",
    category: "Floral",
    price: "$140.00",
    description:
      "Dramatic and mysterious black orchid paired with dark florals and woods. Sophisticated and bold.",
    rating: 4.8,
    reviewCount: 156,
    topNotes: ["Black Currant", "Dark Plum"],
    heartNotes: ["Black Orchid", "Dark Roses"],
    baseNotes: ["Dark Wood", "Musk", "Amber"],
  },
  {
    id: "14",
    name: "Cedar & Sage",
    category: "Woody",
    price: "$105.00",
    description:
      "A natural woody fragrance with herbal sage notes. Grounding and earthy for the modern minimalist.",
    rating: 4.6,
    reviewCount: 103,
    topNotes: ["Sage", "Grapefruit"],
    heartNotes: ["Cedar", "Juniper"],
    baseNotes: ["Vetiver", "Sandalwood"],
  },
  {
    id: "15",
    name: "Golden Honey",
    category: "Amber",
    price: "$100.00",
    description:
      "Warm golden honey sweetness with subtle spice. A comforting and uplifting everyday fragrance.",
    rating: 4.7,
    reviewCount: 189,
    topNotes: ["Orange Blossom", "Bergamot"],
    heartNotes: ["Honey", "Almond", "Vanilla"],
    baseNotes: ["Amber", "Musk", "Sandalwood"],
  },
  {
    id: "16",
    name: "Forest Whisper",
    category: "Woody",
    price: "$118.00",
    description:
      "A mysterious forest fragrance with moss and wood notes. Evokes the feeling of walking through ancient woods.",
    rating: 4.7,
    reviewCount: 92,
    topNotes: ["Pine", "Eucalyptus"],
    heartNotes: ["Moss", "Fir", "Green Notes"],
    baseNotes: ["Cedarwood", "Vetiver", "Patchouli"],
  },
  {
    id: "17",
    name: "Cherry Blossom",
    category: "Floral",
    price: "$92.00",
    description:
      "Delicate cherry blossoms with light fruity accords. A fresh and feminine springtime fragrance.",
    rating: 4.6,
    reviewCount: 127,
    topNotes: ["Green Apple", "Bergamot"],
    heartNotes: ["Cherry Blossom", "Peach Blossom"],
    baseNotes: ["Musk", "Sandalwood"],
  },
  {
    id: "18",
    name: "Spiced Vanilla",
    category: "Amber",
    price: "$102.00",
    description:
      "A perfect balance of warm spices with creamy vanilla. Cozy and perfect for all seasons.",
    rating: 4.8,
    reviewCount: 198,
    topNotes: ["Cinnamon", "Nutmeg"],
    heartNotes: ["Vanilla", "Caramel"],
    baseNotes: ["Sandalwood", "Amber", "Musk"],
  },
  {
    id: "19",
    name: "Iris Dreams",
    category: "Floral",
    price: "$135.00",
    description:
      "Elegant iris flour with powdery iris root notes. A sophisticated and timeless fragrance.",
    rating: 4.9,
    reviewCount: 156,
    topNotes: ["Bergamot", "Pink Pepper"],
    heartNotes: ["Iris", "Violet", "Powdery Notes"],
    baseNotes: ["Sandalwood", "Musk", "Amber"],
  },
  {
    id: "20",
    name: "Twilight Mystery",
    category: "Oriental",
    price: "$128.00",
    description:
      "A captivating oriental blend that unfolds like twilight. Mysterious, warm, and unforgettable.",
    rating: 4.8,
    reviewCount: 134,
    topNotes: ["Galbanum", "Black Pepper"],
    heartNotes: ["Frangipani", "Tuberose", "Amber"],
    baseNotes: ["Sandalwood", "Vetiver", "Musk"],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(
  productId: string,
  category: string,
  limit: number = 4,
): Product[] {
  return products
    .filter((p) => p.category === category && p.id !== productId)
    .slice(0, limit);
}
