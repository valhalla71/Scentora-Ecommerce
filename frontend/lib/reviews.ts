export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
  verified: boolean;
}

export const mockReviews: Review[] = [
  {
    id: "1",
    author: "Sarah M.",
    rating: 5,
    date: "2024-01-15",
    text: "Absolutely love this fragrance! It's elegant, long-lasting, and perfect for evening wear. The scent develops beautifully over time.",
    helpful: 24,
    verified: true,
  },
  {
    id: "2",
    author: "James K.",
    rating: 4,
    date: "2024-01-10",
    text: "Great quality perfume with an excellent scent profile. Would recommend to anyone looking for a sophisticated fragrance.",
    helpful: 18,
    verified: true,
  },
  {
    id: "3",
    author: "Emma L.",
    rating: 5,
    date: "2024-01-08",
    text: "This is my second purchase and I'm just as impressed. The packaging is beautiful and the fragrance is timeless.",
    helpful: 31,
    verified: true,
  },
  {
    id: "4",
    author: "David R.",
    rating: 4,
    date: "2024-01-05",
    text: "Pleasant fragrance with good longevity. A little strong out of the bottle but settles nicely after a few minutes.",
    helpful: 12,
    verified: true,
  },
  {
    id: "5",
    author: "Lisa T.",
    rating: 5,
    date: "2024-01-01",
    text: "Exceeded my expectations! The scent is refined and not overpowering. Perfect for daily wear as well as special occasions.",
    helpful: 28,
    verified: true,
  },
  {
    id: "6",
    author: "Michael P.",
    rating: 3,
    date: "2023-12-28",
    text: "Good fragrance but a bit pricey. Still, the quality justifies the cost. Would buy again.",
    helpful: 9,
    verified: true,
  },
  {
    id: "7",
    author: "Rachel G.",
    rating: 5,
    date: "2023-12-25",
    text: "Stunning! This is my third time ordering from Scentora. Their perfumes are consistently excellent.",
    helpful: 22,
    verified: true,
  },
  {
    id: "8",
    author: "Tom H.",
    rating: 4,
    date: "2023-12-20",
    text: "Well-balanced fragrance with great notes. The delivery was quick and the bottle is beautifully designed.",
    helpful: 15,
    verified: true,
  },
  {
    id: "9",
    author: "Nicole S.",
    rating: 5,
    date: "2023-12-15",
    text: "I'm absolutely in love with this scent. It's become my signature fragrance. Highly recommended!",
    helpful: 35,
    verified: true,
  },
  {
    id: "10",
    author: "Chris B.",
    rating: 4,
    date: "2023-12-10",
    text: "Excellent quality and great value. The fragrance lasts throughout the day without being overbearing.",
    helpful: 19,
    verified: true,
  },
];

export function sortReviewsByNewest(reviews: Review[]): Review[] {
  return [...reviews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function sortReviewsByHelpful(reviews: Review[]): Review[] {
  return [...reviews].sort((a, b) => b.helpful - a.helpful);
}

export function getRecommendedProducts(
  productId: string,
  category: string,
  limit: number = 6,
) {
  return mockRecommendations.filter((p) => p.category === category).slice(0, limit);
}

interface RecommendedProduct {
  id: string;
  name: string;
  price: string;
  category: string;
  rating: number;
}

export const mockRecommendations: RecommendedProduct[] = [
  {
    id: "2",
    name: "Rose Garden",
    category: "Floral",
    price: "$95.00",
    rating: 4.7,
  },
  {
    id: "5",
    name: "Vanilla Sunset",
    category: "Floral",
    price: "$90.00",
    rating: 4.5,
  },
  {
    id: "8",
    name: "Jasmine Pearl",
    category: "Floral",
    price: "$110.00",
    rating: 4.7,
  },
  {
    id: "13",
    name: "Black Orchid",
    category: "Floral",
    price: "$140.00",
    rating: 4.8,
  },
  {
    id: "17",
    name: "Cherry Blossom",
    category: "Floral",
    price: "$92.00",
    rating: 4.6,
  },
  {
    id: "19",
    name: "Iris Dreams",
    category: "Floral",
    price: "$135.00",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Amber Noir",
    category: "Amber",
    price: "$120.00",
    rating: 4.9,
  },
  {
    id: "15",
    name: "Golden Honey",
    category: "Amber",
    price: "$100.00",
    rating: 4.7,
  },
  {
    id: "18",
    name: "Spiced Vanilla",
    category: "Amber",
    price: "$102.00",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Citrus Dawn",
    category: "Fresh",
    price: "$85.00",
    rating: 4.6,
  },
  {
    id: "6",
    name: "Ocean Breeze",
    category: "Fresh",
    price: "$80.00",
    rating: 4.4,
  },
  {
    id: "10",
    name: "Lavender Serenity",
    category: "Fresh",
    price: "$75.00",
    rating: 4.6,
  },
];

export const mockRecentlyViewed = [
  {
    id: "1",
    name: "Midnight Elegance",
    category: "Oriental",
    price: "$125.00",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Citrus Dawn",
    category: "Fresh",
    price: "$85.00",
    rating: 4.6,
  },
  {
    id: "4",
    name: "Amber Noir",
    category: "Amber",
    price: "$120.00",
    rating: 4.9,
  },
  {
    id: "7",
    name: "Oud Symphony",
    category: "Woody",
    price: "$150.00",
    rating: 4.9,
  },
  {
    id: "14",
    name: "Cedar & Sage",
    category: "Woody",
    price: "$105.00",
    rating: 4.6,
  },
  {
    id: "19",
    name: "Iris Dreams",
    category: "Floral",
    price: "$135.00",
    rating: 4.9,
  },
];
