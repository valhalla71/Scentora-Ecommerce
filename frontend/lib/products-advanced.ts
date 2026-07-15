// Product experience related mock data (comparisons, FAQs, frequently bought together, etc.)

export interface ProductComparison {
  id: string;
  name: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  volume: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  longevity: string;
  sillage: string;
  seasonality: string;
}

export interface ProductFAQ {
  id: string;
  question: string;
  answer: string;
  helpful: number;
  notHelpful: number;
}

export interface FrequentlyBoughtTogether {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
}

export const mockProductComparisons: ProductComparison[] = [
  {
    id: "comp-prod-001",
    name: "Midnight Elegance",
    category: "Oriental",
    price: "$89.99",
    rating: 4.8,
    reviews: 342,
    volume: "100ml / 3.4 oz",
    topNotes: ["Bergamot", "Pink Pepper", "Saffron"],
    heartNotes: ["Oud", "Rose", "Amber"],
    baseNotes: ["Sandalwood", "Musk", "Vetiver"],
    longevity: "8-10 hours",
    sillage: "High",
    seasonality: "All year, especially Fall/Winter",
  },
  {
    id: "comp-prod-002",
    name: "Rose Sanctuary",
    category: "Floral",
    price: "$75.99",
    rating: 4.6,
    reviews: 278,
    volume: "100ml / 3.4 oz",
    topNotes: ["Damask Rose", "Bergamot", "Lemon"],
    heartNotes: ["Rose Absolute", "Peony", "Jasmine"],
    baseNotes: ["Sandalwood", "Vanilla", "Musk"],
    longevity: "6-8 hours",
    sillage: "Medium",
    seasonality: "Spring, Summer",
  },
  {
    id: "comp-prod-003",
    name: "Citrus Bliss",
    category: "Fresh",
    price: "$65.50",
    rating: 4.5,
    reviews: 215,
    volume: "100ml / 3.4 oz",
    topNotes: ["Grapefruit", "Neroli", "Mint"],
    heartNotes: ["Lavender", "Geranium", "Clary Sage"],
    baseNotes: ["Cedarwood", "Moss", "Amber"],
    longevity: "5-7 hours",
    sillage: "Medium",
    seasonality: "Spring, Summer",
  },
];

export const mockProductFAQs: ProductFAQ[] = [
  {
    id: "faq-001",
    question: "How long does this fragrance last?",
    answer: "Midnight Elegance has excellent longevity and typically lasts 8-10 hours on the skin with proper application. The exact duration depends on individual skin chemistry, application amount, and environmental factors.",
    helpful: 156,
    notHelpful: 8,
  },
  {
    id: "faq-002",
    question: "Is this fragrance suitable for sensitive skin?",
    answer: "While generally well-tolerated, we recommend patch testing first. The fragrance contains natural ingredients and essential oils that may cause sensitivity in some individuals. Apply to a small area first and wait 24 hours.",
    helpful: 98,
    notHelpful: 5,
  },
  {
    id: "faq-003",
    question: "Can I use this fragrance in warm weather?",
    answer: "Yes! While Midnight Elegance is ideal for fall and winter, it can be worn year-round. In warmer months, use lighter application or apply to pulse points only for a more subtle effect.",
    helpful: 142,
    notHelpful: 12,
  },
  {
    id: "faq-004",
    question: "What's the best way to apply this fragrance?",
    answer: "Apply to pulse points such as wrists, inner elbows, neck, and behind ears for best results. Avoid rubbing your wrists together as this breaks down the fragrance molecules. The heat from these areas helps the scent develop.",
    helpful: 189,
    notHelpful: 3,
  },
  {
    id: "faq-005",
    question: "Does this fragrance have any similar scents?",
    answer: "If you enjoy Midnight Elegance, you might also like Royal Oud, Leather Heritage, or Amber Sunset from our collection. These fragrances share similar warm, sophisticated base notes.",
    helpful: 127,
    notHelpful: 9,
  },
];

export const mockFrequentlyBoughtTogether: FrequentlyBoughtTogether[] = [
  {
    id: "fbt-001",
    name: "Fragrance Body Lotion",
    price: "$34.99",
    category: "Body Care",
    image: "body-lotion",
  },
  {
    id: "fbt-002",
    name: "Luxury Gift Set",
    price: "$129.99",
    category: "Gift Sets",
    image: "gift-set",
  },
  {
    id: "fbt-003",
    name: "Travel Atomizer",
    price: "$24.99",
    category: "Accessories",
    image: "atomizer",
  },
  {
    id: "fbt-004",
    name: "Scent Blotting Papers",
    price: "$12.99",
    category: "Accessories",
    image: "blotting-papers",
  },
];

export const mockProductGallery = [
  { id: "gallery-1", alt: "Front bottle view", type: "image" },
  { id: "gallery-2", alt: "Back bottle view", type: "image" },
  { id: "gallery-3", alt: "Side bottle view", type: "image" },
  { id: "gallery-4", alt: "Close-up of packaging", type: "image" },
  { id: "gallery-5", alt: "Product in use", type: "image" },
];

export const mockSizeVariants = [
  { id: "size-30", volume: "30ml", price: "$45.00", inStock: true },
  { id: "size-50", volume: "50ml", price: "$65.00", inStock: true },
  { id: "size-100", volume: "100ml", price: "$89.99", inStock: true },
  { id: "size-200", volume: "200ml", price: "$149.99", inStock: false },
];
